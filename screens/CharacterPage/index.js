import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StatusBar,
  ProgressBarAndroid,
  ScrollView
} from 'react-native';
import api from '../services/api';
import styles from './style';
// Cores para serem usadas de acordo com o elemento do pokemon
let themeColor;
const TYPE_COLORS = {
    bug: '#dced51',
    dark: '#4f3a2d',
    dragon: '#755edf',
    electric: '#f5c038',
    fairy: '#f4b1f4',
    fighting: '#382b38',
    fire: '#ff673d',
    flying: '#a3b3f7',
    ghost: '#6060b2',
    grass: '#9ae65e',
    ground: '#d3b357',
    ice: '#a3e7fd',
    normal: '#c8c4bc',
    poison: '#934594',
    psychic: '#ed4882',
    rock: '#b9a156',
    steel: '#b5b5c3',
    water: '#3295f6',
};

export default class ChracterPage extends Component {
    // Configuração do header do navigator
    static navigationOptions = {
        title: 'Características',
        headerStyle: {
          backgroundColor: '#fa716c',
        },
        headerTitleStyle: {
          fontWeight: 'bold'
        },
        headerTintColor: 'white'
    }

    constructor(props){
        super(props);

        this.state={
            elementos: [],
            nome: '',
            peso: '',
            pesoKg: '',
            altura: '',
            alturaM: '',
            expBase: '',
            descricao: '',
            hp: 0,
            attack: 0,
            defense: 0,
            speed: 0,
            specialAttack: 0,
            specialDefense: 0,
            loading: false
        };

        this.voltar = this.voltar.bind(this);
    }    

    async componentDidMount() {
        const { navigation } = this.props;
        const pokemonIndex = navigation.getParam('id');
        
        // Requisição das informações básicas e conversão das mesmas
        const response = await api.get(pokemonIndex + '/');
        this.setState({
            loading: false,
            elementos: response.data.types.type, 
            nome: response.data.name,
            peso: response.data.weight,
            pesoKg: (response.data.weight*0.1).toFixed(1),
            altura: response.data.height,
            alturaM: (response.data.height*0.1).toFixed(1),
            expBase: response.data.base_experience
        });

        // Seleção da cor para ser usada
        const types = response.data.types.map(type => type.type.name);
        themeColor = `${TYPE_COLORS[types[types.length - 1]]}`;
        this.setState({color: themeColor});
        
        // Requisição dos status
        const stats = response.data.stats.map(stats => stats.base_stat);
        const statsSeparados = stats.toString().split(',', 6);
        this.setState({
            speed: statsSeparados[0],
            specialDefense: statsSeparados[1],
            specialAttack: statsSeparados[2],
            defense: statsSeparados[3], 
            attack: statsSeparados[4], 
            hp: statsSeparados[5]
        });

        // Requisição da descrição
        const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;
        await api.get(pokemonSpeciesUrl).then(res => {
            res.data.flavor_text_entries.some(flavor => {
              if (flavor.language.name === 'en') this.setState({descricao: flavor.flavor_text.replace(/\s/g, ' ')});
            });
        });
    }

    voltar(){
        // Volta à tela anterior
        this.props.navigation.navigate('TelaPrincipal');
    }

