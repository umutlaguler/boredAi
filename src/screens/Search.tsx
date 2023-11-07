import { StyleSheet, Text, View,SafeAreaView } from 'react-native'
import React from 'react'
import SearchBar from '../components/SearchBar'
import { activities } from '../constants/activites.json'
import { ActivityItem } from '../reducers/homeReducer'
export default function Search() {
  return (
    <SafeAreaView style = {{flex: 1}}>
      <Text style = {styles.searchTitle}>Search</Text>
      <SearchBar activities = {activities}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  searchTitle: {
    fontWeight: 'bold',
    fontSize: 22,
    margin: 10
  }
})