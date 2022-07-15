import * as React from 'react';
import {
  Image,
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import {getPokemons} from '../action/favoriteAction';
import images from '../assets/images';
import PokemonCard from '../components/PokemonCard';
import Container from '../components/Container';
import colors from '../theme/colors';
const {height} = Dimensions.get('window');
const PER_PAGE = 16;
import lodash from 'lodash';
import FastImage from 'react-native-fast-image';
function SearchPokemon({navigation}) {
  const {pokemons, total} = useSelector(
    (state: RootStateOrAny) => state.pokemonReducer,
  );
  const [page, setPage] = React.useState(1);
  const [loadmore, setLoadmore] = React.useState(true);
  const [keyword, setKeyword] = React.useState('');
  const [searchData, setSearchData] = React.useState<any[]>([]);
  React.useEffect(() => {}, []);

  React.useEffect(() => {
    setLoadmore(true);
  }, [page]);

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
    if (loadmore && page * PER_PAGE < searchData.length) {
      setLoadmore(false);
      setPage(page + 1);
    }
  }

  function onPressCard(pokemonDetail: any) {
    navigation.navigate('PokemonDetail', {pokemonDetail});
  }

  function renderEmpty() {
    return (
      <View style={styles.emptyView}>
        <Text style={styles.emptyText}>No Result</Text>
      </View>
    );
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearch = React.useCallback(
    lodash.debounce(nextValue => getSearchResult(nextValue), 1000),
    [],
  );

  function getSearchResult(text: string) {
    let result: any[] = [];
    if (lodash.isEmpty(text)) {
      // setSearchData([]);
    } else {
      pokemons.forEach((element: any) => {
        if (element.name.includes(text.toLocaleLowerCase())) {
          result.push(element);
        }
      });
      setPage(1);
      setSearchData(result);
    }
  }

  function handleInputOnchange(text: string) {
    setKeyword(text);
    debounceSearch(text);
  }

  function onPress() {
    navigation.goBack();
  }

  function typeOnPress(type: any) {
    const typeId = type.url.split('/')[type.url.split('/').length - 2];
    navigation.navigate('PokemonTypeScreen', {typeId, name: type.name});
  }

  return (
    <Container style={styles.container}>
      <View style={styles.header}>
        <View style={styles.row}>
          <TouchableOpacity onPress={onPress}>
            <FastImage source={images.backIconBlack} style={styles.icon} />
          </TouchableOpacity>
          <FastImage
            resizeMode="contain"
            source={images.logo}
            style={styles.logo}
          />
          <View />
        </View>
        <TextInput
          onChangeText={handleInputOnchange}
          placeholder="type a pokemon name"
          style={styles.textInput}
        />
      </View>
      <FlatList
        style={styles.pokemonList}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={searchData.slice(0, page * PER_PAGE)}
        keyExtractor={item => item.name}
        ListEmptyComponent={renderEmpty}
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
    alignItems: 'center',
    marginBottom: 12,
  },
  logo: {
    height: 60,
    width: 140,
    marginRight: 32,
  },
  pokemonList: {
    flex: 1,
  },
  emptyView: {
    flex: 1,
    paddingTop: height * 0.35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '500',
  },
  textInput: {
    minHeight: 40,
    width: '80%',
    justifyContent: 'flex-start',
    borderRadius: 4,
    borderWidth: 1,
    backgroundColor: '#ECECEC',
    borderColor: 'gray',
    paddingHorizontal: 12,
    paddingVertical: 12,
    textAlign: 'left',
    marginVertical: 5,
    marginTop: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
  },
  icon: {
    height: 24,
    width: 24,
  },
});

export default SearchPokemon;
