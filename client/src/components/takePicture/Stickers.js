import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as editPictureActions from '../../actions/editPictureActions';
import ReactDOM from 'react-dom';

export class Stickers extends Component {
  render() {
    const { chooseSticker } = this.props;
    return (
      <div>
        <img
          src="images/sticker-1.png"
          width="100px"
          height="100px"
          alt=""
          onClick={() => chooseSticker('images/sticker-1.png')}
        />
        <img
          src="images/sticker-2.png"
          width="100px"
          height="100px"
          alt=""
          onClick={() => chooseSticker('images/sticker-2.png')}
        />
        <img
          src="images/sticker-3.png"
          width="100px"
          height="100px"
          alt=""
          onClick={() => chooseSticker('images/sticker-3.png')}
        />
        <img
          src="images/sticker-4.png"
          width="100px"
          height="100px"
          alt=""
          onClick={() => chooseSticker('images/sticker-4.png')}
        />
        <img
          src="images/sticker-5.png"
          width="100px"
          height="100px"
          alt=""
          onClick={() => chooseSticker('images/sticker-5.png')}
        />
      </div>
    );
  }
}

export default connect(
  null,
  editPictureActions
)(Stickers);
