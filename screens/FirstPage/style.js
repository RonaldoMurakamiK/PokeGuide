import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  button: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    borderRadius: 60,
    height: '10%',
    width: '80%',
    marginBottom: '15%',
    elevation: 5.5,
    borderBottomWidth: 0
  },
  buttonfont: {
    marginTop: '15%', 
    fontSize: 30, 
    fontWeight: 'bold', 
    color: '#fc474f'
  },
  titleFont: {
    marginTop: '15%', 
    fontSize: 50, 
    fontWeight: 'bold', 
    color: 'white',
    flex: 1
  },
  descfont: {
    fontSize: 20, 
    fontWeight: 'bold', 
    color: 'white'
  }
});