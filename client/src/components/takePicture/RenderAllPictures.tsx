import { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { ReduxState } from 'reducers';

import RenderPicture from './RenderPicture';

type Props = ConnectedProps<typeof connector>;

const RenderAllPictures: FC<Props> = ({ pictures, auth }) => (
  <div className="user-pictures">
    {pictures.map((picture) => {
      if (auth.authenticated && picture._userId === auth.user.id)
        return (
          <RenderPicture picture={picture} auth={auth} key={picture._id} />
        );
      return null;
    })}
  </div>
);

const mapStateToProps = (state: ReduxState) => ({
  auth: state.auth,
  pictures: state.main.pictures,
});

const connector = connect(mapStateToProps);

export default connector(RenderAllPictures);
