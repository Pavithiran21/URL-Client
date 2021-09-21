import React from 'react';
import {Formik,Form} from 'formik';
import {API_URL} from '../constant/constant'
import axios from "axios"

export default class Activation extends React.Component{
    constructor(props)
    {
        super(props)
        this.state={
            response:"",
            isExpiry:false,
            isLoading:true,
            error:false,
            errorMessage:"",
            id:this.props.match.params.id,
            state:false
        };
    
    }
   
    submitHandler=(event)=>{
        event.preventDefault()
        console.log(this.state)
        
        
        
        const URL=API_URL+'/api/auth/activate/account'
        
        //const URL="http://localhost:9001/user/check-user/dinesh27397kumar@gmail.com"
        console.log(URL)
       
        let data={
             id:this.state.id
        }
        return axios.post(URL,data)
        .then((response) =>{
            console.log(response)
            if(response.status===200){
              if(response.data.status){
                 this.setState({status:response.data.status})
                 this.setState({message:response.data.message})
                 this.setState({update:true})
                 this.setState({isExpiry:true})
                 this.setState({error:false})
                 this.props.history.push('/login')
                 this.render()
              }
              else{
                this.setState({status:response.data.status})
                this.setState({errorMessage:response.data.message})
                this.render()
              }
            }
            else{

            }
        });
        
      
      
        
    }
    async componentDidMount(){
      
        this.setState({id:this.props.match.params.id})
        const URL=API_URL +"/api/auth/activation/"+this.props.match.params.id
        return axios.get(URL)
        .then((response) =>{
            console.log(response)
            if(response.status===200){
              if(response.data.status){
                 this.setState({
                     response:response.data,
                     update:false,
                     isLoading:false,
                     error:false
                    })
                    console.log(new Date().getTime()>new Date(response.data.activeExpires).getTime())
                    if(new Date().getTime()<new Date(response.data.activeExpires).getTime()){
                        this.setState({isExpiry:true})
                    }
                    else{
                        this.setState({isExpiry:false})
                    }
              }
              else{
                this.setState({
                    response:response.data,
                    update:false,
                    isLoading:false,
                    error:true
                   })
                   this.setState({isExpiry:true})
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
        if(!this.state.status&&!this.state.isExpiry)
        {
              return (
           <div className="auth-wrapper p-5">
            <div className="auth-inner">
               <h3> Click here to Activate </h3>
               <Formik>
                    {
                       (formik) => (
                            <Form onSubmit={this.submitHandler}>                             
                                <button className="btn btn-primary btn-block">Activate</button>
                           </Form>
                        )
                    }
               </Formik>
            </div>
        </div>
    )
        }
        else if(this.state.status && this.state.isExpiry===true)
        {
            return (
                <div className="auth-wrapper">
                    <div className="auth-inner">
                       <p className="pt-3"><b>Your Account has been activated Successfully </b></p>
                    </div>
                </div>
            )
        }
        else{
            return (
                <div className="auth-wrapper">
                    <div className="auth-inner">
                       <p className="pt-3"><b>Invalid Link please try again later</b></p>
                    </div>
                </div>
            )
        }
       
    }
   
}