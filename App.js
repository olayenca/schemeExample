/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
} from 'react-native';
import {Header, Colors} from 'react-native/Libraries/NewAppScreen';
import requestInstagram from './requestInstagram';


const App: () => React$Node = () => {
  const [yourUserName, setUserName] = useState('');
  const [yourId, setid] = useState('');

  const onClick = () => {
    const webpage = 'https://olayenca.github.io/iosCallbacks';
    const url = `'https://api.instagram.com/oauth/authorize?client_id=1075008359508721&redirect_uri=${webpage}&scope=user_profile,user_media&response_type=code`;
    const scheme = 'appName://';

   const result =  requestInstagram(url, scheme);
   const {username, id} = result;  console.log({result});
   setUserName(username)
   setid(id);

  };

  const content = userName.length ? (
      <Text style={styles.sectionDescription}>
        {' '}
        Click this link to login in to approve app
      </Text>
  ) : (
      <Text style={styles.sectionDescription}>
        {yourUserName}: {yourId}
      </Text>
  );
  return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={styles.scrollView}>
            <Header />
            {global.HermesInternal == null ? null : (
                <View style={styles.engine}>
                  <Text style={styles.footer}>Engine: Hermes</Text>
                </View>
            )}
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <Button
                    title="Login into Instagram"
                    onPress={onClick}
                    style={styles.sectionTitle}
                />
                {content}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
