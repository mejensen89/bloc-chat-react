import React, { Component } from 'react';

class User extends Component {
	constructor(props){
		super(props);
		this.state={
			user: ''
		}
	}

	signIn(){
		const provider = new this.props.firebase.auth.GoogleAuthProvider();
		this.props.firebase.auth().signInWithPopup( provider );
	}

	signOut(){
		this.props.firebase.auth().signOut();
	}

	componentDidMount(){
		this.props.firebase.auth().onAuthStateChanged( user => {
  		this.props.setUser(user);
	});

	}

	render(){
		return(
			<section id="authForm">
				<h2>{this.props.user ? this.props.user.displayName : 'Guest'}</h2>
				<button onClick={()=> this.signIn()}> Sign In </button>
				<button onClick={()=> this.signOut()}> Sign Out </button>
			</section>
		)
	}

}

export default User;