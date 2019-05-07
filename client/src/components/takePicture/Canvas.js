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
      frame.src = this.props.frame;
      this.ctx.drawImage(frame, 0, 0, this.canvas.width, this.canvas.height);
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
      stickerImg.src = coords[i].name;
      this.ctx.drawImage(stickerImg, x, y, 100, 100);
    }
  };

  getStickerPos = (stickerX, stickerY, oldWidth, oldHeight) => {
    const rect = this.canvas.getBoundingClientRect();

    let x = (stickerX / oldWidth) * this.canvas.width;
    let y = (stickerY / oldHeight) * this.canvas.height;

    // const width = rect.right - rect.left;
    // if (this.canvas.width !== width) {
    //   const height = rect.bottom - rect.top;
    //   x = x * (this.canvas.width / width);
    //   y = y * (this.canvas.height / height);
    // }
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
    stickerImg.src = sticker;
    this.ctx.drawImage(stickerImg, position.x - 50, position.y - 50, 100, 100);
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
          style={{
            width: '100%',
            style: '100%'
          }}
        />
        <img
          ref={background => (this.background = background)}
          style={{
            display: 'none'
          }}
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
