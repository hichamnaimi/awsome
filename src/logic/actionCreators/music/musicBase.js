import { CHANGE_PLAYING_MUSIC_ORDER, HIGHTLIGHT_PLAYING_MUSIC, PAUSE_PLAYING_MUSIC } from '../../actionTypes/music/musicBase';
import musicSound from '../../helpers/musicSound';

const changePlayingMusicOrder = ({ id, source }) => {
  return {
    type: CHANGE_PLAYING_MUSIC_ORDER,
    payload: { id, source }
  }
}

const highlightPlayingMusic = (id, source, isPlaying) => ({
  type: HIGHTLIGHT_PLAYING_MUSIC,
  payload: { id, source, isPlaying }
});

const pausePlayingMusic = (id, source, isPaused) => ({
  type: PAUSE_PLAYING_MUSIC,
  payload: { id, source, isPaused }
});

export const playMusic = ({ id, source }) => {
  return (dispatch, getState) => {
    const { musicPlaylist, musicList } = getState();
    const musicListSource = source === 'list' ? musicList.items : musicPlaylist;
    const isMusicAlreadyPlaying = musicListSource.find(music => music.id === id && music.isPlaying);
    const isMusicAlreadyPaused = musicListSource.find(music => music.id === id && music.isPaused);
    if (isMusicAlreadyPaused) {
      musicSound.resume();
      return dispatch(pausePlayingMusic(id, source, false));
    }
    if (isMusicAlreadyPlaying) {
      musicSound.pause();
      return dispatch(pausePlayingMusic(id, source, true));
    }
    const currentPlayingMusic = musicListSource.find(music => music.isPlaying);
    if (currentPlayingMusic) {
      dispatch(highlightPlayingMusic(currentPlayingMusic.id, source, false));
    }
    dispatch(changePlayingMusicOrder({ id, source }));
    const beforeEachMusic = (nextMusicId) => dispatch(highlightPlayingMusic(nextMusicId, source, true));
    const afterEachMusic = (previousMusicId) => dispatch(highlightPlayingMusic(previousMusicId, source, false));
    musicSound.autoPlayMusic(id, musicListSource, beforeEachMusic, afterEachMusic);
  }
};