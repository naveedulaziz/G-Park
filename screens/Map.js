import React, { Component } from 'react'
import { Text, StyleSheet, View, FlatList, Dimensions, TouchableOpacity, TouchableWithoutFeedback, Alert } from 'react-native';
import { Constants } from 'expo';
import MapView from 'react-native-maps';
import Modal from 'react-native-modal';
import Dropdown from 'react-native-modal-dropdown';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { theme } from '../constants';
// import * as theme from '../theme';

const { Marker } = MapView;
const { height, width } = Dimensions.get('screen');
const parkingsSpots = [
  {
    id: 1,
    title: 'Parking 1',
    price: .2,
    rating: 4.2,
    spots: 20,
    free: 10,
    coordinate: {
      latitude: 37.78735,
      longitude: -122.4334,
    },
    description: `Description about this parking lot

Open year 2018
Secure with CTV`,
  },
  {
    id: 2,
    title: 'Parking 2',
    price: .3,
    rating: 3.8,
    spots: 25,
    free: 20,
    coordinate: {
      latitude: 37.78845,
      longitude: -122.4344,
    },
    description: `Description about this parking lot

Open year 2014
Secure with CTV`,
  },
  {
    id: 3,
    title: 'Parking 3',
    price: .2,
    rating: 4.9,
    spots: 50,
    free: 25,
    coordinate: {
      latitude: 37.78615,
      longitude: -122.4314,
    },
    description: `Description about this parking lot

Open year 2019
Secure with CTV`,
  },
];

class Map extends Component {
  state = {
    hours: {},
    active: null,
    activeModal: null,
  }

  componentWillMount() {
    const { parkings } = this.props;
    const hours = {};

    parkings.map(parking => {hours[parking.id] = 1});

    this.setState({ hours });
  }
  
  handleHours = (id, value) => {
    const { hours } = this.state;
    hours[id] = value;

    this.setState({ hours });
  }

  renderHeader() {
    return (
      <View style={styles.header}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={styles.headerTitle}>Detected location</Text>
          <Text style={styles.headerLocation}>Pakistan</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', }}>
          <TouchableWithoutFeedback>
            <Ionicons name="ios-menu" size={theme.sizes.icon * 1.5} />
          </TouchableWithoutFeedback>
        </View>
      </View>
    )
  }

