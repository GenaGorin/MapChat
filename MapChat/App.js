import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Alert, TouchableOpacity, Image } from 'react-native';
import MyMap from './src/components/myMap/MyMap';
import GetLocation from 'react-native-get-location'
import { policeGramm } from './src/api/api';

export default class App extends React.Component {

  state = {
    isLoaded: false,
    isBanned: false,
    startModal: true,
    banReason: null,
    feedbackModal: false,
    showUpdateBtn: true,
    currentPosition: {
      latitude: null,
      longitude: null,
    },
    afterMarkerCreateCoords: {
      latitude: null,
      longitude: null,
    },
    feebackData: [],
    markers: [],
  }
  i = 4;

  hideModal() {
    this.setState({
      startModal: false,
    });
  }

  chabgeFeedbcakModal(bool) {
    this.setState({
      feedbackModal: bool,
    });

    if (this.state.feebackData.length == 0) {
      let self = this;
      policeGramm.getContacts(this.state.currentPosition)
        .then(function (response) {
          self.setState({
            feebackData: response.data
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }

  }

  loadApp(position) {
    this.setState({
      isLoaded: true,
      currentPosition: {
        latitude: position.latitude,
        longitude: position.longitude,
      },
    });

    var self = this;
    policeGramm.getMarkers(this.state.currentPosition)
      .then(function (response) {
        if (response.data.banned) {
          self.setState({
            isBanned: true,
            banReason: response.data.banned,
          });
        } else {
          self.setState({
            markers: response.data,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  updateAppMarkers() {
    var self = this;
    self.setState({
      showUpdateBtn: false
    });
    policeGramm.getMarkers(this.state.currentPosition)
      .then(function (response) {
        self.setState({
          showUpdateBtn: true,
          markers: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  createNewMarker = (coords, data) => {
    let newMarker = {
      id: this.i,
      latitude: coords.latitude,
      longitude: coords.longitude,
      title: data.title,
      description: data.description,
      image: data.image,
      date: data.date,
    };
    var self = this;
    self.setState({
      afterMarkerCreateCoords: {
        latitude: coords.latitude,
        longitude: coords.longitude,
      },
    });
    policeGramm.createMarker(newMarker)
      .then(function (response) {
        if (response.data === 'Error-more-then-5-markers') {
          Alert.alert('Разрешено создавать не более 5 меток в сутки');
        } else {
          self.setState({
            markers: [...self.state.markers, newMarker]
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    this.i++;
  }

  componentDidMount() {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        this.loadApp(location);
      })
      .catch(error => {
        const { code, message } = error;
        Alert.alert('Для корректной работы приложения разрешите доступ к геоданным');
        let location = {};
        location.latitude = 51.506737;
        location.longitude = 45.956049;
        this.loadApp(location);
        console.warn(code, message);
      })
    /*
     navigator.geolocation.getCurrentPosition(
       (position) => this.loadApp(position),
       (err) => console.log(err),
       { enableHighAccuracy: false, timeout: 8000, maximumAge: 10000 }
     );
     */
  }

  render() {
    if (this.state.isBanned) {
      return (
        <View style={styles.banWindow}>
          <Text style={styles.banWindowhead}>Вы были забаsнены :(</Text>
          <Text style={styles.banWindowdesc}>Причина - {this.state.banReason}</Text>
          <Text>Для разблокировки вы можете обратится к разработчику</Text>
          <Text>Telegramm</Text>
          <Text>Instagramm</Text>
        </View>
      )
    }

    return (
      !this.state.isLoaded
        ? <ActivityIndicator style={styles.loadApp} size="large" color="red" />
        :
        <MyMap
          style={styles.map}
          latitude={this.state.currentPosition.latitude}
          longitude={this.state.currentPosition.longitude}
          lastMarkerLatitude={this.state.afterMarkerCreateCoords.latitude}
          lastMarkerLongitude={this.state.afterMarkerCreateCoords.longitude}
          onRegionChange={this.state.onRegionChange}
          markers={this.state.markers}
          createNewMarker={this.createNewMarker}
          updateAppMarkers={this.updateAppMarkers.bind(this)}
          startModal={this.state.startModal}
          hideModal={this.hideModal.bind(this)}
          feedbackModal={this.state.feedbackModal}
          chabgeFeedbcakModal={this.chabgeFeedbcakModal.bind(this)}
          feedbackData={this.state.feebackData}
          showUpdateBtn={this.state.showUpdateBtn}
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute'
  },
  loadApp: {
    top: 300,
  },
  banWindow: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  banWindowhead: {
    fontSize: 20,
  },
  banWindowdesc: {
    fontSize: 15,
  },
});
