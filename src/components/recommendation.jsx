import React from 'react';
import './recommendation.css';
import Product from './product';
import firebase from '../config/firebase';
import {Link} from 'react-router-dom';


class Recommendation extends React.Component {

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
            pathname: [],
            link: []
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
            this.state.link.push(data.val().link)
            this.state.imageurls.push(data.val().imageurls[0])
            this.setState({
                id: this.state.id
            })
        })
    }


    render() {
        return (
            <div className="recommendation" >
                <h2>Fresh recommendations</h2>
                <div className="products-row row">
                    {this.state.id.map((id, index) => {
                        return <Product key={id} id={id} link={this.state.link[index]} title={this.state.ad_title[index]} discription={this.state.ad_discription[index]} price={this.state.ad_price[index]} city={this.state.ad_city[index]} state={this.state.ad_state[index]} imageurl={this.state.imageurls[index]} />
                    })}
                </div>
                <div className="learn-more">
                    <h6>Learn More</h6>
                </div>
            </div>
        );
    }
}

export default Recommendation;