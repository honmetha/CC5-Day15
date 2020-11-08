const fs = require('fs')

class Command {
  constructor(name, params) {
    this.name = name
    this.params = params
  }
}

class Guest {
  constructor(name, age, keyCard) {
    this.name = name;
    this.age = age;
    this.keyCard = keyCard;
  };
};

const hotelRooms = {};
const keyCards = ['masterKey'];

function main() {
  const filename = 'input.txt'
  const commands = getCommandsFromFileName(filename)
  // console.log('commands', commands);

  commands.forEach(command => {
    switch (command.name) {
      case 'create_hotel':
        const [floor, roomPerFloor] = command.params
        // const hotel = { floor, roomPerFloor }

        for (let i = 1; i <= floor; i++) {
          hotelRooms[i] = {};
          for (let j = 1; j <= roomPerFloor; j++) {
            const roomNumber = j < 10 ? '0' + j: '' + j;
            hotelRooms[i][i + roomNumber] = 'available';
          };
        };
        keyCards.push(...Array.from({ length: (floor * roomPerFloor) }, i => i = 'available'));

        // console.log('hotelRooms', hotelRooms);
        // console.log('keyCards', keyCards);

        console.log(`Hotel created with ${floor} floor(s), ${roomPerFloor} room(s) per floor.`)
        return
      case 'book':
        const [room, name, age] = command.params;
        const floorNumber = room.toString().slice(0, -2);

        if (hotelRooms[floorNumber][room] === 'available') {
          for (let i = 1; i <= keyCards.length; i++) {
            if (keyCards[i] === 'available') {
              const keyCard = i;
              hotelRooms[floorNumber][room] = new Guest(name, age, keyCard);
              console.log(`Room ${room} is booked by ${name} with keycard number ${keyCard}.`);
              keyCards[i] = room;
              return;
            };
          };
        }
        else console.log(`Cannot book room ${room} for ${name}, The room is currently booked by ${hotelRooms[floorNumber][room].name}.`)
        return;
      case 'checkout':
        const [cardNumber, checkoutName] = command.params;
        const checkedOutRoom = keyCards[cardNumber].toString();
        const checkedOutFloor = checkedOutRoom.slice(0, -2);
        const guestName = hotelRooms[checkedOutFloor][checkedOutRoom].name;

        if (guestName === checkoutName) {
          console.log(`Room ${keyCards[cardNumber]} is checkout`);
          hotelRooms[checkedOutFloor][checkedOutRoom] = 'available';
          keyCards[cardNumber] = 'available';
        } else {
          console.log(`Only ${guestName} can checkout with keycard number ${cardNumber}.`);
        }
        return;
      case 'list_available_rooms':
        const availableRooms = [];
        for (const floor in hotelRooms) {
          for (const room in hotelRooms[floor]) {
            if (hotelRooms[floor][room] === 'available') availableRooms.push(room);
          }
        }
        console.log(availableRooms.join(', '));
        return;
      case 'list_guest':
        const guests = [];

        for (const floor in hotelRooms) {
          for (const room in hotelRooms[floor]) {
            if (hotelRooms[floor][room].name) guests.push(hotelRooms[floor][room].name);
          }
        }

        guests.filter((guest, index) => guests.indexOf(guest) === index);
        console.log(guests.join(', '));
        return;
      case 'get_guest_in_room':
        // console.log('get_guest_in_room');
        return;
      case 'list_guest_by_age':
        // console.log('list_guest_by_age');
        return;
      case 'list_guest_by_floor':
        // console.log('list_guest_by_floor');
        return;
      case 'checkout_guest_by_floor':
        // console.log('checkout_guest_by_floor');
        return;
      case 'book_by_floor':
        // console.log('book_by_floor');
        return;
      default:
        return
    }
  })
}

function getCommandsFromFileName(fileName) {
  const file = fs.readFileSync(fileName, 'utf-8')

  return file
    .split('\n')
    .map(line => line.split(' '))
    .map(
      ([commandName, ...params]) =>
        new Command(
          commandName,
          params.map(param => {
            const parsedParam = parseInt(param, 10)

            return Number.isNaN(parsedParam) ? param : parsedParam
          })
        )
    )
}

main()