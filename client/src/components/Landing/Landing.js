import React, { Component } from 'react';
import { connect } from 'react-redux';

import PictureDiv from './PictureDiv';
import Button from '../common/Button';
import * as mainActions from '../../actions/mainActions';
import styles from './Landing.module.css';

export class Landing extends Component {
  state = {
    page: 0
  };

  componentDidMount() {
    const { getFivePictures } = this.props;
    const { page } = this.state;
    getFivePictures(page);
  }

  componentDidUpdate(prevProps) {
    const { getFivePictures } = this.props;
    const { page } = this.state;
    if (prevProps.pictures.length !== this.props.pictures.length) {
      getFivePictures(page);
    }
  }

  renderPictures = () => {
    const { pictures } = this.props;
    return pictures.map(picture => (
      <PictureDiv picture={picture} key={picture._id} />
    ));
  };

  prevPage = () => {
    const { getFivePictures } = this.props;
    const { page } = this.state;
    if (page === 0) return;
    getFivePictures(page - 1);
    this.setState({
      page: page - 1
    });
  };

  nextPage = () => {
    const { pictures, getFivePictures } = this.props;
    const { page } = this.state;
    if (pictures.length < 5) return;
    getFivePictures(page + 1);
    this.setState({
      page: page + 1
    });
  };

  renderArrows = () => {
    const { page } = this.state;
    return (
      <div className={styles.prevNextDiv}>
        <Button name="Prev" func={this.prevPage} />
        <h5>{page + 1}</h5>
        <Button name="Next" func={this.nextPage} />
      </div>
    );
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <div className="card-panel blue darken-2 white-text">
              {this.renderPictures()}
              {this.renderArrows()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pictures: state.main.picturesFive
});

export default connect(
  mapStateToProps,
  mainActions
)(Landing);
