const checkoutGuestByFloor = ([checkoutFloor], hotelRooms, keyCards) => {
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
};

module.exports = checkoutGuestByFloor;