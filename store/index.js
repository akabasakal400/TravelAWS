export const state = () => ({
  loading: false
})

export const mutations = {
  setLoading(state, value){
    state.loading = value
  }
}
