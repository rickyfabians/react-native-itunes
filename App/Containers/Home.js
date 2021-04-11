import React, { useEffect, useState, useRef } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image, Dimensions, TextInput, ActivityIndicator } from 'react-native'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import BottomSheet from 'reanimated-bottom-sheet'
import { View as ViewAnimated } from 'react-native-animatable'
import sound, { player } from '../Services/SoundControl'

import { useDispatch, useSelector } from 'react-redux'
import songsActions from '../Redux/SongsRedux'

const { width } = Dimensions.get('screen')
const widthProgressBar = width * 0.95
const Home = () => {
  const [keyword, setKeyword] = useState('')
  const [selected, setSelected] = useState()
  const [controlStatus, setControlStatus] = useState('')
  const sheetRef = useRef(null)
  const dispatch = useDispatch()
  const songs = useSelector(state => state.songs)
  const search = (key = keyword) => dispatch(songsActions.request(key))
  useEffect(() => {
    search('jack jhonson')
    return () => {
    }
  }, [])
  useEffect(() => {
    try {
      if (selected) {
        setControlStatus('play')
        sound.loadUrl(selected?.previewUrl)
        player.addEventListener('FinishedLoadingURL', ({ success, url }) => {
          if (selected?.previewUrl === url) {
            sound.play()
          }
        })
        sound.getInfo()
        sheetRef.current.snapTo(1)
      }
    } catch (error) {
      console.log('selectSong: ', { error })
    }
    return () => {
    }
  }, [selected])

  const playSong = () => {
    setControlStatus('play')
    sound.resume()
  }

  const pauseSong = () => {
    setControlStatus('pause')
    sound.pause()
  }

  const repeatSong = () => {
    setControlStatus('play')
    sound.play(selected?.previewUrl)
  }

  const renderMidButton = () => {
    if (controlStatus === 'play') {
      return (
        <TouchableOpacity onPress={() => pauseSong()}>
          <Icons name='pause' size={40} />
        </TouchableOpacity>
      )
    } else if (controlStatus === 'pause') {
      return (
        <TouchableOpacity onPress={() => playSong()}>
          <Icons name='play' size={40} />
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity onPress={() => repeatSong()}>
          <Icons name='play' size={40} />
        </TouchableOpacity>
      )
    }
  }
  const renderMusicControl = () => {
    return (
      <View style={{ backgroundColor: 'white', padding: 10, paddingBottom: 50, borderTopWidth: 1, borderColor: '#757885' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <TouchableOpacity style={{ alignItems: 'center' }}>
            <Icons name='skip-backward' size={40} />
          </TouchableOpacity>
          {renderMidButton()}
            <TouchableOpacity>
              <Icons name='skip-forward' size={40} />
            </TouchableOpacity>
        </View>
          <View style={{ height: 5, width: widthProgressBar, backgroundColor: '#F0F2F7', marginTop: 5, borderRadius: 5, flexDirection: 'row' }}>
            <View style={{ height: 5, width: widthProgressBar * 0.1, backgroundColor: '#757886', borderRadius: 5 }} />
          </View>
      </View>
    )
  }
  return (
    <View style={{ flex: 1 }}>
      <TextInput
        returnKeyType='search'
        value={keyword}
        onChangeText={(e) => setKeyword(e)}
        onSubmitEditing={() => search()}
        placeholder='ex: jack jhonson'
        style={{ borderWidth: 1, borderRadius: 10, height: 40, color: '#757885', borderColor: '#757885', margin: 10 }}
      />
        <FlatList
          data={songs.data?.results}
          renderItem={({ item, index }) => {
            const isSelectedSong = item?.trackId === selected?.trackId
            return (
              <ViewAnimated useNativeDriver delay={index / 20} animation='fadeInUpBig' easing='ease-out-expo'>
                <TouchableOpacity onPress={() => setSelected(item)} style={{ backgroundColor: (isSelectedSong ? '#D4DCE6' : 'white'), paddingVertical: 10, paddingHorizontal: 20, marginVertical: 5, flexDirection: 'row', borderBottomWidth: 0.5, borderColor: '#F0F2F7' }}>
                  <Image source={{ uri: item.artworkUrl100 }} style={{ width: width * 0.2, height: width * 0.2 }} />
                    <View style={{ paddingLeft: 10, flex: 1 }}>
                      <Text style={{ fontWeight: 'bold' }} numberOfLines={1}>{item.trackName}</Text>
                        <Text numberOfLines={1}>{item.artistName}</Text>
                          <Text numberOfLines={2}>{item.collectionName}</Text>
                    </View>
                  {isSelectedSong && <Icons name='waveform' size={40} />}
                </TouchableOpacity>
              </ViewAnimated>
            )
          }}
          ListEmptyComponent={() => {
            if (songs.fetching) return <ActivityIndicator size='large' style={{ height: '100%', alignSelf: 'center' }} />
            else return null
          }}
          keyExtractor={(item, index) => `songs ${index}`}
      />
        <BottomSheet
          ref={sheetRef}
          initialSnap={0}
          snapPoints={[0, 80, 0]}
          renderContent={renderMusicControl}
      />
    </View>
  )
}

export default Home
