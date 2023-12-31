import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loadind';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      albumInfo: {},
      musicArray: [],
      isLoading: false,
      favoriteSongList: [],
    };
  }

  async componentDidMount() {
    await this.getfavoriteSongList();
    const { match: { params: { id } } } = this.props;
    const [albumObj, ...musicArray] = await getMusics(id);
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
      await removeSong(objMusic);
      this.setState({
        isLoading: false,
      });
    } else {
      this.setState({
        isLoading: true,
      });
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
      const { trackId } = music;
      const isFavorite = favoriteSongList.some((Song) => Song.trackId === music.trackId);
      return (
        <MusicCard
          key={ trackId }
          music={ music }
          isFavorite={ isFavorite }
          handleFavorite={ this.handleFavorite }
        />
      );
    });

    const renderAlbumCard = (
      <div>
        <h3 data-testid="album-name">{ albumInfo.collectionName }</h3>
        <img src={ albumInfo.artworkUrl100 } alt={ albumInfo.collectionName } />
        <p data-testid="artist-name">{ albumInfo.artistName }</p>
        <p>{ albumInfo.trackCount }</p>
      </div>
    );

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
