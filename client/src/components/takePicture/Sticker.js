import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

export class Sticker extends Component {
  render() {
    const { sticker } = this.props;
    return (
      <div>
        {ReactDOM.createPortal(
          <img
            src={sticker}
            width="100px"
            height="100px"
            alt=""
            style={!sticker ? { display: 'none' } : {}}
          />,
          document.querySelector('#sticker')
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  sticker: state.edit.sticker,
});

export default connect(mapStateToProps)(Sticker);
