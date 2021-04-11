import SoundPlayer from 'react-native-sound-player'

export const player = SoundPlayer

const loadUrl = (songs) => {
  try {
    SoundPlayer.loadUrl(songs)
  } catch (e) {
    console.log('cannot play the sound file', e)
  }
}

const play = (songs) => {
  try {
    if (songs) SoundPlayer.playUrl(songs)
    else SoundPlayer.play()
  } catch (e) {
    console.log('cannot play the sound file', e)
  }
}

const pause = () => {
  try {
    SoundPlayer.pause()
  } catch (e) {
    console.log('cannot pause the sound file', e)
  }
}

const resume = () => {
  try {
    SoundPlayer.resume()
  } catch (e) {
    console.log('cannot resume the sound file', e)
  }
}

const getInfo = async () => {
  try {
    const info = await SoundPlayer.getInfo() // Also, you need to await this because it is async
    return info // {duration: 12.416, currentTime: 7.691}
  } catch (e) {
    console.log('There is no song playing', e)
  }
}

export default {
  loadUrl,
  play,
  pause,
  resume,
  getInfo
}
