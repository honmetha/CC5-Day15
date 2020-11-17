const listGuest = (hotelRooms) => {
  const guests = [];
  for (const floor in hotelRooms) {
    for (const room in hotelRooms[floor]) {
      if (hotelRooms[floor][room].name) guests.push(hotelRooms[floor][room].name);
    };
  };
  guests.filter((guest, index) => guests.indexOf(guest) === index);
  console.log(guests.join(', '));
  return;
};

module.exports = listGuest;