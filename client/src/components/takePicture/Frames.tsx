import { FC, useState } from 'react';
import Carousel, { slidesToShowPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { connect, ConnectedProps } from 'react-redux';

import * as editPictureActions from '../../actions/editPictureActions';
import { ReduxState } from 'reducers';

type Props = ConnectedProps<typeof connector>;

const Frames: FC<Props> = ({ changeFrame, frame }) => {
  // const [selected, setSelected] = useState('');

  const renderCarouselItem = (path: string) => {
    const handleSelect = () => {
      changeFrame(path);
      // setSelected(path);
    };
    if (!path) {
      return (
        <div
          style={{ width: '200px', height: '100px' }}
          className={frame === path ? 'selected' : ''}
          onClick={handleSelect}
        ></div>
      );
    }
    return (
      <img
        className={frame === path ? 'selected' : ''}
        src={path}
        alt=""
        width="200px"
        height="100px"
        onClick={handleSelect}
      />
    );
  };

  return (
    <div style={{ maxWidth: '300px' }}>
      <Carousel
        plugins={[
          // 'arrows',
          'clickToChange',
          'centered',
          'infinite',
          {
            resolve: slidesToShowPlugin,
            options: {
              numberOfSlides: 2,
            },
          },
        ]}
      >
        {renderCarouselItem('')}
        {renderCarouselItem('images/frame-1.png')}
        {renderCarouselItem('images/frame-2.png')}
        {renderCarouselItem('images/frame-3.png')}
        {renderCarouselItem('images/frame-4.png')}
        {renderCarouselItem('images/frame-5.png')}
      </Carousel>
    </div>
  );
};

const mapStateToProps = (state: ReduxState) => ({
  frame: state.edit.frame,
});

const connector = connect(mapStateToProps, editPictureActions);

export default connector(Frames);
