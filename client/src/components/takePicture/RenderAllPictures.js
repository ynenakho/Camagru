import React, { Component } from 'react';
import { connect } from 'react-redux';

import RenderPicture from './RenderPicture';

export class RenderAllPictures extends Component {
  render() {
    const { pictures, auth } = this.props;
    return pictures.map(picture => {
      if (auth.authenticated && picture._userId === auth.user.id)
        return (
          <RenderPicture picture={picture} auth={auth} key={picture._id} />
        );
      return null;
    });
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  pictures: state.main.pictures
});

export default connect(mapStateToProps)(RenderAllPictures);
