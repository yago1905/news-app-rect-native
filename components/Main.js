import React from 'react';
import { useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
} from 'react-native';
import { gStyle } from '../styles/style';
import { Ionicons } from '@expo/vector-icons';
import Form from './Form';

export default function Main({ navigation }) {
  const [news, setNews] = useState([
    {
      name: 'Google',
      anons: 'Google!!!',
      full: 'Google is cool!',
      key: '1',
      img: 'https://www.futuremind.com/m/articles/none/react_native_vs_native_apps.png',
    },
    {
      name: 'Apple',
      anons: 'Apple!!!',
      full: 'Apple is cool!',
      key: '2',
      img: 'https://miro.medium.com/max/700/1*C3kxjCrJy-aWSMpe2chfaA.png',
    },
    {
      name: 'Amazon',
      anons: 'Amazon!!!',
      full: 'Amazon is cool!',
      key: '3',
      img: 'https://repository-images.githubusercontent.com/329723227/62ff9135-2763-4fba-ae7f-0b1eefa0ea56',
    },
  ]);

  const [modalWindow, setModalWindow] = useState(false);

  const addArticle = (article) => {
    setNews((list) => {
      article.key = Math.random().toString();
      return [article, ...list];
    });
    setModalWindow(false);
  };

  return (
    <View style={gStyle.main}>
      <Modal visible={modalWindow}>
        <View style={gStyle.main}>
          <Ionicons
            name="close-circle"
            size={34}
            color="red"
            style={styles.iconClose}
            onPress={() => setModalWindow(false)}
          />
          <Text style={styles.title}>Форма добавления статей</Text>
          <Form addArticle={addArticle} />
        </View>
      </Modal>
      <Ionicons
        name="add-circle-sharp"
        size={34}
        color="green"
        style={styles.iconAdd}
        onPress={() => setModalWindow(true)}
      />
      <Text style={[gStyle.title, styles.header]}>Главная страница</Text>
      <FlatList
        data={news}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('FullInfo', item)}
          >
            <Image
              style={styles.image}
              source={{
                uri: item.img,
              }}
            />
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.anons}>{item.anons}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  iconAdd: {
    textAlign: 'center',
    marginTop: 15,
  },
  iconClose: {
    textAlign: 'center',
    marginTop: 15,
  },
  image: { width: '100%', height: 200 },
  header: { marginBottom: 30 },
  item: {
    width: '100%',
    marginBottom: 30,
  },
  title: {
    fontFamily: 'mt-bold',
    fontSize: 22,
    textAlign: 'center',
    marginTop: 20,
    color: '#474747',
  },
  anons: {
    fontFamily: 'mt-light',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5,
    color: '#474747',
  },
});
