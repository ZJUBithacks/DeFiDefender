import { LIST_BLACKLIST, ListBlacklist } from '../_actions/blacklist.actions'

const initialState = {}

// reducer: 发起action后如何更新state
export function BlacklistReducer(state=initialState, action) {
    switch (action.type) {
        case LIST_BLACKLIST:
            return state
        default:
            return state
    }
}