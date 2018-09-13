import React, { Component } from 'react';


class MessageList extends Component {
	constructor(props){
		super(props);

		this.state ={
			message: [],
			Messages: [{
				username: '',
				content: ' ',
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
		this.MessagesRef.on('child_removed', snapshot =>{
			this.setState({message: this.state.message.filter(message=>message.key !== snapshot.key)})
		});
	}

	createMessage(newMessages) {
		this.MessagesRef.push({
			username: this.props.user ? this.props.user.displayName : 'Guest',
			content: this.state.newMessages,
			roomID: this.props.activeRoom.key,
			sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
		});
		this.setState({newMessages: ' '});
		}

	removeMessage(message){
		this.MessagesRef.child(message.key).remove();
	}

	handleMessageInput(e){
		this.setState({
			newMessages: e.target.value
		});
	}

	formatTime(time) {
		let date = new Date(time);
		let year = date.getFullYear();
		let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
		let month = months[date.getMonth()];
		let day = date.getDate();
		let hour = date.getHours();
		let min = date.getMinutes();
		let sec = date.getSeconds();
		let timestamp = month + ' ' + day + ', ' + year + ' ' + hour + ':' + min + ':' + sec;
		return timestamp
	}

	render (){
    	return(
       		<div id="messageList">
            	<h1 className="txtC">Chat Room: {this.props.activeRoom.name}</h1>
            	<div id="messageDisplay" >
                		{this.state.message
                		.filter(message =>message.roomID === this.props.activeRoom.key)
                		.map((message,index) =>
                			<div key={index} className="GainsboroBack WheatOut">
                  				<p className="txtL"><strong>{message.username}</strong></p>
                  				<p className="txtL"> {message.content} </p> 
                  				<p className="txtR">Sent at: {this.formatTime(message.sentAt)}</p>
                  				<button
                  					onClick = {()=>this.removeMessage(message)}
                  				> Delete Message 
                  				</button>
                			</div>
                )
                }
                <form className="bottomRow BlueBack "
                	onSubmit={(e)=> {e.preventDefault(); this.createMessage(this.state.newMessages)}}
                >
                	<input 
                		type="text"
                		value={this.state.content}
                		placeholder="Say something"
                		onChange={this.handleMessageInput}
                		className = "vertAlignC seventyWidth"
                	/>
                	<input 
                		type = "submit" className = "vertAlignC"
                	/>
                </form>
               	</div>        
      </div>

    )
 }
}



export default MessageList;