import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	KeyboardAvoidingView,
	TouchableOpacity,
	TextInput,
	Button
} from 'react-native';
import * as firebase from 'firebase';

export default class SignupScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			name: '',
			mobile: ''
		};
	}
	static navigationOptions = {
		title: 'SignUp',
		header: null
	};

	signupUser = (name, email, password) => {
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(authenticate => {
				return authenticate.user
					.updateProfile({
						displayName: name
					})
					.then(() => {
						this.props.navigation.navigate('App');
					});
			})
			.catch(error => {
				alert(error.message);
			});
	};

	render() {
		return (
			<KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
				<View style={styles.logoContainer}>
					<Image
						source={require('../assets/helpinghandslogo.png')}
						style={{width: 80, height: 80}}
					/>
					<Text style={{fontSize:20, fontWeight:'bold', paddingTop:10}}>Register with Helping Hands</Text>
				</View>
						<TextInput
							style={styles.textInput}
							placeholder="Name"
							autoCorrect={false}
							autoCapitalize="none"
							keyboardType="name-phone-pad"
							onChangeText={name => this.setState({ name })}
						/>
						<TextInput
							style={styles.textInput}
							placeholder="Email"
							autoCorrect={false}
							autoCapitalize="none"
							keyboardType="email-address"
							onChangeText={email => this.setState({ email })}
						/>
						<TextInput
							style={styles.textInput}
							placeholder="Mobile"
							autoCorrect={false}
							autoCapitalize="none"
							keyboardType="phone-pad"
							onChangeText={phone => this.setState({ phone })}
						/>
						<TextInput
							style={styles.textInput}
							placeholder="password"
							autoCorrect={false}
              secureTextEntry={true}
							autoCapitalize="none"
							onChangeText={password => this.setState({ password })}
						/>
						<TouchableOpacity
						onPress={() => {
							this.signupUser(
								this.state.name,
								this.state.email,
								this.state.password,
								this.state.mobile
							);
						}}>
						<View
						style={styles.button}
						title="Sign Up"
						
					><Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Register</Text></View>

						</TouchableOpacity>
					
				<TouchableOpacity
					onPress={() => this.props.navigation.navigate('Welcome')}
				>
					<Text style={styles.loginText}>Already a User? Login</Text>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	logoContainer: {
		alignItems: 'center',
		marginTop: 100,
		marginBottom: 10
	},
	form: {
		padding: 20,
		width: '100%',
	},
	button: {
		backgroundColor: '#2E71DC',
		height: 70,
		marginHorizontal: 20,
		borderRadius: 35,
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: 5,
		shadowOffset: { width: 2, height: 2 },
		shadowColor: 'black',
		shadowOpacity: 0.4,
		elevation: 1
	},
	buttonText: {
		color: '#fff',
		fontSize: 18,
		fontWeight:'bold'
	},
	footer: {
		alignItems: 'center'
	},
	loginText: {
		alignSelf: 'center',
		textAlign: 'center',
		fontSize: 20,
		color: 'blue',
		fontWeight: '500',
		paddingTop:20
	},
	textInput: {
		backgroundColor: 'white',
		fontSize:16,
		height: 60,
		borderRadius: 25,
		borderWidth: 0.5,
		marginHorizontal: 20,
		marginVertical:40,
		padding: 20,
		marginVertical: 5,
		borderColor: 'rgba(0,0,0,0.2)'
	},
	
});
