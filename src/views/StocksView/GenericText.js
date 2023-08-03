import React, {memo} from 'react';
import {Text} from 'react-native';

const GenericText = props => {
  const {
    size,
    style,
    color = 'black',
    fontWeight = '400',
    align,
    lineHeight,
    ...restProps
  } = props;
  return (
    <Text
      {...restProps}
      style={[
        {
          fontSize: size,
          lineHeight,
          textAlign: align,
          color,
          fontWeight: fontWeight,
        },
        style,
      ]}
    />
  );
};

export default memo(GenericText);
