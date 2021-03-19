import { FC, useEffect, useState, useCallback } from 'react';
import WebcamCapture from './WebcamCapture';
import { connect, ConnectedProps } from 'react-redux';
import * as mainActions from '../../actions/mainActions';
import { ReduxState } from 'reducers';
import useInfiniteScroll from 'components/common/useInfiniteScroll';
import Picture from 'components/Landing/Picture';

type Props = ConnectedProps<typeof connector>;

const TakePicture: FC<Props> = ({
  getOwnPictures,
  resetPictures,
  pictures,
  pagesCount,
}) => {
  const [page, setPage] = useState(0);

  const loadMore = useCallback(() => {
    setPage(page + 1);
  }, [page]);

  const [isFetching, setIsFetching] = useInfiniteScroll(
    loadMore,
    pagesCount > page + 1
  );

  useEffect(() => {
    resetPictures();
  }, [resetPictures]);

  useEffect(() => {
    setIsFetching(false);
  }, [pictures, setIsFetching]);

  useEffect(() => {
    getOwnPictures(page);
  }, [page, getOwnPictures]);

  const renderPictures = () => (
    <div className="user-pictures">
      {pictures.map((picture) => (
        <Picture picture={picture} key={picture._id} own={true} />
      ))}
    </div>
  );

  return (
    <div className="main-wrapper">
      <WebcamCapture />
      {renderPictures()}
      {isFetching && (
        <div className="spinner-wrapper">
          <i className="fas fa-spinner fa-2x fa-pulse" />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: ReduxState) => ({
  sticker: state.edit.sticker,
  pictures: state.main.pictures,
  pagesCount: state.main.pages,
});

const connector = connect(mapStateToProps, mainActions);

export default connector(TakePicture);
