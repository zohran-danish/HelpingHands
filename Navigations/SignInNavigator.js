import WelcomeScreen from '../screens/WelcomeScreen';
// import SignInScreen from '../screens/SignInScreen';
 import SignUpScreen from '../screens/SignUpScreen';
import { createSwitchNavigator } from 'react-navigation';

const AuthStackNavigator = createSwitchNavigator({
	Welcome: {
		screen: WelcomeScreen,
		navigationOptions: {
			headerVisible: false
		}
	},
	SignUp: {
		screen: SignUpScreen,
		navigationOptions: {
				headerVisible: false
			}
	}
});

export default AuthStackNavigator;
