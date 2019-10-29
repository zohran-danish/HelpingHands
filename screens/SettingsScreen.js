import React, { Component } from 'react'
import { Text, View, Button, AsyncStorage } from 'react-native';
import * as firebase from 'firebase';

export default class SettingsScreen extends Component {

  signOut = async() => {
    await firebase
    .auth()
    .signOut()
    .then(() => {
      this.props.navigation.navigate('AuthLoading');
    })
    .catch(error => alert(error.message));
  }
  render() {
    return (
      <View>
        <Button onPress={this.signOut} title="Sign Out"/>
      </View>
    )
  }
}
