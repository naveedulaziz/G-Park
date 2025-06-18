import React, { Component } from 'react';
import { Alert, ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native';

import { Button, Block, Input, Text } from '../components';
import { theme } from '../constants';

export default class NewGarage extends Component {
  state = {
    houseNumber: null,
    registrationNumber: null,
    numberOfSlots: null,
    errors: [],
    loading: false,
  }

  handleNewGarage() {
    const { navigation } = this.props;
    const { houseNumber, registrationNumber, numberOfSlots } = this.state;
    const errors = [];

    Keyboard.dismiss();
    this.setState({ loading: true });

    // check with backend API or with some static data
    if (!houseNumber) errors.push('houseNumber');
    if (!registrationNumber) errors.push('registrationNumber');
    if (!numberOfSlots) errors.push('numberOfSlots');

    this.setState({ errors, loading: false });

    if (!errors.length) {
      Alert.alert(
        'Success!',
        'Your Car Have been added',
        [
          {
            text: 'Continue', onPress: () => {
              navigation.navigate('Browse')
            }
          }
        ],
        { cancelable: false }
      )
    }
  }

  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;

    return (
      <KeyboardAvoidingView style={styles.newgarage} behavior="padding">
        <Block padding={[0, theme.sizes.base * 2]}>
          <Text h1 bold>Add Garage</Text>
          <Block middle>
            <Input
              label="House Number"
              error={hasErrors('houseNumber')}
              style={[styles.input, hasErrors('houseNumber')]}
              defaultValue={this.state.houseNumber}
              onChangeText={text => this.setState({ houseNumber: text })}
            />
            <Input
              label="Registration Number"
              error={hasErrors('registrationNumber')}
              style={[styles.input, hasErrors('registrationNumber')]}
              defaultValue={this.state.registrationNumber}
              onChangeText={text => this.setState({ registrationNumber: text })}
            />
            <Input
              secure
              label="Number Of Slots"
              error={hasErrors('numberOfSlots')}
              style={[styles.input, hasErrors('numberOfSlots')]}
              defaultValue={this.state.numberOfSlots}
              onChangeText={text => this.setState({ numberOfSlots: text })}
            />
            <Button gradient onPress={() => this.handleNewGarage()}>
              {loading ?
                <ActivityIndicator size="small" color="white" /> :
                <Text bold white center>Add Now</Text>
              }
            </Button>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  newgarage: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent,
  }
})