  renderParking = (item) => {
    const { hours } = this.state;
    const totalPrice = item.price * hours[item.id];

    return (
      <TouchableWithoutFeedback key={`parking-${item.id}`} onPress={() => this.setState({ active: item.id })} >
        <View style={[styles.parking, styles.shadow]}>
          <View style={styles.hours}>
            <Text style={styles.hoursTitle}>x {item.spots} {item.title}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {this.renderHours(item.id)}
              <Text style={{ color: theme.colors.gray }}>hrs</Text>
            </View>
          </View>
          <View style={styles.parkingInfoContainer}>
            <View style={styles.parkingInfo}>
              <View style={styles.parkingIcon}>
                <Ionicons name='ios-pricetag' size={theme.sizes.icon} color={theme.colors.gray} />
                <Text style={{ marginLeft: theme.SIZES.base }}> ${item.price}</Text>
              </View>
              <View style={styles.parkingIcon}>
                <Ionicons name='ios-star' size={theme.sizes.icon} color={theme.colors.gray} />
                <Text style={{ marginLeft: theme.SIZES.base }}> {item.rating}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.buy} onPress={() => this.setState({ activeModal: item })}>
              <View style={styles.buyTotal}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <FontAwesome name='dollar' size={theme.sizes.icon * 1.25} color={theme.colors.white} />
                  <Text style={styles.buyTotalPrice}>{totalPrice}</Text>
                </View>
                <Text style={{ color: theme.colors.white }}>
                  {item.price}x{hours[item.id]} hrs
                </Text>
              </View>
              <View style={styles.buyBtn}>
                <FontAwesome name='angle-right' size={theme.sizes.icon * 1.75} color={theme.colors.white} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  renderParkings = () => {
    return (
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToAlignment="center"
        style={styles.parkings}
        data={this.props.parkings}
        extraData={this.state}
        keyExtractor={(item, index) => `${item.id}`}
        renderItem={({ item }) => this.renderParking(item)}
      />
    )
  }

  renderHours(id) {
    const { hours } = this.state;
    const availableHours = ['01', '02', '03','04', '05', '06', '07', '08', '09', 10 , 11, 12];

    return (
      <Dropdown
        defaultIndex={0}
        options={availableHours}
        style={styles.hoursDropdown}
        defaultValue={`${hours[id]}:00` || '01:00'}
        dropdownStyle={styles.hoursDropdownStyle}
        onSelect={(index, value) => this.handleHours(id, value)}
        renderRow={(option) => (
          <Text style={styles.hoursDropdownOption}>{`${option}:00`}</Text>
        )}
        renderButtonText={option => `${option}:00`}
      />
    )
  }

  renderModal() {
    const { activeModal, hours } = this.state;

    if (!activeModal) return null;

    return (
      <Modal
        isVisible
        useNativeDriver
        style={styles.modalContainer}
        backdropColor={theme.colors.overlay}
        onBackButtonPress={() => this.setState({ activeModal: null })}
        onBackdropPress={() => this.setState({ activeModal: null })}
        onSwipeComplete={() => this.setState({ activeModal: null })}
      >
        <View style={styles.modal}>
          <View>
            <Text style={{ fontSize: theme.SIZES.font * 1.5 }}>
              {activeModal.title}
            </Text>
          </View>
          <View style={{ paddingVertical: theme.SIZES.base }}>
            <Text style={{ color: theme.colors.gray, fontSize: theme.SIZES.font * 1.1 }}>
              {activeModal.description}
            </Text>
          </View>
          <View style={styles.modalInfo}>
            <View style={[styles.parkingIcon, {justifyContent: 'flex-start'} ]}>
              <Ionicons name='ios-pricetag' size={theme.sizes.icon * 1.1} color={theme.colors.gray} />
              <Text style={{ fontSize: theme.sizes.icon * 1.15 }}> ${activeModal.price}</Text>
            </View>
            <View style={[styles.parkingIcon, {justifyContent: 'flex-start'} ]}>
              <Ionicons name='ios-star' size={theme.sizes.icon * 1.1} color={theme.colors.gray} />
              <Text style={{ fontSize: theme.sizes.icon * 1.15 }}> {activeModal.rating}</Text>
            </View>
            <View style={[styles.parkingIcon, {justifyContent: 'flex-start'} ]}>
              <Ionicons name='ios-pin' size={theme.sizes.icon * 1.1} color={theme.colors.gray} />
              <Text style={{ fontSize: theme.sizes.icon * 1.15 }}> {activeModal.price}km</Text>
            </View>
            <View style={[styles.parkingIcon, {justifyContent: 'flex-start'} ]}>
              <Ionicons name='ios-car' size={theme.sizes.icon * 1.3} color={theme.colors.gray} />
              <Text style={{ fontSize: theme.sizes.icon * 1.15 }}> {activeModal.free}/{activeModal.spots}</Text>
            </View>
          </View>
          <View style={styles.modalHours}>
            <Text style={{ textAlign: 'center', fontWeight: '500' }}>Choose your Booking Period:</Text>
            <View style={styles.modalHoursDropdown}>
              {this.renderHours(activeModal.id)}
              <Text style={{ color: theme.colors.gray }}>hrs</Text>
            </View>
          </View>
          <View>
            <TouchableOpacity 
              style={styles.payBtn}
              onPress={this._showAlert}>
              <Text style={styles.payText}>
                Proceed to pay ${activeModal.price * hours[activeModal.id]}
              </Text>
              <FontAwesome name='angle-right' size={theme.sizes.icon * 1.75} color={theme.colors.white} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    const { currentPosition, parkings } = this.props;

    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <MapView
          initialRegion={currentPosition}
          style={styles.map}
        >
          {parkings.map(parking => (
            <Marker
              key={`marker-${parking.id}`}
              coordinate={parking.coordinate}
            >
              <TouchableWithoutFeedback onPress={() => this.setState({ active: parking.id })} >
                <View style={[
                  styles.marker,
                  styles.shadow,
                  this.state.active === parking.id ? styles.active : null
                ]}>
                  <Text style={styles.markerPrice}>${parking.price}</Text>
                  <Text style={styles.markerStatus}> ({parking.free}/{parking.spots})</Text>
                </View>
              </TouchableWithoutFeedback>
            </Marker>
          ))}
        </MapView>
        {this.renderParkings()}
        {this.renderModal()}
      </View>
    )
  }
  _showAlert = () => {
    const { navigation } = this.props;
    Alert.alert(
      'Congratulations',
      'Payment Successful. Thank you for choosing us',
      [
        {text: 'OK', onPress: () => navigation.navigate('Browse')},
        // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        // {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    )
  }
}

Map.defaultProps = {
  currentPosition: {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0122,
    longitudeDelta: 0.0121,
  },
  parkings: parkingsSpots,
}

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: theme.SIZES.base * 2,
    paddingTop: theme.SIZES.base * 2.5,
    paddingBottom: theme.SIZES.base * 1.5,
  },
  headerTitle: {
    color: theme.colors.gray,
  },
  headerLocation: {
    fontSize: theme.SIZES.font,
    fontWeight: '500',
    paddingVertical: theme.SIZES.base / 3,
  },
  map: {
    flex: 3,
  },
  parkings: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    paddingBottom: theme.SIZES.base * 2,
  },
  parking: {
    flexDirection: 'row',
    backgroundColor: theme.colors.white,
    borderRadius: 6,
    padding: theme.SIZES.base,
    marginHorizontal: theme.SIZES.base * 2,
    width: width - (24 * 2),
  },
  buy: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: theme.SIZES.base * 1.5,
    paddingVertical: theme.SIZES.base,
    backgroundColor: theme.colors.primary,
    borderRadius: 6,
  },
  buyTotal: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  buyTotalPrice: {
    color: theme.colors.white,
    fontSize: theme.SIZES.base * 2,
    fontWeight: '600',
    paddingLeft: theme.SIZES.base / 4,
  },
  buyBtn: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  marker: {
    flexDirection: 'row',
    backgroundColor: theme.colors.white,
    borderRadius: theme.SIZES.base * 2,
    paddingVertical: 12,
    paddingHorizontal: theme.SIZES.base * 2,
    borderWidth: 1,
    borderColor: theme.colors.white,
  },
  markerPrice: { color: theme.colors.red, fontWeight: 'bold', },
  markerStatus: { color: theme.colors.gray },
  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  active: {
    borderColor: theme.colors.red,
  },
  hours: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: theme.SIZES.base / 2,
    justifyContent: 'space-evenly',
  },
  hoursTitle: {
    fontSize: theme.SIZES.text,
    fontWeight: '500',
  },
  hoursDropdown: {
    borderRadius: theme.SIZES.base / 2,
    borderColor: theme.colors.overlay,
    borderWidth: 1,
    padding: theme.SIZES.base,
    marginRight: theme.SIZES.base / 2,
  },
  hoursDropdownOption: {
    padding: 5,
    fontSize: theme.SIZES.font * 0.8,
  },
  hoursDropdownStyle: {
    marginLeft: -theme.SIZES.base,
    paddingHorizontal: theme.SIZES.base / 2,
    marginVertical: -(theme.SIZES.base + 1),
  },
  parkingInfoContainer: { flex: 1.5, flexDirection: 'row' },
  parkingInfo: {
    justifyContent: 'space-evenly',
    marginHorizontal: theme.SIZES.base * 1.5,
  },
  parkingIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalContainer: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modal: {
    flexDirection: 'column',
    height: height * 0.75,
    padding: theme.SIZES.base * 2,
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: theme.SIZES.base,
    borderTopRightRadius: theme.SIZES.base,
  },
  modalInfo: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: theme.SIZES.base,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: theme.colors.overlay,
    borderBottomColor: theme.colors.overlay,
  },
  modalHours: {
    paddingVertical: height * 0.11,
  },
  modalHoursDropdown: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.SIZES.base,
  },
  payBtn: {
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.SIZES.base * 1.5,
    backgroundColor: theme.colors.red,
  },
  payText: {
    fontWeight: '600',
    fontSize: theme.SIZES.base * 1.5,
    color: theme.colors.white,
  }
})
