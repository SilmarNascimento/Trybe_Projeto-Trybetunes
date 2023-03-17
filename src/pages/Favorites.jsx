import { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loadind';
import Musiccard from '../components/MusicCard';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      favoriteSongList: [],
    };
  }

  async componentDidMount() {
    await this.getfavoriteSongList();
  }

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

  handleRemoveFavorite = async (objMusic) => {
    const { favoriteSongList } = this.state;
    if (favoriteSongList.some((favSong) => favSong.trackId === objMusic.trackId)) {
      this.setState({
        isLoading: true,
      });
      await removeSong(objMusic);
      this.setState({
        isLoading: false,
      });
    }
    await this.getfavoriteSongList();
  };

  render() {
    const { isLoading, favoriteSongList } = this.state;
    const { handleRemoveFavorite } = this;
    const renderFavorite = (
      favoriteSongList.map((song) => {
        const { trackId } = song;
        const isFav = favoriteSongList.some((msc) => msc.trackId === trackId);
        return (
          <Musiccard
            key={ trackId }
            music={ song }
            isFavorite={ isFav }
            favoriteSongList={ favoriteSongList }
            handleFavorite={ handleRemoveFavorite }
          />
        );
      })
    );
    return (
      <div data-testid="page-favorites">
        <Header />
        { isLoading ? <Loading /> : renderFavorite }
      </div>
    );
  }
}

export default Favorites;
