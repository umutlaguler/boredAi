import { StyleSheet, Text, View, SafeAreaView, FlatList, Keyboard, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { activities } from '../constants/activites.json'
import { PhoneHeight, PhoneWidth } from '../constants/config';
import BottomTabBar from './BottomTabBar';
interface ActivityItem {
  activity: string;
  accessibility: number;
  type: string;
  participants: number;
  price: number;
  link: string;
  key: string;
}
const SearchBar: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const filteredActivities = activities.filter((activity: ActivityItem)=>
    activity.activity.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleClearSearch = () => {
    setSearchText('');
  };

  const handleCancelSearch = () => {
    Keyboard.dismiss();
  };

  const renderActivityItem = ({ item }: { item: ActivityItem }) => (
    <TouchableOpacity style = {styles.searchedItem}>
      <Text style={{ padding: 10 }}>{item.activity}</Text>
      <View style = {{flexDirection: 'row'}}>
        <Text style={{ padding: 10 }}>{item.type}</Text>
        <Text style={{ padding: 10 }}>{item.participants} Person</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, padding: 10 }}>
      <View
        style={{
          borderWidth: 0,
          borderColor: isFocused ? 'black' : 'lightgrey',
          borderRadius: 5,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          marginBottom: 10,
        }}
      >
        <TextInput
          style={styles.searchInput}
          placeholder="Search activity"
          value={searchText}
          onChangeText={setSearchText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {searchText !== '' && (
          <TouchableOpacity onPress={handleClearSearch}>
            <Text>X</Text>
          </TouchableOpacity>
        )}
        {isFocused && (
          <TouchableOpacity onPress={handleCancelSearch}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={filteredActivities}
        renderItem={renderActivityItem}
        keyExtractor={(item) => item.key}
      />
      <BottomTabBar/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    padding: 8
  },
  searchedItem: {
    borderBottomWidth: 1,
    height: PhoneHeight * 0.08,
    width: PhoneWidth
  }

})
export default SearchBar;