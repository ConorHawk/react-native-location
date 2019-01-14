import { connect } from "react-redux";
import { addRoom } from "../actions"
import RoomsList from "../components/rooms/RoomsList"

const mapStateToProps = state => ({
    rooms: state.rooms
})

export default connect(
    mapStateToProps,
)(RoomsList)