const fs = require('fs');
const createHotel = require('./createHotel');
const book = require('./book');
const checkout = require('./checkout');
const listAvailableRooms = require('./listAvailableRooms');
const listGuest = require('./listGuest');
const getGuestInRoom = require('./getGuestInRoom');

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