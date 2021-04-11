import { call, put } from 'redux-saga/effects'
import SongsActions from '../Redux/SongsRedux'

export function * searchSong (api, { keyword }) {
  // make the call to the api
  const response = yield call(api.searchSong, keyword)
  if (response.ok) {
    // do data conversion here if needed
    console.log(JSON.stringify(response.data))
    yield put(SongsActions.success(response.data))
  } else {
    yield put(SongsActions.failure())
  }
}
