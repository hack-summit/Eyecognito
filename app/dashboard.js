import React, { Component } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { Text, Icon, ListItem, Card, ThemeProvider, Image } from 'react-native-elements';
import { serverIP, colors } from '../config';
import RNSpeedometer from 'react-native-speedometer';

export default class PatientDashboard extends Component {
  constructor() {
    super();

  }
  componentDidMount() {

  }

  render() {
    const user = this.props.user;
    const patient = this.props.patient;
    try {
      return (
        <ScrollView>
          <Card title={user.name} image={{ uri: `http://${serverIP}/avatar/?avatar=${user.avatar}`}} imageStyle={{ alignSelf: 'center', width: '50%',overflow: 'hidden', borderRadius: 100}} >
                <ListItem
                  leftIcon={{name: 'email', type: 'entypo'}}
                  title={'Email: ' + user.email}
                />
                <ListItem
                  leftIcon={{name: 'date-range', type: 'material-icons'}}
                  title={ patient.age + ' years' }
                />
                <ListItem
                  leftIcon={{name: 'arrows-v', type: 'font-awesome', containerStyle: {marginLeft: 5, marginRight: 10} }}
                  title={ patient.height + ' cm'}
                />
                <ListItem
                  leftIcon={{name: 'arrows-h', type: 'font-awesome'}}
                  title={ patient.weight + ' kg'}
                />
                <ListItem
                  leftIcon={{name: 'ios-water', type: 'ionicon'}}
                  title={ patient.blood_group }
                />
          </Card>

          <Card title='Health' >
            <View style={{flex: 0 }} >
                <RNSpeedometer
                    labels={[
                    {
                        key: 0,
                        name: 'Too Lean',
                        labelColor: '#ff2900',
                        activeBarColor: '#ff2900',
                    },
                    {
                        key: 1,
                        name: 'Slightly Lean',
                        labelColor: 'orange',
                        activeBarColor: 'orange',
                    },
                    {
                        key: 2,
                        name: 'Healthy',
                        labelColor: '#5cb85c',
                        activeBarColor: '#5cb85c',
                    },
                    {
                        key: 3,
                        name: 'Healthy',
                        labelColor: '#5cb85c',
                        activeBarColor: '#5cb85c',
                    },
                    {
                        key: 4,
                        name: 'Healthy',
                        labelColor: '#5cb85c',
                        activeBarColor: '#5cb85c',
                    },
                    {
                        key: 5,
                        name: 'Obese',
                        labelColor: 'orange',
                        activeBarColor: 'orange',
                    },
                    {
                        key: 6,
                        name: 'Very Obese',
                        labelColor: '#ff2900',
                        activeBarColor: '#ff2900',
                    },
                    ]}
                value={(((patient.weight / Math.pow(patient.height / 100, 2)) - 15.5) / (25.9 - 15.5)) * 100} 
                size={200}
                innerCircleStyle= {{ width: 180, height: 90 }}
                labelStyle={{display: 'none'}}
                 />
            <Text/><Text/>
            <ListItem
                leftElement={<Text style={{color: colors.secondary, fontWeight: 'bold', fontSize: 16}}>BMI</Text>}
                title = {<Text style={{color: colors.secondary, fontSize: 16}}>{Math.round(patient.weight / Math.pow((patient.height / 100.0), 2) *100) / 100 }</Text>}
            />
            <Text/><Text/>
            </View>

          </Card>
            <Text>
              </Text>

        </ScrollView>
      );
    }
    catch (err) {
      console.warn(err)
      return (<View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator size='large' /></View>)
    }
  }
}
