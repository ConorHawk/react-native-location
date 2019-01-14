import React from "react";
import PropTypes from 'prop-types'
import Room from './Room'
import { View } from "react-native";

const RoomsList = ({ rooms }) => (
    <View>
        {rooms.map(room => (
            <Room key={room.id} {...room} />
        ))}
    </View>
)

// RoomsList.propTypes = {
//     rooms: PropTypes.arrayOf(
//         PropTypes.shape({
//             name: PropTypes.name.isRequired
//         })
//     )
// }

export default RoomsList