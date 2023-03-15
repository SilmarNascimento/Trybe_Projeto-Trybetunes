import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Musiccard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loagind';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      renderAlbumCard: [],
      renderMusicCard: [],
      isLoading: false,
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const musicArray = await getMusics(id);
    const albumObj = musicArray.splice(0, 1);
    const renderMusicCard = musicArray.map((music) => {
      const { trackNumber } = music;
      return (
        <Musiccard
          key={ trackNumber }
          handleFavorite={ this.handleFavorite }
          music={ music }
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

  handleFavorite = async () => {
    const favoriteSongs = await getFavoriteSongs();
    console.log(this.state);
    const { music: song } = this.props;
    console.log(song);
    if (favoriteSongs.some((favSong) => favSong.trackId === song.trackId)) {
      this.setState({
        isLoading: true,
      });
      await removeSong(song);
      this.setState({
        isLoading: false,
      });
    } else {
      this.setState({
        isLoading: true,
      });
      await addSong(song);
      this.setState({
        isLoading: false,
      });
    }
  };

  render() {
    const { renderAlbumCard, renderMusicCard, isLoading } = this.state;
    const renderAlbumMusic = (
      <div>
        { renderAlbumCard }
        <div>
          { renderMusicCard }
        </div>
      </div>
    );
    return (
      <div data-testid="page-album">
        <Header />
        { isLoading ? <Loading /> : renderAlbumMusic }
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
