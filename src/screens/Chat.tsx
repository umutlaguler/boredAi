import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { RouteProp } from '@react-navigation/native';
import { RootStackParams } from '../../App';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { AI_API_KEY } from '../constants/config';

export default function Chat() {
    const [isThinking, setIsThinking] = useState<boolean>(false)
    const [answerResponse, setAnswerResponse] = useState<string>("")
    const { activityTxt } = useSelector((state: any) => state.homeReducer);
    const sendPromptToOpenAI = async () => {
        setIsThinking(true)
        try {
          const response = await axios.post(
            'https://api.openai.com/v1/completions',
            {
              model: 'text-davinci-003', // kullanmak istediğiniz model
              prompt: `I want to ${activityTxt}`, // seçilen etkinliğe göre değişecek istem
              // diğer parametreler
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AI_API_KEY}`,
              },
            }
          );
        if(response.data != undefined){
          console.log(response.data);
          setAnswerResponse(response.data)
          setIsThinking(false)
        }
        else{
            setIsThinking(true)
        }
          // OpenAI'den gelen yanıtı kullanıcıya göstermek için bir işleme yapabilirsiniz

        } catch (error) {
          Alert.alert('Error sending request to OpenAI:');
          setIsThinking(false)
        }
      };
      useEffect(() => {
        sendPromptToOpenAI()
      },[])
  return (
    <SafeAreaView>
        <View style = {styles.topView}>
            <Header/>
            <TouchableOpacity
                style = {styles.ourMessage}
                onPress={() => sendPromptToOpenAI()}
            >
           
                <Text>I want to {activityTxt}</Text>
            </TouchableOpacity>
           
                <View style = {styles.aiMessage}>
                {
                isThinking == true?
                    <Text>Thinking...</Text>
                    :
                    <Text>{answerResponse}</Text>
                }
                </View>
               

        </View>
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    topView:{
        padding: 8
    },
    ourMessage:{
        alignSelf: 'flex-end',
        borderWidth: 0.5,
        marginTop: 10,
        backgroundColor: '#fafafd',
        borderRadius: 20,
        padding: 10
    },
    aiMessage: {
        alignSelf: 'flex-start',
        borderWidth: 0.5,
        marginTop: 10,
        borderRadius: 20,
        padding: 10
    }
})