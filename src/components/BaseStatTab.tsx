import _ from 'lodash';
import * as React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import Helper from '../utils/helper';
import EvolutionItem from './EvolutionItem';
import StatBar from './StatBar';

interface Props {
  data: any;
}

function BaseStatTab(props: Props) {
  const {data} = props;

  function renderStat({item, idx}: any) {
    return (
      <View key={idx} style={styles.barStat}>
        <StatBar
          key={idx}
          stat={item?.stat}
          animation
          color={Helper.getStatColor(item?.stat.name)}
          value={item?.base_stat}
        />
      </View>
    );
  }

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      style={styles.statList}
      data={data}
      renderItem={renderStat}
      keyExtractor={(item, idex) => idex + ''}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 20,
    borderRadius: 12,
    backgroundColor: '#ECECEC',
  },
  statList: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 24,
  },
  barStat: {
    marginVertical: 4,
  },
});

export default React.memo(BaseStatTab);
