import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as editPictureActions from '../../actions/editPictureActions';

export class Stickers extends Component {
  renderSticker = path => {
    const { chooseSticker } = this.props;
    return (
      <img
        src={path}
        width="100px"
        height="100px"
        alt=""
        onClick={() => chooseSticker(path)}
      />
    );
  };
  render() {
    return (
      <div>
        {this.renderSticker('images/sticker-1.png')}
        {this.renderSticker('images/sticker-2.png')}
        {this.renderSticker('images/sticker-3.png')}
        {this.renderSticker('images/sticker-4.png')}
        {this.renderSticker('images/sticker-5.png')}
      </div>
    );
  }
}

export default connect(
  null,
  editPictureActions
)(Stickers);
