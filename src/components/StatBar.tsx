import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';

import colors from '../theme/colors';
import Helper from '../utils/helper';

interface Props {
  value: number;
  color: string;
  stat: any;
  animation: boolean;
}

function StatBar(props: Props) {
  const widthAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (props.animation) {
      Animated.timing(widthAnim, {
        delay: 500,
        toValue: props.value,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      widthAnim.setValue(props.value);
    }
  }, [props.value, widthAnim, props.animation]);

  const animatedStyle = () => {
    const widthValue = widthAnim.interpolate({
      inputRange: [0, 300],
      outputRange: ['0%', '100%'],
    });
    return {
      width: widthValue,
      backgroundColor: props.color,
    };
  };

  return (
    <>
      <Text style={styles.statName}>{Helper.getStatName(props.stat.name)}</Text>
      <View style={styles.container}>
        <Animated.View style={[styles.bar, animatedStyle()]}>
          <Text style={[styles.valueText, props.value < 20 && {right: -4}]}>
            {props.value}
          </Text>
        </Animated.View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 20,
    borderRadius: 12,
    backgroundColor: '#ECECEC',
  },
  bar: {
    height: 24,
    borderRadius: 12,
    backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  statName: {
    marginBottom: 4,
    marginTop: 4,
    fontSize: 16,
    fontWeight: 'bold',
  },
  valueText: {
    position: 'absolute',
    right: 5,
  },
});

StatBar.defaultProps = {
  animation: true,
};

export default StatBar;
