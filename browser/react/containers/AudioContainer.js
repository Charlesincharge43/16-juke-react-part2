/**
 * ---------------------------------------
 *  EVERYTHING BELOW IS OPTIONAL, AND NOT REQUIRED DURING THE WORKSHOP!
 * ---------------------------------------
 * This component contains all of the state/behavior needed to play music!
 * To make the music come to life, all you need to do is pass down the appropriate props to the
 * components that need them. This is an OPTIONAL exercise that can be done at any point in Juke.
 *
 * To start, we music first cause this component to render at the top of our application
 * INSTEAD of our AppContainer component. That way, our AppContainer compponent will instead by rendered BY the
 * AudioContainer, allowing to have all of the song state/behavior passed down to it.
 *
 */

import React, { Component } from 'react';
import AppContainer from './AppContainer';
import AUDIO from '../audio';
import { skip } from '../utils';

export default class AudioContainer extends Component {

  constructor (props) {
    super(props);
    this.state = {
      currentSong: {},
      currentSongList: [],
      isPlaying: false,
      progress: 0
    };

    this.toggle = this.toggle.bind(this);
    this.toggleOne = this.toggleOne.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
  }

  componentDidMount () {
    AUDIO.addEventListener('ended', () =>
      this.next());
    AUDIO.addEventListener('timeupdate', () =>
      this.setProgress(AUDIO.currentTime / AUDIO.duration));
  }

  play () {
    AUDIO.play();
    this.setState({ isPlaying: true });
  }

  pause () {
    AUDIO.pause();
    this.setState({ isPlaying: false });
  }

  load (currentSong, currentSongList) {
    AUDIO.src = currentSong.audioUrl;
    AUDIO.load();
    this.setState({
      currentSong: currentSong,
      currentSongList: currentSongList
    });
  }

  startSong (song, list) {
    this.pause();
    this.load(song, list);
    this.play();
  }

  toggleOne (selectedSong, selectedSongList) {
    if (selectedSong.id !== this.state.currentSong.id)
      this.startSong(selectedSong, selectedSongList);
    else this.toggle();
  }

  toggle () {
    if (this.state.isPlaying) this.pause();
    else this.play();
  }

  next () {
    this.startSong(...skip(1, this.state));
  }

  prev () {
    this.startSong(...skip(-1, this.state));
  }

  setProgress (progress) {
    this.setState({ progress: progress });
  }

  render () {
    return <AppContainer {...this.state} />
  }
}
