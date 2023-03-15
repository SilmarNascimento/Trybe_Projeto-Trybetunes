import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loagind';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      albumInfo: [],
      musicArray: [],
      isLoading: false,
      favoriteSongList: [],
    };
  }

  async componentDidMount() {
    await this.getfavoriteSongList();
    const { match: { params: { id } } } = this.props;
    const musicArray = await getMusics(id);
    const albumObj = musicArray.splice(0, 1);
    this.setState({
      albumInfo: albumObj,
      musicArray,
    });
  }

  // recupera a lista de musicas favoritas e salva no estado do componente
  getfavoriteSongList = async () => {
    this.setState({
      isLoading: true,
    });
    const favoriteSongList = await getFavoriteSongs();
    this.setState({
      favoriteSongList,
      isLoading: false,
    });
  };

  handleFavorite = async (objMusic) => {
    const { favoriteSongList } = this.state;
    if (favoriteSongList.some((favSong) => favSong.trackId === objMusic.trackId)) {
      this.setState({
        isLoading: true,
      });
      console.log('remove lista do favorito');
      await removeSong(objMusic);
      this.setState({
        isLoading: false,
      });
    } else {
      this.setState({
        isLoading: true,
      });
      console.log('adiciona a musica nos favoritos');
      await addSong(objMusic);
      this.setState({
        isLoading: false,
      });
    }
    await this.getfavoriteSongList();
  };

  render() {
    const { albumInfo, musicArray, favoriteSongList, isLoading } = this.state;
    const renderMusicCard = musicArray.map((music) => {
      const { trackNumber } = music;
      const isFavorite = favoriteSongList.some((Song) => Song.trackId === music.trackId);
      return (
        <MusicCard
          key={ trackNumber }
          music={ music }
          isFavorite={ isFavorite }
          handleFavorite={ this.handleFavorite }
        />
      );
    });

    const renderAlbumCard = albumInfo.map((music, index) => {
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

    const renderAlbumMusic = (
      <>
        { renderAlbumCard }
        <div>
          { renderMusicCard }
        </div>
      </>
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
