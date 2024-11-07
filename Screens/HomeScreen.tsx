import {EmitterSubscription, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BleManager, State} from 'react-native-ble-plx';
import SystemSetting from 'react-native-system-setting';

export const manager = new BleManager();

const serviceUUID = 'YOUR_SERVICE_UUID';

const characteristicUUID = 'YOUR_CHARACTERISTIC_UUID';

const HomeScreen = () => {

    console.log('damir')

    const [isLocationOn, setIsLocationOn] = useState(null)

    useEffect(() => {

        const stateChangeListener = manager.onStateChange(state => {

            console.log('onStateChange: ', state);

            if (state === State.PoweredOn) {

                scan()

            }

        });

        return () => {

            stateChangeListener?.remove();

        };

    }, [manager]);

    useEffect(() => {

        let locationSubscription: EmitterSubscription | null = null;

        const addLocationListener = async () => {

            try {

                const subscription = await SystemSetting.addLocationListener(data => {

                    console.log('Location: ', data);

                    setIsLocationOn(data);

                });

                locationSubscription = subscription;

            } catch (error) {

                console.error('Error adding location listener:', error);

            }

        };
        addLocationListener();

        const stopLocationListener = () => {

            if (locationSubscription) {

                console.log('Listener stoped');

                locationSubscription.remove();

                locationSubscription = null;

            }

        };

        return () => {

            stopLocationListener();

        };

    }, [isLocationOn]);

    const disconnectFromDevice = async () => {

        await manager

            .cancelDeviceConnection

            (
                deviceID).then(device => {

                console.log(' Disconnect success: ', device);

            }).catch(error => {

                console.log(' Disconnect Failed: ', error);

            })

    }

    const monitorCharateristicData = async () => {

        await manager.monitorCharacteristicForDevice(deviceID, serviceUUID, characteristicUUID).then(value => {

                console.log('Monitor success: ', value);

            }).catch(error => {

                console.log(' Monitor Failed: ', error);

            })

    }

    const writeWithoutResponse = async () => {

        await manager

            .writeCharacteristicWithoutResponseForDevice

            (
                deviceID, serviceUUID, characteristicUUID, valueBase64).then(value => {

                console.log('Write success: ', value);

            }).catch(error => {

                console.log('Write Failed: ', error);

            })

    }

    const writeCharacteristic = async () => {

        await manager

            .writeCharacteristicWithResponseForDevice(
                deviceID, serviceUUID, characteristicUUID, valueBase64).then(value => {

                console.log('Write success: ', value);

            }).catch(error => {

                console.log('Write Failed: ', error);

            })

    }

    const readCharacteristic = async () => {

        const readData = await manager.readCharacteristicForDevice(
            deviceID, serviceUUID, characteristicUUID).then(readData => {

            console.log("Data Read from the BLE device:", readData)

        }).catch(error => {

            console.log("Error while reading data from BLE device:", error)

        })

    }

    const connect = async () => {

        try {

            await manager.connectToDevice(deviceId).then(device => {

                console.log('Connected to device:', device.name);

                return device.discoverAllServicesAndCharacteristics();

            }).catch(error => {
                // Handle errors
            })

        } catch (error) {

            console.error('Error connecting to device:', error);

        }

    };

    function scan() {
        manager.startDeviceScan(null, null, (error, device) => {
            console.log(device)
            if (error) {
                // Handle error (scanning will be stopped automatically)
                return
            }

            // if (device.name === 'TI BLE Sensor Tag' || device.name === 'SensorTag') {
            //     // Stop scanning as it's not necessary if you are scanning for one device.
            //
            //     connect()
            //     manager.stopDeviceScan()
            //
            //     // Proceed with connection.
            // }
        })
    }


    return (
        <View style={styles.container}>
            <Text>Home</Text>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
