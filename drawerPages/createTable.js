import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Container, Content, List, ListItem, Thumbnail, Button, Header, Body, Title, Left} from 'native-base';
import {DrawerScreens} from '../router';
import { NavigationActions } from 'react-navigation';

export default class CreateTable extends Component{
    render(){
        return(<View style={{
            justifyContent: 'center',
            alignContent: 'center'
        }}>
            <Text>
                Creating a Table
            </Text>
        </View>);
    }
}