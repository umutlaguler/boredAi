import { StyleSheet, Text, View, SafeAreaView, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, {useEffect, useState} from 'react'
import { PhoneHeight, PhoneWidth } from '../constants/config'
import Slider from '@react-native-community/slider'
import { useDispatch, useSelector } from 'react-redux'
import { clearAiResponse, fetchActivities, fillActivity, fillHistoryData } from '../actions/homeAction'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../App'
import { useNavigation } from '@react-navigation/native';
import BottomTabBar from '../components/BottomTabBar'
import Header from '../components/Header'
interface DataItem {
    id: string;
    type: string;
    key: string;
  }
const data: DataItem[] = [
    { id: '10', type: 'All', key: '' },
    { id: '1', type: 'Busywork', key: 'busywork' },
    { id: '2', type: 'Recreational', key: 'recreational' },
    { id: '3', type: 'Education', key: 'education'},
    { id: '4', type: 'Social' , key: 'social'},
    { id: '5', type: 'Relaxation', key: 'relaxation'},
    { id: '6', type: 'Cooking', key: 'cooking' },
    { id: '7', type: 'Charity', key: 'charity' },
    { id: '8', type: 'Music', key: 'music' },
    { id: '9', type: 'Diy', key: 'diy' },
];
  
export default function Home() {
    const dispatch = useDispatch(); 
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>(); 
    //seçilecek olan tip
    const [selectedItem, setSelectedItem] = useState<string>('');
    const [price, setPrice] = useState<number>(0)
    const [participants, setParticipants] = useState<number>(0)
    const [accesibility, setAccessibility] = useState<number>(0)
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false)

    const { activityContent } = useSelector((state: any) => state.homeReducer);


    const renderItem = ({ item } : {item: DataItem}) => {
        return (
          <TouchableOpacity 
            onPress={() => {
                if (selectedItem === item.key) {
                setSelectedItem('');
                } else {
                setSelectedItem(item.key);
                }
            }}
            style={[
                styles.item,
                { backgroundColor: selectedItem === item.key ? 'black' : 'white' },
            ]}>
            <Text 
                style = {{ color: selectedItem === item.key ? 'white' : 'black' }}>{item.type}</Text>
          </TouchableOpacity>
        );
      };
    const onSetPrice = (value : number) => {
        setPrice(value)
    }
    const onSetParticipants = (value : number) => {
        setParticipants(value)
    }
    const onSetAccessibility = (value : number) => {
        setAccessibility(value)
    }
    const onFetchActivities = () => {
        setIsButtonDisabled(true)
        dispatch(fetchActivities(price, participants, accesibility, selectedItem) as any).then(() => setIsButtonDisabled(false)).catch((error: string) => console.log(error))
    }
    const onRandomizeValues = () => {
        const randomPrice = Math.random() * 0.5; // 0 ile 0.5 arasında rastgele bir değer
        const randomParticipants = Math.floor(Math.random() * 5); // 0 ile 4 arasında rastgele bir tam sayı
        const randomAccessibility = Math.random() * 0.5; // 0 ile 0.5 arasında rastgele bir değer

        setPrice(randomPrice);
        setParticipants(randomParticipants);
        setAccessibility(randomAccessibility);
        //to set type as randomly
        const randomTypeIndex = Math.floor(Math.random() * data.length);
        setSelectedItem(data[randomTypeIndex].key);
    }
    const startChat = (activity: string) => {
        dispatch(clearAiResponse())
        dispatch(fillActivity(activity))
        dispatch(fillHistoryData(activityContent))
        navigation.navigate('Chat')
    }
    
  return (
    <SafeAreaView style = {styles.container}>
        <View style = {{height: PhoneHeight * 0.8}}>
        <View style = {styles.topView}>
            <Header/>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                renderItem={renderItem}
            />
        </View>
        <View style = {styles.activityView}>
            {
                isButtonDisabled == true?
                <View style = {styles.activityItem}>
                        <View>
                        <ActivityIndicator/>
                        </View>                   
                        <View>
                            <Text style = {styles.upperText}>Loading...</Text>
                            <Text style = {styles.downerText}>Searching for activities</Text>
                        </View>
                    </View>
                :
                activityContent.length == 0?
                    <View style = {styles.activityItem}>
                        <View>
                            <Image
                                style={styles.tinyLogo}
                                source={require('../assets/images/magnifier.png')}
                            />
                        </View>
                    
                        <View>
                            <Text style = {styles.upperText}>Stop being bored!</Text>
                            <Text style = {styles.downerText}>Configure parameters to find activities.</Text>
                        </View>
                    </View>:
                    <View style = {styles.activityItem}>
                    <View>
                        <Image
                            style={styles.tinyLogo}
                            source={require('../assets/images/magnifier.png')}
                        />
                    </View>
                    {
                    activityContent?.error?.includes('No activity') > 0?
                    <View>
                        <Text style = {styles.upperText}>No activity found</Text>
                        <Text style = {styles.downerText}>Please change parameters and retry!</Text>
                    </View>
                    :
                    <TouchableOpacity
                        onPress={() => startChat(activityContent.activity)}
                    >
                        <Text style = {styles.upperText}>{activityContent.activity}</Text>
                        <Text style = {styles.downerText}>{activityContent.type} . {activityContent.participants} Person . {activityContent.price > 0.3? 'expensive':'cheap'}</Text>
                    </TouchableOpacity>
                    }
                </View>
            }
            
        </View>
        <View style = {styles.slidersView}>
            <Text>Price: {price.toFixed(1)}</Text>
            <Slider
                value={price}
                step={0.1}
                onSlidingComplete={onSetPrice}
            />
            <Text>Participants: {participants}</Text>
            <Slider
                value={participants}
                step={1}
                onSlidingComplete={onSetParticipants}
                maximumValue={4}
            />
            <Text>Accessibility : {accesibility.toFixed(1)}</Text>
            <Slider
                value={accesibility}
                step={0.1}
                onSlidingComplete={onSetAccessibility}
            />
        </View>
        <View style = {styles.mainButtonsView}>
            <TouchableOpacity
                style = {styles.rndBtn}
                onPress={() => onRandomizeValues()}
            >
                <Text style = {styles.rndTxt}>Randomize Values</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style = {styles.findActBtn}
                disabled={isButtonDisabled}
                onPress={() => onFetchActivities()}
            >
                <Text style = {styles.findActTxt}>Find Activity</Text>
            </TouchableOpacity>
        </View>
        </View>
        <BottomTabBar/>
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
        width: PhoneWidth, 
        height: PhoneHeight * 0.35,
        padding: 10
    },
    mainButtonsView: {
        width: PhoneWidth * 0.9,
        height: PhoneHeight * 0.1,
        alignItems:'center',
        alignSelf: 'center',
        justifyContent: 'space-between'
    },
    findActBtn: {
        width: '100%',
        height: '45%',
        alignItems: 'center',
        backgroundColor: 'black',
        justifyContent: 'center'
    },
    findActTxt: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },
    rndBtn: {
        borderWidth: 1,
        width: '100%',
        height: '45%',
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    rndTxt: {
        fontWeight: 'bold',
        fontSize: 18
    },
    tinyLogo: {
        width: 22,
        height: 22
    },
})