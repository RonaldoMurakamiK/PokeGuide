import { StackNavigator } from 'react-navigation';
console.disableYellowBox = true;

import FirstPage from './screens/FirstPage/index';
import MainPage from './screens/MainPage/index';
import CharacterPage from './screens/CharacterPage/index';

const navigator = StackNavigator({
  FirstPage: { screen: FirstPage, navigationOptions: { header: null }},
  MainPage: { screen: MainPage, navigationOptions: { header: null }},
  CharacterPage: { screen: CharacterPage, navigationOptions: { header: null }}
},{ 
  headerMode: 'screen'
}
);

export default navigator;