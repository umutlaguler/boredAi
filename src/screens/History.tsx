import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, Modal, Alert, Pressable } from 'react-native'
import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SearchBar from '../components/SearchBar'

export default function History() {

  const [deleteModal, setDeleteModal] = useState<boolean>(false)
  const { historyContent } = useSelector((state: any) => state.homeReducer);
  console.log("BANA GELİYOR", historyContent)

  const onDeleteHistory = () => {
    setDeleteModal(!deleteModal)
  }
  return (
    <SafeAreaView style = {{flex: 1}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteModal}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setDeleteModal(!deleteModal);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you</Text>
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
      <SearchBar activities = {historyContent}/>
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