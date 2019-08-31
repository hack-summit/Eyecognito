import React, { Component } from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import { View, Alert, KeyboardAvoidingView, AsyncStorage, ActivityIndicator, Image, ImageBackground } from 'react-native';
import { Text, Input, Header, Button, Card, Overlay, Icon, ListItem, Divider, CheckBox } from 'react-native-elements';


import axios from 'axios';
import { serverIP, colors } from "../config";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            loading: true,
        };
    }


    login() {
        this.setState({ loading: true });
        AsyncStorage.setItem('username', this.state.username);
        AsyncStorage.setItem('password', this.state.password);
        const payload = JSON.stringify({ username: this.state.username, password: this.state.password });
        const url = `http://${serverIP}/api/login/`;
        const requestOptions = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        axios.post(url, payload, requestOptions)
        .then(response => {
            this.setState({ loading: false });
            console.warn(response.data)
            const { token } = response.data;
            axios.defaults.headers.common['auth_token'] = token;
            AsyncStorage.setItem('auth_token', token);
            this.props.navigation.dispatch(StackActions.reset({
                key: null,
                index: 0,
                actions: [ NavigationActions.navigate({ routeName: 'MainApp'}) ]
            }));
        })
        .catch(error => {
            Alert.alert("Authentication Failed", error.response.data.message )
            this.setState({ loading: false });
        });
    }

    getUserData = async () => {
        const username = await AsyncStorage.getItem('username') || '';
        const password = await AsyncStorage.getItem('password') || '';
        this.setState({ username, password });
    }

    componentDidMount() {
        this.getUserData();
        getAuthToken = async () => {
            const token = await AsyncStorage.getItem('auth_token') || '';
            if (token != "") {
                axios.defaults.headers.common['auth_token'] = token;
                this.props.navigation.dispatch(StackActions.reset({
                    key: null,
                    index: 0,
                    actions: [ NavigationActions.navigate({ routeName: 'MainApp'}) ]
                }));  
            }
            this.setState({ loading: false });
        }
        getAuthToken();
    }

    render() {
        let content;
        if (this.state.loading)
            content = (<ActivityIndicator size='large' />);
        else {
            content = (
                <Card title="LOG IN">
                    <Text />
                    <Input leftIcon={<Icon name="user" type="font-awesome" color={colors.success} containerStyle={{ marginRight: 20 }} />} value={this.state.username} onChangeText={(username) => { this.setState({ username }) }} placeholder="Username" ></Input>
                    <Input leftIcon={<Icon name="lock" type="font-awesome" color={colors.success} containerStyle={{ marginRight: 20 }} />} value={this.state.password} onChangeText={(password) => { this.setState({ password }) }} placeholder="Password"  secureTextEntry={true}></Input>
                    <Text />
                    <Button raised title="SUBMIT"  onPress={() => this.login()} ></Button>
                </Card>
            );
        }


        return (
            <View style={{ flex: 1, backgroundColor: colors.background }}>
                <Header centerComponent={{ text: "BayMax", style: {fontWeight: "bold", color: 'white'} }} />

                <View style={{ flex: 1, justifyContent: 'center'}}>
                    {content}     
                </View>
            </View>
        );
    }
}

export default Login;