import { StyleSheet, Text, View, SafeAreaView, Image, FlatList, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { PhoneHeight, PhoneWidth } from '../constants/config'
import Slider from '@react-native-community/slider'
interface DataItem {
    id: string;
    type: string;
  }
const data: DataItem[] = [
    { id: '10', type: 'All' },
    { id: '1', type: 'Busywork' },
    { id: '2', type: 'Recreational' },
    { id: '3', type: 'Education' },
    { id: '4', type: 'Social' },
    { id: '5', type: 'Relaxation' },
    { id: '6', type: 'Cooking' },
    { id: '7', type: 'Charity' },
    { id: '8', type: 'Music' },
    { id: '9', type: 'Diy' },
];
  
export default function Home() {
    //seçilecek olan tip
    const [selectedItem, setSelectedItem] = useState<string>('');
    const [price, setPrice] = useState<number>(0)

    const renderItem = ({ item } : {item: DataItem}) => {
        return (
          <TouchableOpacity 
            onPress={() => {
                if (selectedItem === item.id) {
                setSelectedItem('');
                } else {
                setSelectedItem(item.id);
                }
            }}
            style={[
                styles.item,
                { backgroundColor: selectedItem === item.id ? 'black' : 'white' },
            ]}>
            <Text 
                style = {{ color: selectedItem === item.id ? 'white' : 'black' }}>{item.type}</Text>
          </TouchableOpacity>
        );
      };
    const onSetPrice = (value : number) => {
        setPrice(value)
    }
  return (
    <SafeAreaView style = {styles.container}>
        <View style = {styles.topView}>
            <View style = {styles.titleView}>
                <Text style = {styles.title}>Bored AI</Text>
                <Image
                    style={styles.userLogo}
                    source={require('../assets/images/user.png')}
                />
            </View>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                renderItem={renderItem}
            />
        </View>
        <View style = {styles.activityView}>
            <View style = {styles.activityItem}>
                <View>
                    <Image
                        style={styles.userLogo}
                        source={require('../assets/images/magnifier.png')}
                    />
                </View>
                <View>
                    <Text style = {styles.upperText}>Stop being bored!</Text>
                    <Text style = {styles.downerText}>Configure parameters to find activities.</Text>
                </View>
            </View>
        </View>
        <View style = {styles.slidersView}>
            <Text>Price: {price.toFixed(1)}</Text>
            <Slider
                value={price}
                step={0.1}
                onSlidingComplete={onSetPrice}
            />
            <Text>Participants</Text>
            <Slider/>
            <Text>Accessibility</Text>
            <Slider/>
        </View>
        <View style = {styles.mainButtonsView}>
            <TouchableOpacity>
                <Text>Find Activity</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    topView:{
        // borderWidth: 1,
        width: PhoneWidth,
        height: PhoneHeight * 0.1,
        padding: 8
    },
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
    item: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 20,
        marginVertical: 8,
        marginHorizontal: 5,
        paddingHorizontal: 10,
        padding: 5
    },
    activityView:{
        borderWidth: 0,
        width: PhoneWidth,
        height: PhoneHeight * 0.15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    activityItem: {
        borderWidth: 1,
        width: PhoneWidth * 0.9,
        height: PhoneHeight * 0.1,
        borderRadius: 12,
        justifyContent:'space-evenly',
        alignItems:'center',
        flexDirection: 'row'
    },
    upperText: {
        fontWeight: 'bold'
    },
    downerText: {
        fontWeight:'300'
    },
    slidersView:{
        borderWidth: 1,
        width: PhoneWidth, 
        height: PhoneHeight * 0.35,
        padding: 10
    },
    mainButtonsView: {

    }
})