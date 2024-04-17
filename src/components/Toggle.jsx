/* eslint-disable react/prop-types */
import { useState } from 'react';

const Toggle = (props) => {
  const [visible, setVisible] = useState(false);

  const small = visible ? 'hidden' : 'md:w-1/4';
  const original = visible ? '' : 'hidden';

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className="image-container">
      <div className={small} onClick={toggleVisibility}>
        {props.children}
      </div>
      <div className={original} onClick={toggleVisibility}>
        {props.children}
      </div>
    </div>
  );
};

export default Toggle;
