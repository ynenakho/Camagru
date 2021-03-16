import { useState, useEffect, FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import Picture from './Picture';
import Button from '../common/Button';
import * as mainActions from '../../actions/mainActions';
import { ReduxState } from 'reducers';

type Props = ConnectedProps<typeof connector>;

const Landing: FC<Props> = ({ getFivePictures, pictures }) => {
  const [page, setPage] = useState(0);

  useEffect(() => {
    getFivePictures(page);
  }, [page, getFivePictures]);

  const renderPictures = () =>
    pictures.map((picture) => <Picture picture={picture} key={picture._id} />);

  const prevPage = () => {
    if (page === 0) return;
    setPage(page - 1);
  };

  const nextPage = () => {
    if (pictures.length < 5) return;
    setPage(page + 1);
  };

  const renderArrows = () => (
    <div className="prevNextDiv">
      <Button name="Prev" func={prevPage} />
      <h5>{page + 1}</h5>
      <Button name="Next" func={nextPage} />
    </div>
  );

  return (
    <div className="main-wrapper">
      {renderPictures()}
      {renderArrows()}
    </div>
  );
};

const mapStateToProps = (state: ReduxState) => ({
  pictures: state.main.picturesFive,
});

const connector = connect(mapStateToProps, mainActions);

export default connector(Landing);
