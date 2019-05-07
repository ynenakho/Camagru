import React, { Component } from 'react';
import M from 'materialize-css';
import { connect } from 'react-redux';
import * as editPictureActions from '../../actions/editPictureActions';

class Frames extends Component {
  componentDidMount() {
    M.Carousel.init(this.carousel);
  }

  render() {
    const { changeFrame } = this.props;
    return (
      <div className="section section-carousel">
        <div className="row">
          <div className="col s12 center">
            <div
              style={{
                height: '150px'
              }}
              className="carousel"
              ref={carousel => (this.carousel = carousel)}
            >
              <div
                className="carousel-item"
                href="#one!"
                style={{
                  height: '100px'
                }}
              >
                <img
                  src="images/frame-1.png"
                  alt=""
                  width="200px"
                  height="100px"
                  onClick={() => changeFrame('images/frame-1.png')}
                />
              </div>
              <div className="carousel-item" href="#two!">
                <img
                  src="images/frame-2.png"
                  alt=""
                  width="200px"
                  height="100px"
                  onClick={() => changeFrame('images/frame-2.png')}
                />
              </div>
              <div className="carousel-item" href="#three!">
                <img
                  src="images/frame-3.png"
                  alt=""
                  width="200px"
                  height="100px"
                  onClick={() => changeFrame('images/frame-3.png')}
                />
              </div>
              <div className="carousel-item" href="#four!">
                <img
                  src="images/frame-4.png"
                  alt=""
                  width="200px"
                  height="100px"
                  onClick={() => changeFrame('images/frame-4.png')}
                />
              </div>
              <div className="carousel-item" href="#five!">
                <img
                  src="images/frame-5.png"
                  alt=""
                  width="200px"
                  height="100px"
                  onClick={() => changeFrame('images/frame-5.png')}
                />
              </div>
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
