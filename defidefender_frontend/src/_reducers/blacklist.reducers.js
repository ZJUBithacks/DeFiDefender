import { LIST_BLACKLIST, ListBlacklist } from '../_actions/blacklist.actions'
import { combineReducers } from 'redux'

// reducer: 发起action后如何更新state
export function BlacklistReducer(state={}, action) {
    switch (action.type) {
        case LIST_BLACKLIST:
            return ["blacklist"]
        default:
            return state
    }
}