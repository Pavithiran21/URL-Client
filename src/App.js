
import './App.css';
import {BrowserRouter, HashRouter , Route, Switch} from 'react-router-dom'
import { createBrowserHistory } from 'history';
import './index.css';
import Register from './Component/Register';
import Login from './Component/Login';
import Forgot from './Component/Forgot';
import Reset from './Component/Reset';

import DashboardPage from './Component/pages/Dashboard/dashboard'

import Activation from './Component/activate';
import { USER_SESSION } from './constant/constant';
import DashboardLayout from './Component/Shortener/header';
import Cookies from 'universal-cookie';
import URLPage from './Component/pages/URL/url';
import UserPage from './Component/pages/User/userPage';
const cookies = new Cookies();
var isLoading=true
function App() {
  
  if(cookies.get('user_token'))
  {
    console.log(USER_SESSION)
    const history = createBrowserHistory();
    // if(isLoading)
    // {
    //   history.push('/dashboard')
    //   isLoading=false
    // }
    
   
  
    return (
    
      <BrowserRouter history={history}>
        <div className="App">
          {/* <Navbar/> */}
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 p-0">
              
                <Switch>
                  <Route path="/dashboard">
                    <DashboardPage/>
                  </Route>
                  <Route exact path="/">
                   <DashboardPage/>
                 </Route>
                 <Route path="/url">
                   <URLPage/>
                 </Route>
                  <Route path="/user">
                   <UserPage/>
                  </Route>
                 
               
                </Switch>
              </div>
            </div>
           
           </div>
             
  
        </div>
  
      </BrowserRouter >
    );
  }
  else{
    return (
    
      <BrowserRouter >
        <div className="App">
          
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-2"></div>
              <div className="col-md-8 mt-5">
                <h2> <i className="fa fa-link pr-2 " ></i>URL SHORTENER</h2>
                
               
            
                
               <Switch>
                  <Route exact path="/" component= {Login}/>
                  <Route exact path="/login" component= {Login}/>
                  <Route exact path="/register" component= {Register}/>
                  <Route  path="/activate/:id" component= {Activation}/>
                  <Route exact path="/forgot" component= {Forgot}/> 
                  <Route path="/reset/:id" component= {Reset}/>
  
            
               
                </Switch>
                
              
              </div>
              
            </div>
             
          </div>
        </div>
  
      </BrowserRouter >
    );
  }

}

export default App;
