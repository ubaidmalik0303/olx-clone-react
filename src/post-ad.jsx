import React from 'react';
import './post-ad.css';
import OlxLogo from './components/images/Logotyp_OLX_.png';
import firebase from './config/firebase';
import { Link, Redirect } from 'react-router-dom';


class PostAd extends React.Component {

    constructor() {
        super()
        this.state = {
            categories: ["Mobile", "Vehicle", "Property For Sale", "Property For Rent", "Electronics And Home Applience", "Bikes"],
            select_cat: "",
            display_cat: 'block',
            display_form: 'none',
            ad_condition: "",
            ad_type: "",
            ad_title: "",
            ad_discription: "",
            ad_price: "",
            ad_state: "",
            ad_city: "",
            ad_adress: "",
            ad_user_phonenumber: "",
            ad_user_name: undefined,
            ad_user_uid: undefined,
            imageuploaded1: false,
            imageuploaded2: false,
            imageuploaded3: false,
            imageuploaded4: false,
            uid: undefined,
            link: "",
            isSet: true
        }
    }


    imagesUpload = () => {

        setTimeout(() => {

            let key = firebase.database().ref("ads").push().key;

            var storageRef1 = firebase.storage().ref(`${key}/` + this.state.ad_image_name1);
            var uploadTask1 = storageRef1.put(this.state.ad_image1);

            uploadTask1.on('state_changed', (snapshot) => {
                console.log(snapshot)
            }, (error) => {
                console.log(error)
            }, () => {
                uploadTask1.snapshot.ref.getDownloadURL().then((downloadurl) => {
                    this.setState({ imageurl1: downloadurl, imageuploaded1: true })
                })
            })

            var storageRef2 = firebase.storage().ref(`${key}/` + this.state.ad_image_name2);
            var uploadTask2 = storageRef2.put(this.state.ad_image2);

            uploadTask2.on('state_changed', (snapshot) => {
                console.log(snapshot)
            }, (error) => {
                console.log(error)
            }, () => {
                uploadTask2.snapshot.ref.getDownloadURL().then((downloadurl) => {
                    this.setState({ imageurl2: downloadurl, imageuploaded2: true })
                })
            })

            var storageRef3 = firebase.storage().ref(`${key}/` + this.state.ad_image_name3);
            var uploadTask3 = storageRef3.put(this.state.ad_image3);

            uploadTask3.on('state_changed', (snapshot) => {
                console.log(snapshot)
            }, (error) => {
                console.log(error)
            }, () => {
                uploadTask3.snapshot.ref.getDownloadURL().then((downloadurl) => {
                    this.setState({ imageurl3: downloadurl, imageuploaded3: true })
                })
            })

            var storageRef4 = firebase.storage().ref(`${key}/` + this.state.ad_image_name4);
            var uploadTask4 = storageRef4.put(this.state.ad_image4);

            uploadTask4.on('state_changed', (snapshot) => {
                console.log(snapshot)
            }, (error) => {
                console.log(error)
            }, () => {
                uploadTask4.snapshot.ref.getDownloadURL().then((downloadurl) => {
                    this.setState({ imageurl4: downloadurl, imageuploaded4: true })
                })
            })

        }, 3000);

    }


