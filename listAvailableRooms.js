const listAvailableRooms = (hotelRooms) => {
  const availableRooms = [];
  for (const floor in hotelRooms) {
    for (const room in hotelRooms[floor]) {
      if (hotelRooms[floor][room] === 'available') availableRooms.push(room);
    };
  };
  console.log(availableRooms.join(', '));
  return;
};

module.exports = listAvailableRooms;