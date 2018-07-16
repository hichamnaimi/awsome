import { ADD_MUSIC, REMOVE_MUSIC } from '../../actionTypes/music/musicPlaylist';
import { CHANGE_PLAYING_MUSIC_ORDER, HIGHTLIGHT_PLAYING_MUSIC } from '../../actionTypes/music/musicBase';
import musicBaseReducer from './musicBase';

const addMusicIfUnique = (state, musicToAdd) => {
  const musicAlreadyExists = state.find((music) => music.id === musicToAdd.id);
  if (!musicAlreadyExists) return [...state, musicToAdd];
  return state;
};

const removeMusicById = (state, id) => {
  const filteredState = state.filter((music) => music.id !== id);
  return filteredState;
};

const changePlayingMusicOrder = (playlistMusic, { id, source }) => {
  if (source === 'playlist') {
    return musicBaseReducer.changePlayingMusicOrder(playlistMusic, id);
  }
  return playlistMusic;
};

const hightlightPlayingMusic = (playlistMusic, { id, source, isPlaying }) => {
  if (source === 'playlist') {
    return musicBaseReducer.toggleHighlightMusic(playlistMusic, id, isPlaying);
  }
  return musicBaseReducer.downlightAnyPlayingMusic(playlistMusic);
};

const stopPlayingMusic = (playlistMusic, { id, source }) => {
  if (source === 'playlist') {
    return musicBaseReducer.stopPlayingMusic(playlistMusic, id);
  }
  return musicBaseReducer.stopPlayingMusic(playlistMusic, id);
}

const initialState = localStorage.getItem("playlist") ? JSON.parse(localStorage.getItem("playlist")) : [];

const musicPlaylistReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_MUSIC:
      return addMusicIfUnique(state, action.payload);
    case REMOVE_MUSIC:
      return removeMusicById(state, action.payload);
    case CHANGE_PLAYING_MUSIC_ORDER:
      return changePlayingMusicOrder(state, action.payload);
    case HIGHTLIGHT_PLAYING_MUSIC:
      return hightlightPlayingMusic(state, action.payload);
    default:
      return state;
  }
}

export default musicPlaylistReducer;
