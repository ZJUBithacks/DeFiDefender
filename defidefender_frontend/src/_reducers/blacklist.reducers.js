import { LIST_BLACKLIST } from '../_actions/blacklist.actions'

// reducer: 发起action后如何更新state
export function BlacklistReducer(state={}, action) {
    switch (action.type) {
        case LIST_BLACKLIST:
            return state
        default:
            return state
    }
}