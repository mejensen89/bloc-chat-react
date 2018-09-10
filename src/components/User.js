import React, { Component } from 'react';

class User extends Component {
	constructor(props){
          super(props);
          this.state={
            user:''
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
				<p className="largeFont">Hello {this.props.currentUser ? this.props.currentUser.displayName : 'Guest'}</p>
				<button 
					onClick={()=> this.signIn()}
					className="btnRounded fivePad WhiteBack BlackOut zeroMargin"> 
					Sign In 
				</button>
				<button 
					onClick={()=> this.signOut()}
					className="btnRounded fivePad WhiteBack BlackOut zeroMargin"> 
					Sign Out 
					</button>
			</section>
		)
	}

}

export default User;