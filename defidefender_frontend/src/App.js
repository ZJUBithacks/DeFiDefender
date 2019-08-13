import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Layout } from './_pages/layout'
import { HomeContent } from './_pages/homeContent'
import { AllRequestsContent, YourRequestsContent, PushRequestContent, PushResponseContent } from './_pages/request'
import { YourResponsesContent, ReceivedResponsesContent } from './_pages/response'
import { RecordsContent } from './_pages/records'
import { UserInfo, GenerateSignCredential, UserRegisterInfoList} from './_pages/government'
import { Blacklist, LoanRequestInfoList} from './_pages/company'
import { UserRegister, LoanRequest, ListCredential, RequestCredential } from './_pages/user'
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/home" component={HomeContent}></Route>
            {/* 政府 */}
            <Route path="/userInfo" component={UserInfo}></Route>
            <Route path="/userRegisterInfoList" component={UserRegisterInfoList}></Route>
            <Route path="/generateSignCredential" component={GenerateSignCredential}></Route>
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
