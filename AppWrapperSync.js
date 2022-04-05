import React, { useCallback, useRef, useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text } from 'react-native';
import colors from "./app/styles/colors";
import { buttonStyles } from './app/styles/button';
import { shadows } from './app/styles/shadows';

import { SYNC_CONFIG } from './sync.config';
import TaskRealmContext from './app/models/index';

import { LoginScreen, AuthState } from './app/components/LoginScreen';

import { App } from './App';

export const AppWrapperSync = () => {
    const { RealmProvider } = TaskRealmContext;

    const realmApp = useRef(new Realm.App({ id: SYNC_CONFIG.appId })).current;

    // Store the logged in user in state so that we know when to render the login screen and
    // when to render the app. This will be null the first time you start the app, but on future
    // startups, the logged in user will persist.
    const [user, setUser] = useState(realmApp.currentUser);

    const [authState, setAuthState] = useState(AuthState.None);
    const [authVisible, setAuthVisible] = useState(false);

    // If the user presses "login" from the auth screen, try to log them in
    // with the supplied credentials
    const handleLogin = useCallback(
        async (email, password) => {
            setAuthState(AuthState.Loading);
            const credentials = Realm.Credentials.emailPassword(email, password);

            try {
                setUser(await realmApp.logIn(credentials));
                setAuthVisible(false);
                setAuthState(AuthState.None);
            } catch (e) {
                console.log('handleLogin Error:', e);
                setAuthState(AuthState.LoginError);
            }
        },
        [setAuthState, setUser, setAuthVisible, realmApp],
    );

    // If the user presses "register" from the auth screen, try to register a
    // new account with the  supplied credentials and login as the newly created user
    const handleRegister = useCallback(
        async (email, password) => {
            setAuthState(AuthState.Loading);

            try {
                // Register the user...
                await realmApp.emailPasswordAuth.registerUser({ email, password });
                // ...then login with the newly created user
                const credentials = Realm.Credentials.emailPassword(email, password);

                setUser(await realmApp.logIn(credentials));
                setAuthVisible(false);
                setAuthState(AuthState.None);
            } catch (e) {
                console.log('handleRegister Error:', e);
                setAuthState(AuthState.RegisterError);
            }
        },
        [setAuthState, realmApp],
    );

    // If the user presses "logout", unset the user in state and log the user out
    // of the Realm app
    const handleLogout = useCallback(() => {
        setUser(null);
        realmApp.currentUser?.logOut();
    }, [setUser, realmApp]);

    // If we are not logged in show the login screen
    if (authVisible || !user || !realmApp.currentUser) {
        return (
            <LoginScreen
                onLogin={handleLogin}
                onRegister={handleRegister}
                authState={authState}
            />
        );
    }

    return (
        <SafeAreaView style={styles.screen}>
            <RealmProvider sync={{ user, partitionValue: user?.id, flexible: false }}>
                <App userId={realmApp.currentUser.id} />
                <Pressable style={styles.authButton} onPress={handleLogout}>
                    <Text style={styles.authButtonText}>
                        Logout {realmApp.currentUser.profile.email}
                    </Text>
                </Pressable>
            </RealmProvider>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.darkBlue,
    },
    authButton: {
        ...buttonStyles.button,
        ...shadows,
        backgroundColor: colors.purpleDark,
    },
    authButtonText: {
        ...buttonStyles.text,
    },
});

export default AppWrapperSync;