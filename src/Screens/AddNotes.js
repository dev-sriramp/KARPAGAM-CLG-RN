import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Button,
  TextInput,
  Text,
  Alert,
} from 'react-native';

const AddNotes = ({navigation}) => {
  const [details, setDetails] = useState({title: '', content: ''});
  const [user, setUser] = useState();
  const getUser = async () => {
    let val = await AsyncStorage.getItem('user');
    setUser(JSON.parse(val));
  };
  const addNote = async () =>{
    console.log(user.data.user.id);
    let data = {...details}
    data.user_id = user.data.user.id
    try {
      const response = await fetch(`http://43.205.253.114:5412/todo`, {
      method: "POST", 
  
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
   let detail = await response.json()
   if(detail.status === false){
    Alert.alert('Add Note Failed');
   }else{
    Alert.alert('Notes Added Sucessfully');
   }

  
    } catch (error) {
      Alert.alert(JSON.stringify(error));
    }
  }
  const change = (name, value) => {
    let prevValue = details;
    prevValue[`${name}`] = value;
    setDetails(prevValue);
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Title</Text>
        <TextInput
          style={{width: '100%'}}
          name="title"
          m="3"
          placeholder="Title"
          onChange={e => {
            change('title', e.nativeEvent.text);
          }}
        />
      </View>
      <View>
        <Text>Content</Text>
        <TextInput
          style={{width: '100%', textAlignVertical: 'top'}}
          multiline
          height="60%"
          name="content"
          m="3"
          onChange={e => {
            change('content', e.nativeEvent.text);
          }}
          placeholder="Content"
        />
      </View>
      <View>
        <Button
          title="Save"
          onPress={() => {
            addNote()
            navigation.navigate('Dashboard');
          }}></Button>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  input: {
    width: 200,
    borderBottomColor: 'red',
    borderBottomWidth: 1,
  },
});

export default AddNotes;
