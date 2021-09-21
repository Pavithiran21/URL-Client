import React from 'react';
import {Formik,Form} from 'formik';
import {API_URL} from '../constant/constant'
import axios from "axios"


export default class Forget extends React.Component{
    constructor(props)
    {
        super(props)
        this.state={
            email:'',
            text:"Send email",
            errorMessage:"",
            status:false,
            message:""
        };
    
    }
    myChangeHandler=(event)=>{
        console.log(event.target)
        this.setState({email:event.target.value})
        this.setState({disable:false})
        this.setState({errorMessage:""})
   
    }
    submitHandler=(event)=>{
        event.preventDefault()
        if(this.state.email!="")
        {

        
        this.setState({disable:true})
        this.setState({text:"Loading"})
        
        const URL=API_URL+'/api/auth/reset-password/'+this.state.email
        //const URL="http://localhost:9001/user/check-user/dinesh27397kumar@gmail.com"
        console.log(URL)
        var options={
            method:"GET",
            headers:{
                "content-type": "application/json",
                "accept": "application/json"
            }
        }

        return axios.get(URL)
        .then((response) =>{
            console.log(response)
            if(response.status==200){
              if(response.data.status){
                 this.setState({status:response.data.status})
                 this.setState({message:response.data.message})
                this.render()
              }
              else{
                this.setState({disable:false})
                this.setState({text:"Send Email"})
                this.setState({email:""})
                this.setState({errorMessage:response.data.message})
              }
            }
            else{

            }
        });
    }
     else{
        this.setState({errorMessage:"Please Fill email field"})
    }
        
    }

    
  
   
    render(){
        if(!this.state.status)
        {
            return (
                <div className="auth-wrapper">
                    <div className="auth-inner">
                       <h3> Forgot Password </h3>
                       <Formik>
                            {
                               (formik) => (
                                    <Form onSubmit={this.submitHandler}>
                                
                                        <div className="form-group pb-3">
                                            <label>Email</label>
                                            <input type="email"  className="form-control" value={this.state.email} onChange={this.myChangeHandler} placeholder="Email"/>
                                            {this.state.errorMessage && <div className="error"> {this.state.errorMessage} </div>}
                                        </div>                 
                                        
                                        <button disabled={this.state.disable} className="btn btn-primary btn-block">{this.state.text}</button>

    
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
                       <h3> Forgot Password </h3>
                       <p className="pt-3">An Email has sent to <span className="font-weight-800">{this.state.message}</span></p>
                      <p>Not yet recieved Please <a href="#/forgot">Click here</a> to send an mail</p> 
                    </div>
                </div>
            )
        }
       
    }
}