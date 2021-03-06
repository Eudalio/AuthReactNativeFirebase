import React, { Component } from 'react';
import {
  StyleSheet,
  Platform,
  Image,
  Text,
  View,
  Button,
  Alert,
} from 'react-native';

import firebase from 'react-native-firebase';

export default class Main extends Component {

  state = {
    currentUser: null,
  };

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
  }

  handleSignOut = () => {
    this.setState({ currentUser: null })
    firebase.auth().signOut().then(() => this.props.navigation.navigate('Loading'))
  }

  logout = () => {
    Alert.alert(
      "Tem certeza que deseja sair?",
      '',
      [
        { text: 'Cancel', style: 'cancel'},
        { text: 'OK', onPress: this.handleSignOut},
      ],)
  }

  render() {
    const { currentUser } = this.state

    return (
      <View style={styles.container}>
        <Text>
          Hello {currentUser && currentUser.email}!
        </Text>
        <Button
          title="Sair"
          onPress={this.logout} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
})
