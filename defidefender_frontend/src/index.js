import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from "react-redux"
import * as serviceWorker from './serviceWorker'
import { store } from './_store'

const rootElement = document.getElementById("root");

// console.log(store.getState()) // 可以拿到状态

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,document.getElementById('root')
);
 
serviceWorker.register()