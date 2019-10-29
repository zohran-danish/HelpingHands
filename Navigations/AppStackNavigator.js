import { createStackNavigator } from "react-navigation";
import AppTabNavigator from "./AppTabNavigator";
import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import  Icon  from 'react-native-vector-icons/Ionicons';

const AppStackNavigator = createStackNavigator({
  AppTabNavigator : {
    screen: AppTabNavigator,
    navigationOptions : ({navigation}) => ({
      title: 'Helping Hands App',
      headerLeft: (
        <TouchableOpacity onPress={()=>navigation.toggleDrawer()}>
          <View style={{paddingHorizontal: 10}}>
            <Icon name="md-menu" size={24} />
          </View>
        </TouchableOpacity>
      )
    })
  },

})

export default AppStackNavigator;