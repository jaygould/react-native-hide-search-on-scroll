import React, {useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Animated,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const App = () => {
  const [titleSearchValue, onChangeText] = useState('');
  const [toggleSearchBar, setToggleSearchBar] = useState(false);

  const searchBarAnim = useRef(new Animated.Value(-45)).current;
  useEffect(() => {
    if (toggleSearchBar) {
      Animated.timing(searchBarAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(searchBarAnim, {
        toValue: -45,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [toggleSearchBar]);

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <Text style={styles.whiteText}>{item.title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerText}>Your awesome app</Text>
        </View>
        <TouchableOpacity
          style={styles.searchBtn}
          onPress={() => setToggleSearchBar(!toggleSearchBar)}>
          <Text style={styles.headerText}>Search</Text>
        </TouchableOpacity>
      </View>
      <Animated.View style={{transform: [{translateY: searchBarAnim}]}}>
        <View style={styles.searchBarWrap}>
          <TextInput
            onChangeText={(text) => onChangeText(text)}
            value={titleSearchValue}
            placeholder={'Search...'}
            placeholderTextColor={'#fff'}
            style={styles.whiteText}
          />
        </View>
      </Animated.View>

      <Animated.FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onScrollBeginDrag={() => setToggleSearchBar(false)}
        style={{transform: [{translateY: searchBarAnim}]}}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#999',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    position: 'relative',
    height: 50,
    zIndex: 10,
  },
  headerText: {
    color: '#444',
  },
  searchBarWrap: {
    backgroundColor: '#434a5d',
    paddingHorizontal: 12,
    justifyContent: 'center',
    height: 45,
  },
  searchBtn: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  item: {
    backgroundColor: '#716f25',
    padding: 20,
    marginTop: 4,
    marginHorizontal: 4,
  },
  whiteText: {
    color: '#fff',
  },
});

export default App;
