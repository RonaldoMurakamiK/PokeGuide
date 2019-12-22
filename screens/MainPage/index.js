import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
  FlatList,
  StatusBar,
  ImageBackground,
  TextInput
} from 'react-native';
import api from '../services/api';
import styles from './style';

let pokemonIndex = 1, counter = 1;

export default class MainPage extends Component {
    constructor(props){
        super(props);

        this.state={
            Names: [],
            loading: true,
            color: '#fc474f',
            counter: counter,
            previousPage: '',
            nextPage: '',
            id: ''
        };

        this.CharacterPage = this.CharacterPage.bind(this);
        this.getID = this.getID.bind(this);
    }    

    async componentDidMount() {
        counter = 1;
        this.setState({counter: 1});

        // Requisição dos nomes de cada pokemon e os links para as próximas páginas
        var response = await api.get();
        this.setState({
            Names: response.data.results, 
            loading: false,
            nextPage: response.data.next,
            previousPage: response.data.previous
        });
    }

    previousPage = async () => {
        // Verificação caso o usuário já permanece na primeira página
        if(counter == 1) Alert.alert("Ação negada!", "Você já está na primeira página, não há páginas anteriores a esta!");
        else{
            counter--;
            this.setState({counter: counter})

            const {previousPage} = this.state;
            // Puxa os dados da página anterior
            var response = await api.get(previousPage);
            this.setState({
                Names: response.data.results, 
                previousPage: response.data.previous,
                nextPage: response.data.next
            });
        }
    }

    nextPage = async () => {
        // Verificação caso o usuário já permanece na última página
        if(counter == 41) Alert.alert("Ação negada!", "Você já está na última página, não há páginas após esta!");
        else {
            counter++;
            this.setState({counter: counter})

            const {nextPage} = this.state;
            // Puxa os dados da página seguinte
            var response = await api.get(nextPage);
            this.setState({
                Names: response.data.results, 
                previousPage: response.data.previous,
                nextPage: response.data.next
            });
        }
    };

    especificPage = async (cont, offset) => {
        counter = cont;
        this.setState({counter: counter})

        // Puxa os dados da página específica da busca
        var response = await api.get('https://pokeapi.co/api/v2/pokemon/?offset=' + offset + '&limit=20');
        this.setState({
            Names: response.data.results, 
            previousPage: response.data.previous,
            nextPage: response.data.next
        });
    };

    CharacterPage(id){
        // Chama a próxima tela passando o id do pokemon selecionado
        this.props.navigation.navigate('CharacterPage', {id: id});
    }
 
    renderItem = (data) => {
        // Define a numeração do pokemon
        const url = data.item.url;
        const pokemonIndex = url.split('/')[url.split('/').length - 2];
        // Pega a imagem do pokemon de acordo com sua numeração
        const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;

        return(
            <TouchableOpacity style={styles.gridButton}
                              onPress={() => this.CharacterPage(pokemonIndex)}>
                <StatusBar backgroundColor="#fc474f" barStyle="light-content"/>
                <View style={[styles.grid, {backgroundColor: this.state.color}]}>
                    <Text style={styles.indexFont}>{pokemonIndex}</Text>
                    <Image resizeMode="contain" source={{uri: imageUrl}} style={styles.imagem}/>
                    <Text style={styles.fonte}>{data.item.name}</Text>
                </View>
            </TouchableOpacity>
        ) ;
    }

    getID = async (value) => {
        // Pega o id do pokemon de acordo com o nome ou id digitado
        const response = await api.get(value + '/');
        this.setState({
            id: response.data.id
        });
        const valueId = parseInt(response.data.id);
        let page = Math.ceil(valueId/20);
        let limit = ((page-1)*20);

        // Faz a busca utilizando o id pesquisado
        if(valueId <= 0) Alert.alert("Erro na busca!", "Não existem pokemons com ID menores ou iguais à zero!");
        else if(valueId > 0 && valueId <= 807) {
            this.especificPage(page, limit);
        }
        else if(valueId != '' && valueId != null){
            Alert.alert("Erro na busca!", "O nome/ID digitado não foi encontrado!");
            this.especificPage(1, 1);
        }
        else this.especificPage(1, 1);
    }
    

    render() {
        const { Names, loading } = this.state;
        
        if(!loading) {
            return(
                <ImageBackground source={require('../../img/background_mainpage.png')} style={{flex: 1}}>
                    <View style={styles.header}>
                        <Text style={styles.presentationFont}>PokeDex (All the pokemons)</Text>
                        <View style={styles.containerHeader}>
                            <Image resizeMode="contain" source={require('../../img/loupe.png')} style={styles.imagemSearch}/>
                            <Text style={styles.search}>Buscar por nome ou ID: </Text>
                            <TextInput style={styles.input} placeholder="Buscar..."  onChangeText={(value) => this.getID(value.toLocaleLowerCase())}/>
                        </View>
                    </View>
                    <View>
                        <View style={styles.containerArrows}>
                            <TouchableOpacity style={styles.arrowButton} onPress={this.previousPage}>
                                <Image resizeMode="contain" source={require('../../img/left-arrow.png')} style={styles.imagemArrow}/>
                            </TouchableOpacity>

                            <View style={styles.arrowButton}>
                                <Text style={styles.count}>{this.state.counter}</Text>
                            </View>

                            <TouchableOpacity style={styles.arrowButton} onPress={this.nextPage}>
                                <Image resizeMode="contain" source={require('../../img/right-arrow.png')} style={styles.imagemArrow}/>
                            </TouchableOpacity>
                        </View>

                        <FlatList 
                            numColumns={2}
                            data={Names}
                            extraData={pokemonIndex}
                            refreshing={true}
                            renderItem={this.renderItem}
                            keyExtractor={(item) => item}  
                        style={{marginBottom: '21.3%'}}/>
                    </View>
                </ImageBackground>
            );
        } else {
            return <ActivityIndicator />
        }
    }
}