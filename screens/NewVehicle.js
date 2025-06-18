import React, { Component } from 'react';
import { Alert, ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native';

import { Button, Block, Input, Text } from '../components';
import { theme } from '../constants';

export default class NewVehicle extends Component {
  state = {
    carType: null,
    registrationNumber: null,
    chassisNumber: null,
    errors: [],
    loading: false,
  }

  handleNewVehicle() {
    const { navigation } = this.props;
    const { carType, registrationNumber, chassisNumber } = this.state;
    const errors = [];

    Keyboard.dismiss();
    this.setState({ loading: true });

    // check with backend API or with some static data
    if (!carType) errors.push('carType');
    if (!registrationNumber) errors.push('registrationNumber');
    if (!chassisNumber) errors.push('chassisNumber');

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
      <KeyboardAvoidingView style={styles.newvehicle} behavior="padding">
        <Block padding={[0, theme.sizes.base * 2]}>
          <Text h1 bold>Add Vehicle</Text>
          <Block middle>
            <Input
              label="Car Type"
              error={hasErrors('carType')}
              style={[styles.input, hasErrors('carType')]}
              defaultValue={this.state.carType}
              onChangeText={text => this.setState({ carType: text })}
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
              label="Chassis Number"
              error={hasErrors('chassisNumber')}
              style={[styles.input, hasErrors('chassisNumber')]}
              defaultValue={this.state.chassisNumber}
              onChangeText={text => this.setState({ chassisNumber: text })}
            />
            <Button gradient onPress={() => this.handleNewVehicle()}>
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
  newvehicle: {
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
