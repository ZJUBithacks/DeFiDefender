import { createStore, applyMiddleware } from 'redux';
// import rootReducer from '../_reducers';
import { BlacklistReducer } from '../_reducers'

const initialState = {
    "company": [
        {
            "blacklist": [
                {
                    "weid": "did:weid:1:0xbd88a3e27798a28970a358fa315673d11cc599a3",
                    "description": "应该于2019年8月1日还款10万元，但逾期未换"
                },
                {
                    "weid": "did:weid:1:0xbd88a3e27798a28970a358fa315673d11cc599a3",
                    "description": "应该于2019年6月1日还款1万元，但逾期未换"
                }
            ],
            "allLoanRequests": [
                
            ]
        }
    ],
    "government": [
    ],
    "user": [
    ]
}

export const store = createStore(
    BlacklistReducer, initialState
);