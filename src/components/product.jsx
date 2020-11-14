import React from 'react';
import './product.css';
import {Link}  from 'react-router-dom';


class Product extends React.Component {
    render() {
        return (
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                <Link to={this.props.link}>
                    <div className="product" id={this.props.id}>
                        <div className="product-image">
                            <img src={this.props.imageurl} alt="" className="productImage" />
                        </div>
                        <div className="product-detail">
                            <h4>{this.props.price}</h4>
                            <p style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{this.props.title}</p>
                            <address>{this.props.city} , {this.props.state}</address>
                        </div>
                    </div>
                </Link>
            </div>
        );
    }
}

export default Product;