import React, { Component } from 'react';


class MessageList extends Component {
	constructor(props){
		super(props);

		this.state ={
			message: [],
			Messages: [{
				username: '',
				content: '',
				roomID: '',
				sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
			}]
		}
		this.MessagesRef= this.props.firebase.database().ref('Messages');
		this.handleMessageInput = this.handleMessageInput.bind(this);
		this.createMessage = this.createMessage.bind(this);
	}

	componentDidMount(){
		this.MessagesRef.on('child_added', snapshot => {
			const message = snapshot.val();
			message.key = snapshot.key
			this.setState({ message: this.state.message.concat(message)});
		});
	}

	createMessage() {
		if (this.props.activeRoom) {
			const username = this.props.currentUser ? this.props.currentUser.displayName : 'Guest';
			const timestamp = this.props.firebase.database.ServerValue.TIMESTAMP;
			this.MessagesRef.push({
				username: username,
				content: this.state.content,
				roomID: this.props.activeRoom.key,
				sentAt: timestamp
			});
			this.setState({
				content: '',
				sentAt: timestamp
			});
		}
			else {
				alert('Pick a room before sending a message please');
				this.setState({
					content: ''
				});
			}
		}

	handleMessageInput(e){
		this.setState({
			content: e.target.value
		});
	}

	render (){
    	return(
       		<div>
            	<h1 className="txtC">Chat Room: {this.props.activeRoom.name}</h1>
            	<div className="messageDisplay">
                		{this.state.message
                		.filter(message =>message.roomID === this.props.activeRoom.key)
                		.map((message,index) =>
                			<div key={index} className="GainsboroBack WheatOut">
                  				<p className="txtL">User: {message.username} </p>
                  				<p className="txtL">Says: {message.content}</p> 
                  				<p className="txtL">Time: {message.sentAt}</p>
                			</div>
                )
                }
                <form className="bottomRow">
                	<input 
                		type="text"
                		value={this.state.content}
                		placeholder="Say something"
                		onChange={this.handleMessageInput}
                	/>
                	<button onClick={this.createMessage}> Send </button>
                </form>
               	</div>        
      </div>

    )
 }
}



export default MessageList;