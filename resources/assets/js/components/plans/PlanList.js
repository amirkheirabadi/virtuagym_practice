import React, { Component } from 'react'
import {FormGroup, FormControl, ControlLabel, Button, ButtonGroup} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
import ReactModal from 'react-modal'
const NotificationSystem = require('react-notification-system')

import Layout from '../Layout'
import 'whatwg-fetch'

const difficulties = [
  'Easy',
  'Normal',
  'Hard'
]
export default class PlanList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showModal: false,
      usersList: [],
      assignsList: [],
      assignPlanId: 0,
      assignUserId: 0,

      plan: {
        action: '',
        id: 0,
        plan_name: '',
        plan_description: '',
        plan_difficulty: 0
      },
      plans: []
    }
  }

  componentDidMount () {
    this._notificationSystem = this.refs.notificationSystem
    this.list()
  }

  list () {
    fetch('/plans').then(res => res.json()).then(data => {
      this.setState({
        plans: data.plans
      })
    })
  }

  assign (id) {
    fetch('/plans/assign_list/' + id).then(res => {
      if (res.status === 400) {
        res.json().then(data => {
          this.displayError(data['messages'])
          return 'error'
        })
      } else {
        return res.json()
      }
    }).then(data => {
      if (data != undefined) {
        this.setState({
          usersList: data.users,
          assignsList: data.assigns,
          assignPlanId: id,
          showModal: true
        })
      }
    })
  }

  editForm (id) {
    this.props.history.push('/plans/form/' + id)
  }

  delete (id) {
    fetch('/plans/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.status === 400) {
        res.json().then(data => {
          this.displayError(data['messages'])
          return 'error'
        })
      } else {
        return res.json()
      }
    }).then(data => {
      if (data != undefined) {
        this.list()
      }
    })
  }

  displayError (messages) {
    for (const msg in messages) {
      this._notificationSystem.addNotification({
        message: messages[msg][0],
        level: 'error'
      })
    }
  }

  assignUser () {
    let id = this.state.assignPlanId
    let user = this.state.assignUserId

    fetch('/plans/assign/' + id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: user
      })
    }).then(res => {
      if (res.status === 400) {
        res.json().then(data => {
          this.displayError(data['messages'])
          return 'error'
        })
      } else {
        return res.json()
      }
    }).then(data => {
      if (data != undefined) {
        this.setState({
          showModal: false
        })
        this.list()
      }
    })
  }

  unassignUser (user) {
    let id = this.state.assignPlanId

    fetch('/plans/unassign/' + id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: user
      })
    }).then(res => {
      if (res.status === 400) {
        res.json().then(data => {
          this.displayError(data['messages'])
          return 'error'
        })
      } else {
        return res.json()
      }
    }).then(data => {
      if (data != undefined) {
        this.setState({
          showModal: false
        })
        this.list()
      }
    })
  }

  render () {
    return (
      <Layout>
        <div className='card'>
          <div className='card-header'>Plan Management</div>
          <div className='card-body'>

            <NavLink className='btn btn-primary addButton' to='/plans/form'>Add Plan</NavLink>

            <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>Name</th>
                  <th scope='col'>Description</th>
                  <th scope='col'>Difficulty</th>
                  <th scope='col' />
                </tr>
              </thead>
              <tbody>
                {this.state.plans.map(plan => (
                  <tr key={plan.plan_name}>
                    <th scope='row'>{plan.id}</th>
                    <td>{plan.plan_name}</td>
                    <td>{plan.plan_description}</td>
                    <td>{difficulties[plan.plan_difficulty]}</td>
                    <td>
                      <ButtonGroup>
                        <Button bsStyle='info' onClick={this.editForm.bind(this, plan.id)}>Edit</Button>
                        <Button bsStyle='danger' onClick={this.delete.bind(this, plan.id)}>Delete</Button>
                        <Button bsStyle='success' onClick={this.assign.bind(this, plan.id)}>Assign</Button>
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
          <div>
            <FormGroup controlId='formControlsSelect'>
              <ControlLabel>Select user</ControlLabel>
              <FormControl
                componentClass='select'
                placeholder='select'
                value={this.state.plan.plan_difficulty}
                onChange={event => {
                  this.setState({
                    assignUserId: event.target.value
                  })
                }}
            >
                {this.state.usersList.map(user => (
                  <option key={'user_' + user.id} value='{user.id}'>{user.firstname + ' ' + user.lastname}</option>
                 )) }
              </FormControl>
            </FormGroup>
            <Button bsStyle='success' className='addButton' onClick={this.assignUser.bind(this)}>Assign</Button>

            <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>Name</th>
                  <th scope='col' />
                </tr>
              </thead>
              <tbody>
                {this.state.assignsList.map(user => (
                  <tr key={'plan_' + user.id}>
                    <th scope='row'>{user.id}</th>
                    <td>{user.firstname + ' ' + user.lastname}</td>
                    <td>
                      <ButtonGroup>
                        <Button bsStyle='danger' onClick={this.unassignUser.bind(this, user.id)}>Delete</Button>
                      </ButtonGroup></td>
                  </tr>
                 )) }
              </tbody>
            </table>
          </div>
        </ReactModal>
        <NotificationSystem ref='notificationSystem' />
      </Layout>
    )
  }
}
