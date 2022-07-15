import _ from 'lodash';
import * as React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import API from '../api/request';

import colors from '../theme/colors';
import Helper from '../utils/helper';

interface Props {
  item: {
    item?: any;
    min_level?: number;
    species_name?: string;
    trigger_name?: string;
  };
  onPressCard: any;
}

function EvolutionItem(props: Props) {
  const {item, min_level, species_name, trigger_name} = props.item;
  const [img, setImg] = React.useState('');
  const [pokemonDetail, setPokemonDetail] = React.useState<any>({});
  React.useEffect(() => {
    getDetail();
  }, []);

  async function getDetail() {
    const res = await API.getPokemonDetail(species_name);
    setPokemonDetail(res.data);
    const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${res.data.id}.png`;
    setImg(imgUrl);
  }

  function onPress() {
    props.onPressCard(pokemonDetail);
  }

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.detailView}>
        <View style={styles.row}>
          <Text style={styles.pokemonName}>{species_name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Lvl:</Text>
          <Text style={styles.value}>{min_level}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Trigger</Text>
          <Text style={styles.value}>{trigger_name?.replace('-', ' ')}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Item</Text>
          <Text style={styles.value}>{item?.name.replace('-', ' ')}</Text>
        </View>
      </View>

      <FastImage
        style={styles.image}
        source={{
          uri: img,
          priority: FastImage.priority.normal,
        }}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  indicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 102,
    width: 102,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailView: {
    flex: 4,
    paddingRight: 48,
    marginRight: 12,
  },
  pokemonName: {
    fontWeight: '500',
    fontSize: 16,
    textTransform: 'capitalize',
  },
  label: {
    fontSize: 12,
    color: '#ACACAC',
  },
  value: {
    fontWeight: '500',
    fontSize: 14,
  }
});

export default React.memo(EvolutionItem);
