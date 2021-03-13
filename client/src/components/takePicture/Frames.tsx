import { useEffect, useRef, FC } from 'react';
// import M from 'materialize-css';
import { connect, ConnectedProps } from 'react-redux';

import * as editPictureActions from '../../actions/editPictureActions';

type Props = ConnectedProps<typeof connector>;

const Frames: FC<Props> = ({ changeFrame }) => {
  const carouselRef = useRef(null);
  useEffect(() => {
    // M.Carousel.init(carouselRef.current);
  }, []);

  const renderCarouselItem = (path: string) => {
    return (
      <div className={`carousel-item carouselItem`}>
        <a href="#">
          <img
            className="carouselImage"
            src={path}
            alt=""
            width="200px"
            height="100px"
            onClick={() => changeFrame(path)}
          />
        </a>
      </div>
    );
  };

  return (
    <div className="section section-carousel">
      <div className="row">
        <div className="col s12 center">
          <div className="carousel carouselMain" ref={carouselRef}>
            {renderCarouselItem('images/frame-1.png')}
            {renderCarouselItem('images/frame-2.png')}
            {renderCarouselItem('images/frame-3.png')}
            {renderCarouselItem('images/frame-4.png')}
            {renderCarouselItem('images/frame-5.png')}
          </div>
        </div>
      </div>
    </div>
  );
};

const connector = connect(null, editPictureActions);

export default connector(Frames);
