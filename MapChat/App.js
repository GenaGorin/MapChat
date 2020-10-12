import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Alert, TouchableOpacity, Image } from 'react-native';
import MyMap from './src/components/myMap/MyMap';
import GetLocation from 'react-native-get-location'
import { policeGramm } from './src/api/api';

export default class App extends React.Component {

  state = {
    isLoaded: false,
    banInfo: {
      banStatus: false,
      banReason: null,
    },
    startModal: true,
    banReason: null,
    feedbackModal: false,
    sponsorsModal: false,
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
    sponsorsData: [],
  }
  i = 4;

  findMarkerId = (lat, lng) => {
    let res = this.state.markers.filter((marker)=> marker.latitude == lat && marker.longitude == lng);
    return res[0].id;
  }

  sendReport(reportData) {
    let markerId = this.findMarkerId(reportData.latitude, reportData.longitude);
    let description = reportData.description;
    policeGramm.createReport(markerId, description)
      .then(function (response) {
        if (response.data === 'success') {
          Alert.alert('Ваша жалоба будет рассмотрена')
        } else {
          Alert.alert('Вы уже жаловались на эту метку')
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    incrementConfirms(markerId) {
      let newMarkers = this.state.markers.map(marker => {
        if (marker.id === markerId) {
          marker.confirms++;
          return marker;
        }else {
          return marker;
        }
      });
      this.setState({
        markers: newMarkers
      })
    }

    sendMarkerConfirm(confirmData) {
      let markerId = this.findMarkerId(confirmData.latitude, confirmData.longitude);
      let self = this;
      policeGramm.confirmMarker(markerId)
      .then(function (response) {
        if (response.data === 'Success') {
          self.incrementConfirms(markerId);
        } else {
          Alert.alert('Вы уже подтверждали эту метку')
          //console.log(response.data)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }

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
      policeGramm.getContacts()
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

  changeSponsorsModal(bool) {
    this.setState({
      sponsorsModal: bool,
    });

    if (this.state.sponsorsData.length == 0) {
      let self = this;
      policeGramm.getSponsors()
        .then(function (response) {
          self.setState({
            sponsorsData: response.data
          })
        })
        .catch(function (error) {
          console.log(error);
        });

        policeGramm.getContacts()
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
        self.setState({
          markers: response.data.markerData,
          banInfo: {
            banStatus: response.data.banInfo.status,
            banReason:  response.data.banInfo.reason,
          }
        });
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
          markers: response.data.markerData,
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
      confirms: 1,
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
          sponsorsModal = {this.state.sponsorsModal}
          changeSponsorsModal = {this.changeSponsorsModal.bind(this)}
          sponsorsData = {this.state.sponsorsData}
          showUpdateBtn={this.state.showUpdateBtn}
          sendReport = {this.sendReport.bind(this)}
          banInfo = {this.state.banInfo}
          sendMarkerConfirm = {this.sendMarkerConfirm.bind(this)}
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