    send_ad_data = () => {

        if (this.state.select_cat === "Property For Sale" || this.state.select_cat === "Property For Rent") {
            if (this.state.ad_type === "" || this.state.ad_title === "" || this.state.ad_discription === "" || this.state.ad_price === "" || this.state.ad_state === "" || this.state.ad_city === "" || this.state.ad_adress === "" || this.state.ad_user_name === "" || this.state.ad_user_name === null || this.state.ad_user_phonenumber === "" || this.state.imageuploaded1 === "" || this.state.imageuploaded2 === "" || this.state.imageuploaded3 === "" || this.state.imageuploaded4 === "") {
                alert("Please Fill All Fields")
            } else {
                this.state.link = this.state.link.replace(/ /g, "-")

                let key = firebase.database().ref("ads").push().key;

                firebase.database().ref("ads").child(key).set({
                    key: key,
                    link: `/product/${key}/${this.state.link}`,
                    ad_type: this.state.ad_type,
                    ad_title: this.state.ad_title,
                    ad_discription: this.state.ad_discription,
                    ad_price: this.state.ad_price,
                    ad_state: this.state.ad_state,
                    ad_city: this.state.ad_city,
                    ad_adress: this.state.ad_adress,
                    ad_user_uid: this.state.ad_user_uid,
                    ad_user_name: this.state.ad_user_name,
                    ad_user_phonenumber: this.state.ad_user_phonenumber,
                    imageurls: [this.state.imageurl1, this.state.imageurl2, this.state.imageurl3, this.state.imageurl4]
                });

                firebase.auth().currentUser.updateProfile({
                    displayName: this.state.ad_user_name,
                })
            }
        } else {
            if (this.state.ad_type === "" || this.state.ad_condition === "" || this.state.ad_title === "" || this.state.ad_discription === "" || this.state.ad_price === "" || this.state.ad_state === "" || this.state.ad_city === "" || this.state.ad_adress === "" || this.state.ad_user_name === "" || this.state.ad_user_name === null || this.state.ad_user_phonenumber === "" || this.state.imageuploaded1 === "" || this.state.imageuploaded2 === "" || this.state.imageuploaded3 === "" || this.state.imageuploaded4 === "") {
                alert("Please Fill All Fields")
            } else {
                this.state.link = this.state.link.replace(/ /g, "-")

                let key = firebase.database().ref("ads").push().key;

                firebase.database().ref("ads").child(key).set({
                    key: key,
                    link: `/product/${key}/${this.state.link}`,
                    ad_condition: this.state.ad_condition,
                    ad_type: this.state.ad_type,
                    ad_title: this.state.ad_title,
                    ad_discription: this.state.ad_discription,
                    ad_price: this.state.ad_price,
                    ad_state: this.state.ad_state,
                    ad_city: this.state.ad_city,
                    ad_adress: this.state.ad_adress,
                    ad_user_uid: this.state.ad_user_uid,
                    ad_user_name: this.state.ad_user_name,
                    ad_user_phonenumber: this.state.ad_user_phonenumber,
                    imageurls: [this.state.imageurl1, this.state.imageurl2, this.state.imageurl3, this.state.imageurl4]
                });

                firebase.auth().currentUser.updateProfile({
                    displayName: this.state.ad_user_name,
                })
            }
        }

    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                this.setState({ uid: undefined, ad_user_uid: undefined, ad_user_name: undefined, ad_user_phonenumber: undefined })
            } else {
                this.setState({ uid: user.uid, ad_user_uid: user.uid, ad_user_name: user.displayName })
                if (user.displayName === undefined || user.displayName === null) {
                    this.setState({ isSet: false })
                } else {
                    this.setState({ isSet: true })
                }
            }
        })
    }


    render() {
        return (
            <>
                {
                    this.state.uid !== undefined ? <div className="main">
                        <div className="topbar">
                            <Link to="/"><img src={OlxLogo} alt="" /></Link>
                        </div>
                        <div className="select-category" style={{ display: `${this.state.display_cat}` }}>
                            <h1 className="heading">Post Your Ad</h1>
                            <div className="category-box">
                                <h2 className="select-head">Select Category</h2>
                                <div className="main-boxes-box">
                                    <div className="left-boxes">
                                        {this.state.categories.map((cat, index) => {
                                            return <div key={index} className="box" onClick={(e) => this.setState({ select_cat: e.target.innerText, display_cat: "none", display_form: "block" })}>{cat}</div>
                                        })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="ad-form" style={{ display: `${this.state.display_form}`, margin: "10px 50px", border: "1px solid grey", padding: "10px" }}>
                            <h6 style={{ float: "right", cursor: "pointer" }} onClick={() => this.setState({ display_cat: "block", display_form: "none" })}>Change Category</h6>
                            <h2 style={{ margin: "10px" }}>INCLUDE SOME DETAILS</h2>
                            {this.state.select_cat === "Property For Sale" || this.state.select_cat === "Property For Rent" ? false : <div className="form-section">
                                <label htmlFor="">Condition*</label><br />
                    New: <input type="radio" value="New" name="condition" style={{ marginRight: "5px" }} onClick={(e) => this.setState({ ad_condition: e.target.value })} />
                    Used: <input type="radio" value="Used" name="condition" onClick={(e) => this.setState({ ad_condition: e.target.value })} />
                            </div>}

                            {this.state.select_cat === "Vehicle" ? <div className="form-section">
                                <label htmlFor="">Type*</label><br />
                                <span>Cars:</span> <input value="Cars" type="radio" name="type" style={{ marginRight: "10px" }} onClick={(e) => this.setState({ ad_type: e.target.value })} />
                                <span>Vans:</span> <input value="Vans" type="radio" name="type" style={{ marginRight: "10px" }} onClick={(e) => this.setState({ ad_type: e.target.value })} />
                                <span>Buses:</span> <input value="Buses" type="radio" name="type" style={{ marginRight: "10px" }} onClick={(e) => this.setState({ ad_type: e.target.value })} />
                                <span>Truck:</span> <input value="Truck" type="radio" name="type" style={{ marginRight: "10px" }} onClick={(e) => this.setState({ ad_type: e.target.value })} />
                                <span>Other:</span> <input value="Other" type="radio" name="type" style={{ marginRight: "10px" }} onClick={(e) => this.setState({ ad_type: e.target.value })} />
                            </div> : this.state.select_cat === "Mobile" ? <div className="form-section">
                                <label htmlFor="">Type*</label><br />
                                <span>Samsung:</span> <input value="Samsung" type="radio" name="type" style={{ marginRight: "10px" }} onClick={(e) => this.setState({ ad_type: e.target.value })} />
                                <span>Oppo:</span> <input value="Oppo" type="radio" name="type" style={{ marginRight: "10px" }} onClick={(e) => this.setState({ ad_type: e.target.value })} />
                                <span>Vivo:</span> <input value="Vivo" type="radio" name="type" style={{ marginRight: "10px" }} onClick={(e) => this.setState({ ad_type: e.target.value })} />
                                <span>Apple:</span> <input value="Apple" type="radio" name="type" style={{ marginRight: "10px" }} onClick={(e) => this.setState({ ad_type: e.target.value })} />
                                <span>Other:</span> <input value="Other" type="radio" name="type" style={{ marginRight: "10px" }} onClick={(e) => this.setState({ ad_type: e.target.value })} />
                            </div> : this.state.select_cat === "Property For Sale" ? <div className="form-section">
                                <label htmlFor="">Type*</label><br />
                                <span>House:</span> <input value="House" type="radio" name="type" style={{ marginRight: "10px" }} onClick={(e) => this.setState({ ad_type: e.target.value })} />
                                <span>Villa:</span> <input value="Villa" type="radio" name="type" style={{ marginRight: "10px" }} onClick={(e) => this.setState({ ad_type: e.target.value })} />
                                <span>Building:</span> <input value="Building" type="radio" name="type" style={{ marginRight: "10px" }} onClick={(e) => this.setState({ ad_type: e.target.value })} />
                                <span>Plot:</span> <input value="Plot" type="radio" name="type" style={{ marginRight: "10px" }} onClick={(e) => this.setState({ ad_type: e.target.value })} />
                                <span>Commercial:</span> <input value="Commercial" type="radio" name="type" style={{ marginRight: "10px" }} onClick={(e) => this.setState({ ad_type: e.target.value })} />
                            </div> : this.state.select_cat === "Property For Rent" ? <div className="form-section">
                                <label htmlFor="">Type*</label><br />
                                <span>House:</span> <input value="House" type="radio" name="type" style={{ marginRight: "10px" }} onClick={(e) => this.setState({ ad_type: e.target.value })} />
                                <span>Villa:</span> <input value="Villa" type="radio" name="type" style={{ marginRight: "10px" }} onClick={(e) => this.setState({ ad_type: e.target.value })} />
                                <span>Building:</span> <input value="Building" type="radio" name="type" style={{ marginRight: "10px" }} onClick={(e) => this.setState({ ad_type: e.target.value })} />
                                <span>Plot:</span> <input value="Plot" type="radio" name="type" style={{ marginRight: "10px" }} onClick={(e) => this.setState({ ad_type: e.target.value })} />
                                <span>Commercial:</span> <input value="Commercial" type="radio" name="type" style={{ marginRight: "10px" }} onClick={(e) => this.setState({ ad_type: e.target.value })} />
                            </div> : this.state.select_cat === "Electronics And Home Applience" ? <div className="form-section">
                                <label htmlFor="">Type*</label><br />
                                <span>Fridge:</span> <input value="Fridge" type="radio" name="type" style={{ marginRight: "10px" }} onClick={(e) => this.setState({ ad_type: e.target.value })} />
                                <span>Kitchen:</span> <input value="Kitchen" type="radio" name="type" style={{ marginRight: "10px" }} onClick={(e) => this.setState({ ad_type: e.target.value })} />
                                <span>Wasing Machine:</span> <input value="Wasing Machine" type="radio" name="type" style={{ marginRight: "10px" }} onClick={(e) => this.setState({ ad_type: e.target.value })} />
                                <span>Computers And Printers:</span> <input value="Computers And Printers" type="radio" name="type" style={{ marginRight: "10px" }} onClick={(e) => this.setState({ ad_type: e.target.value })} />
                                <span>Other:</span> <input value="Other" type="radio" name="type" style={{ marginRight: "10px" }} onClick={(e) => this.setState({ ad_type: e.target.value })} />
                            </div> : this.state.select_cat === "Electronics And Home Applience" ? <div className="form-section">
                                <label htmlFor="">Type*</label><br />
                                <span>Electric:</span> <input value="Electric" type="radio" name="type" style={{ marginRight: "10px" }} onClick={(e) => this.setState({ ad_type: e.target.value })} />
                                <span>Fuel:</span> <input value="Fuel" type="radio" name="type" style={{ marginRight: "10px" }} onClick={(e) => this.setState({ ad_type: e.target.value })} />
                                <span>Other:</span> <input value="Other" type="radio" name="type" style={{ marginRight: "10px" }} onClick={(e) => this.setState({ ad_type: e.target.value })} />
                            </div> : false
                            }

                            <div className="form-section">
                                <label htmlFor="">Title*</label><br />
                                <input placeholder="Title" type="text" style={{ height: "50px", width: "50%", padding: "5px", fontSize: "18px", marginBottom: "10px" }} onChange={(e) => this.setState({ ad_title: e.target.value, link: e.target.value })} /><br />
                                <label htmlFor="">Discription*</label><br />
                                <textarea cols="50" rows="8" style={{ width: "50%", padding: "5px", fontSize: "16px", marginBottom: "10px" }} onChange={(e) => this.setState({ ad_discription: e.target.value })}></textarea>
                            </div>

                            <div className="form-section">
                                <h2>SET A PRICE</h2>
                                <label htmlFor="">Price*</label><br />
                                <input type="text" className="price" style={{ height: "50px", width: "50%", padding: "5px", fontSize: "18px", marginBottom: "10px" }} onChange={(e) => this.setState({ ad_price: "Rs " + e.target.value })} />
                            </div>

                            <div className="form-section2">
                                <h2 style={{ marginBottom: "50px" }}>UPLOAD ATLEAST 4 PHOTOS</h2>
                                <input className="fileupload" type="file" accept="image/*" onChange={(e) => this.setState({ ad_image1: e.target.files[0], ad_image_name1: e.target.files[0].name })} />
                                <input className="fileupload" type="file" accept="image/*" onChange={(e) => this.setState({ ad_image2: e.target.files[0], ad_image_name2: e.target.files[0].name })} />
                                <input className="fileupload" type="file" accept="image/*" onChange={(e) => this.setState({ ad_image3: e.target.files[0], ad_image_name3: e.target.files[0].name })} />
                                <input className="fileupload" type="file" accept="image/*" onChange={(e) => { this.setState({ ad_image4: e.target.files[0], ad_image_name4: e.target.files[0].name }); this.imagesUpload() }} />
                            </div>

                            <div className="form-section">
                                <h2>Confrm Your Location</h2>
                                <label htmlFor="">State*</label><br />
                                <input type="text" placeholder="State" style={{ height: "50px", width: "50%", padding: "5px", fontSize: "18px", marginBottom: "10px" }} onChange={(e) => this.setState({ ad_state: e.target.value })} /><br />
                                <label htmlFor="">City*</label><br />
                                <input type="text" placeholder="City" style={{ height: "50px", width: "50%", padding: "5px", fontSize: "18px", marginBottom: "10px" }} onChange={(e) => this.setState({ ad_city: e.target.value })} /><br />
                                <label htmlFor="">Adress*</label><br />
                                <input type="text" placeholder="Adress" style={{ height: "50px", width: "50%", padding: "5px", fontSize: "18px", marginBottom: "10px" }} onChange={(e) => this.setState({ ad_adress: e.target.value })} /><br />
                            </div>

                            {this.state.isSet === false ? <div className="form-section">
                                <h2>Review Your Detail</h2>
                                <label htmlFor="">Name*</label><br />
                                <input type="text" placeholder="Full Name" style={{ height: "50px", width: "50%", padding: "5px", fontSize: "18px", marginBottom: "10px" }} onChange={(e) => this.setState({ ad_user_name: e.target.value })} /><br />
                                <label htmlFor="">Phone Number*</label><br />
                                <input type="text" placeholder="Phone Number" style={{ height: "50px", width: "50%", padding: "5px", fontSize: "18px", marginBottom: "10px" }} onChange={(e) => this.setState({ ad_user_phonenumber: e.target.value })} /><br />
                            </div> : <div className="form-section">
                                    <h2>Review Your Detail</h2>
                                    <label htmlFor="">Phone Number*</label><br />
                                    <input type="text" placeholder="Phone Number" style={{ height: "50px", width: "50%", padding: "5px", fontSize: "18px", marginBottom: "10px" }} onChange={(e) => this.setState({ ad_user_phonenumber: e.target.value })} /><br />
                                </div>}

                            <div className="form-section3">
                                <button className="post-btn" onClick={() => this.send_ad_data()}>Post</button>
                            </div>

                        </div>

                        <div className="footer p-2" style={{ backgroundColor: "#002F34" }}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-6 text-white"><p>Sitemap</p></div>
                                    <div className="col-lg-6 text-white "><p><b>Free Classifieds in Pakistan.</b> © 2006-2020 OLX</p></div>
                                </div>
                            </div>
                        </div>
                    </div> : false
                }
            </>
        );
    }
}

export default PostAd;