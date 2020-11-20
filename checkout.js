const checkout = ([cardNumber, checkoutName], hotelRooms, keyCards) => {
  const checkedOutRoom = keyCards[cardNumber].toString();
  const checkedOutFloor = checkedOutRoom.slice(0, -2);
  const guestName = hotelRooms[checkedOutFloor][checkedOutRoom].name;

  if (guestName === checkoutName) {
    console.log(`Room ${keyCards[cardNumber]} is checkout.`);
    hotelRooms[checkedOutFloor][checkedOutRoom] = 'available';
    keyCards[cardNumber] = 'available';
  } else {
    console.log(`Only ${guestName} can checkout with keycard number ${cardNumber}.`);
  };
  
  return;
};

module.exports = checkout;