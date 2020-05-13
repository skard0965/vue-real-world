import EventService from '@/services/EventService.js'

export const namespaced = true

export const state = {
  events: [],
  eventsTotal: 0,
  event: {}
}

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_eventsTotal(state, eventsTotal) {
    state.eventsTotal = eventsTotal
  },
  SET_EVENT(state, event) {
    state.event = event
  }
}

export const actions = {
  createEvent({ commit }, event) {
    EventService.postEvent(event)
    commit('ADD_EVENT', event)
  },
  fetchEvents({ commit }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then(response => {
        commit(
          'SET_eventsTotal',
          Math.ceil(response.headers['x-total-count'] / 3)
        )
        commit('SET_EVENTS', response.data)
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })
  },
  fetchEvent({ commit }, id) {
    EventService.getEvent(id)
      .then(response => {
        commit('SET_EVENT', response.data)
        console.log(response.data)
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })
  }
}

export const getters = {
  // catLength:state=>{
  //   return state.categories.length
  // },
  // doneTodos:state=>{
  //   return state.todos.filter(todo => todo.done)
  // },
  // // activeTodosCount: (state,getters) => {
  // //   return state.todos.length - getters.doneTodos.length
  // // }
  // activeTodosCount:state=>{
  //   return state.todos.filter(todo=>!todo.done).length
  // }
  getEventsTotal: state => {
    return state.eventsTotal
  },

  getEventById: state => id => {
    return state.events.find(event => event.id === id)
  }
}
