import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as editPictureActions from '../../actions/editPictureActions';

class Canvas extends Component {
  componentDidMount() {
    this.ctx = this.canvas.getContext('2d');
    this.background.onload = () => {
      this.canvas.width = this.background.width;
      this.canvas.height = this.background.height;
      this.ctx.drawImage(
        this.background,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      this.props.setCanvasData(this.canvas.toDataURL());
    };
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.frame !== prevProps.frame ||
      this.props.coords !== prevProps.coords
    ) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(
        this.background,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      this.drawStickers();
      const frame = new Image();
      frame.onload = () => {
        this.ctx.drawImage(frame, 0, 0, this.canvas.width, this.canvas.height);
        this.props.setCanvasData(this.canvas.toDataURL());
      };
      frame.src = this.props.frame;
      this.props.setCanvasData(this.canvas.toDataURL());
    }
  }

  drawStickers = () => {
    const { coords } = this.props;
    if (!coords) return;
    for (let i = 0; i < coords.length; i++) {
      const { x, y } = this.getStickerPos(
        coords[i].x,
        coords[i].y,
        coords[i].oldWidth,
        coords[i].oldHeight
      );
      const stickerImg = new Image();
      stickerImg.onload = () => {
        this.ctx.drawImage(stickerImg, x, y, 100, 100);
      };
      stickerImg.src = coords[i].name;
    }
  };

  getStickerPos = (stickerX, stickerY, oldWidth, oldHeight) => {
    const x = (stickerX / oldWidth) * this.canvas.width;
    const y = (stickerY / oldHeight) * this.canvas.height;
    return { x, y };
  };

  getMousePos(e) {
    const rect = this.canvas.getBoundingClientRect();

    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    const width = rect.right - rect.left;
    if (this.canvas.width !== width) {
      const height = rect.bottom - rect.top;
      x = x * (this.canvas.width / width);
      y = y * (this.canvas.height / height);
    }
    return { x, y, clientX: e.clientX, clientY: e.clientY };
  }

  handleClick = e => {
    const { sticker, addStickerCoords } = this.props;
    if (!sticker) return;
    const position = this.getMousePos(e);
    const stickerImg = new Image();

    stickerImg.onload = () => {
      this.ctx.drawImage(
        stickerImg,
        position.x - 50,
        position.y - 50,
        100,
        100
      );
    };
    stickerImg.src = sticker;
    addStickerCoords({
      name: sticker,
      x: position.x - 50,
      y: position.y - 50,
      oldWidth: this.canvas.width,
      oldHeight: this.canvas.height
    });
  };

  render() {
    return (
      <div>
        <canvas
          onClick={e => this.handleClick(e)}
          ref={canvas => (this.canvas = canvas)}
          style={{ width: '100%' }}
        />
        <img
          ref={background => (this.background = background)}
          style={{ display: 'none' }}
          src={this.props.image}
          alt="background"
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  frame: state.edit.frame,
  sticker: state.edit.sticker,
  coords: state.edit.coords
});

export default connect(
  mapStateToProps,
  editPictureActions
)(Canvas);
