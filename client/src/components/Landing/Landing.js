import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as mainActions from '../../actions/mainActions';
import PictureDiv from './PictureDiv';

export class Landing extends Component {
  componentDidMount() {
    const { getAllPictures } = this.props;
    getAllPictures();
  }

  renderPictures = () => {
    const { pictures, auth } = this.props;
    return pictures.map(picture => (
      <PictureDiv picture={picture} auth={auth} key={picture._id} />
    ));
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <div className="card-panel blue darken-2 white-text center">
              {this.renderPictures()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  pictures: state.main.pictures
});

export default connect(
  mapStateToProps,
  mainActions
)(Landing);
