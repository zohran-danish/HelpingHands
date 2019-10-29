import { createBottomTabNavigator } from "react-navigation";
import Dashboard from "../screens/Dashboard";
import SettingsScreen from "../screens/SettingsScreen";
import { Icon } from "native-base";
import React, { Component } from 'react';

const AppTabNavigator = createBottomTabNavigator({
  HomeScreen: {
    screen: Dashboard,
    navigationOptions : {
      title:'Home',
      tabBarIcon: ({ focused, tintColor }) => {
        return <Icon name="apps" size={25} color={tintColor} />;
      }
    }
  },
  SettingsScreen : {
    screen: SettingsScreen,
    navigationOptions : {
      title:'Settings',
      tabBarIcon: ({ focused, tintColor }) => {
        return <Icon name="md-log-out" size={25} color={tintColor} />;
      }
    }
  }
})

export default AppTabNavigator;