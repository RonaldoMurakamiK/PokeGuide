import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  StatusBar
} from 'react-native';
import styles from './style';

export default class FirstPage extends Component {
  constructor(props){
    super(props);

    this.MainPage = this.MainPage.bind(this);
  }

  MainPage(){
    this.props.navigation.navigate('MainPage');
  }

  render() {
    return (
      <ImageBackground source={require('../../img/background_firstpage.png')} style={{flex: 1}}>
        <StatusBar backgroundColor="#fc474f" barStyle="light-content"/>
        <View style={styles.container}>
          <Text style={styles.titleFont}>PokeGuide</Text>
          <Text style={styles.descfont}>A melhor Pokedex do mundo!</Text>
          <TouchableOpacity style={styles.button} onPress={() => this.MainPage()}>
            <Text style={styles.buttonfont}>Acessar lista</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}