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
  }, [getAllPictures]);

  return (
    <div className="main-wrapper">
      <WebcamCapture />
      <RenderAllPictures />
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
