import React from 'react';
import './chat.css';
import Header from './components/header';
import firebase from './config/firebase';


class Chat extends React.Component {

    constructor() {
        super()
        this.state = {
            sender_person: [],
            sender_person_uid: [],
            current_user_name: [],
            current_user_uid: undefined,
            clicked_chat: undefined,
            messages: [],
            message: "",
            input_remove: true,
        }
    }




    componentDidMount() {

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ current_user_uid: user.uid, current_user_name: user.displayName })
                firebase.database().ref(this.state.current_user_uid).on("child_added", (data) => {
                    if (data) {
                        this.state.sender_person.push(data.val().person_name)
                        this.state.sender_person_uid.push(data.val().person_uid)
                        this.setState({ sender_person: this.state.sender_person })
                    }
                })
            }
        })

    }

    openChat = (e) => {
        this.setState({ clicked_chat: this.state.current_user_uid + e.target.id })
        this.state.messages = [];
        firebase.database().ref('messages').on("child_added", (data) => {
            if (data) {
                if (data.val().key === this.state.clicked_chat) {
                    this.state.messages.push({
                        message: data.val().message,
                        sender: data.val().sender,
                        sender_uid: data.val().sender_uid
                    })
                    this.setState({ messages: this.state.messages, input_remove: false })
                }
            }
        })
        document.getElementById('message-head').innerText = e.target.innerText
    }

    send_msg = (e) => {

        let key = firebase.database().ref('messages').push().key
        let key1 = firebase.database().ref('messages').push().key + 2

        firebase.database().ref("messages").child(key).set({
            key: this.state.current_user_uid + this.state.sender_person_uid[0],
            message: this.state.message,
            sender: this.state.current_user_name,
            sender_uid: this.state.current_user_uid,
            ad_user_uid: this.state.sender_person_uid[0]
        })
        firebase.database().ref("messages").child(key1).set({
            key: this.state.sender_person_uid[0] + this.state.current_user_uid,
            message: this.state.message,
            sender: this.state.current_user_name,
            sender_uid: this.state.current_user_uid,
            ad_user_uid: this.state.sender_person_uid[0]
        })
        e.preventDefault()
    }

    render() {
        return (
            <>
                <Header />
                <div className="chat-main">
                    <div className="leftside">
                        {this.state.sender_person.map((sender_person, index) => {
                            return <div className="chats" key={index} id={"" + this.state.sender_person_uid[index]} onClick={(e) => { this.openChat(e)}} >
                                {sender_person}
                            </div>
                        })}
                    </div>
                    <div className="rightside p-4">
                        <div className="message-head" id="message-head">{}</div>
                        <div className="message-body">
                            {this.state.messages.map((data, index) => {
                                if (data.sender_uid !== this.state.current_user_uid) {
                                    return <div className="sender_message" key={index}>
                                        <div className="sender_message-text">{data.sender + ": " + data.message}</div>
                                    </div>
                                } else {
                                    return <div className="my_message" key={index}>
                                        <div className="my_message-text">{data.sender + ": " + data.message}</div>
                                    </div>
                                }
                            })}
                        </div>
                        {this.state.input_remove === true ? true : <form className="my-2">
                            <input type="text" style={{ width: "80%", height: "45px" }} onChange={(e) => this.setState({ message: e.target.value })} />
                            <input type="submit" value="send" style={{ width: "20%", height: "45px", backgroundColor: "#002F34", color: "white" }} onClick={(e) => { this.send_msg(e) }} />
                        </form>}
                    </div>
                </div>
            </>
        )
    }
}

export default Chat;
