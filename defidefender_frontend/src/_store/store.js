import { createStore, applyMiddleware } from 'redux'
// import rootReducer from '../_reducers'
import { BlacklistReducer } from '../_reducers'

const initialState = {
    "company": [
        {
            "blacklist": [
                {
                    "weid": "did:weid:1:0xbd88a3e27798a28970a358fa315673d11cc599a3",
                    "description": "应该于2019年8月1日还款6万元，但逾期未还"
                },
                {
                    "weid": "did:weid:1:0xbd88a3e27798a28970a358fa315673d11cc599a3",
                    "description": "应该于2019年7月4日还款1万元，但逾期未还"
                },
                {
                    "weid": "did:weid:1:0x8dc34e4cad4d86f5f20f5b63d96230f759f3bbe7",
                    "description": "应该于2019年7月3日还款3万元，但逾期未还"
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
)