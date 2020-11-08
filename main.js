const fs = require('fs')

class Command {
  constructor(name, params) {
    this.name = name
    this.params = params
  }
}

const hotelRooms = {};
const keyCards = [];

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
        keyCards.push(false, ...Array.from({ length: (floor * roomPerFloor) }, i => i = true));

        console.log('hotelRooms', hotelRooms);
        console.log('keyCards', keyCards);

        // console.log(
        //   `Hotel created with ${floor} floor(s), ${roomPerFloor} room(s) per floor.`
        // )
        return
      case 'book':
        const [room, name, age] = command.params;
        // console.log(
        //   `Room ${room} is booked by ${name} with keycard number 1.`
        // );
        return;
      case 'checkout':
        // console.log('checkout');
        return;
      case 'list_available_rooms':
        // console.log('list_available_rooms');
        return;
      case 'list_guest':
        // console.log('list_guest');
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