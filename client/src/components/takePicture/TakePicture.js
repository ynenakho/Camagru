import React, { Component } from 'react';
import WebcamCapture from './WebcamCapture';
import Sticker from './Sticker';
import RenderAllPictures from './RenderAllPictures';
import { connect } from 'react-redux';
import * as editPictureActions from '../../actions/editPictureActions';
import * as mainActions from '../../actions/mainActions';

class TakePicture extends Component {
  state = { x: 0, y: 0 };

  componentDidMount() {
    const { getAllPictures } = this.props;
    getAllPictures();
    this.selectedSticker = document.querySelector('#sticker');
  }

  _onMouseMove = e => {
    const { pageX, pageY } = e.nativeEvent;
    if (this.selectedSticker) {
      this.selectedSticker.style.transform = `translate3d(${pageX}px, ${pageY}px, 0)`;
    }
    this.setState({ x: pageX, y: pageY });
  };

  _onTouchMove = e => {
    const x = e.nativeEvent.pageX;
    const y = e.nativeEvent.pageY;
    if (this.selectedSticker) {
      this.selectedSticker.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }
    this.setState({ x, y });
  };

  handleClick = () => {
    const { chooseSticker, sticker } = this.props;
    if (sticker) {
      chooseSticker('');
    }
  };
  render() {
    return (
      <div
        onMouseMove={this._onMouseMove}
        onTouchMove={this._onTouchMove}
        onClick={this.handleClick}
      >
        <Sticker />
        <div className="row">
          <div className="col s12 m8">
            <div className="card-panel blue darken-2 white-text center">
              <WebcamCapture />
            </div>
          </div>
          <div className="col s12 m4">
            <div className="card-panel blue darken-2 white-text center">
              <RenderAllPictures />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sticker: state.edit.sticker,
  pictures: state.main.pictures
});

export default connect(
  mapStateToProps,
  { ...editPictureActions, ...mainActions }
)(TakePicture);
