const fs = require('fs');

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
          console.log(`Room ${keyCards[cardNumber]} is checkout.`);
          hotelRooms[checkedOutFloor][checkedOutRoom] = 'available';
          keyCards[cardNumber] = 'available';
        } else {
          console.log(`Only ${guestName} can checkout with keycard number ${cardNumber}.`);
        };
        return;

      case 'list_available_rooms':
        const availableRooms = [];
        for (const floor in hotelRooms) {
          for (const room in hotelRooms[floor]) {
            if (hotelRooms[floor][room] === 'available') availableRooms.push(room);
          };
        };
        console.log(availableRooms.join(', '));
        return;

      case 'list_guest':
        const guests = [];
        for (const floor in hotelRooms) {
          for (const room in hotelRooms[floor]) {
            if (hotelRooms[floor][room].name) guests.push(hotelRooms[floor][room].name);
          };
        };
        guests.filter((guest, index) => guests.indexOf(guest) === index);
        console.log(guests.join(', '));
        return;

      case 'get_guest_in_room':
        const [guestRoom] = command.params;
        const guestFloor = guestRoom.toString().slice(0, -2);
        const getGuest = hotelRooms[guestFloor][guestRoom].name;
        console.log(getGuest);
        return;

      case 'list_guest_by_age':
        const [symbol, ageNumber] = command.params;
        const symbols = {
          '<': (age, ageNumber) => age < ageNumber, 
          '>': (age, ageNumber) => age > ageNumber,
          '=': (age, ageNumber) => age === ageNumber,
        };
        const allGuests = [];
        for (const floor in hotelRooms) {
          for (const room in hotelRooms[floor]) {
            if (symbols[symbol](hotelRooms[floor][room].age, ageNumber)) allGuests.push(hotelRooms[floor][room].name);
          };
        };
        allGuests.filter((guest, index) => allGuests.indexOf(guest) === index);
        console.log(allGuests.join(', '));
        return;

      case 'list_guest_by_floor':
        const [numberOfFloor] = command.params;
        const guestsByFloor = [];
        for (const room in hotelRooms[numberOfFloor]) {
          if (hotelRooms[numberOfFloor][room].name) guestsByFloor.push(hotelRooms[numberOfFloor][room].name);
        };
        guestsByFloor.filter((guest, index) => guestsByFloor.indexOf(guest) === index);
        console.log(guestsByFloor.join(', '));
        return;

      case 'checkout_guest_by_floor':
        const [checkoutFloor] = command.params;
        const checkoutRoom = [];
        for (const room in hotelRooms[checkoutFloor]) {
          if (hotelRooms[checkoutFloor][room] !== 'available') {
            const guestRoom = hotelRooms[checkoutFloor][room];
            const keyCardNumber = guestRoom.keyCard;
            checkoutRoom.push(room);
            hotelRooms[checkoutFloor][room] = 'available'
            keyCards[keyCardNumber] = 'available';
          };
        };
        console.log(`Room ${checkoutRoom.join(', ')} are checkout.`);
        return;

      case 'book_by_floor':
        const [floorBook, floorBookName, floorBookAge] = command.params;
        for (const room in hotelRooms[floorBook]) {
          if (hotelRooms[floorBook][room] !== 'available') {
            console.log(`Cannot book floor ${floorBook} for ${floorBookName}.`);
            return;
          };
        };
        const roomBooked = [], keyUnavailable = [];
        for (const room in hotelRooms[floorBook]) {
          for (let i = 1; i <= keyCards.length; i++) {
            if (keyCards[i] === 'available') {
              const keyCard = i;
              hotelRooms[floorBook][room] = new Guest(floorBookName, floorBookAge, keyCard);
              keyCards[keyCard] = Number(room);
              roomBooked.push(room);
              keyUnavailable.push(keyCard)
              break;
            };
          };
        };
        console.log(`Room ${roomBooked.join(', ')} are booked with keycard number ${keyUnavailable.join(', ')}`);
        return;

      default:
        return;
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