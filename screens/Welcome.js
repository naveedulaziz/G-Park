import React, { Component } from 'react'
import { Animated, Dimensions, Image, FlatList, Modal, StyleSheet, ScrollView } from 'react-native';

import { Button, Block, Text } from '../components';
import { theme } from '../constants';

const { width, height } = Dimensions.get('window');

class Welcome extends Component {
  static navigationOptions = {
    header: null,
  }

  scrollX = new Animated.Value(0);

  state = {
    showTerms: false,
  }

  renderTermsService() {
    return (
      <Modal animationType="slide" visible={this.state.showTerms} onRequestClose={() => this.setState({ showTerms: false })}>
        <Block padding={[theme.sizes.padding * 2, theme.sizes.padding]} space="between">
          <Text h2 light>Terms of Service</Text>

          <ScrollView style={{ marginVertical: theme.sizes.padding }}>
            <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
              1. Your use of the Service is at your sole risk. The service is provided on an "as is" and "as available" basis.  
            </Text>
            <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
              2. There are some terms to use, govern, resist, control and limit to use the G-Park system service application. By using this application, you are accommodating that you have read, recognize and agree to be bound by the terms of use. These terms or conditions may be change by the time but and those kind of changes will be clarify to the users immediately. It will also send to you by emailing you and it’s your responsibility to check regularly the terms every time to use the application to determine any changes since you had used last time. This application is only used by the users/clients with authorized capability to go in to the obligatory contacts under pertinent law. Any access that doesn’t have valid details couldn’t use this application and its use is prohibited for them. If you don’t agree with the terms and conditions that are expressed here then you are not be able and authenticate to use this application. If you choose this application to use then expressively agree to be in with all the terms and conditions.
            </Text>
            <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
              3. G-Park system is using several payment methods to provide accommodations according to you needs, including: valet of G-Park and pay bill by hand to hand. Garage park reservation system reserve the garage place on the behalf of services provided. G-Park system provides and controls the garage prices, regulate garage availability and charge for the garage fees and services that are provided. Bill rate is set at the time of parking the vehicle and billing amount is according to the type of vehicle and the payment fix for all the users. There are not additional coupons, special offers or other kind of promotions in your reservation rate when you exit the place.
            </Text>
            <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
              4. Refunding for cancelled reservation is not provided. Copyrights and trademarks: G-Park system is owned and operated by the G-Park administration. All the content of G-Park is copyright of G-Park. All rights are reserved. Any kind of material of this application may not be used by others devoid of previous consent of G-Park. 
            </Text>
          </ScrollView>

          <Block middle padding={[theme.sizes.base / 2, 0]}>
            <Button gradient onPress={() => this.setState({ showTerms: false })}>
              <Text center white>I understand</Text>
            </Button>
          </Block>
        </Block>
      </Modal>
    )
  }

  renderIllustrations() {
    const { illustrations } = this.props;

    return (
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToAlignment="center"
        data={illustrations}
        extraDate={this.state}
        keyExtractor={(item, index) => `${item.id}`}
        renderItem={({ item }) => (
          <Image
            source={item.source}
            resizeMode="contain"
            style={{ width, height: height / 2, overflow: 'visible' }}
          />
        )}
        onScroll={
          Animated.event([{
            nativeEvent: { contentOffset: { x: this.scrollX } }
          }])
        }
      />
    )
  }

  // renderSteps() {
  //   const { illustrations } = this.props;
  //   const stepPosition = Animated.divide(this.scrollX, width);
  //   return (
  //     <Block row center middle style={styles.stepsContainer}>
  //       {illustrations.map((item, index) => {
  //         const opacity = stepPosition.interpolate({
  //           inputRange: [index - 1, index, index + 1],
  //           outputRange: [0.4, 1, 0.4],
  //           extrapolate: 'clamp',
  //         });

  //         return (
  //           <Block
  //             animated
  //             flex={false}
  //             key={`step-${index}`}
  //             color="gray"
  //             style={[styles.steps, { opacity }]}
  //           />
  //         )
  //       })}
  //     </Block>
  //   )
  // }
  
  render() {
    const { navigation } = this.props;

    return (
      <Block>
        <Block center bottom flex={0.4}>
          <Text h1 center bold>
            Park Your Car At
            <Text h1 primary> Home.</Text>
          </Text>
          <Text h3 gray2 style={{ marginTop: theme.sizes.padding / 2 }}>
            Parking Solutions
          </Text>
        </Block>
        <Block center middle>
          {this.renderIllustrations()}
          {/* {this.renderSteps()} */}
        </Block>
        <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
          <Button gradient onPress={() => navigation.navigate('Login')}>
            <Text center semibold white>Login</Text>
          </Button>
          <Button shadow onPress={() => navigation.navigate('SignUp')}>
            <Text center semibold>Signup</Text>
          </Button>
          <Button onPress={() => this.setState({ showTerms: true })}>
            <Text center caption gray>Terms of service</Text>
          </Button>
        </Block>
        {this.renderTermsService()}
      </Block>
    )
  }
}

Welcome.defaultProps = {
  illustrations: [
    { id: 1, source: require('../assets/images/illustration_1.png') },
    // { id: 2, source: require('../assets/images/illustration_2.png') },
    // { id: 3, source: require('../assets/images/illustration_3.png') },
  ],
};

export default Welcome;

const styles = StyleSheet.create({
  stepsContainer: {
    position: 'absolute',
    bottom: theme.sizes.base * 3,
    right: 0,
    left: 0,
  },
  steps: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 2.5,
  },
})
 
