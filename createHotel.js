const createHotel = ([floor, roomPerFloor], hotelRooms, keyCards) => {
  for (let i = 1; i <= floor; i++) {
    hotelRooms[i] = {};
    for (let j = 1; j <= roomPerFloor; j++) {
      const roomNumber = j < 10 ? '0' + j: '' + j;
      hotelRooms[i][i + roomNumber] = 'available';
    };
  };
  
  keyCards.push(...Array.from({ length: (floor * roomPerFloor) }, i => i = 'available'));
  console.log(`Hotel created with ${floor} floor(s), ${roomPerFloor} room(s) per floor.`);
  return;
};

module.exports = createHotel;