import { StyleSheet, Text, Touchable, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { PhoneHeight, PhoneWidth } from '../constants/config'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParams } from '../../App'


export default function BottomTabBar() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <View style = {styles.container}>
      <TouchableOpacity 
        onPress={() => navigation.navigate('Home')}
        style = {styles.bottomBtn}>
          <Image
            style={styles.tinyLogo}
            source={require('../assets/images/home.png')}
          />
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => navigation.navigate('Search')}
        style = {styles.bottomBtn}>
          <Image
            style={styles.tinyLogo}
            source={require('../assets/images/magnifier.png')}
          />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('History')}
        style = {styles.bottomBtn}>
          <Image
            style={styles.tinyLogo}
            source={require('../assets/images/chat.png')}
          />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: PhoneWidth,
        height: PhoneHeight * 0.1,
        borderTopWidth: 1,
        flexDirection: 'row',
        justifyContent:'space-around'
    },
    bottomBtn:{
        width: '33%',
        alignItems:'center',
        justifyContent:'center'
    },
    tinyLogo: {
      width: PhoneWidth * 0.09,
      height: PhoneHeight * 0.04
    }
})