import React from 'react';
import firebase from './config/firebase';
import './adpage.css';
import Header from './components/header'


class AdPage extends React.Component {
    constructor() {
        super()
        this.state = {
            id: [],
            ad_title: [],
            ad_discription: [],
            ad_price: [],
            ad_city: [],
            ad_state: [],
            ad_type: [],
            ad_condition: [],
            ad_user_name: [],
            ad_user_number: [],
            ad_user_uid: [],
            imageurls: [],
            link: [],
            current_user_uid: undefined,
            current_user_name: undefined,
            msg_input: "none",
            chat_button: "block",
            message: "",
            input_value: ''
        }
    }

    componentDidMount() {
        firebase.database().ref('ads').on('child_added', (data) => {
            if (data.val().link === window.location.pathname) {
                this.state.id.push(data.val().key)
                this.state.ad_title.push(data.val().ad_title)
                this.state.ad_discription.push(data.val().ad_discription)
                this.state.ad_price.push(data.val().ad_price)
                this.state.ad_city.push(data.val().ad_city)
                this.state.ad_state.push(data.val().ad_state)
                this.state.ad_type.push(data.val().ad_type)
                this.state.ad_condition.push(data.val().ad_condition)
                this.state.ad_user_name.push(data.val().ad_user_name)
                this.state.ad_user_number.push(data.val().ad_user_phonenumber)
                this.state.ad_user_uid.push(data.val().ad_user_uid)
                this.state.imageurls.push(data.val().imageurls[0])
                this.state.link.push(data.val().link)
                this.setState({
                    id: this.state.id
                })
            } else {
                return false
            }

            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    this.setState({ current_user_uid: user.uid , current_user_name: user.displayName })
                }
            })
        })
    }

    send_msg = (e) => {

        let key = firebase.database().ref('messages').push().key
        let key1 = firebase.database().ref('messages').push().key + 2

        firebase.database().ref("messages").child(key).set({
            key: this.state.current_user_uid + this.state.ad_user_uid,
            message: this.state.message,
            sender: this.state.current_user_name,
            sender_uid: this.state.current_user_uid,
            ad_user_uid: this.state.ad_user_uid[0]
        })
        firebase.database().ref("messages").child(key1).set({
            key: this.state.ad_user_uid + this.state.current_user_uid,
            message: this.state.message,
            sender: this.state.current_user_name,
            sender_uid: this.state.current_user_uid,
            ad_user_uid: this.state.ad_user_uid[0]
        })

        firebase.database().ref(`${this.state.ad_user_uid}`).child(`${this.state.current_user_uid}`).set({
            person_name: this.state.current_user_name,
            person_uid: this.state.current_user_uid
        })

        firebase.database().ref(`${this.state.current_user_uid}`).child(`${this.state.ad_user_uid}`).set({
            person_name: this.state.ad_user_name[0],
            person_uid: this.state.ad_user_uid[0],
        })

        this.setState({msg_input: 'none' , chat_button: "block"})

        e.preventDefault()
    }

    render() {
        return (
            <>
                <Header />
                <div>
                    <div className="container-fluid my-4">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-8 col-lg-8 p-2">
                                    <div className="adimage">
                                        <img src={this.state.imageurls[0]} className="w-100 productimage" alt="" />
                                    </div>
                                    <div className="ad_discription p-3 my-3">
                                        <div className="disc-header p-2">
                                            <h4>Details</h4>
                                            <i className="mx-4">Condition: {"" + this.state.ad_condition}</i>
                                            <i className="mx-4">Type: {"" + this.state.ad_type}</i>
                                        </div>
                                        <h4 className="mt-4 mb-2">Discription</h4>
                                        <p className="my-2">{this.state.ad_discription}</p>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-4 p-2">
                                    <div className="about-ad p-2">
                                        <h2>{this.state.ad_price}</h2>
                                        <h6 className="mb-2">{this.state.ad_title}</h6>
                                        <p>{this.state.ad_city + " , " + this.state.ad_state}</p>
                                    </div>
                                    <div className="seller-detail my-3 p-4">
                                        <h5 className="my-2">Seller Details</h5>
                                        <h3 className="my-2">{this.state.ad_user_name}</h3>
                                        {this.state.ad_user_uid[0] === this.state.current_user_uid || this.state.current_user_uid === undefined ? <button className="my-2" id={"" + this.state.ad_user_uid} style={{ backgroundColor: "#355e63" }} disabled>Chat With Seller</button> : <button className="my-2" id={"" + this.state.ad_user_uid} style={{display: `${this.state.chat_button}`}} onClick={() => this.setState({msg_input: 'block' , chat_button: "none"})} >Chat With Seller</button>}
                                        <form style={{display: `${this.state.msg_input}`}} className="my-2">
                                            <input type="text" style={{width: "80%" , height: "45px" }} onChange={(e) => this.setState({message: e.target.value})} />
                                            <input type="submit" value="send" style={{width: "20%" , height: "45px" , backgroundColor: "#002F34" , color: "white"}} onClick={(e) => {this.send_msg(e)}} />
                                        </form>
                                        <p className="my-3">Phone Number: <a href={"tel:" + this.state.ad_user_number}>{this.state.ad_user_number}</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}


export default AdPage; 