import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { AsyncStorage } from 'react-native';
import * as firebase from 'firebase';

class AuthLoadingScreen extends Component {

	constructor(props) {
		super(props);
  }
  
  componentDidMount() {
     this.checkIfLoggedIn();
	}
	
	checkIfLoggedIn = () => {
		firebase.auth().onAuthStateChanged((user) =>
		 {
			this.props.navigation.navigate(user ? 'App' : 'Auth');
		})
	}

	loadApp = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    } catch (error) {
      // console.log(error)
    }
		
	};
	render() {
		return (
			<View style={styles.container}>
				<ActivityIndicator />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff'
	}
});

export default AuthLoadingScreen;
