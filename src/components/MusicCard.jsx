import { Component } from 'react';
import PropTypes from 'prop-types';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Musiccard extends Component {
  constructor() {
    super();
    this.state = {
      isFavorite: false,
    };
  }

  async componentDidMount() {
    const { music } = this.props;
    const { trackId } = music;
    const favoriteSongs = await getFavoriteSongs();
    if (favoriteSongs.some((song) => song.trackId === trackId)) {
      this.setState({ isFavorite: true });
    }
  }

  render() {
    const { music } = this.props;
    const { trackName, previewUrl, trackId } = music;
    const { handleFavorite } = this.props;
    const { isFavorite } = this.state;
    return (
      <>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento audio
          <code>audio</code>
        </audio>
        <label htmlFor="favoriteSong">
          Favorita
          <input
            type="checkbox"
            name="favoriteSong"
            id="favoriteSong"
            checked={ isFavorite }
            onChange={ handleFavorite }
            data-testid={ `checkbox-music-${trackId}` }
          />
        </label>
      </>
    );
  }
}

export default Musiccard;

Musiccard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  handleFavorite: PropTypes.func.isRequired,
};
