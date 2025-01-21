import React from 'react';
import {Image} from 'react-native';

export default function LoadingWindow() {
  const [isChangeImage, setChangeImage] = React.useState(false);

  setTimeout(() => {
    setChangeImage(true);
  }, 1000);

  return (
    <Image
      source={
        isChangeImage
          ? require('./assets/images/loader1.jpg')
          : require('./assets/images/loader2.jpg')
      }
      style={{flex: 1, width: '100%', height: '100%'}}
    />
  );
}