    render() {
        const { loading } = this.state;
        const { navigation } = this.props;
        const pokemonIndex = navigation.getParam('id');
        const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;

        if(!loading) {
            return(
                <View style={{flex: 1, backgroundColor: themeColor}}> 
                    <ScrollView>
                        <StatusBar backgroundColor={themeColor} barStyle="light-content" />
                        <View style={styles.container}>
                            {/* Opções do topo (botão para voltar, nome e ID do pokemon) */}
                            <View style={[styles.box1, {backgroundColor: themeColor}]}>
                                <View style={{flexDirection: 'row'}}>
                                    <TouchableOpacity style={styles.arrowButton} onPress={this.voltar}>
                                        <Image resizeMode="contain" source={require('../../img/left-arrow2.png')} style={styles.imagemArrow}/>
                                    </TouchableOpacity>
                                    
                                    <View style={styles.arrowButton}>
                                        <Text style={styles.headerFont}>{this.state.nome}</Text>
                                    </View>

                                    <View style={styles.arrowButton}>
                                        <Text style={styles.headerFont}>#{pokemonIndex}</Text>
                                    </View>
                                </View>
                                <Image resizeMode="contain" source={{uri: imageUrl}} style={styles.imagem}/>
                            </View>
                            {/* View para segunda caixa (a parte branca com as quinas de cima arrendondadas) */}
                            <View style={[styles.box2, {backgroundColor: 'white'}]}>
                                {/* Descrição do pokemon */}
                                <Text style={[styles.titulo, {color: themeColor}]}>Descrição</Text>
                                <Text style={styles.descricao}>{this.state.descricao}</Text>
                                {/* Status do pokemon */}
                                <Text style={[styles.titulo, {color: themeColor}]}>Status</Text>
                                <View style={styles.directionStatus}>
                                    <Text style={[styles.status, {color: themeColor}]}>HP</Text>
                                    <ProgressBarAndroid style={[styles.progressBar, {color: themeColor}]}
                                        styleAttr="Horizontal"
                                        indeterminate={false}
                                        progress={this.state.hp*0.01}
                                    />
                                    <Text style={[styles.numberStatus, {color: themeColor}]}>{this.state.hp}</Text>            
                                </View>

                                <View style={styles.directionStatus}>
                                    <Text style={[styles.status, {color: themeColor}]}>Attack</Text>
                                    <ProgressBarAndroid style={[styles.progressBar, {color: themeColor}]}
                                        styleAttr="Horizontal"
                                        indeterminate={false}
                                        progress={this.state.attack*0.01}
                                    />
                                    <Text style={[styles.numberStatus, {color: themeColor}]}>{this.state.attack}</Text>
                                </View>

                                <View style={styles.directionStatus}>
                                    <Text style={[styles.status, {color: themeColor}]}>Defense</Text>
                                    <ProgressBarAndroid style={[styles.progressBar, {color: themeColor}]}
                                        styleAttr="Horizontal"
                                        indeterminate={false}
                                        progress={this.state.defense*0.01}
                                    />
                                    <Text style={[styles.numberStatus, {color: themeColor}]}>{this.state.defense}</Text>
                                </View>

                                <View style={styles.directionStatus}>
                                    <Text style={[styles.status, {color: themeColor}]}>Speed</Text>
                                    <ProgressBarAndroid style={[styles.progressBar, {color: themeColor}]}
                                        styleAttr="Horizontal"
                                        indeterminate={false}
                                        progress={this.state.speed*0.01}
                                    />
                                    <Text style={[styles.numberStatus, {color: themeColor}]}>{this.state.speed}</Text>
                                </View>
            
                                <View style={styles.directionStatus}>
                                    <Text style={[styles.status, {color: themeColor}]}>Special Attack</Text>
                                    <ProgressBarAndroid style={[styles.progressBar, {color: themeColor}]}
                                        styleAttr="Horizontal"
                                        indeterminate={false}
                                        progress={this.state.specialAttack*0.01}
                                    />
                                    <Text style={[styles.numberStatus, {color: themeColor}]}>{this.state.specialAttack}</Text>
                                </View>

                                <View style={styles.directionStatus}>
                                    <Text style={[styles.status, {color: themeColor}]}>Special Defense</Text>
                                    <ProgressBarAndroid style={[styles.progressBar, {color: themeColor}]}
                                        styleAttr="Horizontal"
                                        indeterminate={false}
                                        progress={this.state.specialDefense*0.01}
                                    />
                                    <Text style={[styles.numberStatus, {color: themeColor}]}>{this.state.specialDefense}</Text>
                                </View>
                                {/* Informações básicas do pokemon */}
                                <Text style={[styles.titulo, {color: themeColor}]}>Informações básicas</Text>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={[styles.infoTitle, {color: themeColor}]}>Peso: </Text>
                                    <Text style={styles.info}>{this.state.peso} hectogramas ({this.state.pesoKg} quilogramas)</Text>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={[styles.infoTitle, {color: themeColor}]}>Altura: </Text>
                                    <Text style={styles.info}>{this.state.altura} decimetros ({this.state.alturaM} metros)</Text>
                                </View>
                                <View style={{flexDirection: 'row', marginBottom: '3%'}}>
                                    <Text style={[styles.infoTitle, {color: themeColor}]}>Experiência base: </Text>
                                    <Text style={styles.info}>{this.state.expBase} pontos</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            );
        } else {
            return <ActivityIndicator />
        }
    }
}