import React, { Component } from 'react'
import {FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap'
export default class UserForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      firstname: this.props.user.firstname,
      lastname: this.props.user.lastname,
      email: this.props.user.email
    }
  }

  render () {
    return (
      <div>
        <FormGroup >
          <ControlLabel>First Name</ControlLabel>
          <FormControl value={this.state.firstname} onChange={(event) => {
            this.setState({
              firstname: event.target.value
            })
          }} />
        </FormGroup>

        <FormGroup >
          <ControlLabel>Last Name</ControlLabel>
          <FormControl value={this.state.lastname} onChange={(event) => {
            this.setState({
              lastname: event.target.value
            })
          }} />
        </FormGroup>

        <FormGroup >
          <ControlLabel>Email</ControlLabel>
          <FormControl value={this.state.email} onChange={(event) => {
            this.setState({
              email: event.target.value
            })
          }} />
        </FormGroup>

        <Button bsStyle='success' className='addButton' onClick={() => {
          this.props.submit(this.state)
        }}>Create</Button>
      </div>
    )
  }
}
