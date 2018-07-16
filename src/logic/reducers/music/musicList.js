import { FETCH_MUSIC, FETCH_MUSIC_SUCCESS, FETCH_MUSIC_FAILURE } from '../../actionTypes/music/musicList';
import { CHANGE_PLAYING_MUSIC_ORDER, HIGHTLIGHT_PLAYING_MUSIC } from '../../actionTypes/music/musicBase';
import musicBaseReducer from './musicBase';

const changePlayingMusicOrder = (musicList, { id, source }) => {
  if (source === 'list') {
    return musicBaseReducer.changePlayingMusicOrder(musicList, id);
  }
  return musicList;
};

const hightlightPlayingMusic = (musicList, { id, source, isPlaying }) => {
  if (source === 'list') {
    return musicBaseReducer.toggleHighlightMusic(musicList, id, isPlaying);
  }
  return musicBaseReducer.downlightAnyPlayingMusic(musicList);
};

const stopPlayingMusic = (playlistMusic, { id, source }) => {
  if (source === 'list') {
    return musicBaseReducer.stopPlayingMusic(playlistMusic, id);
  }
  return musicBaseReducer.stopPlayingMusic(playlistMusic, id);
}

const initialState = {
  isFetching: false,
  isError: false,
  items: []
};

const musicListReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_MUSIC:
      return { ...state, isFetching: true };
    case FETCH_MUSIC_SUCCESS:
      return { ...state, isFetching: false, isError: false, items: action.payload }
    case FETCH_MUSIC_FAILURE:
      return { ...state, isFetching: false, isError: action.payload };
    case CHANGE_PLAYING_MUSIC_ORDER:
      return {...state, items: changePlayingMusicOrder(state.items, action.payload)};
    case HIGHTLIGHT_PLAYING_MUSIC:
      return {...state, items: hightlightPlayingMusic(state.items, action.payload)};
    default:
      return state;
  }
}

export default musicListReducer;

