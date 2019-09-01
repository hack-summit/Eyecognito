import React from "react";
import {View, ActivityIndicator, AsyncStorage, TouchableOpacity, Text, FlatList, StyleSheet, TextInput, KeyboardAvoidingView, TouchableHighlight} from 'react-native';
import { Card, ListItem, Icon, Header, Button, Image, } from 'react-native-elements';

import Voice from 'react-native-voice';
import axios from 'axios';
import Tts from 'react-native-tts';


class AIChat extends React.Component {

    state = {
        messages: [],
        text: '',
        recognized: '',
        pitch: '',
        error: '',
        end: '',
        started: '',
        results: [],
        partialResults: [],
    }

    constructor(props) {
        super(props);
        Voice.onSpeechStart = this.onSpeechStart;
        Voice.onSpeechRecognized = this.onSpeechRecognized;
        Voice.onSpeechEnd = this.onSpeechEnd;
        Voice.onSpeechError = this.onSpeechError;
        Voice.onSpeechResults = this.onSpeechResults;
        Voice.onSpeechPartialResults = this.onSpeechPartialResults;
        Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
        Tts.setDefaultPitch(1);

    }

    componentWillUnmount() {
        Voice.destroy().then(Voice.removeAllListeners);

    }

    sendMessage(text) {
        const payload = JSON.stringify({ question: text });
        const url = `http://192.168.43.251:8080/predict_api/`;
        const requestOptions = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        let response_message = '';
        let messages = [];
        messages.push({ type: 'out', message: text});
        this.setState({messages: [...this.state.messages, ...messages], text: ''});
        axios.post(url, payload, requestOptions)
        .then((response)=> {
            console.warn(response)
            let messages = [];
            messages.push({ type: 'in', message: response.data.results[0]});
            this.setState({messages: [...this.state.messages, ...messages]});
            Tts.getInitStatus().then(() => {
                // Tts.speak(response.data.results[0]);
                Tts.speak(response.data.results[0]  );
                Tts.voices().then(voices => console.warn(voices));


              });
        })
      
    }

    onSpeechStart = e => {
        // eslint-disable-next-line
        console.log('onSpeechStart: ', e);
        this.setState({
          started: '√',
        });
      };
    
      onSpeechRecognized = e => {
        // eslint-disable-next-line
        console.log('onSpeechRecognized: ', e);
        this.setState({
          recognized: '√',
        });
      };
    
      onSpeechEnd = e => {
        // eslint-disable-next-line
        console.log('onSpeechEnd: ', e);
        this.setState({
          end: '√',
        });
      };
    
      onSpeechError = e => {
        // eslint-disable-next-line
        console.log('onSpeechError: ', e);
        this.setState({
          error: JSON.stringify(e.error),
        });
      };
    
      onSpeechResults = e => {
        // eslint-disable-next-line
        console.log('onSpeechResults: ', e);
        this.setState({
          results: e.value,
        }, ()=> {
            try {
                this.sendMessage(this.state.results[0])
            }
            catch(error) {}
        });
        
      };
    
      onSpeechPartialResults = e => {
        // eslint-disable-next-line
        console.log('onSpeechPartialResults: ', e);
        this.setState({
          partialResults: e.value,
        });
      };
    
      onSpeechVolumeChanged = e => {
        // eslint-disable-next-line
        console.log('onSpeechVolumeChanged: ', e);
        this.setState({
          pitch: e.value,
        });
      };
    
      _startRecognizing = async () => {
        this.setState({
          recognized: '',
          pitch: '',
          error: '',
          started: '',
          results: [],
          partialResults: [],
          end: '',
        });
    
        try {
          await Voice.start('en-US');
        } catch (e) {
          //eslint-disable-next-line
          console.error(e);
        }
      };
    
      _stopRecognizing = async () => {
        try {
          await Voice.stop();
        } catch (e) {
          //eslint-disable-next-line
          console.error(e);
        }
      };
    
      _cancelRecognizing = async () => {
        try {
          await Voice.cancel();
        } catch (e) {
          //eslint-disable-next-line
          console.error(e);
        }
      };
    
      _destroyRecognizer = async () => {
        try {
          await Voice.destroy();
        } catch (e) {
          //eslint-disable-next-line
          console.error(e);
        }
        this.setState({
          recognized: '',
          pitch: '',
          error: '',
          started: '',
          results: [],
          partialResults: [],
          end: '',
        });
    };
    

    render() {
        return(
            <View style={{flex: 1}}>
                <Header
				leftComponent={<Button icon={<Icon name="arrow-back" type="material" color="white"/>} onPress={()=>{this.props.navigation.navigate('MainApp')}}/>} 
				centerComponent={{text: 'BayMax', style:{color: '#fff'}}} 
			    />

            <View style={styles.container}>
                
                <FlatList style={styles.list}
                data={this.state.messages}
                keyExtractor= {(item, index) => {
                    return index;
                }}
                renderItem={(message) => {
                    const item = message.item;
                    let itemStyle = item.type == 'in' ? styles.itemIn : styles.itemOut;
                    return (
                        <View style={[styles.item, itemStyle]}>
                            <View style={[styles.balloon]}>
                            <Text>{item.message}</Text>
                            </View>
                        </View>
                    )
                }}/>
                
                <View style={styles.footer}>
                <TouchableOpacity onPress={this._startRecognizing} style={{marginRight: 10, marginVertical: 5}}>
                    <Image style={{width:40, height: 40}} source={require('../button.png')} />
                </TouchableOpacity>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="Write a message..."
                        underlineColorAndroid='transparent'
                        value={this.state.text}
                        onChangeText={(text) => this.setState({text})}/>
                </View>

                <TouchableOpacity style={styles.btnSend} onPress={()=>{this.sendMessage(this.state.text)}} >
                    <Image source={{uri:"https://png.icons8.com/small/75/ffffff/filled-sent.png"}} style={styles.iconSend}  />
                </TouchableOpacity>
                </View>
                                    {/* <GiftedChat 
                    messages={this.state.messages} 
                    onSend={(messages) => {
                        for (let i = 0; i < messages.length; i++) {
                            
                        }
                    }}
                    user={{_id: 'User'}}
                    renderUsernameOnMessage={true}
                    renderAvatar={null}
                />   */}
            
            </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
      flex:1
    },
    list:{
      paddingHorizontal: 17,
    },
    footer:{
      flexDirection: 'row',
      height:60,
      backgroundColor: '#eeeeee',
      paddingHorizontal:10,
      padding:5,
    },
    btnSend:{
      backgroundColor:"#00BFFF",
      width:40,
      height:40,
      borderRadius:360,
      alignItems:'center',
      justifyContent:'center',
      marginVertical: 5
    },
    iconSend:{
      width:30,
      height:30,
      alignSelf:'center',
    },
    inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      height:40,
      flexDirection: 'row',
      alignItems:'center',
      flex:1,
      marginRight:10,
      marginVertical: 5
    },
    inputs:{
      height:40,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
    },
    balloon: {
      maxWidth: 250,
      padding: 15,
      borderRadius: 20,
    },
    itemIn: {
      alignSelf: 'flex-start'
    },
    itemOut: {
      alignSelf: 'flex-end'
    },
    time: {
      alignSelf: 'flex-end',
      margin: 15,
      fontSize:12,
      color:"#808080",
    },
    item: {
      marginVertical: 14,
      flex: 1,
      flexDirection: 'row',
      backgroundColor:"#eeeeee",
      borderRadius:30,
      padding:5,
    },
});  

export default AIChat;