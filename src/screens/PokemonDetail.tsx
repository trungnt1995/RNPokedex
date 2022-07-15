import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  useWindowDimensions,
  FlatList,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import {addFavorite, removeFavorite} from '../action/favoriteAction';
import {TabView, SceneMap} from 'react-native-tab-view';
import {TabBar} from 'react-native-tab-view';
import images from '../assets/images';
import StatBar from '../components/StatBar';
import colors from '../theme/colors';
import Helper from '../utils/helper';
import API from '../api/request';
import EvolutionItem from '../components/EvolutionItem';
import EvolutionTab from '../components/EvolutionTab';
import BaseStatTab from '../components/BaseStatTab';

const {width} = Dimensions.get('window');

interface Props {
  route: {
    params: any;
  };
  navigation: {
    goBack: any;
    navigate: any;
    push: any;
  };
}

function PokemonDetail(props: Props) {
  const {favorites} = useSelector(
    (state: RootStateOrAny) => state.favoriteReducer,
  );
  const dispatch = useDispatch();
  const {pokemonDetail} = props.route.params;
  const [bgGradiant, setBgGradiant] = React.useState<any[]>([
    '#FFF',
    colors.primary,
    '#FFF',
  ]);

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Base stat'},
    {key: 'second', title: 'Evolution'},
  ]);
  const [evoChain, setEvoChain] = React.useState<any[]>([]);

  React.useEffect(() => {
    getBG();
    getSpecies();
  }, []);

  async function getSpecies() {
    const res = await API.getPokemonSpecies(pokemonDetail.name);
    const {evolution_chain} = res.data;
    const idEvo =
      evolution_chain.url.split('/')[evolution_chain.url.split('/').length - 2];
    const resEvo = await API.getEvolutionChain(idEvo);
    const chain = [];
    let evoData = resEvo?.data.chain;
    do {
      let numberOfEvolutions = evoData.evolves_to.length;
      const evoDetail = evoData.evolution_details[0];
      chain.push({
        species_name: evoData.species.name,
        min_level: !evoDetail ? 1 : evoDetail.min_level,
        trigger_name: !evoDetail ? null : evoDetail.trigger?.name,
        item: !evoDetail ? null : evoDetail.item,
      });

      if (numberOfEvolutions > 1) {
        for (let i = 1; i < numberOfEvolutions; i++) {
          chain.push({
            species_name: evoData.evolves_to[i].species.name,
            min_level: !evoData.evolves_to[i]
              ? 1
              : evoData.evolves_to[i].evolution_details[0].min_level,
            trigger_name: !evoData.evolves_to[i]
              ? null
              : evoData.evolves_to[i].evolution_details[0].trigger.name,
            item: !evoData.evolves_to[i]
              ? null
              : evoData.evolves_to[i].evolution_details[0].item,
          });
        }
      }

      evoData = evoData.evolves_to[0];
    } while (!!evoData && evoData.hasOwnProperty('evolves_to'));
    setEvoChain(chain);
  }

  function getBG() {
    let gradiants: any[] = [];
    pokemonDetail.types.map((type: any) => {
      gradiants.push(Helper.getTypesBGColor(type.type.name));
    });
    gradiants.unshift(Helper.getTypesBGColor(pokemonDetail.types[0].type.name));
    setBgGradiant(gradiants);
  }

  function onPress() {
    props.navigation.goBack();
  }

  const isFav = favorites.find((fav: any) => fav?.id === pokemonDetail?.id);

  function onPressFavorite() {
    if (!isFav) {
      dispatch(addFavorite(pokemonDetail));
    } else {
      dispatch(removeFavorite(pokemonDetail));
    }
  }

  function onPressCard(pokemon: any) {
    if (pokemon.id !== pokemonDetail.id) {
      props.navigation.navigate(
        'PokemonDetail',
        {pokemonDetail: pokemon},
        pokemon.name,
      );
    }
  }
  const renderScene = ({route}) => {
    switch (route.key) {
      case 'second':
        return <EvolutionTab onPressCard={onPressCard} evoChain={evoChain} />;
      case 'first':
        return <BaseStatTab data={pokemonDetail.stats} />;
      default:
        return null;
    }
  };

  function typeOnPress(type: any) {
    const typeId = type.url.split('/')[type.url.split('/').length - 2];
    props.navigation.navigate('PokemonTypeScreen', {typeId, name: type.name});
  }

  return (
    <LinearGradient colors={bgGradiant} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onPress}>
          <FastImage source={images.backIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.imageView} />
        <View style={styles.detailCard}>
          <TouchableOpacity
            style={styles.favoriteBtn}
            onPress={onPressFavorite}>
            <FastImage
              style={styles.favorite}
              source={isFav ? images.icFavorited : images.icFavorite}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <FastImage
            style={styles.image}
            source={{uri: pokemonDetail.sprites.front_default}}
            resizeMode="cover"
          />
          <Text
            style={
              styles.nameText
            }>{`#${pokemonDetail.id} ${pokemonDetail.name}`}</Text>
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
          <View style={styles.whView}>
            <View style={styles.heightBlock}>
              <FastImage
                style={styles.heightImg}
                source={images.weightIcon}
                resizeMode="cover"
              />
              <Text style={styles.heightText}>{`${(
                pokemonDetail.weight / 10
              ).toFixed(1)}kg`}</Text>
            </View>
            <View style={styles.heightBlock}>
              <FastImage
                style={styles.heightImg}
                source={images.heightIcon}
                resizeMode="cover"
              />
              <Text style={styles.heightText}>{`${(
                pokemonDetail.height / 10
              ).toFixed(1)}m`}</Text>
            </View>
          </View>
          <View style={styles.statView}>
            <TabView
              renderTabBar={props => (
                <TabBar
                  tabStyle={styles.tabStyle}
                  activeColor={'#000'}
                  inactiveColor={'#ACACAC'}
                  {...props}
                />
              )}
              lazy
              lazyPreloadDistance={2}
              navigationState={{index, routes}}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{width: layout.width - 32}}
            />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingTop: getStatusBarHeight(),
    paddingHorizontal: 16,
    paddingBottom: getStatusBarHeight(),
  },
  icon: {
    height: 22,
    width: 22,
  },
  header: {
    paddingTop: 18,
    marginBottom: 16,
  },
  content: {
    flex: 1,
  },
  detailCard: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 12,
    alignItems: 'center',
    paddingTop: width * 0.19,
  },
  image: {
    height: width * 0.4,
    width: width * 0.4,
    position: 'absolute',
    zIndex: 2,
    top: -width * 0.2,
    left: (width - 64) * 0.3,
  },
  imageView: {
    height: 60,
    width: '100%',
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  typeView: {
    flexDirection: 'row',
    marginVertical: 12,
    paddingHorizontal: 24,
  },
  typeBlock: {
    // flex: 1,
    width: width * 0.28,
    height: 30,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  typeName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'capitalize',
  },
  whView: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 6,
  },
  heightImg: {
    height: 32,
    width: 32,
  },
  heightBlock: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heightText: {
    fontSize: 16,
    marginTop: 4,
  },
  statView: {
    flex: 1,
    width: '100%',
  },
  statList: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 24,
  },
  favorite: {
    height: 24,
    width: 24,
  },
  favoriteBtn: {
    top: 16,
    right: 16,
    position: 'absolute',
  },
  tabStyle: {
    backgroundColor: '#FFF',
    height: 42,
  },
});

export default PokemonDetail;
