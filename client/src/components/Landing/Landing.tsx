import { useState, useEffect, FC, useCallback } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Picture from './Picture';
import * as mainActions from '../../actions/mainActions';
import { ReduxState } from 'reducers';
import useInfiniteScroll from 'components/common/useInfiniteScroll';

type Props = ConnectedProps<typeof connector>;

const Landing: FC<Props> = ({
  getPictures,
  pictures,
  pagesCount,
  resetPictures,
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
    getPictures(page);
  }, [page, getPictures]);

  const renderPictures = () =>
    pictures.map((picture) => <Picture picture={picture} key={picture._id} />);

  return (
    <div className="main-wrapper">
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
  pictures: state.main.pictures,
  pagesCount: state.main.pages,
});

const connector = connect(mapStateToProps, mainActions);

export default connector(Landing);
