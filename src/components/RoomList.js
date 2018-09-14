import React, { Component } from 'react';


class RoomList extends Component {
	constructor(props){
		super(props);

		this.state ={
			rooms: [],
			newRoomName: "",
			mouseInside: false,
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
		this.roomsRef.on('child_removed', snapshot =>{
			this.setState({rooms: this.state.rooms.filter(rooms => rooms.key !== snapshot.key)})
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

	deleteRoom (room) {
		this.roomsRef.child(room.key).remove();
	}

	changeName(roomKey) {
		let nameChange = {
			key: this.props.activeRoom.key,
			name: window.prompt("Enter a new room name")
		};
		let newRoomName = this.props.firebase.database().ref('rooms/' + roomKey);
		newRoomName.update({name: nameChange.name})
		}

	onMouseOver(e, room) {
			this.setState({ mouseInside: true});
	}

	onMouseLeave(e) {
		this.setState({ mouseInside: false});
	}


	render(){
		return (
			<section>

				<h1> Bloc Chat List </h1>

				<form>
					<input 
						type="text" 
						placeholder="Name your room" 
						value ={this.state.newRoomName}
						onChange={this.handleRoomInput}
					/>
					<button 
						onClick={this.createRoom}
						className="btnRounded fivePad WhiteBack BlackOut"
						>
						Make your chat room 
					</button>

				</form>

				<ul id="chat-list" className="flxCol">
				{this.state.rooms.map( room =>
					<li
					className="smallRow spaceAround" 
					key={room.key} 
					onClick={()=> this.props.setActiveRoom(room)}>
					<p
						onMouseOver={(e)=> this.onMouseOver(e, room)}
						onMouseLeave = {(e)=> this.onMouseLeave(e)}
					>
					{room.name}
					</p>			
					<button 
						onClick={ ()=> this.changeName(room.key)}
						className="btnRounded fivePad WhiteBack BlackOut"
					> 
					Rename
					</button>
					<button 
						onClick= {(e)=> this.deleteRoom(room)}
						className="btnRounded fivePad WhiteBack BlackOut"
					>
					Remove 
					</button>
					</li>
				)}
				</ul>
				
			</section>
			);
	}
 
} 

export default RoomList;