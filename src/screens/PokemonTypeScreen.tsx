import * as React from 'react';
import {
  Image,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import {getPokemons, getTypePokemons} from '../action/favoriteAction';
import images from '../assets/images';
import PokemonCard from '../components/PokemonCard';
import Container from '../components/Container';
import colors from '../theme/colors';
import FastImage from 'react-native-fast-image';
import Helper from '../utils/helper';

const PER_PAGE = 16;

function PokemonTypeScreen({route, navigation}) {
  const dispatch = useDispatch();
  const {typePokemons, total} = useSelector(
    (state: RootStateOrAny) => state.pokemonReducer,
  );
  const [page, setPage] = React.useState(1);
  const [loadmore, setLoadmore] = React.useState(true);

  React.useEffect(() => {
    getAllPokemon();
  }, [route]);

  React.useEffect(() => {
    setLoadmore(true);
  }, [page]);

  function getAllPokemon() {
    const {typeId} = route.params;
    dispatch(getTypePokemons(typeId));
  }

  function renderItem({item, index}: any) {
    return (
      <PokemonCard
        typeOnPress={typeOnPress}
        item={item}
        onPressCard={onPressCard}
      />
    );
  }

  function onEndReached() {
    if (loadmore && page * PER_PAGE < typePokemons.length) {
      setLoadmore(false);
      setPage(page + 1);
    }
  }

  function onPressCard(pokemonDetail: any) {
    navigation.navigate('PokemonDetail', {pokemonDetail});
  }

  function onPress() {
    navigation.goBack();
  }

  function typeOnPress(type: any) {
    if (type.name !== route.params.name) {
      const typeId = type.url.split('/')[type.url.split('/').length - 2];
      navigation.navigate('PokemonTypeScreen', {typeId, name: type.name});
    }
  }

  return (
    <Container style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onPress}>
          <FastImage source={images.backIconBlack} style={styles.icon} />
        </TouchableOpacity>
        <Text
          style={[
            styles.title,
            {color: Helper.getTypesColor(route.params.name)},
          ]}>
          {route.params.name.toUpperCase()}
        </Text>
        <View />
      </View>
      <FlatList
        style={styles.pokemonList}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={typePokemons.slice(0, page * PER_PAGE)}
        keyExtractor={item => item.name}
        renderItem={renderItem}
        onEndReached={onEndReached}
        removeClippedSubviews
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  header: {
    paddingTop: 18,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  logo: {
    height: 60,
    width: 140,
  },
  pokemonList: {
    flex: 1,
  },
  iconSearch: {
    height: 24,
    width: 24,
  },
  searchBtn: {
    marginRight: 12,
    marginTop: 12,
  },
  icon: {
    height: 22,
    width: 22,
  },
  title: {
    fontWeight: '500',
    fontSize: 24,
    marginRight: 16,
  },
});

export default PokemonTypeScreen;
