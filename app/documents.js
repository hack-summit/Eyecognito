import React, {Component} from 'react';
import { View, FlatList, AsyncStorage } from 'react-native';
import { Card, Text, Input, ListItem, Icon } from 'react-native-elements';

import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';

const downloadManager = require("react-native-simple-download-manager");
import RNBackgroundDownloader from 'react-native-background-downloader';
import RNFS from 'react-native-fs';
//const FileDownload = require('react-native-file-download');

export default class Documents extends Component {

    constructor() {
        super()
        this.url = '192.168.43.251:5001';
    }
    state = {
        transactions: []
    }

    componentDidMount() {
        getUserData = async () => {
            const username = await AsyncStorage.getItem('username') || '';
            return username;
        }
        getUserData().then(username => {
            axios.get(`http://${this.url}/block/${username}`)
            .then((response) => {
                console.warn(response)
                this.setState({transactions:  response.data.transactions})
            }) 
        })

    }

    render() {
        try {
            return(
                <View>
                    <FlatList 
                        data={this.state.transactions}
                        renderItem={({item, index}) => {
                            return (
                                <ListItem
                                    leftIcon={<Icon name='file-document' type='material-community'/>}
                                    title={item.transaction.document_display_name}
                                    subtitle={item.transaction.document_name}
                                    Component={TouchableOpacity}
                                    onPress={()=> {
                                        // downloadManager.download((url = `http://${this.url}/download/${item.block_index}/${item.transaction_index}`), (headers = {}), (config = {}))
                                        // .then(response => {
                                        //     console.log("Download success!");
                                        // })
                                        // .catch(err => {
                                        //     console.log("Download failed!");
                                        // });
                                        //axios.get()
                                        // let task = RNBackgroundDownloader.download({
                                        //     id: `${item.transaction.document_display_name}`,
                                        //     url: `http://${this.url}/download/${item.block_index}/${item.transaction_index}`,
                                        //     destination: `${RNBackgroundDownloader.directories.documents}/${item.transaction.document_name}`
                                        // }).begin((expectedBytes) => {
                                        //     console.warn(`Going to download ${expectedBytes / 1024 / 1024} MB!`);
                                        // }).progress((percent) => {
                                        //     console.warn(`Downloaded: ${percent * 100}%`);
                                        // }).done(() => {
                                        //     console.warn('Download is done!');
                                        // }).error((error) => {
                                        //     console.warn('Download canceled due to error: ', error);
                                        // });
                                        // RNFS.downloadFile({
                                        //     fromUrl: ,
                                        //     toFile: ,
                                        // })
                                        const URL = `http://${this.url}/download/${item.block_index}/${item.transaction_index}`;
                                        const DEST = RNFS.DocumentDirectoryPath;
                                        const fileName = `${item.transaction.document_name}`;
                                        // FileDownload.download(URL, DEST, fileName)
                                        // .then((response) => {
                                        //     console.warn(`downloaded! file saved to: ${response}`)
                                        // })
                                        // .catch((error) => {
                                        //     console.warn(error)
                                        // })
                                    
                                    }}
                                    key={index}
                                />
                            )
                        }}
                    />
                </View>
            )
        }

        catch(err) {
            return (<View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator size='large' /></View>)
        }
        
    }
}