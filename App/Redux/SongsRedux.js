import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  request: ['keyword'],
  success: ['data'],
  failure: null
})

export const SongsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  error: null,
  username: null
})

/* ------------- Reducers ------------- */

// request the songs for a user
export const request = (state) => state.merge({ fetching: true, error: false })

// successful songs lookup
export const success = (state, { data }) => state.merge({ fetching: false, data })

// failed to get the songs
export const failure = (state) => state.merge({ fetching: false, error: true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REQUEST]: request,
  [Types.SUCCESS]: success,
  [Types.FAILURE]: failure
})
