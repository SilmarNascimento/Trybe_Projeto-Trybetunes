import { Component } from 'react';
import PropTypes from 'prop-types';

class Musiccard extends Component {
  render() {
    const { music, isFavorite } = this.props;
    const { trackName, previewUrl, trackId } = music;
    const { handleFavorite } = this.props;
    return (
      <>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento audio
          <code>audio</code>
        </audio>
        <label htmlFor={ trackId }>
          Favorita
          <input
            type="checkbox"
            name={ trackId }
            id={ trackId }
            checked={ isFavorite }
            onChange={ () => handleFavorite(music) }
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
  isFavorite: PropTypes.bool.isRequired,
  handleFavorite: PropTypes.func.isRequired,
};
