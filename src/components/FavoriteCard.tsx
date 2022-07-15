import {types} from '@babel/core';
import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import API from '../api/request';
import colors from '../theme/colors';
import Helper from '../utils/helper';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import _ from 'lodash';

const {height, width} = Dimensions.get('window');

function FavoriteCard(props: any) {
  const [bgGradiant, setBgGradiant] = React.useState<any>('#FFF');

  const {item} = props;
  const id = item.id;
  React.useEffect(() => {
    getDetail();
  }, [item, id]);

  function getDetail() {
    setBgGradiant(Helper.getTypesBGColor(item.types[0].type.name));
  }

  function onPress() {
    props.onPressCard(item);
  }

  function typeOnPress(type: any) {
    props.typeOnPress(type);
  }

  return (
    <TouchableOpacity onPress={onPress} style={styles.shadow}>
      <View style={[styles.container, {backgroundColor: bgGradiant}]}>
        {!item.id ? (
          <View style={styles.indicator}>
            <ActivityIndicator />
          </View>
        ) : (
          <View style={styles.row}>
            <Text
              style={[
                styles.pokeName,
                item.name.length > 10 && {fontSize: 14},
              ]}>
              {'#' + item.id + ' ' + item.name}
            </Text>
            <View style={styles.typeView}>
              {item.types.map((type: any, index: any) => {
                return (
                  <TouchableOpacity
                    onPress={() => typeOnPress(type.type)}
                    key={index}
                    style={[
                      styles.typeBlock,
                      {backgroundColor: Helper.getTypesColor(type.type.name)},
                    ]}>
                    <Text style={styles.typeName}>{type.type.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  container: {
    flex: 1,
    height: 50,
    width: width - 32,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  indicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeBlock: {
    // flex: 1,
    height: 35,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    marginHorizontal: 2,
  },
  pokeName: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 12,
    textTransform: 'capitalize',
  },
  typeName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'capitalize',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default FavoriteCard;
