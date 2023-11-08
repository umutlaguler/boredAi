import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, Modal, Alert, Pressable } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SearchBar from '../components/SearchBar'
import { deleteHistoryData } from '../actions/homeAction'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityItem } from '../reducers/homeReducer'

export default function History() {
  const dispatch = useDispatch()
  const [deleteModal, setDeleteModal] = useState<boolean>(false)
  const { historyContent } = useSelector((state: any) => state.homeReducer);
  const [parsedHistory, setParsedHistory] = useState<any>()

  console.log("BANA GELİYOR", historyContent)

  const onDeleteHistory = () => {
    setDeleteModal(!deleteModal)
    dispatch(deleteHistoryData())
    getHistoryFromStorage()
  }
  const getHistoryFromStorage = async () => {
    try {
      const storedHistory = await AsyncStorage.getItem('historyContent');
      if (storedHistory !== null) {
        setParsedHistory(JSON.parse(storedHistory));
        console.log("Stored History from AsyncStorage:", parsedHistory);
      } else {
        console.log("No history found in AsyncStorage.");
      }
    } catch (e) {
      console.error("Error retrieving history from AsyncStorage:", e);
    }
  };

  useEffect(() => {
    getHistoryFromStorage();
  }, []);

  return (
    <SafeAreaView style = {{flex: 1}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteModal}
        onRequestClose={() => {
          setDeleteModal(!deleteModal);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure to delete history?</Text>
            <View style = {{flexDirection: 'row'}}>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => onDeleteHistory()}>
                <Text style={styles.textStyle}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setDeleteModal(!deleteModal)}>
                <Text style={styles.textStyle}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style = {styles.topView}>
      <Text style = {styles.historyTitle}>History</Text>
      <TouchableOpacity
        onPress={() => setDeleteModal(true)}
      >
      <Image
        style={styles.tinyLogo}
        source={require('../assets/images/trash-can.png')}
      />
      </TouchableOpacity>
      </View>
      <SearchBar activities = {parsedHistory?.length > 0? parsedHistory : historyContent}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  historyTitle:{
    fontWeight: 'bold',
    fontSize: 22,
    margin: 10
  },
  tinyLogo: {
    width: 20,
    height: 20,
    marginRight: 10
  },
  topView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between'
  },
  //modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginHorizontal: 10
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})