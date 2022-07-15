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

function PokemonCard(props: any) {
  const [img, setImg] = React.useState('');
  const [pokemonDetail, setPokemonDetail] = React.useState<any>({});
  const [bgGradiant, setBgGradiant] = React.useState<any[]>([
    '#FFF',
    colors.primary,
    '#FFF',
  ]);

  const {item} = props;
  const id = item.url.split('/')[item.url.split('/').length - 2];

  React.useEffect(() => {
    const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    setImg(imgUrl);
    getDetail();
  }, [item, id]);

  async function getDetail() {
    const res = await API.getPokemonDetail(id);
    setPokemonDetail(res.data);
    let gradiants: any[] = [];
    res.data.types.map((type: any) => {
      gradiants.push(Helper.getTypesBGColor(type.type.name));
    });
    gradiants.unshift(Helper.getTypesBGColor(res.data.types[0].type.name));
    setBgGradiant(gradiants);
  }

  function onPress() {
    props.onPressCard(pokemonDetail);
  }

  function typeOnPress(type: any) {
    props.typeOnPress(type);
  }

  return (
    <TouchableOpacity onPress={onPress} style={styles.shadow}>
      <LinearGradient colors={bgGradiant} style={styles.container}>
        {_.isEmpty(img) || !pokemonDetail.id ? (
          <View style={styles.indicator}>
            <ActivityIndicator />
          </View>
        ) : (
          <View>
            <FastImage
              style={styles.image}
              source={{uri: img}}
              resizeMode="cover"
            />
            <View style={styles.typeView}>
              {pokemonDetail.types.map((type: any, index: any) => {
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
        <Text
          style={[styles.pokeName, item.name.length > 10 && {fontSize: 14}]}>
          {item.name}
        </Text>
      </LinearGradient>
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
    height: height * 0.27,
    width: width * 0.5 - 32,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 24,
  },
  image: {
    height: width * 0.5 - 64,
    width: width * 0.5 - 64,
  },
  indicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeView: {
    flexDirection: 'row',
  },
  typeBlock: {
    flex: 1,
    height: 35,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
  },
  pokeName: {
    fontSize: 16,
    width: '100%',
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
});

export default PokemonCard;
