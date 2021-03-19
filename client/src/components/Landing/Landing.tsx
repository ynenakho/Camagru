import { useState, useEffect, FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Picture from './Picture';
import * as mainActions from '../../actions/mainActions';
import { ReduxState } from 'reducers';
import useInfiniteScroll from 'components/common/useInfiniteScroll';

type Props = ConnectedProps<typeof connector>;

const Landing: FC<Props> = ({ getFivePictures, pictures, pagesCount }) => {
  const [page, setPage] = useState(0);

  const loadMore = () => {
    setPage(page + 1);
  };

  const [isFetching, setIsFetching] = useInfiniteScroll(
    loadMore,
    pagesCount > page + 1
  );

  useEffect(() => {
    setIsFetching(false);
  }, [pictures]);

  useEffect(() => {
    getFivePictures(page);
    if (!(pagesCount > page + 1)) {
      setIsFetching(false);
    }
  }, [getFivePictures, page]);

  const renderPictures = () =>
    pictures.map((picture) => <Picture picture={picture} key={picture._id} />);

  return (
    <div className="main-wrapper">
      {renderPictures()}
      {isFetching && <p>Loading more pictures...</p>}
    </div>
  );
};

const mapStateToProps = (state: ReduxState) => ({
  pictures: state.main.picturesMain,
  pagesCount: state.main.pagesMain,
});

const connector = connect(mapStateToProps, mainActions);

export default connector(Landing);
