import { FC, useState } from 'react';

type Props = {
  handleSelect: (path: string) => void;
  frames: string[];
};

const Carousel: FC<Props> = ({ handleSelect, frames }) => {
  const [checked, setChecked] = useState('item-1');

  const renderInputs = () => {
    return frames.map((src, index) => {
      const handleCheck = (e: React.FormEvent<HTMLInputElement>) => {
        setChecked(e.currentTarget.id);
        handleSelect(src);
      };

      return (
        <input
          key={`item-${index + 1}`}
          type="radio"
          name="slider"
          id={`item-${index + 1}`}
          checked={checked === `item-${index + 1}`}
          onChange={handleCheck}
        />
      );
    });
  };

  const renderFrames = () => {
    return frames.map((src, index) => (
      <label
        key={`item-${index + 1}`}
        className="card"
        htmlFor={`item-${index + 1}`}
        id={`frame-${index + 1}`}
      >
        <img
          src={src ? src : 'images/none.png'}
          alt="frame"
          style={!src ? { border: '1px solid grey' } : {}}
        />
      </label>
    ));
  };

  return (
    <div className="carousel">
      <div className="container">
        {renderInputs()}
        <div className="cards">{renderFrames()}</div>
      </div>
    </div>
  );
};

export default Carousel;
