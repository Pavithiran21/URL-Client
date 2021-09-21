import React from 'react';
import {Formik,Form} from 'formik';
import {API_URL} from '../constant/constant'
import axios from "axios"

export default class Reset extends React.Component{
    constructor(props)
    {
        super(props)
        this.state={
            response:"",
            password1:"",
            username:"",
            update:false,
            isLoading:true,
            error:false,
            password2:"",
            user_id:"",
            errorMessage:""
        };
    
    }
    myChangeHandler1=(event)=>{
        console.log(event.target)
        this.setState({password1:event.target.value})
     
        this.setState({errorMessage:""})
    }
    myChangeHandler2=(event)=>{
        console.log(event.target)
        this.setState({password2:event.target.value})
        this.setState({errorMessage:""})
   
    }
    submitHandler=(event)=>{
        event.preventDefault()
        console.log(this.state)
        if(this.state.password1!="" && this.state.password2!="")
        {
        if(this.state.password1===this.state.password2)
        {
        
        const URL=API_URL+'/api/auth/forget-password/'
        
        //const URL="http://localhost:9001/user/check-user/dinesh27397kumar@gmail.com"
        console.log(URL)
        var options={
            method:"GET",
            headers:{
                "content-type": "application/json",
                "accept": "application/json"
            }
            
        }
        let data={
            user_id:this.state.user_id,
            email:this.state.response.data.user_email,
            password:this.state.password1
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
                 this.render()
                 this.props.history.push('/')
              }
              else{
                this.setState({disable:false})
                this.setState({text:"Send Email"})
                this.setState({email:""})
                this.setState({update:false})
                this.setState({error:true})
                this.setState({errorMessage:response.data.message})
                this.render()
              }
            }
            else{

            }
        });
        }
       else{
        this.setState({errorMessage:"Password is incorrect"})
        this.setState({password1:""})
        this.setState({password2:""})
        }
       }
       else{
        this.setState({errorMessage:"Please fill the fields"})
       }
        
    }
    async componentDidMount(){
        console.log(this.props.match.params)
        this.setState({user_id:this.props.match.params.id})
        const URL=API_URL +"/api/auth/checkid/"+this.props.match.params.id
        return axios.get(URL)
        .then((response) =>{
            console.log(response)
            if(response.status==200){
              if(response.data.status){
                 this.setState({
                     response:response.data,
                     update:false,
                     isLoading:false,
                     error:false
                    })
                 
                
                
              }
              else{
                this.setState({
                    response:response.data,
                    update:false,
                    isLoading:false,
                    error:true
                   })

              }
            }
            else{

            }
        });
        
    }
    
  
   
    render(){
        // const URL=API_URL +"/checkid/"+window.location.pathname.split('/')[2]
        // const data=this.fetchAPI(URL,{method:"GET"})
     
         console.log(this.state)
        if(!this.state.error && !this.state.update)
        {
            console.log("Log 1")
              return (
           <div className="auth-wrapper">
            <div className="auth-inner">
               <h3> Reset Password </h3>
               <Formik>
                    {
                       (formik) => (
                            <Form onSubmit={this.submitHandler}>
                        
                                
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password"  className="form-control" onChange={this.myChangeHandler1} placeholder="Password" value={this.state.password1}/>
                                </div>
                                <div className="form-group">
                                    <label>Confirm Password</label>
                                    <input type="password"  className="form-control" onChange={this.myChangeHandler2} placeholder="Password" value={this.state.password2}/>
                                </div>
                               
                                {this.state.errorMessage && <div className="error pb-3"> {this.state.errorMessage} </div>}
                                <button className="btn btn-primary btn-block">Submit</button>
                           </Form>
                        )
                    }
               </Formik>
            </div>
        </div>
    )
        }
        else if(this.state.update)
        {
            console.log("Log 2")

            return (
                <div className="auth-wrapper">
                    <div className="auth-inner">
                       <p className="pt-3"><b>Password Successfully Reseted</b></p>

                       <p className="mt-1"><a href="/login"> Click here to login</a></p>

                    </div>
                </div>
            )
        }
        else{
            return (
                <div className="auth-wrapper">
                    <div className="auth-inner">
                       <p className="pt-3"><b>Invalid Link please try again later</b></p>
                      <p className="pt-3"> <a href="#/forgot">Click here</a> to resend an mail</p> 
                    </div>
                </div>
            )
        }
       
    }
    fetchAPI(URL,config){
       
    }
}