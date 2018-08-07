import axios from 'axios'

export default {
  FETCH ({ commit, state, rootState }, params) {
    return new Promise(async (resolve, reject) => {
      commit('RESET_ERROR')
      commit('loading/SET', 'resource/fetch', { root: true })
      if (params.type) {
        commit('loading/SET', `resource/fetch/${params.type}`, { root: true })
        if (params.id) {
          commit('loading/SET', `resource/fetch/${params.type}/${params.id}`, { root: true })
        }
      }

      try {
        // TODO - conditional request based on current store contents
        const { data } = await axios.get(`http://localhost:3030/static/data/${params.path}.json`)
        // Set any included records
        if (data.included) {
          for (let resource of data.included) {
            commit('SET_RECORD', resource)
          }
        }

        // Set primary record
        if (Array.isArray(data.data)) {
          for (let resource of data.data) {
            commit('SET_RECORD', resource)
          }
        } else {
          commit('SET_RECORD', data.data)
        }
        resolve(data.data)
      } catch (error) {
        reject(error)
        commit('SET_ERROR', error.response.data.error)
        console.log(error)
      } finally {
        commit('loading/RESET', 'resource/fetch', { root: true })
        commit('loading/RESET', `resource/fetch/${params.type}`, { root: true })
        commit('loading/RESET', `resource/fetch/${params.type}/${params.id}`, { root: true })
      }
    })
  }
}
