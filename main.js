const fs = require('fs');
const createHotel = require('./createHotel');
const book = require('./book');
const checkout = require('./checkout');
const listAvailableRooms = require('./listAvailableRooms');
const listGuest = require('./listGuest');
const getGuestInRoom = require('./getGuestInRoom');
const listGuestByAge = require('./listGuestByAge');
const listGuestByFloor = require('./listGuestByFloor');
const checkoutGuestByFloor = require('./checkoutGuestByFloor');
const bookByFloor = require('./bookByFloor');

class Command {
  constructor(name, params) {
    this.name = name
    this.params = params
  }
}

const hotelRooms = {};
const keyCards = ['masterKey'];

function main() {
  const filename = 'input.txt'
  const commands = getCommandsFromFileName(filename)

  commands.forEach(command => {
    switch (command.name) {
      case 'create_hotel':
        createHotel(command.params, hotelRooms, keyCards);
        return;

      case 'book':
        book(command.params, hotelRooms, keyCards);
        return;
        
      case 'checkout':
        checkout(command.params, hotelRooms, keyCards);
        return;

      case 'list_available_rooms':
        listAvailableRooms(hotelRooms);
        return;

      case 'list_guest':
        listGuest(hotelRooms);
        return;

      case 'get_guest_in_room':
        getGuestInRoom(command.params, hotelRooms);
        return;

      case 'list_guest_by_age':
        listGuestByAge(command.params, hotelRooms);
        return;

      case 'list_guest_by_floor':
        listGuestByFloor(command.params, hotelRooms);
        return;

      case 'checkout_guest_by_floor':
        checkoutGuestByFloor(command.params, hotelRooms, keyCards);
        return;

      case 'book_by_floor':
        bookByFloor(command.params, hotelRooms, keyCards);
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