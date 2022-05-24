import React, { useState } from 'react';
import NextImage from 'next/image';
import { classNames } from 'utils/classNames';

const Image = ({
  src,
  rounded,
  ...props
}: {
  src: string;
  rounded?: boolean;
  [key: string]: any;
}) => {
  const [isReady, setIsReady] = useState(false);

  const onLoadCallback = () => {
    setIsReady(true);
  };

  return (
    <NextImage
      objectFit="cover"
      src={src}
      className={classNames(
        rounded ? 'rounded-full' : '',
        isReady ? 'scale-100 bg-gray-400 blur-0' : 'scale-120 blur-2xl',
        'bg-gray-400 transition duration-1000',
      )}
      onLoadingComplete={onLoadCallback}
      layout="responsive"
      {...props}
    />
  );
};

export default Image;
