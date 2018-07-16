import React from 'react';

const styles = {
  container: {
    display: 'flex',
    marginBottom: '1%',
    padding: '1.5% 2%',
    margin: '0'
  },
  infosContainer: {
    flex: '13'
  },
  title: {
    margin: 0,
    fontSize: '1.2em'
  },
  description: {
    fontSize: '1em',
    margin: 0,
    fontStyle: 'oblique',
    color: '#353535'
  },
  playBtn: {
    color: 'rgb(47, 54, 58)',
    cursor: 'pointer',
    marginLeft: '2%'
  },
  addPlaylistBtn: {
    cursor: 'pointer',
    color: 'rgb(47, 54, 58)'
  },
  removeBtn: {
    color: 'rgb(47, 54, 58)',
    cursor: 'pointer',
  },
  playing: {
    border: '2px solid #ff0000',
    borderRadius: '5px'
  }
}

const MusicItem = ({ index, music, isPlayList, addMusic, removeMusic, playMusic }) => {
  const strippedStyle = index % 2 === 0 ? { backgroundColor: '#dedede' } : { backgroundColor: 'white' };
  const playingStyle = music.isPlaying ? styles.playing : { border: 'none' };

  const renderPlayStatusIcon = () => {
    if (music.isPlaying) {
      if (music.isPaused) return <i className="fas fa-2x fa-play-circle" />;
      return <i className="far fa-2x fa-pause-circle" />;
    }
    return <i className="far fa-2x fa-play-circle"></i>
  }

  const renderAddMusicBtn = () => {
    return (
      <div onClick={addMusic(music)} style={styles.addPlaylistBtn}>
        <i className="fa fa-2x fa-plus" aria-hidden="true"></i>
      </div>
    );
  }
  
  const renderPlayMusicBtn = () => {
    const musicListSource = isPlayList ? 'playlist' : 'list';
    const musicIcon = renderPlayStatusIcon();
    return (
      <div onClick={playMusic(music.id, musicListSource)} style={styles.playBtn}>
        { musicIcon }
      </div>
    );
  }
  
  const renderRemoveMusicBtn = () => {
    return (
      <div onClick={removeMusic(music.id)} style={styles.removeBtn}>
        <i className="fa fa-2x fa-times" aria-hidden="true"></i>
      </div>
    );
  }
  
  return (
    <div className="musicItem" style={{...styles.container, ...strippedStyle, ...playingStyle}}>
      <div style={styles.infosContainer} className="musicInfoContainer">
        <h4 style={styles.title}>
          {music.title}
        </h4>
        <p style={styles.description}>
          {music.description}
        </p>
      </div>
      { isPlayList ? renderRemoveMusicBtn() : renderAddMusicBtn()}
      {renderPlayMusicBtn()}
    </div>
  );
};

export default MusicItem;