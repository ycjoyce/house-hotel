import fetch from '@src/apis/fetch';

export const getAllRooms = (data) => fetch('https://challenge.thef2e.com/api/thef2e2019/stage6/rooms', data, 'GET');
export const getRoomDetail = (id, data) => fetch(`https://challenge.thef2e.com/api/thef2e2019/stage6/room/${id}`, data, 'GET');
export const reserveRoom = (id, data) => fetch(`https://challenge.thef2e.com/api/thef2e2019/stage6/room/${id}`, data, 'POST');
export const clearAllReservation = (data) => fetch('https://challenge.thef2e.com/api/thef2e2019/stage6/rooms', data, 'DELETE');
