import { useState, FC, useEffect, MouseEvent, TouchEvent } from 'react';
import WebcamCapture from './WebcamCapture';
import Sticker from './Sticker';
import RenderAllPictures from './RenderAllPictures';
import { connect, ConnectedProps } from 'react-redux';
import * as editPictureActions from '../../actions/editPictureActions';
import * as mainActions from '../../actions/mainActions';
import { ReduxState } from 'reducers';

type Props = ConnectedProps<typeof connector>;

const TakePicture: FC<Props> = ({ getAllPictures, sticker, chooseSticker }) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [selectedSticker, setSelectedSticker] = useState<HTMLDivElement>(
    document.querySelector('#sticker') as HTMLDivElement
  );

  useEffect(() => {
    getAllPictures();
  }, []);

  const _onMouseMove = (e: MouseEvent) => {
    const { pageX, pageY } = e.nativeEvent;
    if (selectedSticker) {
      selectedSticker.style.transform = `translate3d(${pageX}px, ${pageY}px, 0)`;
    }
    setCoords({ x: pageX, y: pageY });
  };

  // const _onTouchMove = (e: TouchEvent<HTMLDivElement>) => {
  //   const x = e.nativeEvent.pageX;
  //   const y = e.nativeEvent.pageY;
  //   if (selectedSticker) {
  //     selectedSticker.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  //   }
  //   setCoords({ x, y });
  // };

  const handleClick = () => {
    if (sticker) {
      chooseSticker('');
    }
  };

  return (
    <div
      onMouseMove={_onMouseMove}
      // onTouchMove={(e) => _onTouchMove(e)}
      onClick={handleClick}
    >
      <Sticker />
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
  ...editPictureActions,
  ...mainActions,
});

export default connector(TakePicture);
