import React from "react";
import { Text } from "react-native";
import PropTypes from 'prop-types'

const Room = ({name, id, members}) => (
    <Text>{name}</Text>
)

export default Room