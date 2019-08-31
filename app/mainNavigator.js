import React, {Component} from 'react';
import {createDrawerNavigator, createAppContainer, DrawerItems, StackActions, NavigationActions} from 'react-navigation';
import {View, AsyncStorage, Alert, ActivityIndicator, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import {Text, Header, Button, Icon, ListItem, Divider} from 'react-native-elements';

import Dashboard from './dashboard';

import axios from 'axios';
import { serverIP, colors } from '../config';

class MainNavigator extends Component {
    state = {
        loading: true,
        patient: {},
        user: {}
    }

    syncData() {
        this.setState({loading: true});
        axios.get(`http://${serverIP}/api/patient/`)
        .then((response) => { 
            const {patient, user} = response.data;
            this.setState({patient, user})
            AsyncStorage.setItem('patient', JSON.stringify(patient));
            AsyncStorage.setItem('user', JSON.stringify(user));
            this.setState({loading: false})
        })
        .catch((error)=>{ this.handleError(error); });
    }

    handleError(error) {
        if (error.response.status == 401) {
            Alert.alert("Authentication Error", error.response.data.message);
            this.logout();            
        }
        else {
            Alert.alert("Error", error.response.data.message);
        }
    }

    logout() {
        AsyncStorage.setItem('patient', '');
        AsyncStorage.setItem('user', '');
        AsyncStorage.setItem('auth_token', '').then(() => { 
            this.props.navigation.dispatch(StackActions.reset({
                key: null,
                index: 0,
                actions: [ NavigationActions.navigate({ routeName: 'Login'}) ]
            }));
        })
    }

    componentDidMount() {
        getData = async () => {
            let patient = await AsyncStorage.getItem('patient') || '{}';
            let user = await AsyncStorage.getItem('user') || '{}'; 
            patient = JSON.parse(patient);
            user = JSON.parse(user);
            return {patient, user};
        }
        getData().then(({patient, user})=>{
            this.setState({ patient, user })
            this.syncData();
        });

    }


    render() {
        const DrawerComponent = (props) => {
            try {
            return (
                <SafeAreaView style={{flex: 1}}>
                    
                    <View>
                        <Divider style={{width: 250, margin: 10}}/>
                        <ListItem 
                            Component={TouchableOpacity}
                            leftIcon={<Icon name='user-circle' type='font-awesome' color='#fff' size={30} />}
                            title={<Text h4 h4Style={{fontSize: 14, color: '#fff', paddingTop: 5}}>{this.state.user.name != null ? String(this.state.user.name).toProperCase() : ''}</Text>}
                            containerStyle={{borderBottomWidth: 0}}
                            onPress={() =>props.navigation.navigate('AcademicHistory')}
                        />
                        <ListItem
                            Component={TouchableOpacity}
                            leftIcon={<Icon name='exit-to-app' color={colors.secondary}/>}
                            title={<Text h4 style={{paddingTop: 20, paddingLeft: 18}}>Logout</Text>}
                            containerStyle={{borderBottomWidth: 0}}
                            onPress={()=>{this.logout();}}
                        />
                    </View>
                </SafeAreaView>
            )
            }
            catch(err) {
                return (<View></View>)
            }
        }
        
        let navigation;
        
        const DrawerNavigator = (createDrawerNavigator({
            Dashboard: {
                screen: props => {
                    navigation = props.navigation; 
                    return (<Dashboard {...props} patient={this.state.patient} user={this.state.user} />)
                },
                navigationOptions: {
                    drawerLabel: 'Dashboard ',
                    drawerIcon: <Icon name='dashboard'color={colors.secondary}/>
                }  
            },
            
        },{
            backBehavior: 'history',
            drawerBackgroundColor: colors.primary,
            contentOptions: {
                activeTintColor: colors.success,
                activeBackgroundColor: colors.tertiary ,
                inactiveTintColor: colors.secondary,
                itemsContainerStyle: {
                  marginVertical: 0,
                },
                iconContainerStyle: {
                  opacity: 1
                },
            },
            contentComponent: DrawerComponent,
        }));
        
        const Drawer = createAppContainer(DrawerNavigator);
        
        const content = this.state.loading ? 
        (<View style={{flex: 1, justifyContent:'center', marginBottom: 50}}>
        <ActivityIndicator size="large"/>
        </View>) : 
        (<Drawer/>)

        return (
            <View style={{flex: 1, backgroundColor: colors.background}}>
			<Header
				leftComponent={<Button icon={<Icon name="menu" color="white"/>} onPress={()=>{navigation.toggleDrawer()}}/>} 
				centerComponent={{text: 'BayMax', style:{color: '#fff'}}} 
                rightComponent={<Button icon={<Icon name="paper-plane" type="entypo" color="white"/>} onPress={()=>{this.props.navigation.navigate('Chat')}}/>  }
                //rightComponent={ <Button icon={<Icon name="reload" type="material-community" color="white"/>} onPress={()=>{this.syncData()}}/> }
			/>
            {content}
            </View>
        );
    }
}

export default MainNavigator;