import React, { Component } from 'react'
import Layout from './Layout'

export default class Home extends Component {
  render () {
    return (
      <Layout>
        <div className='card'>
          <div className='card-header'>Example Component</div>

          <div className='card-body'>
            I'm an example component! Amirssss
          </div>
        </div>
      </Layout>
    )
  }
}
