import { Component } from 'react';
import PropTypes from 'prop-types';

class Musiccard extends Component {
  render() {
    const { trackName, previewUrl } = this.props;
    return (
      <>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento audio
          <code>audio</code>
        </audio>
      </>
    );
  }
}

export default Musiccard;

Musiccard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
};
