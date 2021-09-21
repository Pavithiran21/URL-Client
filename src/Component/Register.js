import React from 'react';
import { Formik, Form } from 'formik';
import { API_URL } from '../constant/constant'
import axios from "axios"

export default class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName:"",
            email: '',
            password: '',
            
            text: 'Register',
            errorMessage: "",
            firsterrormsg: "",
            emailerrmsg: "",
            passworderrmsg: "",
            lasterrormsg: "",

            status: false

        };

    }
    userHandler = (event) => {

        this.setState({ firstName: event.target.value })
        this.setState({ disable: false })
        this.setState({ firsterrormsg: "" })
    }
    LastHandler = (event) => {
        this.setState({lastName :event.target.value})
        this.setState({disable:false})
        this.setState({lasterrormsg:""})
    }
    emailHandler = (event) => {


        this.setState({ email: event.target.value })

        this.setState({ disable: false })
        this.setState({ emailerrmsg: "" })

    }
    passwordHandler = async (event) => {


        await this.setState({ password: event.target.value })

        this.setState({ disable: false })
        this.setState({ passworderrmsg: "" })
        console.log(this.state)
    }
    
    submitHandler = (event) => {
        event.preventDefault()
        console.log(this.state.password === this.state.confirmpassword)
        if (this.state.firstName == "") {
            this.setState({ firsterrormsg: "Please enter the first name" })

        }
        else if (this.state.lastName=="") {
            this.setState({ lasterrormsg: "Please enter  Last name" })

        } else if (this.state.email == "") {
            this.setState({ emailerrmsg: "Please enter the email" })

        } else if (this.state.password == "") {
            this.setState({ passworderrmsg: "Please enter the password" })

        } else {
            this.setState({ disable: true })
            this.setState({ text: "Loading" })

            const URL = API_URL + '/api/auth/register'


            console.log(this.state)
            let data = {
                firstname: this.state.firstName,
                lastname:this.state.lastName,
                email: this.state.email,
                password: this.state.password
            }

            return axios.post(URL, data)
                .then((response) => {
                    console.log(response)
                    if (response.status == 200) {
                        if (response.data.status) {
                            this.setState({ status: response.data.status })
                            this.setState({ message: response.data.message })
                            this.setState({ update: true })
                            this.setState({ error: false })
                            // this.props.history.push('/')
                        }
                        else {
                            this.setState({ update: false })
                            this.setState({ disable: false })
                            this.setState({ text: "Register" })
                            this.setState({ emailerrmsg: "This Email is already registered" })
                        }

                    }

                })

        }

    }




    render() {
        if (!this.state.status) {
            return (
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <h3> Sign Up </h3>
                        <Formik>
                            {
                                (formik) => (
                                    <Form onSubmit={this.submitHandler} className="box">

                                        <div className="form-group inputBox">
                                            <label>First Name</label><span className="error mt-1"> * </span>
                                            <input type="text" className="form-control input" value={this.state.firstName} onChange={this.userHandler} placeholder="User Name" />
                                            {this.state.firsterrormsg && <div className="error"> {this.state.firsterrormsg} </div>}
                                        </div>
                                        <div className="form-group inputBox">
                                            <label>Last Name</label><span className="error mt-1"> * </span>
                                            <input type="text" className="form-control input" value={this.state.lastName} onChange={(e) => { this.LastHandler(e) }} placeholder="Last Name" />
                                            {this.state.lasterrormsg && <div className="error"> {this.state.lasterrormsg} </div>}
                                        </div>
                                        <div className="form-group inputBox">
                                            <label>Email</label><span className="error mt-1"> * </span>
                                            <input type="email" className="form-control input" value={this.state.email} onChange={this.emailHandler} placeholder="Email" />
                                            {this.state.emailerrmsg && <div className="error"> {this.state.emailerrmsg} </div>}
                                        </div>
                                        <div className="form-group inputBox">
                                            <label>Password</label><span className="error mt-1"> * </span>
                                            <input type="password" className="form-control input" value={this.state.password} onChange={(e) => { this.passwordHandler(e) }} placeholder="Password" />
                                            {this.state.passworderrmsg && <div className="error"> {this.state.passworderrmsg} </div>}
                                        </div>
                                       
                                        <button disabled={this.state.disable} className="btn btn-primary btn-block mt-3">{this.state.text}</button>

                                        <p className="mt-2 pl-3">Already Registered <a href="/">Click here to Login </a></p>

                                    </Form>
                                )
                            }
                        </Formik>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        
                        <p className="pt-3 text-center">User Registered Successfully.Please activate your account through the email</p>
                    </div>
                </div>
            )
        }

    }
}