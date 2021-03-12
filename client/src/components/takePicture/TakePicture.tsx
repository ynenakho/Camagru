import { FC, useEffect } from 'react';
import WebcamCapture from './WebcamCapture';
import RenderAllPictures from './RenderAllPictures';
import { connect, ConnectedProps } from 'react-redux';
import * as mainActions from '../../actions/mainActions';
import { ReduxState } from 'reducers';

type Props = ConnectedProps<typeof connector>;

const TakePicture: FC<Props> = ({ getAllPictures }) => {
  useEffect(() => {
    getAllPictures();
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col s12 m8">
          <div className="card-panel blue darken-2 white-text center">
            <WebcamCapture />
          </div>
        </div>
        <div className="col s12 m4">
          <div className="card-panel blue darken-2 white-text center">
            <RenderAllPictures />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: ReduxState) => ({
  sticker: state.edit.sticker,
});

const connector = connect(mapStateToProps, {
  ...mainActions,
});

export default connector(TakePicture);
