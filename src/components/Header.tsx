import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'

export default function Header(): React.JSX.Element{
  return (
        <View style = {styles.titleView}>
            <Text style = {styles.title}>Bored AI</Text>
            <Image
                style={styles.userLogo}
                source={require('../assets/images/user.png')}
            />
        </View>
  )
}

const styles = StyleSheet.create({
    titleView:{
        // borderWidth: 1,
        borderColor: 'red',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center'
    },
    title: {
        fontWeight:'bold',
        fontSize: 22,
    },
    userLogo: {
        width: 22,
        height: 22
    },
})