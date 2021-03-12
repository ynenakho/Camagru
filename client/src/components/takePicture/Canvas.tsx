import React, { useState, useEffect, useRef, FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { ReduxState } from 'reducers';

import * as editPictureActions from '../../actions/editPictureActions';

type Props = ConnectedProps<typeof connector> & {
  image: string;
};

const Canvas: FC<Props> = ({
  sticker,
  addStickerCoords,
  coords,
  setCanvasData,
  frame,
  image,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const backgroundRef = useRef<HTMLImageElement>(null);

  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();

  useEffect(() => {
    if (canvasRef.current && backgroundRef.current) {
      const ctxTemp = canvasRef.current.getContext('2d');
      if (!ctxTemp) return;
      setCtx(ctxTemp);
      backgroundRef.current.onload = () => {
        if (backgroundRef.current && canvasRef.current) {
          canvasRef.current.width = backgroundRef.current.width;
          canvasRef.current.height = backgroundRef.current.height;

          ctxTemp.drawImage(
            backgroundRef.current,
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          );
          setCanvasData(canvasRef.current.toDataURL());
        }
      };
    }
  }, []);

  useEffect(() => {
    console.log('Got Here to redraw the sticker');
    drawStickers();
  }, [coords]);

  useEffect(() => {
    if (backgroundRef.current && canvasRef.current && ctx) {
      console.log('Got Here to redraw the frame');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.drawImage(
        backgroundRef.current,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      drawStickers();
      const newFrame = new Image();
      newFrame.onload = () => {
        if (backgroundRef.current && canvasRef.current) {
          ctx.drawImage(
            newFrame,
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          );
          setCanvasData(canvasRef.current.toDataURL());
        }
      };

      newFrame.src = frame;
    }
  }, [frame]);

  interface OnLoadAble {
    onload: any;
    onerror: any;
  }

  function onload2promise<T extends OnLoadAble>(obj: T): Promise<T> {
    return new Promise((resolve, reject) => {
      obj.onload = () => {
        return resolve(obj);
      };
      obj.onerror = reject;
    });
  }

  const drawStickers = async () => {
    if (!coords) return;
    for (let i = 0; i < coords.length; i++) {
      const { x, y } = getStickerPos(
        coords[i].x,
        coords[i].y,
        coords[i].oldWidth,
        coords[i].oldHeight
      );
      const stickerImg = new Image();
      const obj = onload2promise(stickerImg);
      stickerImg.src = coords[i].name;
      await obj;
      if (canvasRef.current && ctx) {
        ctx.drawImage(stickerImg, x, y, 100, 100);
      }
    }
    if (canvasRef.current) {
      setCanvasData(canvasRef.current.toDataURL());
    }
  };

  const getStickerPos = (
    stickerX: number,
    stickerY: number,
    oldWidth: number,
    oldHeight: number
  ) => {
    if (canvasRef.current) {
      const x = (stickerX / oldWidth) * canvasRef.current.width;
      const y = (stickerY / oldHeight) * canvasRef.current.height;
      return { x, y };
    }
    return { x: 0, y: 0 };
  };

  const getMousePos = (e: React.MouseEvent) => {
    if (ctx && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();

      let x = e.clientX - rect.left;
      let y = e.clientY - rect.top;

      const width = rect.right - rect.left;
      if (canvasRef.current.width !== width) {
        const height = rect.bottom - rect.top;
        x = x * (canvasRef.current.width / width);
        y = y * (canvasRef.current.height / height);
      }
      return { x, y, clientX: e.clientX, clientY: e.clientY };
    }
    return { x: 0, y: 0, clientX: 0, clientY: 0 };
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!sticker) return;
    const position = getMousePos(e);
    // const stickerImg = new Image();

    // stickerImg.onload = () => {
    //   if (ctx && canvasRef.current) {
    //     ctx.drawImage(stickerImg, position.x - 50, position.y - 50, 100, 100);
    //     setCanvasData(canvasRef.current.toDataURL());
    //   }
    // };
    // stickerImg.src = sticker;
    if (canvasRef.current) {
      addStickerCoords({
        name: sticker,
        x: position.x - 50,
        y: position.y - 50,
        oldWidth: canvasRef.current.width,
        oldHeight: canvasRef.current.height,
      });
    }
  };

  return (
    <div>
      <canvas
        onClick={(e) => handleClick(e)}
        ref={canvasRef}
        style={{ width: '100%' }}
      />
      <img
        ref={backgroundRef}
        style={{ display: 'none' }}
        src={image}
        alt="background"
      />
    </div>
  );
};

const mapStateToProps = (state: ReduxState) => ({
  frame: state.edit.frame,
  sticker: state.edit.sticker,
  coords: state.edit.coords,
});

const connector = connect(mapStateToProps, editPictureActions);

export default connector(Canvas);
