import React, { useContext, useEffect, useState } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';
import {
    fetchAuthSession,
    getCurrentUser
} from 'aws-amplify/auth'; import { UserContext } from './UserContext';
import { AppContext } from './AppContext';
import { getUser, updateUser } from '../utils/api/users'
import { SliderTrack } from '@mui/material';

function UsersProvider(props) {
    const { loading, setLoading } = useContext(AppContext);
    const [userDetails, setUserDetails] = useState({});
    const [userSignedIn, setUserSignedIn] = useState(false);

    const handleSignInChange = async () => {
        if (userSignedIn === true) {
            await fetchUserDetails();
        }
        else { setUserDetails({}); }
        setLoading(false);
    };


    useEffect(() => {
        setLoading(true);
        checkUserDetails();
    }, []);


    useEffect(() => {
        handleSignInChange();
    }, [userSignedIn]);

    const checkUserDetails = async () => {
        try {
            const session = await fetchAuthSession({ forceRefresh: true });
            if (session.tokens) {// if user is signed in
                setUserSignedIn(true);
                //fetchUserDetails();
            } else setUserSignedIn(false);
        }
        catch (e) {
            console.log(e);
            setUserSignedIn(false);
            setLoading(false);
        }

    };

    const fetchUserDetails = async () => {
        try {
            const response = await getUser();
            if (response.errorMessage) {
                throw new Error(response.errorMessage);
            }
            setUserDetails(response);

        } catch (error) {
            console.error(error);

            throw new Error(error);
        }
        return null;
    };

    const updateUserAttributes = async (attributes) => {
        try {
            const response = await updateUser(attributes);
            console.log(response);
            if (response.errorMessage) {
                throw new Error(response.errorMessage);
            }
            // await getCurrentUser();
            // await fetchAuthSession();
            fetchUserDetails();
            return response;
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <UserContext.Provider
            value={{
                userDetails, setUserDetails, fetchUserDetails, checkUserDetails,
                updateUserAttributes, userSignedIn, setUserSignedIn
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
}

UsersProvider.propTypes = {
    appContext: PropTypes.object,
    children: PropTypes.node,
};

export default UsersProvider;
