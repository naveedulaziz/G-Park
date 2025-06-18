import React, { Component } from 'react'
import { Dimensions, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'

import { Card, Badge, Button, Block, Text, Switch } from '../components';
import { theme, mocks } from '../constants';

const { width } = Dimensions.get('window');

class Garages extends Component {
  state = {
    abc: true,
    abd: true,
    aft: false,
  }
  render() {
    const { profile, navigation } = this.props;
    return (
      
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>Garages</Text>
          <Button onPress={() => navigation.navigate('Settings')}>
            <Image
              source={profile.avatar}
              style={styles.avatar}
            />
          </Button>
        </Block>

        {/* <Block flex={false} row style={styles.tabs}>
          {tabs.map(tab => this.renderTab(tab))}
        </Block> */}

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingVertical: theme.sizes.base * 2}}
        >
          <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}> 
           <Block row center space="between" style={{ marginBottom: theme.sizes.base * 2 }}>
               <Text gray2>143-M Wapda Town</Text>
               <Switch
                 value={this.state.abd}
                 onValueChange={value => this.setState({ abd: value })}
               />
             </Block>
             <Block row center space="between" style={{ marginBottom: theme.sizes.base * 2 }}>
               <Text gray2>173-B BOR Society</Text>
               <Switch
                 value={this.state.abc}
                 onValueChange={value => this.setState({ abc: value })}
               />
             </Block>
             <Block row center space="between" style={{ marginBottom: theme.sizes.base * 2 }}>
               <Text gray2>City State Havana</Text>
               <Switch
                 value={this.state.aft}
                 onValueChange={value => this.setState({ aft: value })}
               />
             </Block>
          </Block>
          <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
          <Button gradient onPress={() => navigation.navigate('NewGarage')}>
            <Text center semibold white>Add New</Text>
          </Button>
        </Block>
        </ScrollView>
      </Block>
    )
  }
}

Garages.defaultProps = {
  profile: mocks.profile,
  categories: mocks.categories,
}

export default Garages;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: theme.sizes.base,
    marginHorizontal: theme.sizes.base * 2,
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2,
  },
})

