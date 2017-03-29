import React, { Component } from 'react';
import axios from 'axios';

import initialState from '../initialState';

import Albums from '../components/Albums.js';
import Album from '../components/Album';
import Sidebar from '../components/Sidebar';
import Player from '../components/Player';

import { convertAlbum, convertAlbums } from '../utils';

export default class AppContainer extends Component {

  constructor (props) {
    super(props);
    this.state = initialState;

    this.selectAlbum = this.selectAlbum.bind(this);
    this.deselectAlbum = this.deselectAlbum.bind(this);
  }

  componentDidMount () {
    axios.get('/api/albums/')
      .then(res => res.data)
      .then(album => this.onLoad(convertAlbums(album)));
  }

  onLoad (albums) {
    this.setState({
      albums: albums
    });
  }

  selectAlbum (albumId) {
    axios.get(`/api/albums/${albumId}`)
      .then(res => res.data)
      .then(album => this.setState({
        selectedAlbum: convertAlbum(album)
      }));
  }

  deselectAlbum () {
    this.setState({ selectedAlbum: {}});
  }

  render () {
    console.log("yo", this.state.albums);
    return (
      <div id="main" className="container-fluid">
        <div className="col-xs-2">
          <Sidebar deselectAlbum={this.deselectAlbum} />
        </div>
        <div className="col-xs-10">
        {
          this.props.children ?
          React.cloneElement(this.props.children, {
              album: this.state.selectedAlbum,
              currentSong: this.state.currentSong,
              isPlaying: this.state.isPlaying,
              toggle: this.toggleOne,

              albums: this.state.albums,
              selectAlbum: this.selectAlbum 
          })
          :null
          /*this.state.selectedAlbum.id ?
          <Album album={this.state.selectedAlbum} /> :
          <Albums albums={this.state.albums} selectAlbum={this.selectAlbum} />*/
        }
        </div>
        <Player />
      </div>
    );
  }
}
