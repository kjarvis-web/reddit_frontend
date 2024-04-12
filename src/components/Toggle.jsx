import { useState } from 'react';

const Toggle = (props) => {
  const [visible, setVisible] = useState(false);

  const hide = visible ? 'hidden' : '';
  const show = visible ? '' : 'hidden';

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div className={hide}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div className={show}>
        {props.children}
        <button onClick={toggleVisibility}>hide</button>
      </div>
    </div>
  );
};

export default Toggle;
