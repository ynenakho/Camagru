import { FC } from 'react';
import ReactDOM from 'react-dom';
import { connect, ConnectedProps } from 'react-redux';
import { ReduxState } from 'reducers';

type Props = ConnectedProps<typeof connector>;

const Sticker: FC<Props> = ({ sticker }) => {
  return (
    <div>
      {ReactDOM.createPortal(
        <img
          src={sticker}
          width="100px"
          height="100px"
          alt=""
          style={!sticker ? { display: 'none' } : {}}
        />,
        document.querySelector('#sticker') as Element
      )}
    </div>
  );
};

const mapStateToProps = (state: ReduxState) => ({
  sticker: state.edit.sticker,
});

const connector = connect(mapStateToProps);

export default connector(Sticker);
