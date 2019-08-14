import { LoanRequestActionTypes } from '../_actions/loanRequestInfoList.actions'

// fetch在reducer中进行

// reducer: 根据action的type匹配到，根据action修改state并返回新的state
// (state, action) => newState
export function LoanRequestInfoListReducer(state={}, action) {
    switch (action.type) {
        case LoanRequestActionTypes.SHOW_ALL_LOAN_REQUESTS:
            return state
        case LoanRequestActionTypes.VERIFY_CREDENTIAL_HASH:
            return state
        case LoanRequestActionTypes.QUERY_MULTI_PARTY_LOAN:
            return state 
        case LoanRequestActionTypes.QUERY_MAL_RECORDS:
            return state
        default:
            return state
    }
}