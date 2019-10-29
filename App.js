import React, { Component } from 'react';
import RootNavigation from './Navigations/RootNavigation';
import { Asset } from 'expo-asset';
import { AppLoading, Font } from 'expo';
import * as firebase from 'firebase';
import { firebaseConfig } from './screens/config';

firebase.initializeApp(firebaseConfig);

function cacheImages(images) {
    return images.map(image => {
      if (typeof image === 'string') {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });
  }
  

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
      isReady: false,
      loading: true
		};
  }
  
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }

	async _loadAssetsAsync() {
		const imageAssets = cacheImages([
			require('./assets/Images/bg.jpg')
    ]);

		await Promise.all([...imageAssets]);
	}
	render() {

        if (!this.state.isReady || this.state.loading) {
            return (
              <AppLoading
                startAsync={this._loadAssetsAsync}
                onFinish={() => this.setState({ isReady: true })}
                onError={console.warn}
              />
            );
          }

		return <RootNavigation />;
	}
}
