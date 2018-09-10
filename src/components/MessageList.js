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
	}
	componentDidMount(){
		this.MessagesRef.on('child_added', snapshot => {
			const message = snapshot.val();
			message.key = snapshot.key
			this.setState({ message: this.state.message.concat(message)});
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
               	</div>        
      </div>

    )
 }
}



export default MessageList;