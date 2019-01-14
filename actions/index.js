export const ADD_ROOM = 'ADD_ROOM'
export const WATCH_ROOMS = 'WATCH_ROOMS'

// Action creators

export const addRoom = name => ({
    type: ADD_ROOM, name
})

export const watchRooms = () => ({
    type: WATCH_ROOMS
})