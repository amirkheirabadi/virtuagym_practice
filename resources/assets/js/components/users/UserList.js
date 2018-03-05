import React, { Component } from 'react'
import {Button, ButtonGroup} from 'react-bootstrap'
import ReactModal from 'react-modal'

import Layout from '../Layout'
import UserForm from './UserForm'
import 'whatwg-fetch'

export default class UserList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showModal: false,
      user: {
        action: '',
        id: 0,
        firstname: '',
        lastname: '',
        email: ''
      },
      users: []
    }
  }

  componentDidMount () {
    this.list()
  }

  list () {
    fetch('/users').then(res => res.json()).then(data => {
      this.setState({
        users: data.users
      })
    })
  }

  createForm () {
    this.setState({
      user: {
        action: 'create',
        firstname: '',
        lastname: '',
        email: ''
      }
    })
  }

  editForm (id) {
    fetch('/users/' + id + '/edit').then(res => res.json()).then(data => {
      this.setState({
        user: {
          action: 'edit',
          id: data.id,
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email
        },
        showModal: true
      })
    })
  }

  submit (data) {
    let address = '/users'
    let method = 'POST'
    if (this.state.user.action == 'edit') {
      address = '/users/' + this.state.user.id
      method = 'PUT'
    }
    fetch(address, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json()).then(data => {
      this.setState({
        showModal: false
      })
      this.list()
    })
  }

  delete (id) {
    fetch('/users/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(data => {
      this.list()
    })
  }

  render () {
    return (
      <Layout>
        <div className='card'>
          <div className='card-header'>User Management</div>
          <div className='card-body'>

            <Button bsStyle='primary' className='addButton' onClick={() => {
              this.setState({
                showModal: true
              })
            }}>Add User</Button>

            <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>First</th>
                  <th scope='col'>Last</th>
                  <th scope='col'>Email</th>
                  <th scope='col' />
                </tr>
              </thead>
              <tbody>
                {this.state.users.map(user => (
                  <tr>
                    <th scope='row'>{user.id}</th>
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    <td>{user.email}</td>
                    <td>
                      <ButtonGroup>
                        <Button bsStyle='info' onClick={this.editForm.bind(this, user.id)}>Edit</Button>
                        <Button bsStyle='danger' onClick={this.delete.bind(this, user.id)}>Delete</Button>
                      </ButtonGroup></td>
                  </tr>
                 )) }
              </tbody>
            </table>
          </div>
        </div>

        <ReactModal
          isOpen={this.state.showModal}
          ariaHideApp={false}
          shouldCloseOnEsc
          shouldCloseOnOverlayClick
          onRequestClose={() => {
            this.setState({
              showModal: false
            })
          }}
          contentLabel='User Management'
        >
          <UserForm user={this.state.user} submit={this.submit.bind(this)} />
        </ReactModal>
      </Layout>
    )
  }
}
