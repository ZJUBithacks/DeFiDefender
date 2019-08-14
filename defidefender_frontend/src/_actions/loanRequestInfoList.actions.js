/*
 * action 类型
 */
export const LoanRequestActionTypes = {
    SHOW_ALL_LOAN_REQUESTS: 'SHOW_ALL_LOAN_REQUESTS',
    VERIFY_CREDENTIAL_HASH: 'VERIFY_CREDENTIAL_HASH',
    QUERY_MULTI_PARTY_LOAN: 'QUERY_MULTI_PARTY_LOAN',
    QUERY_MAL_RECORDS: 'QUERY_MAL_RECORDS'
}

/*
 * action 创建函数
 */
export function ShowAllLoanRequests() {
    return { type: LoanRequestActionTypes.SHOW_ALL_LOAN_REQUESTS }
}

export function VerifyCredentialHash() {
    return { type: LoanRequestActionTypes.VERIFY_CREDENTIAL_HASH }
}

export function QueryMultiPartyLoan() {
    return { type: LoanRequestActionTypes.QUERY_MULTI_PARTY_LOAN }
}

export function QueryMalRecords() {
    return { type: LoanRequestActionTypes.QUERY_MAL_RECORDS }
}



