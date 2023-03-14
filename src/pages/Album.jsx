import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const { albumCollection } = this.props;
    const musicArray = await getMusics(id);
    const albumObj = albumCollection.find(({ collectionId }) => collectionId === id);
  }

  render() {
    const { match: { params: { id } } } = this.props;
    return (
      <div data-testid="page-album">
        <Header />
        Album
      </div>
    );
  }
}

export default Album;
