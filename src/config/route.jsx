import React from 'react';
import {BrowserRouter as Router , Route } from "react-router-dom";
import Home from '../home';
import PostAd from '../post-ad';
import SignUP from '../sign-up';
import SignIn from '../sign-in';
import firebase from './firebase';
import AdPage from '../adpage';
import Chat from '../chat';
import YourProducts from '../your-product'



class AppRouter extends React.Component{

    constructor() {
        super()
        this.state = {
            id: [],
            ad_title: [],
            ad_discription: [],
            ad_price: [],
            ad_city: [],
            ad_state: [],
            imageurls: [],
            link: [],
            uid: undefined
        }
    }



    componentDidMount() {
        firebase.database().ref('ads').on('child_added', (data) => {
            this.state.id.push(data.val().key)
            this.state.ad_title.push(data.val().ad_title)
            this.state.ad_discription.push(data.val().ad_discription)
            this.state.ad_price.push(data.val().ad_price)
            this.state.ad_city.push(data.val().ad_city)
            this.state.ad_state.push(data.val().ad_state)
            this.state.imageurls.push(data.val().imageurls[0])
            this.state.link.push(data.val().link)
            this.setState({
                id: this.state.id
            })
        })
    }

    render(){
        return(
            <Router>
                <Route path="/" exact component={Home} />
                <Route path="/post-ad" exact component={PostAd} />
                <Route path="/signup" exact component={SignUP} />
                <Route path="/signin" exact component={SignIn} />
                <Route path="/your-products" exact component={YourProducts} />
                <Route path="/chat" exact component={Chat} />
                {this.state.id.map((id, index) => {
                    return <Route key={index} path={this.state.link[index]} exact component={AdPage}/>
                })}
            </Router>
        )
    }
}

export default AppRouter;