import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Layout } from './_pages/layout'
import { UserInfo, ListAllCredential, UserRegisterInfoList } from './_pages/government'
import { LoanRequestInfoList } from './_pages/company'
import { UserRegister, LoanRequest, ListCredential, RequestCredential } from './_pages/user'
import { HomeContent } from './_pages/homeContent'

import Blacklist from './_containers/blacklistContainer'


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            {/* 政府 */}
            <Route path="/home" component={HomeContent}></Route>
            <Route path="/userInfo" component={UserInfo}></Route>
            <Route path="/userRegisterInfoList" component={UserRegisterInfoList}></Route>
            <Route path="/listAllCredential" component={ListAllCredential}></Route>
            {/* 机构 */}
            <Route path="/blacklist" component={Blacklist}></Route>
            <Route path="/loanRequestInfoList" component={LoanRequestInfoList}></Route>
            {/* 用户 */}
            <Route path="/userRegister" component={UserRegister}></Route>
            <Route path="/loanRequest" component={LoanRequest}></Route>
            <Route path="/listCredential" component={ListCredential}></Route>
            <Route path="/requestCredential" component={RequestCredential}></Route>
          </Switch >
        </Layout>
      </BrowserRouter >
    )
  }
}

export default App
