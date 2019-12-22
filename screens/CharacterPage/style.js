import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    imagem: {
        backgroundColor: 'transparent',
        height: 160,
        width: 160,
        marginTop: '-2%',
        marginBottom: '8%'
    },
    infoTitle: {
        fontSize: 18,
        marginLeft: '8%',
        color: 'grey',
        fontWeight: 'bold'
    },
    info: {
        fontSize: 18,
        color: 'grey',
        marginRight: '10%'
    },
    titulo: {
        fontSize: 24,
        color: 'black',
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: '2%',
        marginTop: '8%'
    },
    box1: {
        alignItems: 'center',
        width: '100%', 
        flex: 1,
        marginTop: -5
    },
    box2: {
        width: '100%', 
        flex: 1,
        elevation: 5.5, 
        borderBottomWidth: 0,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40
    },
    imagemArrow: {
        backgroundColor: 'transparent',
        height: 30,
        width: 30
    },
    arrowButton: {
        backgroundColor: 'transparent', 
        alignSelf: 'center',
        marginTop: '2.55%', 
        marginHorizontal: '6%',
        padding: '2%', 
        marginBottom: '2.5%'
    },
    progressBar: {
        flex: 1
    },
    descricao: {
        fontSize: 18,
        color: 'grey',
        alignSelf: 'center',
        marginHorizontal: '8%'
    },
    headerFont: {
        fontSize: 22, 
        fontWeight: 'bold', 
        color: 'white'
    },
    status: {
        marginRight: '2%',
        marginLeft: '8%', 
        fontSize: 15,
        fontWeight: 'bold'
    },
    directionStatus: {
        flexDirection: 'row', 
        marginTop: '3%'
    },
    numberStatus: {
        marginRight: '8%', 
        marginLeft: '2%',
        fontSize: 15,
        fontWeight: 'bold'
    }
});