import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { RouteProp } from '@react-navigation/native';
import { RootStackParams } from '../../App';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { AI_API_KEY, PhoneHeight } from '../constants/config';
import { fetchActivities, fetchChatResponse, fillHistoryData } from '../actions/homeAction';
import { ActivityItem } from '../components/SearchBar';
export interface HistoryItem {
  activityContent: string;
  aiMessage: string;
}
export default function Chat() {
  const dispatch = useDispatch();
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const { activityTxt, aiResponse } = useSelector((state: any) => state.homeReducer);

  useEffect(() => {
    
  }, []);

  useEffect(() => {
    if (aiResponse === '') {
      setIsThinking(true);
      dispatch(fetchChatResponse("I want to " + activityTxt) as any);
    } else {
      setIsThinking(false);
      const historyData: ActivityItem = {
        activity: activityTxt,
        aiMessage: aiResponse,
      };
      dispatch(fillHistoryData(historyData));
    }
  }, [aiResponse, activityTxt]);
 
  return (
    <SafeAreaView>
      <View style={styles.topView}>
        <Header />
        <TouchableOpacity
          style={styles.ourMessage}
          // onPress={() => sendPromptToOpenAI()}
        >
          <Text>I want to {activityTxt}</Text>
        </TouchableOpacity>

        <View style={styles.aiMessage}>
          {isThinking ? <Text>Thinking...</Text> : <Text>{aiResponse}</Text>}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topView: {
    padding: 8,
  },
  ourMessage: {
    alignSelf: 'flex-end',
    borderWidth: 0.5,
    marginTop: 10,
    backgroundColor: '#fafafd',
    borderRadius: 20,
    padding: 10,
  },
  aiMessage: {
    alignSelf: 'flex-start',
    borderWidth: 0.5,
    marginTop: 10,
    borderRadius: 20,
    padding: 10,
  },
});