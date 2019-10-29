import React, { Component } from "react";
import { createDrawerNavigator } from "react-navigation";
import Dashboard from "../screens/Dashboard.js";
import SideBar from "../screens/SideBar.js";
import AppStackNavigator from "./AppStackNavigator.js";
import SettingsScreen from "../screens/SettingsScreen.js";

const DashboardNavigation = createDrawerNavigator(
  {
    Home: { screen: AppStackNavigator },
    // Chat: { screen: MainScreenNavigator },
    // Profile: { screen: Profile },
    SettingsScreen : {
      screen: SettingsScreen,
      navigationOptions : {
        title:'Settings',
        tabBarIcon: ({ focused, tintColor }) => {
          return <Icon name="md-log-out" size={25} color={tintColor} />;
        }
      }
    }
  }
  // {
  //   contentComponent: props => <SideBar {...props} />
  // }
);
export default DashboardNavigation;