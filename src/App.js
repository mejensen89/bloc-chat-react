import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';


 
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
      activeRoom: ' ',
      currentUser: ' ',
      user: ' '
    }
    this.setActiveRoom = this.setActiveRoom.bind(this);
    this.setUser = this.setUser.bind(this);
  }
 
 setActiveRoom(room) {
  this.setState({activeRoom: room})
 }

 setUser(user){
  this.setState({currentUser: user});
 }

  render() {
    return (
      <div className="App row">
        <aside className="oneWide threeGrayBack">
          <User 
            firebase={firebase}
            currentUser={this.state.currentUser}
            setUser={this.setUser}
          />
          <RoomList 
            firebase={firebase}
            activeRoom = {this.state.activeRoom}
            setActiveRoom = {this.setActiveRoom}
           />
         </aside>
         <section className = "fiveWide threeBlueBack">
          <MessageList 
            firebase={firebase}  
            activeRoom = {this.state.activeRoom}
            user={this.state.currentUser}
            setUser={this.setUser}
          />
        </section>
      </div>
    );
  }
}

export default App;