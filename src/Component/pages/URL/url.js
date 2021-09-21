import React from 'react';
import DataTable from 'react-data-table-component';
import DashboardLayout from '../../Shortener/header';
import './url.css'
import { Redirect } from 'react-router-dom'

import { API_URL, USER_SESSION } from '../../../constant/constant'
import axios from "axios"
import Cookies from 'universal-cookie';
import { Formik, Form } from 'formik';
import moment from 'moment'
import validator from 'validator'
import $ from "jquery";
import "bootstrap";
import Swal from 'sweetalert2'
const cookies = new Cookies();

var handler = (row, index, column) => {
  return row.shortUrl
}
const columns = [
  {
    name: 'Short Link',
    selector: row => row.shortUrl,
    allowOverflow: false,
    wrap: false,
    center: false,
    cell: handler,
    width: '200px'
  },
  {
    name: 'Original Link',
    selector: row => row.longUrl,
    allowOverflow: true,
    wrap: true,
    center: true,
    width: '200px'
  },
  {
    name: 'No of Clicks',
    selector: row => row.clicks,
    allowOverflow: true,
    wrap: true,
    center: true,
    width: '200px'
  },
  {
    name: 'Created By',
    selector: row => row.created_by,
    allowOverflow: true,
    wrap: false,
    center: true
  },
  {
    name: 'Created Time',
    selector: row => moment(parseInt(row.created_date)).format('DD/MM/YYYY hh:mm:ss'),
    allowOverflow: true,
    wrap: true,
    center: true,
    sortable: true
  },
];





