const listGuestByFloor = ([numberOfFloor], hotelRooms) => {
  const guestsByFloor = [];
  for (const room in hotelRooms[numberOfFloor]) {
    if (hotelRooms[numberOfFloor][room].name) guestsByFloor.push(hotelRooms[numberOfFloor][room].name);
  };

  guestsByFloor.filter((guest, index) => guestsByFloor.indexOf(guest) === index);
  console.log(guestsByFloor.join(', '));
  return;
};

module.exports = listGuestByFloor;