import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SearchBar from '../components/SearchBar'

export default function History() {
  const { historyContent } = useSelector((state: any) => state.homeReducer);
  console.log("BANA GELİYOR", historyContent)

  return (
    <SafeAreaView style = {{flex: 1}}>
      <Text style = {styles.historyTitle}>History</Text>
      <SearchBar activities = {historyContent}/>
      <Text>History</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  historyTitle:{
    fontWeight: 'bold',
    fontSize: 22,
    margin: 10
  }
})