export default class URLPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      response: "",
      isLoading: true,
      data: [],
      selectedUrl: "",
      selectedid: "",
      error: false,
      enableEdit: true,
      urlerrorMessage: "",
      url: "",
      title: "",
      state: false,
      isUpdate: false,
    };

  }
  successAlert(msg) {
    Swal.fire({
      icon: 'success',
      title: '',
      type: 'success',
      text: msg,
    });

  }
  faliureAlert(msg) {
    console.log(msg)

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      type: 'error',
      text: msg,
    });
  }
  close() {
    $("#addModel").addClass('hide').removeClass('show').css('display', 'none')
    this.setState({ url: "" })
    this.setState({ urlerrorMessage: "" })
  }
  deleteAlert() {

  }
  deleteUrl() {
    const URL = API_URL + '/api/url/delete'
    var options = {
      method: "POST",
      url: URL,
      headers: {
        "content-type": "application/json",
        "accept": "application/json",
        "token": USER_SESSION
      },
      data: {
        id: this.state.selectedid
      }

    }
    console.log(options)

    return axios(options)
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
          if (response.data.status) {

            this.setState({ enableEdit: true })
            this.successAlert(response.data.message)
            this.componentDidMount()
          }
          else {
            console.log(response.data.message)
            this.faliureAlert(response.data.message)
          }
        }
        else {

        }
      }).catch(err => {
        cookies.remove('user_token')
        cookies.remove('user_details')
        window.location.reload(false);
        return <Redirect to='/login' />
      });
  }
  addUrl = (event) => {
    event.preventDefault()
    console.log(this.state)
    const URL = API_URL + '/api/url/shorten-url'

    if (this.state.url === "") {
      this.setState({ urlerrorMessage: "Please fill the field" })
      return false
    }

    var options = {
      method: "POST",
      url: URL,
      headers: {
        "content-type": "application/json",
        "accept": "application/json",
        "token": USER_SESSION
      },
      data: {
        longUrl: this.state.url
      }

    }

    console.log(options)
    return axios(options)
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
          if (response.data.status) {
            this.close()
            this.setState({ enableEdit: true })
            this.successAlert(response.data.message)
            this.componentDidMount()
          }
          else {
            console.log(response.data.message)
            this.faliureAlert(response.data.message)

          }
        }
        else {

        }
      }).catch(err => {
        cookies.remove('user_token')
        cookies.remove('user_details')
        window.location.reload(false);
        return <Redirect to='/login' />

      });

  }
  updateUrl = (event) => {
    event.preventDefault()
    console.log(this.state)
    const URL = API_URL + '/api/url/update'

    if (this.state.url === "") {
      this.setState({ urlerrorMessage: "Please fill the field" })
      return false
    }

    var options = {
      method: "POST",
      url: URL,
      headers: {
        "content-type": "application/json",
        "accept": "application/json",
        "token": USER_SESSION
      },
      data: {
        longUrl: this.state.url,
        id: this.state.selectedid
      }

    }

    console.log(options)
    return axios(options)
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
          if (response.data.status) {
            this.close()
            this.setState({ enableEdit: true })
            this.successAlert(response.data.message)
            this.componentDidMount()
          }
          else {
            console.log(response.data.message)
            this.faliureAlert(response.data.message)

          }
        }
        else {

        }
      }).catch(err => {
        cookies.remove('user_token')
        cookies.remove('user_details')
        window.location.reload(false);
        return <Redirect to='/login' />

      });
  }

  openModal(action) {

    if (action === 1) {
      this.setState({ title: "Add URL" })
      this.setState({ isUpdate: false })
    }
    else if (action === 2) {
      this.setState({ title: "Update URL" })
      this.setState({ isUpdate: true })
      $("#addModel").addClass('show').removeClass('hide').css('display', 'block')
      this.setState({ url: this.state.selectedUrl })
    }
    else if (action === 3) {
      console.log(this.state)
      Swal.fire({
        title: 'Are you sure ? Do you want to delete  the url !' + this.state.selectedUrl,
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'Delete'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.deleteUrl()
        }
      })
    }

  }


  async componentDidMount() {

    const URL = API_URL + "/api/url/list"
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
            this.setState({

              update: false,
              isLoading: false,
              error: false,
              data: response.data.data
            })

          }
          else {
            this.setState({
              response: response.data,
              update: false,
              isLoading: false,
              error: true
            })
           
          }
        }

      }).catch(err => {
        cookies.remove('user_token')
        cookies.remove('user_details')
        window.location.reload(false);
        return <Redirect to='/login' />

      })

  }

  redirect(row, event) {
    console.log(row)
    window.open(row.shortUrl, '_blank').focus();
    window.location.reload(false)
  }
  isRowSelected(row) {
    console.log("roww", row)
    if (row.selectedCount !== 0) {
      console.log('11')
      this.setState({ enableEdit: false })
      this.setState({ selectedUrl: row.selectedRows[0].longUrl })
      this.setState({ selectedid: row.selectedRows[0]._id })
      this.render()
      this.forceUpdate()
    }
    else {
      this.setState({ enableEdit: true })
      this.render()
      this.forceUpdate()
    }

  }
  urlHandler(event) {
    this.setState({ url: event.target.value })
    if (event.target.value) {
      if (validator.isURL(event.target.value)) {

        this.setState({ urlerrorMessage: "" })
      }
      else {
        this.setState({ urlerrorMessage: "Invalid Url" })
      }
    }
    else {
      this.setState({ urlerrorMessage: "" })
    }

  }
  closeModal() {
    console.log("e")
    this.setState({ url: "" })
    $("#addModel").addClass('hide').removeClass('show').css('display', 'none')
    this.setState({ urlerrorMessage: "" })
    this.render()
    this.forceUpdate()
  }
  render() {
    return (
      <DashboardLayout>
        <div className="row mt-3">
          <div className="col-md-6 col-12 ">
            <div className="float-left ml-3 mb-0 mt-2"><strong>Total Url's:{this.state.data.length}</strong></div>
          </div>
          <div className="col-md-6 col-12">
            <div className="float-right mr-3">
              <button type="button" className="btn btn-primary  mr-2" data-toggle="modal" data-target="#addModel" onClick={this.openModal.bind(this, 1)}>Add Url</button>
              <button type="button" disabled={this.state.enableEdit} className="btn btn-secondary btn-color ml-2" onClick={this.openModal.bind(this, 2)}><strong>Edit</strong></button>
              <button type="button" disabled={this.state.enableEdit} onClick={this.openModal.bind(this, 3)} className="btn btn-danger ml-2">Delete</button>

              <div className="modal fade" id="addModel" tabIndex="-1" backdrop="false" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">{this.state.title}</h5>
                      <button type="button" className="close" onClick={this.closeModal.bind(this)} data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">

                      <Formik>
                        {
                          (formik) => (
                            <Form onSubmit={this.addUrl} id="addmodalForm">
                              <div className="form-group">
                               
                                <input type="email" className="form-control" placeholder="Paste the link" value={this.state.url} onChange={this.urlHandler.bind(this)} />
                                {this.state.urlerrorMessage && <div className="error"> {this.state.urlerrorMessage} </div>}
                              </div>

                            </Form>
                          )
                        }
                      </Formik>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" onClick={this.closeModal.bind(this)} data-dismiss="modal">Close</button>
                      {!this.state.isUpdate && <button type="button" className="btn btn-primary" onClick={this.addUrl}>Save changes</button>}
                      {this.state.isUpdate && <button type="button" className="btn btn-primary" onClick={this.updateUrl}>Update changes</button>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="table-view font m-3">
          <DataTable
            columns={columns}
            data={this.state.data}
            highlightOnHover={true}
            pagination
            selectableRows
            fixedHeader={true}
            fixedHeaderScrollHeight="500px"
            theme={'default'}
            striped={true}
            selectableRowsHighlight={true}
            selectableRowsSingle={true}
            progressPending={this.state.isLoading}
            // title="URL Shortener"
            onSelectedRowsChange={this.isRowSelected.bind(this)}
            onRowDoubleClicked={this.redirect}
          />

        </div>




      </DashboardLayout>
    )


  }

}