import React from "react";
import { Link } from "react-router-dom";

import DashboardLayout from '../../Shortener/header';
import './dashboard.css';
import { API_URL, USER_SESSION } from '../../../constant/constant'
import axios from "axios"


import "bootstrap";





export default class DashboardPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      series: [
        {
          name: "series-1",
          data: []
        }
      ],
      all_urls:0,
      total_click:0,
      total_click_month:0
    
    }

  
  }




  async componentDidMount() {

    const URL = API_URL + "/api/url/dashboard"
    const options = {
      headers: {
        token: USER_SESSION
      }
    }
    
    return axios.get(URL, options)
      .then((response) => {
        console.log(response)
        console.log(response.statusCode)
        if (response.status === 200) {
          if (response.data.status) {
            this.setState({all_urls:response.data.resultObj.totalcount})
            this.setState({total_click:response.data.resultObj.totalClicks})
            this.setState({total_click_month:response.data.resultObj.monthsCount})
            let X=[]
            let Y=[]
            for(let i=0;i<response.data.resultObj.dateWiseCount.length;i++){
                 X.push(response.data.resultObj.dateWiseCount[i]._id)
                 Y.push(response.data.resultObj.dateWiseCount[i].count)
            }
            
            
            console.log(X)
            this.setState(prevState=>{
              
             prevState.series[0].data=Y
            })
           
           
            console.log(this.state)

            this.forceUpdate()

          }
          else {
           
          }
        }

      }).catch(err => {
        
    

      })

  }


 
 
  render() {
    console.log(this.state)
    return (
      <DashboardLayout>
        <h2 className="text-center mt-2">DASHBOARD</h2>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 mt-5">
            <div className="dashboard_overview">
              <div className="card_overview ml-0 bg0_c lines_bg_c">
                <h2>All URLs</h2>
                <strong className="mt-1">{this.state.all_urls}</strong>
                <i className="fa fa-link pt-2">
                  </i>
              </div>
              <div className="card_overview bg1_c lines_bg_c">
                <h2>Total clicks</h2>
                <strong className="mt-1">{this.state.total_click}</strong>
                <i className="fa fa-mouse-pointer pt-2">
                </i>
              </div>
              <div className="card_overview bg2_c lines_bg_c">
                <h2>Links added this month</h2>
                <strong className="mt-1">{this.state.total_click_month}</strong>
                <i className="fa fa-signal pt-2">
                  </i></div>
             </div>
          </div>
        </div>
        </div>
        <div className="button-section">
          <Link to="/url">
             <button className="btn btn-danger my-2">Start URL Shortening</button>
          </Link>
        </div> 
      

      </DashboardLayout>
    )


  }

}
