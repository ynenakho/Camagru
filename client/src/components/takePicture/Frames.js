import React, { Component } from 'react';
import M from 'materialize-css';
import { connect } from 'react-redux';

import * as editPictureActions from '../../actions/editPictureActions';
import styles from './TakePicture.module.css';

class Frames extends Component {
  componentDidMount() {
    M.Carousel.init(this.carousel);
  }

  renderCarouselItem = path => {
    const { changeFrame } = this.props;
    return (
      <div className={`carousel-item ${styles.carouselItem}`} href="#">
        <img
          className={styles.carouselImage}
          src={path}
          alt=""
          width="200px"
          height="100px"
          onClick={() => changeFrame(path)}
        />
      </div>
    );
  };

  render() {
    return (
      <div className="section section-carousel">
        <div className="row">
          <div className="col s12 center">
            <div
              className={`carousel ${styles.carouselMain}`}
              ref={carousel => (this.carousel = carousel)}
            >
              {this.renderCarouselItem('images/frame-1.png')}
              {this.renderCarouselItem('images/frame-2.png')}
              {this.renderCarouselItem('images/frame-3.png')}
              {this.renderCarouselItem('images/frame-4.png')}
              {this.renderCarouselItem('images/frame-5.png')}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  editPictureActions
)(Frames);
