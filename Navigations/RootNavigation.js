import {
	createAppContainer,
	createSwitchNavigator
} from 'react-navigation';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import AuthStackNavigator from './SignInNavigator';
import DashboardNavigation from './DashboardNavigation';

const AuthLoadNavigator = createSwitchNavigator({
	AuthLoading: AuthLoadingScreen,
	Auth: AuthStackNavigator,
	App: DashboardNavigation
});

const RootNavigation = createAppContainer(AuthLoadNavigator);

export default RootNavigation;


