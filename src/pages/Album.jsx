import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Musiccard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      renderAlbumCard: [],
      renderMusicCard: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const musicArray = await getMusics(id);
    const albumObj = musicArray.splice(0, 1);
    const renderMusicCard = musicArray.map((music) => {
      const {
        trackName,
        previewUrl,
        trackNumber,
        trackId,
      } = music;
      return (
        <Musiccard
          key={ trackNumber }
          trackName={ trackName }
          previewUrl={ previewUrl }
          trackId={ trackId }
        />
      );
    });
    const renderAlbumCard = albumObj.map((music, index) => {
      const {
        collectionName,
        artworkUrl100: imgURL,
        artistName,
        trackCount,
      } = music;
      return (
        <div key={ index }>
          <h3 data-testid="album-name">{ collectionName }</h3>
          <img src={ imgURL } alt={ collectionName } />
          <p data-testid="artist-name">{ artistName }</p>
          <p>{ trackCount }</p>
        </div>
      );
    });
    this.setState({
      renderAlbumCard,
      renderMusicCard,
    });
  }

  render() {
    const { renderAlbumCard, renderMusicCard } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          { renderAlbumCard }
          <div>
            { renderMusicCard }
          </div>
        </div>
      </div>
    );
  }
}

export default Album;

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
