import React from 'react';
import ReactDOM from 'react-dom';

export interface BaseProps {
  type: ToastType;
  content: React.ReactNode;
  mask: boolean;
  duration: number;
  onClose: Function;
}

export type ToastType = 'success' | 'fail' | 'info' | 'loading';

const div = document.createElement('div');
document.body.appendChild(div);

const notic = (props: BaseProps) => {
  const { content, mask, duration, onClose, type } = props;
  return ReactDOM.render(<div>{content}</div>, div);
};
const Toast = {
  show: (
    content: React.ReactNode,
    type: ToastType,
    mask: boolean,
    duration: number,
    onClose: Function,
  ) => {
    const params = {
      content,
      type,
      mask,
      duration,
      onClose,
    };
    return notic(params);
  },
};

export default Toast;