class Guest {
  constructor(name, age, keyCard) {
    this.name = name;
    this.age = age;
    this.keyCard = keyCard;
  };
};

const bookByFloor = ([floorBook, floorBookName, floorBookAge], hotelRooms, keyCards) => {
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
};

module.exports = bookByFloor;