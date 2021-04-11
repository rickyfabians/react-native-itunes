import FixtureAPI from '../../App/Services/FixtureApi'
import { put } from 'redux-saga/effects'
import { searchSong } from '../../App/Sagas/SongsSagas'
import SongsActions from '../../App/Redux/SongsRedux'

const stepper = (fn) => (mock) => fn.next(mock).value

test('success path', () => {
  const response = FixtureAPI.searchSong('jack jhonson')

  const step = stepper(searchSong(FixtureAPI, 'jack jhonson'))
  // first step API
  step()
  // Second step successful return
  const stepResponse = step(response)

  expect(stepResponse).toEqual(put(SongsActions.success(response.data)))
})

test('failure path', () => {
  const response = { ok: false }
  const step = stepper(searchSong(FixtureAPI, 'jack jhonson'))
  // first step API
  step()
  // Second step failed response
  expect(step(response)).toEqual(put(SongsActions.failure()))
})
