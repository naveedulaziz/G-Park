import React, { Component } from 'react'
import { View, Dimensions, Image, StyleSheet, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'

import { Card, Badge, Button, Block, Text } from '../components';
import { theme, mocks } from '../constants';

const { width } = Dimensions.get('window');

class Vehicles extends Component {
  render() {
    const { profile, navigation } = this.props;
    return (
      
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>Vehicles</Text>
          <Button onPress={() => navigation.navigate('Settings')}>
            <Image
              source={profile.avatar}
              style={styles.avatar}
            />
          </Button>
        </Block>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingVertical: theme.sizes.base * 2}}
        >
          <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
            <View space="between" style={[styles.parking, styles.shadow]}>
              <View style={styles.hours}>
                <Text style={styles.hoursTitle}>LXE-4684</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color: theme.colors.gray }}>Cultus</Text>
                </View>
              </View>
              <View style={styles.parkingInfoContainer}>
                <View style={styles.parkingInfo}>
                </View>
                <Button style={styles.buy} onPress={() => navigation.navigate('Map')}>
                  <Text center semibold white>Park</Text>
                </Button>
              </View>
            </View>
            <View space="between" style={[styles.parking, styles.shadow]}>
              <View style={styles.hours}>
                <Text style={styles.hoursTitle}>LXE-5250</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color: theme.colors.gray }}>Corola</Text>
                </View>
              </View>
              <View style={styles.parkingInfoContainer}>
                <View style={styles.parkingInfo}>
                </View>
                <Button style={styles.buy} onPress={() => navigation.navigate('Map')}>
                  <Text center semibold white>Park</Text>
                </Button>
              </View>
            </View>
            <View space="between" style={[styles.parking, styles.shadow]}>
              <View style={styles.hours}>
                <Text style={styles.hoursTitle}>AEE-5500</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color: theme.colors.gray }}>Bugatti</Text>
                </View>
              </View>
              <View style={styles.parkingInfoContainer}>
                <View style={styles.parkingInfo}>
                </View>
                <Button style={styles.buy} onPress={() => navigation.navigate('Map')}>
                  <Text center semibold white>Park</Text>
                </Button>
              </View>
            </View>

          </Block>
          <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
          <Button gradient onPress={() => navigation.navigate('NewVehicle')}>
            <Text center semibold white>Add New</Text>
          </Button>
        </Block>
        </ScrollView>
      </Block>
    )
  }
}

Vehicles.defaultProps = {
  profile: mocks.profile,
  categories: mocks.categories,
}

export default Vehicles;

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


  parking: {
    flexDirection: 'row',
    backgroundColor: theme.colors.white,
    borderRadius: 6,
    // padding: theme.SIZES.base,
    // marginHorizontal: theme.SIZES.base * 0.5,
    width: width - (24 * 2),
  },
  hoursTitle: {
    fontSize: theme.SIZES.text,
    fontWeight: '500',
  },
  buyBtn: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  buy: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: theme.SIZES.base * 1.5,
    paddingVertical: theme.SIZES.base,
    backgroundColor: theme.colors.primary,
    // float:left
    marginLeft: 185,
    // paddingLeft: 35,
    borderRadius: 6,
  },
})