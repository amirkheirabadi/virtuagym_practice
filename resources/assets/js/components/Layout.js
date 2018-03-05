import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'

export default class Layout extends Component {
  render () {
    return (
      <div className='container' id='mainLayout'>
        <div className='row'>
          <div className='col-md-3'>
            <div className='list-group'>
              <a className='list-group-item' href='/'>Home</a>
              <NavLink className='list-group-item' to='/users'>User Management</NavLink>
              <NavLink className='list-group-item' to='/plans'>Plan Management</NavLink>
            </div>
          </div>
          <div className='col-md-9'>
            { this.props.children }
          </div>
        </div>
      </div>
    )
  }
}
