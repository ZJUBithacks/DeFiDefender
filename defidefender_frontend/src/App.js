import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Layout } from './_pages/layout'
import { HomeContent } from './_pages/homeContent'
import { UserInfo } from './_pages/government'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/home" component={HomeContent}></Route>
            <Route path="/userInfo" component={UserInfo}></Route>
          </Switch >
        </Layout>
      </BrowserRouter >
    )
  }
}

export default App
