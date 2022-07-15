import _ from 'lodash';
import * as React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import EvolutionItem from './EvolutionItem';

interface Props {
  evoChain: any;
  onPressCard: any;
}

function EvolutionTab(props: Props) {
  const {evoChain, onPressCard} = props;

  function renderEvolutionItem({item, idx}: any) {
    return <EvolutionItem onPressCard={onPressCard} item={item} />;
  }
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      style={styles.list}
      data={evoChain}
      renderItem={renderEvolutionItem}
      keyExtractor={item => item.species_name}
      ItemSeparatorComponent={()=> <View style={styles.divider} />}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 24,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#ECECEC',
  },
});

export default React.memo(EvolutionTab);
