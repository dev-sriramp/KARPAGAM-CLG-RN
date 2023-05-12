import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import {SafeAreaView, StyleSheet, View, Button} from 'react-native';

const Home = ({navigation}) => {
  const getUser = async () => {
    let val = await AsyncStorage.getItem('user');
    console.log(val);
    if (val) navigation.navigate('Dashboard')
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Button
          title="Login"
          onPress={() => {
            navigation.navigate('LoginScreen');
          }}></Button>
      </View>
      <View style={{marginTop:'10%'}}>
        <Button
          title="Register"
          onPress={() => {
            navigation.navigate('RegisterScreen');
          }}></Button>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    width: '80%',
    bottom:10,
    margin:'10%'

    
  },
});

export default Home;
