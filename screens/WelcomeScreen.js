import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	TextInput,
	KeyboardAvoidingView,
	TouchableOpacity
} from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import Svg, { Image, Circle, ClipPath } from 'react-native-svg';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import Axios from 'axios';
import { AsyncStorage } from 'react-native';
import * as firebase from "firebase";

const {
	Value,
	event,
	block,
	cond,
	eq,
	set,
	Clock,
	startClock,
	stopClock,
	debug,
	timing,
	clockRunning,
	interpolate,
	Extrapolate,
	concat
} = Animated;

function runTiming(clock, value, dest) {
	const state = {
		finished: new Value(0),
		position: new Value(0),
		time: new Value(0),
		frameTime: new Value(0)
	};

	const config = {
		duration: 1000,
		toValue: new Value(0),
		easing: Easing.inOut(Easing.ease)
	};

	return block([
		cond(clockRunning(clock), 0, [
			set(state.finished, 0),
			set(state.time, 0),
			set(state.position, value),
			set(state.frameTime, 0),
			set(config.toValue, dest),
			startClock(clock)
		]),
		timing(clock, state, config),
		cond(state.finished, debug('stop clock', stopClock(clock))),
		state.position
	]);
}

class WelcomeScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
      email:'',
      password:''
    };
		const { width, height } = Dimensions.get('window');
		this.buttonOpacity = new Value(1);
		this.onStateChange = event([
			{
				nativeEvent: ({ state }) =>
					block([
						cond(
							eq(state, State.END),
							set(this.buttonOpacity, runTiming(new Clock(), 1, 0))
						)
					])
			}
		]);

		this.onCloseState = event([
			{
				nativeEvent: ({ state }) =>
					block([
						cond(
							eq(state, State.END),
							set(this.buttonOpacity, runTiming(new Clock(), 0, 1))
						)
					])
			}
		]);

		this.buttonY = interpolate(this.buttonOpacity, {
			inputRange: [0, 1],
			outputRange: [100, 0],
			extrapolate: Extrapolate.CLAMP
		});
		this.bgY = interpolate(this.buttonOpacity, {
			inputRange: [0, 1],
			outputRange: [-height / 3 - 20, 0],
			extrapolate: Extrapolate.CLAMP
		});
		this.textInputZindex = interpolate(this.buttonOpacity, {
			inputRange: [0, 1],
			outputRange: [1, -1],
			extrapolate: Extrapolate.CLAMP
		});
		this.textInputY = interpolate(this.buttonOpacity, {
			inputRange: [0, 1],
			outputRange: [0, 100],
			extrapolate: Extrapolate.CLAMP
		});
		this.textInputOpacity = interpolate(this.buttonOpacity, {
			inputRange: [0, 1],
			outputRange: [1, 0],
			extrapolate: Extrapolate.CLAMP
		});
		this.rotateCross = interpolate(this.buttonOpacity, {
			inputRange: [0, 1],
			outputRange: [180, 360],
			extrapolate: Extrapolate.CLAMP
		});
  }
  
  login = async () => {
    const { email, password } = this.state;
		await firebase
		.auth()
		.signInWithEmailAndPassword(email, password).then((user) => {
      if(user) {
				this.props.navigation.navigate('App');
      }
    }).catch(error => {
			alert(error.message);
		});
  }

	render() {
		const { width, height } = Dimensions.get('window');
		return (
			<KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
				<Animated.View
					style={{
						...StyleSheet.absoluteFill,
						transform: [{ translateY: this.bgY }]
					}}
				>
					<Svg height={height + 50} width={width}>
						<ClipPath id="clip">
							<Circle r={height + 50} cx={width / 2} />
						</ClipPath>
						<Image
							href={require('../assets/Images/bg.jpg')}
							width={width}
							height={height + 50}
							preserveAspectRatio="xMidyMid slice"
							clipPath="url(#clip)"
						/>
					</Svg>
				</Animated.View>
				<View style={{ height: height / 3 }}>
					<TapGestureHandler onHandlerStateChange={this.onStateChange}>
						<Animated.View
							style={{
								...styles.button,
								opacity: this.buttonOpacity,
								transform: [{ translateY: this.buttonY }]
							}}
						>
							<Text style={{ fontSize: 20, fontWeight: 'bold' }}>Sign In</Text>
						</Animated.View>
					</TapGestureHandler>
					<TouchableOpacity
						onPress={() => this.props.navigation.navigate('SignUp')}
					>
						<Animated.View
							style={{
								...styles.button,
								backgroundColor: '#2E71DC',
								opacity: this.buttonOpacity,
								transform: [{ translateY: this.buttonY }]
							}}
						>
							<Text
								style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}
							>
								Create a new Account
							</Text>
						</Animated.View>
					</TouchableOpacity>
					<Animated.View
						style={{
							height: height / 3,
							...StyleSheet.absoluteFill,
							top: null,
							justifyContent: 'center',
							zIndex: this.textInputZindex,
							opacity: this.textInputOpacity,
							transform: [{ translateY: this.textInputY }]
						}}
					>
						<TapGestureHandler onHandlerStateChange={this.onCloseState}>
							<Animated.View style={styles.closeButton}>
								<Animated.Text
									style={{
										fontSize: 15,
										transform: [{ rotate: concat(this.rotateCross, 'deg') }]
									}}
								>
									X
								</Animated.Text>
							</Animated.View>
						</TapGestureHandler>
						<TextInput
							placeholder="Email"
							style={styles.textInput}
              placeholderTextColor="black"
              onChangeText={(value)=>this.setState({email:value})}
              autoCorrect={false}
						/>
						<TextInput
							placeholder="Password"
							style={styles.textInput}
              placeholderTextColor="black"
              onChangeText={(value)=>this.setState({password:value})}
              autoCorrect={false}
              secureTextEntry={true}
						/>
            <TouchableOpacity onPress={this.login}>
						<Animated.View style={styles.button}>
							<Text style={{ fontSize: 20, fontWeight: 'bold' }}>Sign In</Text>
						</Animated.View>
            </TouchableOpacity>
					</Animated.View>
				</View>
			</KeyboardAvoidingView>
		);
	}
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'flex-end'
	},
	imageStyle: {
		flex: 1,
		height: null,
		width: null
	},
	button: {
		backgroundColor: 'white',
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
	closeButton: {
		height: 40,
		width: 40,
		backgroundColor: 'white',
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		top: -20,
		left: width / 2 - 20,
		shadowOffset: { width: 2, height: 2 },
		shadowColor: 'black',
		shadowOpacity: 0.4,
		elevation: 1
	},
	textInput: {
		backgroundColor: 'white',
		height: 50,
		borderRadius: 25,
		borderWidth: 0.5,
		marginHorizontal: 20,
		paddingLeft: 20,
		fontSize:16,
		marginVertical: 5,
		borderColor: 'rgba(0,0,0,0.2)'
	}
});

export default WelcomeScreen;
