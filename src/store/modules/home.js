// import Cookies from 'js-cookie'
import mockRequest from '@/utils/mockRequest'

const state = {
  list: {}
}

const mutations = {
  GETDATA(state, list) {
    state.list = list
  }
}

const actions = {
  async getData({ commit }) {
    const res = await mockRequest.get(`/home/list`)
    if (res.code === 20000) commit('GETDATA', res.data)
  }
}

const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
