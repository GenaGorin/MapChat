import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity} from 'react-native';
import MapView from 'react-native-maps';
import StartModal from '../StartModal/StartModal';
import FeedbackModal from '../FeedbackModal/FeedbackModal';
import CreateMarkerwindow from '../createMarkerWindow/CreateMarkerwindow';
import { activeImagesSource, clearImagesSourses } from '../imagesArray/imagesArray';
import GetLocation from 'react-native-get-location';

export default MyMap = ({ latitude, longitude, markers, createNewMarker, lastMarkerLatitude,
                            lastMarkerLongitude, updateAppMarkers, startModal, hideModal, feedbackModal, chabgeFeedbcakModal }) => {

    const [createMarkerMode, setCreateMarkerMode] = useState({
        createMode: false,
        coords: {},
    });
    const startCreateMarkerMode = (e) => {
        setCreateMarkerMode({
            createMode: true,
            coords: e.nativeEvent.coordinate,
        });
    }

    const createMarkerAndStopMode = (data) => {
        createNewMarker(createMarkerMode.coords, data);
        setCreateMarkerMode({
            createMode: false,
            coords: {},
        });
    }
    const stopMode = () => {
        setCreateMarkerMode({
            createMode: false,
            coords: {},
        });
    }


    const [activeImages, setActiveImages] = useState(false);
    const [passiveImages, setPassiveImages] = useState(false);

    const showActiveImg = () => {
        setPassiveImages(false);
        setActiveImages(true);
    }

    const showPassiveImg = () => {
        setActiveImages(false);
        setPassiveImages(true);
    }

    const getMyLocation = () => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(location => {
                myMap.animateToRegion({
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                })
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            })
    }


    return (
        createMarkerMode.createMode
            ? <CreateMarkerwindow createMarkerAndStopMode={createMarkerAndStopMode} stopMode={stopMode} />
            :
            <View style={styles.container}>
                <StartModal hideModal= {hideModal}  startModal = {startModal} />
                <FeedbackModal feedbackModal = {feedbackModal} chabgeFeedbcakModal = {chabgeFeedbcakModal} />
                <TouchableOpacity style={styles.goToMyPositionIcon} onPress={() => getMyLocation()}>
                    <Image source={require('../../images/markers/i.png')} style={{ width: 30, height: 30 }} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.updateIcon} activeOpacity={0.5} onPress={() => updateAppMarkers()}>
                    <Image source={require('../../images/controls/update.png')} style={{ width: 30, height: 30 }} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.advitrisment} activeOpacity={0.5} onPress={() => chabgeFeedbcakModal(true)}>
                    <Image source={require('../../images/controls/advitrisment.png')} style={{ width: 30, height: 30 }} />
                </TouchableOpacity>
                <MapView
                    ref={map => { myMap = map }}
                    style={styles.map}
                    onLongPress={(e) => {
                        startCreateMarkerMode(e);
                    }}
                    initialRegion={{
                        latitude: lastMarkerLatitude ? lastMarkerLatitude : latitude,
                        longitude: lastMarkerLongitude ? lastMarkerLongitude : longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    showsUserLocation={true}
                >
                    {markers.map(marker => {
                        let imageArr = marker.image.split('-');
                        let source;
                        imageArr[0] == 'active' ? source = activeImagesSource[imageArr[1]] : source = clearImagesSourses[imageArr[1]];
                        return <MapView.Marker
                            centerOffset={{ x: -5, y: -15 }}
                            title={marker.title + ' (' + marker.date.substr(11) + ')'}
                            description={marker.description}
                            key={marker.id}
                            coordinate={{
                                latitude: parseFloat(marker.latitude),
                                longitude: parseFloat(marker.longitude),
                            }}>
                            <Image source={source} style={{ width: 39, height: 64 }} />
                        </MapView.Marker>
                    })}
                </MapView>
            </View>
    );
}

const styles = StyleSheet.create({
    map: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    updateIcon: {
        position: 'absolute',
        zIndex: 100,
        left: 40,
        top: 10
    },
    goToMyPositionIcon: {
        position: 'absolute',
        zIndex: 100,
        left: 10,
        top: 10
    },
    advitrisment: {
        position: 'absolute',
        zIndex: 100,
        left: 70,
        top: 10
    }
});