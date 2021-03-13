import { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import * as editPictureActions from '../../actions/editPictureActions';

type Props = ConnectedProps<typeof connector>;

const Stickers: FC<Props> = ({ chooseSticker }) => {
  const renderSticker = (path: string) => {
    const handleClick = (e: any) => {
      const clientRect = e.currentTarget.getBoundingClientRect();
      chooseSticker({
        name: path,
        x: e.clientX - clientRect.x,
        y: e.clientY - clientRect.y,
      });
    };

    return (
      <img
        className="stickerImage"
        src={path}
        width="100px"
        height="100px"
        alt=""
        // onClick={handleClick}
        draggable
        onDragStart={handleClick}
      />
    );
  };

  return (
    <div>
      {renderSticker('images/sticker-1.png')}
      {renderSticker('images/sticker-2.png')}
      {renderSticker('images/sticker-3.png')}
      {renderSticker('images/sticker-4.png')}
      {renderSticker('images/sticker-5.png')}
    </div>
  );
};

const connector = connect(null, editPictureActions);

export default connector(Stickers);