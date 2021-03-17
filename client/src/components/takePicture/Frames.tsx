import { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import * as editPictureActions from '../../actions/editPictureActions';
import Carousel from './Carousel';

const frames = [
  '',
  'images/frame-1.png',
  'images/frame-3.png',
  'images/frame-4.png',
  'images/frame-5.png',
];

type Props = ConnectedProps<typeof connector>;

const Frames: FC<Props> = ({ changeFrame }) => {
  const handleSelect = (path: string) => {
    changeFrame(path);
  };

  return (
    <div className="carousel-wrapper">
      <Carousel handleSelect={handleSelect} frames={frames} />
    </div>
  );
};

const connector = connect(null, editPictureActions);

export default connector(Frames);
