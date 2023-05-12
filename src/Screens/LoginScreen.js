import React, {useState, useEffect} from 'react';
import {Alert, SafeAreaView, StyleSheet,Button,View,TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
  const [details, setDetails] = useState({email_address: '', password: ''});

  const change = (name, value) => {
    let prevValue = details;
    prevValue[`${name}`] = value;
    setDetails(prevValue);
  };
  const formSubmit = async () => {
    try {
      const response = await fetch(`http://43.205.253.114:5412/users/login`, {
      method: "POST", 
  
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    });
   let detail = await response.json()
   console.log(detail);
   if(detail.status === false){
    Alert.alert('Login failed try again');
   }else{
    AsyncStorage.setItem('user',JSON.stringify(detail));
    Alert.alert('Login Sucessful');
   }

  
    } catch (error) {
      Alert.alert(JSON.stringify(error));
    }
    
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TextInput
          name="email"
          m="3"
          placeholder="email"
          onChange={e => {
            change('email_address', e.nativeEvent.text);
          }}
        />
      </View>
      <View>
        <TextInput
          onChange={e => {
            change('password', e.nativeEvent.text);
          }}
          name="password"
          m="3"
          placeholder="Password"
        />
      </View>
      <View>
        <Button
        title='Login'
          onPress={() => {
            formSubmit();
            navigation.navigate('Dashboard')
          }}>
          
        </Button>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LoginScreen;
