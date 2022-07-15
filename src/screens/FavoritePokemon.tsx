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
import {getPokemons} from '../action/favoriteAction';
import images from '../assets/images';
import Container from '../components/Container';
import colors from '../theme/colors';
import FavoriteCard from '../components/FavoriteCard';
import FastImage from 'react-native-fast-image';
import {SwipeListView} from 'react-native-swipe-list-view';
import {removeFavorite} from '../action/favoriteAction';

const PER_PAGE = 16;

function FavoritePokemon({navigation}) {
  const dispatch = useDispatch();
  const {favorites} = useSelector(
    (state: RootStateOrAny) => state.favoriteReducer,
  );
  const [page, setPage] = React.useState(1);
  const [loadmore, setLoadmore] = React.useState(true);

  React.useEffect(() => {
    setLoadmore(true);
  }, [page]);

  function renderItem({item, index}: any) {
    return (
      <FavoriteCard
        typeOnPress={typeOnPress}
        item={item}
        onPressCard={onPressCard}
      />
    );
  }

  function onEndReached() {
    if (loadmore && page * PER_PAGE < favorites.length) {
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

  function removeFavoriteOnPress(data: any) {
    const {item} = data;
    dispatch(removeFavorite(item));
  }

  function typeOnPress(type: any) {
    const typeId = type.url.split('/')[type.url.split('/').length - 2];
    navigation.navigate('PokemonTypeScreen', {typeId, name: type.name});
  }

  return (
    <Container style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onPress}>
          <FastImage source={images.backIconBlack} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.titleText}>Favorites Pokemon</Text>
      </View>
      <SwipeListView
        style={styles.pokemonList}
        showsVerticalScrollIndicator={false}
        data={favorites.slice(0, page * PER_PAGE)}
        renderHiddenItem={(data, rowMap) => (
          <View style={styles.rowBack}>
            <View />
            <TouchableOpacity
              style={styles.removeBtn}
              onPress={() => removeFavoriteOnPress(data)}>
              <Text style={styles.textBtn}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        disableRightSwipe
        rightOpenValue={-85}
        keyExtractor={item => item.id}
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
    marginBottom: 16,
  },
  titleText: {
    fontSize: 26,
    fontWeight: '500',
  },
  icon: {
    height: 24,
    width: 24,
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
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: colors.fire,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  removeBtn: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBtn: {
    fontSize: 14,
    color: '#FFF',
  },
});

export default FavoritePokemon;
