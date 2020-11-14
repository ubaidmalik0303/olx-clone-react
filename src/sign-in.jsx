import React from 'react';
import './sign-in.css';
import firebase from './config/firebase';
import {Link , useHistory} from 'react-router-dom';



class SignIn extends React.Component {

    constructor() {
        super()
        this.state = {
            email: "",
            password: ""
        }
    }

    signin = (e) => {
        firebase.auth().signInWithEmailAndPassword(this.state.email , this.state.password).then(() => {
            window.history.back()
        }).catch(function (error) {
        });
        e.preventDefault()
    }

    render() {
        return (
            <form className="signin">
                <h2>Sign In</h2>
                <input type="email" placeholder="Email" onChange={(e) => this.setState({ email: e.target.value })} />
                <input type="password" placeholder="Password" onChange={(e) => this.setState({ password: e.target.value })} />
                <input type="submit" value="SignIn" onClick={(e) => this.signin(e)} />
                <Link to="/signup"><p>SignUp</p></Link>
                <Link to="/"><p>Home</p></Link>
            </form>
        )
    }
}


export default SignIn;