import React from 'react';
import './ads.css';

class Ads extends React.Component{
    render(){
        return(
            <div className="ad-image">
                <img src={this.props.url} alt=""/>
            </div>
        );
    }
}

export default Ads;