import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom'
import '../style.css'

import Home from './Home'
import UserList from './users/UserList'
import PlanList from './plans/PlanList'
import PlanForm from './plans/PlanForm'

if (document.getElementById('main')) {
  ReactDOM.render(
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/users' component={UserList} />
        <Route path='/plans/form/:id?' component={PlanForm} />
        <Route path='/plans' component={PlanList} />
      </Switch>
    </BrowserRouter>,
    document.getElementById('main')
  )
}
