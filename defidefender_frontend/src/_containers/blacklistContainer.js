import { Blacklist } from '../_pages/company'
import { connect } from 'react-redux'
import { LIST_BLACKLIST, ListBlacklist} from '../_actions'

// 容器组件
const getBlacklist = (blacklist, filter) => {
    switch (filter) {
        case LIST_BLACKLIST:
            return blacklist
        default:
            return []     
    }
}

// store状态映射到组件
const mapStateToProps = state => ({
    blacklist: getBlacklist(state.company[0].blacklist, LIST_BLACKLIST)
})

// 注入到展示组件的props中的回调方法
const mapDispatchToProps = dispatch => ({
    ListBlacklist: () => dispatch(ListBlacklist())
})

// 连接到展示组件
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Blacklist)
