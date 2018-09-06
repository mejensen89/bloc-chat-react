import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';


 
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD4X6SoLCRf3v0ebEIUiya5yghsrYFHhNY",
    authDomain: "bloc-chat-ee423.firebaseapp.com",
    databaseURL: "https://bloc-chat-ee423.firebaseio.com",
    projectId: "bloc-chat-ee423",
    storageBucket: "bloc-chat-ee423.appspot.com",
    messagingSenderId: "353961061936"
  };
  firebase.initializeApp(config);


class App extends Component {
 constructor(props){
  super(props);

  this.state={
      activeRoom: ' '
    }
    this.setActiveRoom = this.setActiveRoom.bind(this);
  }
 
 setActiveRoom(room) {
  this.setState({activeRoom: room})
 }

  render() {
    return (
      <div className="App row">
        <RoomList 
          firebase={firebase}
          activeRoom = {this.state.activeRoom}
          setCurrentRoom = {this.setCurrentRoom}
         />
        <MessageList 
          firebase={firebase}  
          activeRoom = {this.state.activeRoom}
        />
      </div>
    );
  }
}

export default App;