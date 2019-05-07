import React, { Component } from 'react';
import WebcamCapture from './WebcamCapture';
import Frames from './Frames';
import Stickers from './Stickers';
import Sticker from './Sticker';
import { connect } from 'react-redux';
import * as editPictureActions from '../../actions/editPictureActions';

class TakePicture extends Component {
  state = {
    x: 0,
    y: 0
  };

  componentDidMount() {
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
        <div className="row" style={{ margin: 0 }}>
          <div className="col s12 m8">
            <div
              className="card-panel blue darken-2 white-text center"
              style={{
                minHeight: 'calc(100vh - 144px)',
                margin: '15px 0',
                display: 'flex',
                flexDirection: 'column',
                justifyItems: 'space-between'
              }}
            >
              <WebcamCapture />
              <Frames />
              <Stickers />
            </div>
          </div>
          <div className="col s12 m4">
            <div
              className="card-panel blue darken-2 white-text center"
              style={{ margin: 0 }}
            >
              pictures list
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sticker: state.edit.sticker
});

export default connect(
  mapStateToProps,
  editPictureActions
)(TakePicture);
