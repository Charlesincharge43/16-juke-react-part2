import React from 'react';
import {Link} from 'react-router';

const Albums = (props) => {
  console.log("props", props);
  const albums = props.albums;
  const selectAlbum = props.selectAlbum;

  return (
    <div>
      <h3>Albums</h3>
      <div className="row">
      {
        albums.map(album => (
          <div className="col-xs-4" key={ album.id }>
            {/*<a className="thumbnail" href="#" onClick={() => selectAlbum(album.id)}>*/}
            <Link to={`/albums/${album.id}`} className="thumbnail" onClick={() => selectAlbum(album.id)}>
              <img src={ album.imageUrl } />
              <div className="caption">
                <h5>
                  <span>{ album.name }</span>
                </h5>
                <small>{ album.songs.length } songs</small>
              </div>
            </Link>
            {/*</a>*/}
          </div>
        ))
      }
      </div>
    </div>
  );
}

export default Albums;
