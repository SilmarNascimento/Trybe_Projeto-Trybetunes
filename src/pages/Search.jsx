import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loagind';
import MusicCard from '../components/MusicCard';

class Search extends Component {
  render() {
    const { isLoading, searchArtistMusic, searchedInput, albumCollection } = this.props;
    const { handleChange, handleSearchAlbumMusic } = this.props;
    const minChar = 2;
    const isValid = searchArtistMusic.length >= minChar;
    const albumCards = albumCollection.map((album) => {
      const {
        artistName,
        collectionId,
        collectionName,
        artworkUrl100,
        trackCount,
      } = album;
      return (
        <MusicCard
          key={ collectionId }
          artistName={ artistName }
          collectionName={ collectionName }
          collectionId={ collectionId }
          imgURL={ artworkUrl100 }
          trackCount={ trackCount }
        />
      );
    });
    const foundAlbum = (
      <>
        <h2>{ `Resultado de álbuns de: ${searchedInput}` }</h2>
        <ul>
          { albumCards }
        </ul>
      </>
    );
    const albumNotFound = 'Nenhum álbum foi encontrado';
    const renderForm = (
      <>
        <form action="">
          <fieldset>
            <legend>Pesquisar  por Música ou Álbuns</legend>
            <label htmlFor="searchArtistMusic">
              <input
                type="text"
                name="searchArtistMusic"
                id="searchArtistMusic"
                value={ searchArtistMusic }
                onChange={ handleChange }
                data-testid="search-artist-input"
              />
            </label>
            <button
              disabled={ !isValid }
              onClick={ handleSearchAlbumMusic }
              data-testid="search-artist-button"
            >
              Pesquisar
            </button>
          </fieldset>
        </form>
        <div>
          { !searchedInput && !albumCollection && !isLoading }
          { searchedInput && albumCollection[0] && !isLoading && foundAlbum }
          { searchedInput && !albumCollection[0] && !isLoading && albumNotFound }
        </div>
      </>
    );
    return (
      <div data-testid="page-search">
        <Header />
        { (isLoading && searchArtistMusic) ? <Loading /> : renderForm }
      </div>
    );
  }
}

export default Search;

Search.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  searchArtistMusic: PropTypes.string.isRequired,
  searchedInput: PropTypes.string.isRequired,
  albumCollection: PropTypes.arrayOf(
    PropTypes.shape({
      artistId: PropTypes.number.isRequired,
      artistName: PropTypes.string.isRequired,
      collectionId: PropTypes.number.isRequired,
      collectionName: PropTypes.string.isRequired,
      artworkUrl100: PropTypes.string.isRequired,
      releaseDate: PropTypes.string.isRequired,
      trackCount: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSearchAlbumMusic: PropTypes.func.isRequired,
};
