import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';


 
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
  render() {
    return (
      <div className="App">
        <RoomList firebase={firebase} />
      </div>
    );
  }
}

export default App;
