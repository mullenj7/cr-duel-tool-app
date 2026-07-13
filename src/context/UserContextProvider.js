import React, { useContext, useEffect, useState } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';
import {
    fetchAuthSession,
    getCurrentUser
} from 'aws-amplify/auth'; import { UserContext } from './UserContext';
import { AppContext } from './AppContext';
import { getUser, updateUser } from '../utils/api/users'

function UsersProvider(props) {
    const { loading, setLoading } = useContext(AppContext);
    const [userDetails, setUserDetails] = useState({});
    const [userSignedIn, setUserSignedIn] = useState(false);


    useEffect(() => {
        checkUserDetails();
    }, []);

    const checkUserDetails = async () => {
        console.log('ceck');
        const session = await fetchAuthSession();
        if (session.tokens) {// if user is signed in
            console.log('setting t');
            setUserSignedIn(true);
            fetchUserDetails();
        } else setUserSignedIn(false);             console.log('setting f');

    };

    const fetchUserDetails = async () => {
        try {
            setLoading(true);
            const response = await getUser();
            if (response.errorMessage) {
                setLoading(false);

                throw new Error(response.errorMessage);
            }
            setUserDetails(response);
            setLoading(false);

        } catch (error) {
            console.error(error);
            setLoading(false);

            throw new Error(error);
        }
        return null;
    };

    const updateUserAttributes = async (attributes) => {
        try {
            const response = await updateUser(attributes);
            if (response.errorMessage) {
                throw new Error(response.errorMessage);
            }
            // await getCurrentUser();
            // await fetchAuthSession();
            // fetchUserDetails();
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <UserContext.Provider
            value={{
                userDetails, setUserDetails, fetchUserDetails,checkUserDetails,
                updateUserAttributes,userSignedIn, setUserSignedIn
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
