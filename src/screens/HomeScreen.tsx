import * as React from 'react';
import {Image, StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import {getPokemons} from '../action/favoriteAction';
import images from '../assets/images';
import PokemonCard from '../components/PokemonCard';
import Container from '../components/Container';
import colors from '../theme/colors';

const PER_PAGE = 16;

function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const {pokemons, total} = useSelector(
    (state: RootStateOrAny) => state.pokemonReducer,
  );
  const [page, setPage] = React.useState(1);
  const [loadmore, setLoadmore] = React.useState(true);

  React.useEffect(() => {
    getAllPokemon();
  }, []);

  React.useEffect(() => {
    setLoadmore(true);
  }, [page]);

  function getAllPokemon() {
    const params = {
      limit: 2000,
    };
    dispatch(getPokemons(params));
  }

  function renderItem({item, index}: any) {
    return (
      <PokemonCard
        typeOnPress={typeOnPress}
        navigation={navigation}
        item={item}
        onPressCard={onPressCard}
      />
    );
  }

  function onEndReached() {
    if (loadmore && page * PER_PAGE < pokemons.length) {
      setLoadmore(false);
      setPage(page + 1);
    }
  }

  function onPressCard(pokemonDetail: any) {
    navigation.navigate('PokemonDetail', {pokemonDetail});
  }

  function goToSeachScreen() {
    navigation.navigate('SearchPokemon');
  }

  function goToFavorites() {
    navigation.navigate('FavoritePokemon');
  }

  function typeOnPress(type: any) {
    const typeId = type.url.split('/')[type.url.split('/').length - 2];
    navigation.navigate('PokemonTypeScreen', {typeId, name: type.name});
  }

  return (
    <Container style={styles.container}>
      <View style={styles.header}>
        <Image resizeMode="contain" source={images.logo} style={styles.logo} />
        <View style={styles.row}>
          <TouchableOpacity 
          style={styles.searchBtn}
          onPress={goToSeachScreen}>
            <Image
              resizeMode="contain"
              source={images.icSearch}
              style={styles.iconSearch}
            />
          </TouchableOpacity>
          <TouchableOpacity 
          style={styles.searchBtn}
          onPress={goToFavorites}>
            <Image
              resizeMode="contain"
              source={images.icFavorite}
              style={styles.iconSearch}
            />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        style={styles.pokemonList}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={pokemons.slice(0, page * PER_PAGE)}
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
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
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
  row: {
    flexDirection: 'row',
  }
});

export default HomeScreen;
