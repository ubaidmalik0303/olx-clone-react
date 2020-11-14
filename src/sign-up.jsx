import React from 'react';
import './sign-up.css';
import firebase from './config/firebase'
import {Link , Redirect} from 'react-router-dom';



class SignUp extends React.Component {

    constructor() {
        super()
        this.state = {
            email: "",
            password: ""
        }
    }

    signup = (e) => {
        firebase.auth().createUserWithEmailAndPassword(this.state.email , this.state.password).then((msg) => {
            alert("SuccesFull")
        }).catch(function (error) {
            alert(error);
        });
        e.preventDefault()
    }

    render() {
        return (
            <form className="signup">
                <h2>Sign Up</h2>
                <input type="email" placeholder="Email" onChange={(e) => this.setState({ email: e.target.value })} />
                <input type="password" placeholder="Password" onChange={(e) => this.setState({ password: e.target.value })} />
                <input type="submit" value="SignUp" onClick={(e) => this.signup(e)} />
                <Link to="/signin"><p>SignIn</p></Link>
                <Link to="/"><p>Home</p></Link>
            </form>
        )
    }
}


export default SignUp;