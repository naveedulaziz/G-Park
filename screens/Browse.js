import React, { Component } from 'react'
import { Dimensions, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'

import { Card, Badge, Button, Block, Text } from '../components';
import { theme, mocks } from '../constants';

const { width } = Dimensions.get('window');

class Browse extends Component {
  // state = {
  //   active: 'All',
  //   categories: [],
  // }

  // componentDidMount() {
  //   this.setState({ categories: this.props.categories });
  // }

  // handleTab = tab => {
  //   const { categories } = this.props;
  //   const filtered = categories.filter(
  //     category => category.tags.includes(tab.toLowerCase())
  //   );

  //   this.setState({ active: tab, categories: filtered });
  // }

  // renderTab(tab) {
  //   const { active } = this.state;
  //   const isActive = active === tab;

  //   return (
  //     // <TouchableOpacity
  //     //   key={`tab-${tab}`}
  //     //   onPress={() => this.handleTab(tab)}
  //     //   style={[
  //     //     styles.tab,
  //     //     isActive ? styles.active : null
  //     //   ]}
  //     // >
  //     //   <Text size={16} medium gray={!isActive} secondary={isActive}>
  //     //     {tab}
  //     //   </Text>
  //     // </TouchableOpacity>
  //   )
  // }

  render() {
    const { profile, navigation } = this.props;
    // const { categories } = this.state;
    // const tabs = ['Products', 'Inspirations', 'Shop'];

    return (
      
      <Block>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>Explorer</Text>
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
            <Button gradient onPress={() => navigation.navigate('Vehicles')}>
              <Text center semibold white>Vehicles</Text>
            </Button>
            <Button gradient onPress={() => navigation.navigate('Garages')}>
              <Text center semibold white>Garages</Text>
            </Button>

          </Block>
          {/* <Block flex={false} row space="between" style={styles.categories}>
            {categories.map(category => (
              <TouchableOpacity
                key={category.name}
                onPress={() => navigation.navigate('Map', { category })}
              >
                <Card center middle shadow style={styles.category}>
                  <Badge margin={[0, 0, 15]} size={50} color="rgba(41,216,143,0.20)">
                    <Image source={category.image} />
                  </Badge>
                  <Text medium height={20}>{category.name}</Text>
                  <Text gray caption>{category.count} products</Text>
                </Card>
              </TouchableOpacity>
            ))}
          </Block> */}
        </ScrollView>
      </Block>
    )
  }
}

Browse.defaultProps = {
  profile: mocks.profile,
  categories: mocks.categories,
}

export default Browse;

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
//   tabs: {
//     borderBottomColor: theme.colors.white,
//     borderBottomWidth: StyleSheet.hairlineWidth,
//     marginVertical: theme.sizes.base,
//     marginHorizontal: theme.sizes.base * 2,
//   },
//   tab: {
//     marginRight: theme.sizes.base * 2,
//     paddingBottom: theme.sizes.base
//   },
//   active: {
//     borderBottomColor: theme.colors.secondary,
//     borderBottomWidth: 3,
//   },
//   categories: {
//     flexWrap: 'wrap',
//     paddingHorizontal: theme.sizes.base * 2,
//     marginBottom: theme.sizes.base * 3.5,
//   },
//   category: {
//     // this should be dynamic based on screen width
//     minWidth: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
//     maxWidth: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
//     maxHeight: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
//   }
})


// import React, { Component } from 'react'
// import { Animated, Dimensions, Image, FlatList, Modal, StyleSheet, ScrollView } from 'react-native';

// import { Button, Block, Text } from '../components';
// import { theme, mocks } from '../constants';
// import Browse from './Browse';

// const { width, height } = Dimensions.get('window');

// class Brow extends Component {

//   render() {
//     const { profile, navigation } = this.props;
//     return (
//       <Modal animationType="slide">
//         <Block flex={false} row center space="between" style={styles.header}>
//           <Text h1 bold>Profile</Text>
//           <Button onPress={() => navigation.navigate('Settings')}>
//           <Image
//               source={require('../assets/images/profileP.png')}
//               style={styles.avatar}
//             />
//           </Button>
//         </Block>
//         {/* <Block padding={[theme.sizes.padding * 2, theme.sizes.padding]} space="between">
//           <Text h2 light>Terms of Service</Text> */}

//         <ScrollView >
//           <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
//             1. Your use of the Service is at your sole risk. The service is provided on an "as is" and "as available" basis.
//             </Text>
//           <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
//             2. Support for Expo services is only available in English, via e-mail.
//             </Text>
//           <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
//             3. You understand that Expo uses third-party vendors and hosting partners to provide the necessary hardware, software, networking, storage, and related technology required to run the Service.
//             </Text>
//           <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
//             4. You must not modify, adapt or hack the Service or modify another website so as to falsely imply that it is associated with the Service, Expo, or any other Expo service.
//             </Text>
//           <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
//             5. You may use the Expo Pages static hosting service solely as permitted and intended to host your organization pages, personal pages, or project pages, and for no other purpose. You may not use Expo Pages in violation of Expo's trademark or other rights or in violation of applicable law. Expo reserves the right at all times to reclaim any Expo subdomain without liability to you.
//             </Text>
//           <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
//             6. You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service without the express written permission by Expo.
//             </Text>
//           <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
//             7. We may, but have no obligation to, remove Content and Accounts containing Content that we determine in our sole discretion are unlawful, offensive, threatening, libelous, defamatory, pornographic, obscene or otherwise objectionable or violates any party's intellectual property or these Terms of Service.
//             </Text>
//           <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
//             8. Verbal, physical, written or other abuse (including threats of abuse or retribution) of any Expo customer, employee, member, or officer will result in immediate account termination.
//             </Text>
//           <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
//             9. You understand that the technical processing and transmission of the Service, including your Content, may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices.
//             </Text>
//           <Text caption gray height={24} style={{ marginBottom: theme.sizes.base }}>
//             10. You must not upload, post, host, or transmit unsolicited e-mail, SMSs, or "spam" messages.
//             </Text>
//         </ScrollView>

//         <Block middle padding={[theme.sizes.base / 2, 0]}>
//           <Button gradient onPress={() => navigation.navigate("Login")}>
//             <Text center white>Add New</Text>
//           </Button>
//         </Block>
//       </Modal>

//     )
//   }
// }

// Browse.defaultProps = {
//   profile: mocks.profile,
// }
// export default Brow;

// const styles = StyleSheet.create({
//   header: {
//     paddingHorizontal: theme.sizes.base * 2,
//   },
//   avatar: {
//     height: theme.sizes.base * 2.2,
//     width: theme.sizes.base * 2.2,
//   },
//   tabs: {
//     borderBottomColor: theme.colors.gray2,
//     borderBottomWidth: StyleSheet.hairlineWidth,
//     marginVertical: theme.sizes.base,
//     marginHorizontal: theme.sizes.base * 2,
//   },
//   tab: {
//     marginRight: theme.sizes.base * 2,
//     paddingBottom: theme.sizes.base
//   },
//   active: {
//     borderBottomColor: theme.colors.secondary,
//     borderBottomWidth: 3,
//   },
//   categories: {
//     flexWrap: 'wrap',
//     paddingHorizontal: theme.sizes.base * 2,
//     marginBottom: theme.sizes.base * 3.5,
//   },
//   category: {
//     // this should be dynamic based on screen width
//     minWidth: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
//     maxWidth: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
//     maxHeight: (width - (theme.sizes.padding * 2.4) - theme.sizes.base) / 2,
//   }
// })

