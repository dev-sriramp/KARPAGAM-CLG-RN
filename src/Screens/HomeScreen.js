import React, {useState, useEffect} from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Button,
  Text,
  View,
} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomePage = ({navigation}) => {
  const [data, setdata] = useState([]);
  const getData = async () => {
    try {
      let val = await AsyncStorage.getItem('user');
      let k = {};
      if (val) {
        k = JSON.parse(val);
      }
      let finalData = {
        where: {
          user_id: k.data.user.id,
        },
      };

      const response = await fetch(`http://43.205.253.114:5412/todo/list`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalData),
      });
      let detail = await response.json();
      // console.log(detail);
      if (detail.status) {
        // console.log(detail.data.todo.todo);
        setdata(detail?.data?.todo?.todo);
      }
    } catch (error) {
      console.log('error');
      // Alert.alert(JSON.stringify(error));
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, []),
  );
  useEffect(() => {
    getData();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Button
          title="Logout"
          onPress={() => {
            AsyncStorage.clear();
            navigation.navigate('LoginScreen');
          }}></Button>
      </View>
      <View>
        {data.length > 0 ? (
          data.map(i => {
            return (
              <View key={i?.id} style={{margin: 5, padding: 5}}>
                <Text>title - {i?.title}</Text>
                <Text>content - {i?.content}</Text>
                <Button
                  color={i?.is_completed ? 'green' : 'red'}
                  title={
                    i?.is_completed ? 'mark as incompleted' : 'mark as complete'
                  }
                  onPress={async () => {
                    const response = await fetch(
                      `http://43.205.253.114:5412/todo/${i?.id}`,
                      {
                        method: 'PATCH',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          is_completed:
                            i?.is_completed === false ? true : false,
                        }),
                      },
                    );
                    getData();
                  }}></Button>
              </View>
            );
          })
        ) : (
          <Text>No Data</Text>
        )}
      </View>
      <View>
        <Button
          title=" Add Notes"
          onPress={() => {
            navigation.navigate('AddNotes');
          }}></Button>
      </View>
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
