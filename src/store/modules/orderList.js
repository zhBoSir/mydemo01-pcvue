import Vue from 'vue'

const state = {
    orderList: [],
    params: {}
}

const mutations = {
    updateOrderList(state, payload) {
        state.orderList = payload
    },
    // 点击页面中的参数更新展示列表
    updateParams(state, { key, val }) {
        state.params[key] = val
    }
}

const actions = {
    fetchOrderList({ commit, state }) {
        Vue.http.post('/api/getOrderList', state.params).then((rest) => {
            commit('updateOrderList', res.data.list)
        }, (err) => {

        })
    }
}

const getters = {
    getOrderList: state => state.orderList
}

export default {
    state,
    mutations,
    actions,
    getters
}