import React, {useState} from 'react';
import {Alert, SafeAreaView, StyleSheet,View,Button,TextInput} from 'react-native';

const RegisterScreen = ({navigation}) => {
  const [details, setDetails] = useState({name:"",email_address: '', password: '',mobile_number: '',});

  const change = (name, value) => {
    let prevValue = details;
    prevValue[`${name}`] = value;
    setDetails(prevValue);
  };
  const formSubmit = async () => {
    try {
      const response = await fetch(`http://43.205.253.114:5412/users`, {
      method: "POST", 
  
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    });
   let detail = await response.json()
   console.log(detail);
   if(detail.status === false){
    Alert.alert('Registration failed try again');
   }
   else{
  
    Alert.alert('Registration Sucess');
   }
    } catch (error) {
      Alert.alert(JSON.stringify(error));
    }
    
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TextInput
          name="name"
          m="3"
          placeholder="name"
          onChange={e => {
            change('name', e.nativeEvent.text);
          }}
        />
      </View>
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
          name="mobile"
          m="3"
          placeholder="mobile"
          onChange={e => {
            change('mobile_number', e.nativeEvent.text);
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
        title='Register'
          onPress={() => {
            formSubmit();
            navigation.navigate('LoginScreen')
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

export default RegisterScreen;
