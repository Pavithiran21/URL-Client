import React from 'react';
import {Formik,Form} from 'formik';

import { Link } from 'react-router-dom';
import {API_URL} from '../constant/constant'
import axios from "axios"
import Cookies from 'universal-cookie';

const cookies = new Cookies();

// export default Login

export default class Login extends React.Component{
    constructor(props)
    {
        super(props)
        this.state={
            email:'',
            password:'',
            text:'Login',
            emailErrormessage:'',
            passwordErrorMessage:""
        };
    
    }
   
    emailHandler=(event)=>{
        
       
        this.setState({email:event.target.value})
        
        this.setState({disable:false})
        this.setState({emailErrormessage:""})
   
    }
    passwordHandler=async (event)=>{
        
        
       await this.setState({password:event.target.value})
       
        this.setState({disable:false})
        this.setState({passwordErrorMessage:""})
        console.log(this.state)
    }
  

    submitHandler=(event)=>{
        event.preventDefault()
        if(this.state.email==""){
            this.setState({emailErrormessage:"Please enter the email"})

        }else if(this.state.password==""){
            this.setState({passwordErrorMessage:"Please enter the password"})
        }else{
        this.setState({disable:true})
        this.setState({text:"Loading"})
        
        const URL=API_URL+'/api/auth/login'
       
     
        console.log(this.state)
        let data={
            email:this.state.email,
            password:this.state.password
        }
        
          
        


        return axios.post(URL,data)
        .then((response) =>{
            console.log(response)
            if(response.status==200){
                if(response.data.status){
                     
                   
                    this.setState({status:response.data.status})
                    this.setState({message:response.data.message})
                    this.setState({update:true})
                    this.setState({error:false})
                    cookies.set('user_token', response.data.user_token);
                    cookies.set('user_details', response.data.data);
                    
                    // <Redirect to="/home"></Redirect>
                    
                    this.props.history.push('/dashboard')
                    window.location.reload(false);
                     
                 
                    
                 }
                 else{
                    this.setState({update:false})
                    this.setState({disable:false})
                    this.setState({text:"Login"})
                    this.setState({passwordErrorMessage:response.data.message})
                 }

            }
            
            
        })
        
    }

    }


   
    render(){
        if(!this.state.status)
        {
            return (
                <div className="auth-wrapper">
                    <div className="auth-inner">
                       <h3>Login</h3>
                       <Formik>
                            {
                               (formik) => (
                                    <Form onSubmit={this.submitHandler}>
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input type="email"  className="form-control" placeholder="Email" value={this.state.email} onChange={this.emailHandler}/>
                                            {this.state.emailErrormessage && <div className="error"> {this.state.emailErrormessage} </div>}
                                        </div>
                                        <div className="form-group">
                                          <label>Password</label>
                                          <input type="password"  className="form-control" placeholder="Password" value={this.state.password} onChange={this.passwordHandler}/>
                                          {this.state.passwordErrorMessage && <div className="error"> {this.state.passwordErrorMessage} </div>}
                                        </div>
                                        
                                        <button className="btn btn-primary btn-block">Sign in</button>
                                        <div className="row mt-3">
                                            <div className="col-md-6">
                                            <span className="loginpage d-block">
                            
                                                <Link to={'/register'}>Click to Register</Link> 
                                             </span>
                                                </div>
                                            <div className="col-md-6 col-6">
                                            <span className="forgot-password text-right d-block">
                                            <Link to={'/forgot'}>Forgot Password?</Link>
                                              </span>
                                                </div> 
                                                </div>
                                        
                                   </Form>
                                )
                            }
                       </Formik>
                    </div>
                </div>
            )
        }
        else{
            return (
                <div className="auth-wrapper">
                    <div className="auth-inner">
                       <h3> Sign Up</h3>
                       <p className="pt-3 text-center">User Registered Successfully</p>
                    </div>
                </div>
            )
        }
       
    }
}

