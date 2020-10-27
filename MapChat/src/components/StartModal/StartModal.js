import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, Modal } from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

export default StartModal = ({ startModal, hideModal }) => {


    const imageArray = [
        require('../../images/controls/instructions.png'),
        require('../../images/controls/activeInstruction.png'),
        require('../../images/controls/clearInstruction.png'),
    ];

    const [imageIndex, setImageIndex] = useState(0);

    const leftImage = () => {
        let newIndex = imageIndex;
        if (newIndex == 0) {
            newIndex = 3;
        }
        newIndex--;
        setImageIndex(newIndex);
    }

    const rightImage = () => {
        let newIndex = imageIndex;
        if (newIndex == 2) {
            newIndex = -1;
        }
        newIndex++;
        setImageIndex(newIndex)
    }

    const config = {
        horizontal: true,
        directionalOffsetThreshold: 50,
        velocityThreshold: 0.7
    };

    return (
            <GestureRecognizer
                onSwipeLeft={rightImage}
                onSwipeRight={leftImage}
                config={config}
                style={{
                    flex: 1,
                    backgroundColor: 'red'
                }}
            >
                <Modal visible={startModal}>
                <View style={styles.header}>
                    <Text style={styles.welcomeText}>Добро пожаловать в</Text>
                    <View style={styles.policegrammWrapper}>
                        <Text style={styles.police}>Drive</Text>
                        <Text style={styles.police}>Chat</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', }} >
                        <TouchableOpacity style={styles.arrows} onPress={leftImage}>
                            <Image source={require('../../images/controls/left.png')} style={{ width: 60, height: 30 }} />
                        </TouchableOpacity>
                        <Image source={imageArray[imageIndex]} style={{ width: 270, height: 230, marginBottom: 90 }} />
                        <TouchableOpacity style={styles.arrows} onPress={rightImage}>
                            <Image source={require('../../images/controls/right.png')} style={{ width: 60, height: 30 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 30 }}>
                        <TouchableOpacity onPress={() => setImageIndex(0)} style={imageIndex == 0 ? styles.activeRound : styles.round}></TouchableOpacity>
                        <TouchableOpacity onPress={() => setImageIndex(1)} style={imageIndex == 1 ? styles.activeRound : styles.round}></TouchableOpacity>
                        <TouchableOpacity onPress={() => setImageIndex(2)} style={imageIndex == 2 ? styles.activeRound : styles.round}></TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.startBtn} onPress={() => hideModal()} >
                        <Text style={styles.startBtnText}>НАЧАТЬ</Text>
                    </TouchableOpacity>
                </View>
                </Modal>
            </GestureRecognizer>
    );
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 100,
    },
    welcomeText: {
        fontSize: 24,
        //fontWeight: 'bold',
        color: '#777777'
    },
    police: {
        color: '#777777',
        fontSize: 27,
        fontWeight: 'bold',
    },
    policegrammWrapper: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 30,
    },
    arrows: {
        marginTop: 75,
    },
    round: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#dddada',
        marginLeft: 5,
    },
    activeRound: {
        width: 25,
        height: 25,
        borderRadius: 12.5,
        backgroundColor: '#aeaeae',
        marginTop: -2.5,
        marginLeft: 5,
    },
    startBtn: {
        width: 180,
        height: 50,
        backgroundColor: '#AEE80D',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    startBtnText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    }
});