import React from 'react';
import { StyleSheet, ActivityIndicator, Alert, Linking } from 'react-native';
import MyMap from './src/components/myMap/MyMap';
import GetLocation from 'react-native-get-location'
import { policeGramm } from './src/api/api';
import { getUniqueId, getManufacturer } from 'react-native-device-info';

export default class App extends React.Component {

  state = {
    deviceId: null,
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
    showedMarkers: {
      withCameras: true,
      markers: [],
    }
  }
  i = 4;

  findMarkerId = (lat, lng) => {
    let res = this.state.markers.filter((marker) => marker.latitude == lat && marker.longitude == lng);
    return res[0].id;
  }

  clicksOnContact(contactId) {
    let self = this;
    let index = contactId - 1;
    policeGramm.clicksOnContact(contactId)
      .then(function (response) {
        const url = self.state.feebackData[index].url;
        Linking.openURL(url).catch(err => console.error('An error occurred', err));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  sendReport(reportData) {
    let markerId = reportData.markerId;
    let deviceId = this.state.deviceId;
    let description = reportData.description;
    policeGramm.createReport(markerId, description, deviceId)
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
      } else {
        return marker;
      }
    });
    this.setState({
      markers: newMarkers
    })
  }

  incrementPresentViewsAndLinking(markerId, url) {
    policeGramm.incrementPresentViews(markerId)
      .then(function (response) {
        Linking.openURL(url).catch(err => console.error('An error occurred', err));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  sendMarkerConfirm(markerId) {
    let deviceId = this.state.deviceId;
    let self = this;
    policeGramm.confirmMarker(markerId, deviceId)
      .then(function (response) {
        if (response.data === 'Success') {
          self.incrementConfirms(markerId);
        } else {
          Alert.alert('Вы уже подтверждали эту метку')
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

  loadApp(position, deviceId) {
    this.setState({
      deviceId: deviceId,
      isLoaded: true,
      currentPosition: {
        latitude: position.latitude,
        longitude: position.longitude,
      },
    });

    var self = this;
    policeGramm.getMarkers(this.state.currentPosition, deviceId)
      .then(function (response) {
        self.setState({
          markers: response.data.markerData,
          banInfo: {
            banStatus: response.data.banInfo.status,
            banReason: response.data.banInfo.reason,
          },
          showedMarkers: {
            markers: response.data.markerData,
            withCameras: true,
          }
        });
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  updateAppMarkers() {
    let deviceId = this.state.deviceId;
    var self = this;
    self.setState({
      showUpdateBtn: false
    });
    policeGramm.getMarkers(this.state.currentPosition, deviceId)
      .then(function (response) {
        self.setState({
          showUpdateBtn: true,
          markers: response.data.markerData,
          banInfo: {
            banStatus: response.data.banInfo.status,
            banReason: response.data.banInfo.reason,
          },
          showedMarkers: {
            markers: response.data.markerData,
            withCameras: true,
          }
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  createNewMarker = (coords, data) => {
    let newMarker = {
      id: this.i,
      latitude: coords.latitude.toFixed(4),
      longitude: coords.longitude.toFixed(4),
      title: data.title,
      description: data.description,
      image: data.image,
      date: data.date,
      confirms: 1,
      deviceId: this.state.deviceId,
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
          Alert.alert('Разрешено создавать не более 8 меток в сутки');
        } else {
          self.setState({
            markers: [...self.state.markers, newMarker],
            showedMarkers: {
              markers: [...self.state.markers, newMarker],
              withCameras: true,
            }
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    this.i++;
  }

  changeCamerasVisible() {
    if (this.state.showedMarkers.withCameras) {
      let newMarkers = this.state.markers.filter(marker => marker.title != 'КАМЕРА')
      this.setState({
        showedMarkers: {
          withCameras: false,
          markers: newMarkers,
        }
      })
    } else {
      this.setState({
        showedMarkers: {
          withCameras: true,
          markers: this.state.markers,
        }
      })
    }
  }

  componentDidMount() {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        let uniqueId = getUniqueId();
        this.loadApp(location, uniqueId);
      })
      .catch(error => {
        const { code, message } = error;
        Alert.alert('Для корректной работы приложения разрешите доступ к геоданным');
        let location = {};
        location.latitude = 51.506737;
        location.longitude = 45.956049;
        let uniqueId = getUniqueId();
        this.loadApp(location, uniqueId);
        console.warn(code, message);
      })
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
          markers={this.state.showedMarkers.markers}
          withCameras={this.state.showedMarkers.withCameras}
          changeCamerasVisible={this.changeCamerasVisible.bind(this)}
          createNewMarker={this.createNewMarker}
          updateAppMarkers={this.updateAppMarkers.bind(this)}
          startModal={this.state.startModal}
          hideModal={this.hideModal.bind(this)}
          feedbackModal={this.state.feedbackModal}
          chabgeFeedbcakModal={this.chabgeFeedbcakModal.bind(this)}
          feedbackData={this.state.feebackData}
          sponsorsModal={this.state.sponsorsModal}
          changeSponsorsModal={this.changeSponsorsModal.bind(this)}
          sponsorsData={this.state.sponsorsData}
          showUpdateBtn={this.state.showUpdateBtn}
          sendReport={this.sendReport.bind(this)}
          banInfo={this.state.banInfo}
          sendMarkerConfirm={this.sendMarkerConfirm.bind(this)}
          clicksOnContact={this.clicksOnContact.bind(this)}
          incrementPresentViewsAndLinking={this.incrementPresentViewsAndLinking.bind(this)}
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
