const getGuestInRoom = ([guestRoom], hotelRooms) => {
  const guestFloor = guestRoom.toString().slice(0, -2);
  const getGuest = hotelRooms[guestFloor][guestRoom].name;
  console.log(getGuest);
  return;
};

module.exports = getGuestInRoom;