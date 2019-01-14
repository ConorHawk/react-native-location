// import { combineReducers } from 'redux'

const initialState = {
    rooms: [
        {
            id: 123,
            name: 'Another test',
            members: {
                test: true
            }
        }
    ]
}

function app(state = initialState, action) {
    switch (action.type) {
        case 'ADD_ROOM':
            return {...state, rooms: [
                ...state.rooms,
                {
                    name: action.name
                }
            ]}
    }
    return state
}

export default app