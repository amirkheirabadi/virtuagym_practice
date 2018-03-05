import React, { Component } from 'react'
import {Button, ButtonGroup} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'

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
    this.list()
  }

  list () {
    fetch('/plans').then(res => res.json()).then(data => {
      this.setState({
        plans: data.plans
      })
    })
  }

  editForm (id) {

  }

  delete (id) {

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
                  <tr>
                    <th scope='row'>{plan.id}</th>
                    <td>{plan.plan_name}</td>
                    <td>{plan.plan_description}</td>
                    <td>{difficulties[plan.plan_difficulty]}</td>
                    <td>
                      <ButtonGroup>
                        <Button bsStyle='info' onClick={this.editForm.bind(this, plan.id)}>Edit</Button>
                        <Button bsStyle='danger' onClick={this.delete.bind(this, plan.id)}>Delete</Button>
                      </ButtonGroup></td>
                  </tr>
                 )) }
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    )
  }
}
