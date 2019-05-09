import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as mainActions from '../../actions/mainActions';
import PictureDiv from './PictureDiv';
import Button from '../common/Button';

export class Landing extends Component {
  state = {
    page: 0
  };

  async componentDidMount() {
    const { getFivePictures } = this.props;
    const { page } = this.state;
    await getFivePictures(page);
  }

  async componentDidUpdate(prevProps) {
    const { getFivePictures } = this.props;
    const { page } = this.state;
    if (prevProps.pictures.length !== this.props.pictures.length) {
      await getFivePictures(page);
    }
  }

  renderPictures = () => {
    const { pictures, auth } = this.props;
    return pictures.map(picture => (
      <PictureDiv picture={picture} auth={auth} key={picture._id} />
    ));
  };

  prevPage = () => {
    const { getFivePictures } = this.props;
    const { page } = this.state;
    if (page === 0) return;
    getFivePictures(page - 1);
    this.setState({
      page: page - 1
    });
  };

  nextPage = () => {
    const { pictures, getFivePictures } = this.props;
    const { page } = this.state;
    if (pictures.length < 5) return;
    getFivePictures(page + 1);
    this.setState({
      page: page + 1
    });
  };

  renderArrows = () => {
    const { page } = this.state;
    return (
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button name="Prev" func={this.prevPage} />
        <h5>{page + 1}</h5>
        <Button name="Next" func={this.nextPage} />
      </div>
    );
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <div className="card-panel blue darken-2 white-text">
              {this.renderPictures()}
              {this.renderArrows()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  pictures: state.main.picturesFive
});

export default connect(
  mapStateToProps,
  mainActions
)(Landing);
