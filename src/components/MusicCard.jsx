import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class MusicCard extends Component {
  render() {
    const {
      artistName,
      collectionName,
      collectionId,
      imgURL,
      trackCount,
    } = this.props;
    console.log(collectionId);
    return (
      <li>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          <h3>{ collectionName }</h3>
          <img src={ imgURL } alt={ collectionName } />
          <p>{ artistName }</p>
          <p>{ trackCount }</p>
        </Link>
      </li>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  artistName: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  collectionId: PropTypes.string.isRequired,
  imgURL: PropTypes.string.isRequired,
  trackCount: PropTypes.number.isRequired,
};