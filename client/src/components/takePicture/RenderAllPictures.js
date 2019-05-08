import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as editPictureActions from '../../actions/editPictureActions';
import RenderPicture from './RenderPicture';

export class RenderAllPictures extends Component {
  render() {
    const { pictures, auth } = this.props;
    return pictures.map(picture => (
      <RenderPicture picture={picture} auth={auth} key={picture._id} />
    ));
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  pictures: state.edit.pictures
});

export default connect(
  mapStateToProps
  // editPictureActions
)(RenderAllPictures);
