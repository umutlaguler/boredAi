import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { PhoneHeight, PhoneWidth } from '../constants/config'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParams } from '../../App'


export default function BottomTabBar() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <View style = {styles.container}>
      <TouchableOpacity style = {styles.bottomBtn}><Text>main</Text></TouchableOpacity>
      <TouchableOpacity 
        onPress={() => navigation.navigate('Search')}
        style = {styles.bottomBtn}><Text>search</Text></TouchableOpacity>
      <TouchableOpacity style = {styles.bottomBtn}><Text>history</Text></TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: PhoneWidth,
        height: PhoneHeight * 0.1,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent:'space-around'
    },
    bottomBtn:{
        borderWidth:1,
        width: '33%',
        alignItems:'center',
        justifyContent:'center'
    }
})