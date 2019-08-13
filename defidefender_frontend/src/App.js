import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Layout } from './_pages/layout'
import { HomeContent } from './_pages/homeContent'
import { AllRequestsContent, YourRequestsContent, PushRequestContent, PushResponseContent } from './_pages/request'
import { YourResponsesContent, ReceivedResponsesContent } from './_pages/response'
import { RecordsContent } from './_pages/records'
import { NotificationsContent } from './_pages/notifications'


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/home" component={HomeContent}></Route>
            <Route path="/requests/allRequests" component={AllRequestsContent}></Route>
            <Route path="/requests/yourRequests" component={YourRequestsContent}></Route>
            <Route path="/requests/pushRequest" component={PushRequestContent}></Route>
            <Route path="/requests/pushResponse" component={PushResponseContent}></Route>
            <Route path="/responses/yourResponses" component={YourResponsesContent}></Route>
            <Route path="/responses/receivedResponses" component={ReceivedResponsesContent}></Route>
            <Route path="/records" component={RecordsContent}></Route>
            <Route path="/notifications" component={NotificationsContent}></Route>
            <Route path="/profile" component={HomeContent}></Route>
          </Switch >
        </Layout>
      </BrowserRouter >
    )
  }
}

export default App
