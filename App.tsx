/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import './gesture-handler';
import {useLayoutEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';
import AppNavigator from './Navigation/AppNavigator';

function App(): JSX.Element {
    const navigationRef = useRef(null);

    useLayoutEffect(() => {
        if (navigationRef?.current) {
            // NavigationService.setTopLevelNavigator(navigationRef.current);
        }
    }, [navigationRef]);

    return (
        // eslint-disable-next-line react/react-in-jsx-scope
                <View style={styles.container}>
                    <NavigationContainer ref={navigationRef}>
                        <AppNavigator/>
                    </NavigationContainer>
                </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default App;
