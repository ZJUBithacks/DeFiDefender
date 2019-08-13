import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Layout } from './_pages/layout'
import { HomeContent } from './_pages/homeContent'
import { AllRequestsContent, YourRequestsContent, PushRequestContent, PushResponseContent } from './_pages/request'
import { YourResponsesContent, ReceivedResponsesContent } from './_pages/response'
import { RecordsContent } from './_pages/records'
import { UserInfo, GenerateCredential, UserRegisterDID} from './_pages/government'
import { Blacklist, LoanRequest} from './_pages/company'
import { Credential, Loan  } from './_pages/user'
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
            <Route path="/loanRequestInfoList" component={LoanRequest}></Route>
            {/* 用户 */}
            <Route path="/userRegister" component={Loan}></Route>
            <Route path="/loanRequest" component={Loan}></Route>
            <Route path="/listCredential" component={Credential}></Route>
            <Route path="/requestCredential" component={Credential}></Route>

          </Switch >
        </Layout>
      </BrowserRouter >
    )
  }
}

export default App
