import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/SongsRedux'

test('request', () => {
  const keyword = 'jack jhonson'
  const state = reducer(INITIAL_STATE, Actions.request(keyword))

  expect(state.fetching).toBe(true)
  expect(state.error).toBe(false)
})

test('success', () => {
  const data = {
    result: []
  }
  const state = reducer(INITIAL_STATE, Actions.success(data))

  expect(state.fetching).toBe(false)
  expect(state.data).toStrictEqual(data)
})

test('failure', () => {
  const state = reducer(INITIAL_STATE, Actions.failure())

  expect(state.fetching).toBe(false)
  expect(state.error).toBe(true)
})
