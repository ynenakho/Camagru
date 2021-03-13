import { FC, useState, useRef } from 'react';
import Webcam from 'react-webcam';
import Canvas from './Canvas';
import { connect, ConnectedProps } from 'react-redux';
import Frames from './Frames';
import Stickers from './Stickers';
import * as editPictureActions from '../../actions/editPictureActions';
import * as mainActions from '../../actions/mainActions';
import Button from '../common/Button';
import { ReduxState } from 'reducers';

type Props = ConnectedProps<typeof connector>;

const WebcamCapture: FC<Props> = ({
  savePictureToServer,
  canvas,
  clearCoords,
  changeFrame,
  resetPicture,
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const webcamRef = useRef<Webcam>(null);

  const savePhoto = () => {
    savePictureToServer(canvas);
    clearChanges();
  };

  const capture = () => {
    if (webcamRef.current) {
      const imageSrcTemp = webcamRef.current.getScreenshot();
      setImageSrc(imageSrcTemp);
    }
  };

  const clearChanges = () => {
    clearCoords();
    changeFrame('');
  };

  const resetPhoto = () => {
    resetPicture();
    setImageSrc('');
  };

  const renderWebcam = () => {
    const videoConstraints = {
      width: 1536,
      height: 1024,
      facingMode: 'user',
    };

    if (!imageSrc) {
      return (
        <Webcam
          audio={false}
          height={'100%'}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={'100%'}
          videoConstraints={videoConstraints}
        />
      );
    } else {
      return <Canvas image={imageSrc} />;
    }
  };

  const renderButtons = () => {
    if (!imageSrc) {
      return <Button func={capture} name="Take photo" />;
    } else {
      return (
        <div className="camButtonsDiv">
          <Button func={resetPhoto} name="Retake photo" />
          <Button func={clearChanges} name="Clear" />
          <Button func={savePhoto} name="Save photo" />
        </div>
      );
    }
  };

  const renderEdits = () => {
    if (imageSrc) {
      return (
        <div>
          <Frames />
          <Stickers />
        </div>
      );
    }
  };

  return (
    <div className="webcam-wrapper">
      {renderWebcam()}
      {renderButtons()}
      {renderEdits()}
    </div>
  );
};

const mapStateToProps = (state: ReduxState) => ({
  canvas: state.edit.canvas,
});

const connector = connect(mapStateToProps, {
  ...editPictureActions,
  ...mainActions,
});

export default connector(WebcamCapture);
