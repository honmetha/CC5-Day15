class Guest {
  constructor(name, age, keyCard) {
    this.name = name;
    this.age = age;
    this.keyCard = keyCard;
  };
};

const book = ([room, name, age], hotelRooms, keyCards) => {
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
  else console.log(`Cannot book room ${room} for ${name}, The room is currently booked by ${hotelRooms[floorNumber][room].name}.`);
  return;
};

module.exports = book;