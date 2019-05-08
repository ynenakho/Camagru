import React, { Component } from 'react';
import Webcam from 'react-webcam';
import Canvas from './Canvas';
import { connect } from 'react-redux';
import * as editPictureActions from '../../actions/editPictureActions';

class WebcamCapture extends Component {
  state = {
    imageSrc: ''
  };

  setRef = webcam => {
    this.webcam = webcam;
  };

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    this.setState({
      imageSrc
    });
  };

  clearChanges = () => {
    this.props.addStickerCoords([]);
    this.props.changeFrame('');
  };

  resetPhoto = () => {
    this.props.clearPicture();
    this.setState({
      imageSrc: ''
    });
  };

  renderWebcam = () => {
    const videoConstraints = {
      width: 1536,
      height: 1024,
      facingMode: 'user'
    };

    if (!this.state.imageSrc) {
      return (
        <Webcam
          audio={false}
          height={'100%'}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={'100%'}
          videoConstraints={videoConstraints}
        />
      );
    } else {
      return (
        <Canvas
          image={this.state.imageSrc}
          height={'100%'}
          width={'100%'}
          onChooseFrame={this.props.onChooseFrame}
        />
      );
    }
  };

  renderButtons = () => {
    const { savePictureToServer } = this.props;
    if (!this.state.imageSrc) {
      return (
        <button
          className="btn grey lighten-4 black-text"
          onClick={this.capture}
        >
          Capture photo
        </button>
      );
    } else {
      return (
        <div>
          <button
            className="btn grey lighten-4 black-text"
            onClick={() => this.resetPhoto()}
          >
            Reset
          </button>
          <button
            className="btn grey lighten-4 black-text"
            onClick={() => this.clearChanges()}
          >
            Clear
          </button>
          <button
            className="btn grey lighten-4 black-text"
            onClick={() => {
              savePictureToServer(this.props.canvas);
              this.resetPhoto();
            }}
          >
            Save photo
          </button>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="">
        {this.renderWebcam()}
        {this.renderButtons()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  canvas: state.edit.canvas
});

export default connect(
  mapStateToProps,
  editPictureActions
)(WebcamCapture);
