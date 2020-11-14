import React from 'react';
import './header.css';
import LogoImage from './images/Logotyp_OLX_.png';
import searchicon from './images/olx-search.png';
import { Link } from 'react-router-dom';
import firebase from '../config/firebase'


class Header extends React.Component {

    constructor() {
        super()
        this.state = {
            uid: undefined,
            displayname: undefined,
        }
    }

    logout = () => {
        firebase.auth().signOut().then(function () {
            this.setState({ uid: undefined , displayName: undefined })
            alert("Logout")
        }).catch(function (error) {
        });
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                this.setState({ uid: undefined , displayName: undefined })
            } else {
                this.setState({ uid: user.uid , displayname: user.displayName})
            }
        })
    }

    render() {
        return (
            <>
                <div className="top-menu">
                    <div className="header">
                        <div className="logo">
                            <Link to="/"><img src={LogoImage} alt="" /></Link>
                        </div>
                        <div className="location-box">
                            <i className="fa fa-search"></i>
                            <select name="" id="">
                                <option value="">Pakistan</option>
                                <option value="">Pakistan</option>
                                <option value="">Pakistan</option>
                                <option value="">Pakistan</option>
                            </select>
                        </div>
                        <div className="search-box">
                            <div className="search-icon">
                                <img src={searchicon} alt="" />
                            </div>
                            <input type="search" placeholder="Find Cars, Mobile Phones and more..." />
                        </div>
                        {this.state.uid === undefined ? <div className="login-btn">
                            <Link to="/signin"><p>LogIn</p></Link>
                        </div> : <div className="login-btn user">
                                {this.state.displayname === null || this.state.displayname === undefined ? <p>User</p> : <p>{this.state.displayname}</p>}
                                <div className="usernested">
                                    <ul>
                                        <Link to="/post-ad"><li>Sell</li></Link>
                                        <Link to="/your-products"><li>Your Products</li></Link>
                                        <Link to="/chat"><li>Chat</li></Link>
                                        <li onClick={() => this.logout()}>LogOut</li>
                                    </ul>
                                </div>
                            </div>}
                    </div>
                    <div className="navbar">
                        <h4>ALL CATEGORIES</h4>
                        <ul className="category-list">
                            <li>Mobile Phones</li>
                            <li>Cars</li>
                            <li>Motorcycles</li>
                            <li>Houses</li>
                            <li>TV - Video - Audio</li>
                            <li>Tablets</li>
                            <li>Land And Plots</li>
                        </ul>
                    </div>
                </div>
            </>
        );
    }
}

export default Header;