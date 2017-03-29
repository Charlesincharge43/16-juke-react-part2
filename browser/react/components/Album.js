import React from 'react';
import Songs from '../components/Songs';

export default class Album extends React.Component {

  componentDidMount() {
  const albumId = this.props.routeParams.albumId;
  const selectAlbum = this.props.selectAlbum;
  selectAlbum(albumId);
  /*const currentSong = this.props.currentSong;
  const isPlaying = this.props.isPlaying;
  const toggleOne = this.props.toggleOne;*/

  }

 
  render() {
    return (
      <div className="album">
        <div>
          <h3>{ this.props.album.name }</h3>
          <img src={ this.props.album.imageUrl } className="img-thumbnail" />
        </div>
        <Songs songs={this.props.album.songs} />
      </div>
      )
  };

}

