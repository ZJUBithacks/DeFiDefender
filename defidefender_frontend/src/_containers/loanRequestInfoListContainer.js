import { LoanRequestInfoList } from '../_pages/company'
import { connect } from 'react-redux'
import { LoanRequestActionTypes } from '../_actions'
import { ShowAllLoanRequests, VerifyCredentialHash, QueryMultiPartyLoan, QueryMalRecords } from '../_actions'

// 容器组件，过滤数据
const getAllLoanRequests = (blacklist, filter) => {
    switch (filter) {
        case LIST_BLACKLIST:
            return blacklist
        default:
            return "无数据"
    }
}

// store状态映射到组件
// blacklist是用于props的键
const mapStateToProps = state => ({
    allLoanRequests: getAllLoanRequests(state.company[0].blacklist, LIST_BLACKLIST)
})

// 注入到展示组件的props中的回调方法
const mapDispatchToProps = dispatch => ({
    ListBlacklist: () => dispatch(ListBlacklist()),
    ShowAllLoanRequests: () => dispatch(ShowAllLoanRequests()),
    VerifyCredentialHash: () => dispatch(VerifyCredentialHash()),
    QueryMultiPartyLoan: () => dispatch(QueryMultiPartyLoan()),
    QueryMalRecords: () => dispatch(QueryMalRecords())
})

// 连接到展示组件
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoanRequestInfoList)
