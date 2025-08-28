import React from 'react';

type Props = {
  size?:string
  children: string
}

const Typography:React.FC<Props> = ({
  size = '',
  children = ''
}) => {
  return (
    <p className={`${size}`}>
      {children}
    </p>
  );
};

export default Typography;