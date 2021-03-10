import React, { Component } from 'react';
import Webcam from 'react-webcam';
import Canvas from './Canvas';
import { connect } from 'react-redux';
import Frames from './Frames';
import Stickers from './Stickers';
import * as editPictureActions from '../../actions/editPictureActions';
import * as mainActions from '../../actions/mainActions';
import Button from '../common/Button';

class WebcamCapture extends Component {
  state = { imageSrc: '' };

  setRef = (webcam) => (this.webcam = webcam);

  savePhoto = () => {
    const { savePictureToServer, canvas } = this.props;
    savePictureToServer(canvas);
    this.clearChanges();
  };

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    this.setState({ imageSrc });
  };

  clearChanges = () => {
    this.props.clearCoords();
    this.props.changeFrame('');
  };

  resetPhoto = () => {
    this.props.resetPicture();
    this.setState({ imageSrc: '' });
  };

  renderWebcam = () => {
    const videoConstraints = {
      width: 1536,
      height: 1024,
      facingMode: 'user',
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
    if (!this.state.imageSrc) {
      return <Button func={this.capture} name="Take photo" />;
    } else {
      return (
        <div className="camButtonsDiv">
          <Button func={this.resetPhoto} name="Retake photo" />
          <Button func={this.clearChanges} name="Clear" />
          <Button func={this.savePhoto} name="Save photo" />
        </div>
      );
    }
  };

  renderEdits = () => {
    if (this.state.imageSrc) {
      return (
        <div>
          <Frames />
          <Stickers />
        </div>
      );
    }
  };

  render() {
    return (
      <div className="">
        {this.renderWebcam()}
        {this.renderButtons()}
        {this.renderEdits()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  canvas: state.edit.canvas,
});

export default connect(mapStateToProps, {
  ...editPictureActions,
  ...mainActions,
})(WebcamCapture);
