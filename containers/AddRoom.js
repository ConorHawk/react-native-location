import React from 'react'
import { connect } from "react-redux";
import { addRoom } from "../actions"
import { Button } from 'react-native'

const AddRoom = ({dispatch}) => {
    return (
        <Button onPress={ () => dispatch(addRoom('dispatchedName'))} title="Add a room"></Button>
    )
}

export default connect()(AddRoom)