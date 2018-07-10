import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMusicIfNeeds } from '../../logic/actionCreators/musicList';
import { addMusic } from '../../logic/actionCreators/musicPlaylist';
import MusicList from './MusicList';
import MusicPlayList from './MusicPlaylist';

class MusicContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.fetchMusicIfNeeds();
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.musicList.items.length !== nextProps.musicList.items.length) return true;
    return false;
  }

  fetchMusicIfNeeds = () => {
    this.props.fetchMusicIfNeeds();
  };

  render() {
    console.log(this.props)
    return (
      <div>
        <h1>List</h1>
        <MusicList
          musicListItems={this.props.musicList.items}
        />
        <MusicPlayList
          addMusic={this.props.addMusic}
          musicPlayListItems={this.props.musicPlaylist}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  musicList: state.musicList,
  musicPlaylist: state.musicPlaylist
});

const mapDispatchToProps = (dispatch) => ({
  fetchMusicIfNeeds: () => dispatch(fetchMusicIfNeeds()),
  addMusic: (music) => () => dispatch(addMusic(music))
});

export default connect(mapStateToProps, mapDispatchToProps)(MusicContainer);