const listGuestByAge = ([symbol, ageNumber], hotelRooms) => {
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
};

module.exports = listGuestByAge;