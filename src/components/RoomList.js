import React, { Component } from 'react';


class RoomList extends Component {
	constructor(props){
		super(props);

		this.state ={
			rooms: [],
			newRoomName: "",

		};
		this.roomsRef = this.props.firebase.database().ref('rooms');
		this.handleRoomInput = this.handleRoomInput.bind(this);
		this.createRoom = this.createRoom.bind(this);
		}

	componentDidMount(){
		this.roomsRef.on('child_added', snapshot => {
			const room = snapshot.val();
			room.key = snapshot.key;
			this.setState({ rooms: this.state.rooms.concat( room ) })
		});
	}

	createRoom() {
		if (this.state.newRoomName.trim () !== ""){
			this.roomsRef.push({ name: this.state.newRoomName});
			this.setState({newRoomName: '',});
		}
		else {
			alert("A room needs a name");
			this.setState({ newRoomName: '',});
		}
	}

	handleRoomInput(e) {
		this.setState({newRoomName: e.target.value});
	}

	render(){
		return (
			<section className="oneWide">

				<h1> Bloc Chat List </h1>
				<ul id="chat-list">
				{this.state.rooms.map( room =>
					<li key={room.key}>{room.name}</li>
				)}
				</ul>
				<form>
					<input 
						type="text" 
						placeholder="Name your room" 
						value ={this.state.newRoomName}
						onChange={this.handleRoomInput}
					/>
					<button 
						onClick={this.createRoom}
						>
						Make your chat room 
					</button>

				</form>
			</section>
			);
	}

} 

export default RoomList;