import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
function Container(props: any) {
  const {children, style} = props;
  return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: getStatusBarHeight(),
  },
});

export default Container;
