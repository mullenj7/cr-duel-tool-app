import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
    fetchAuthSession,
    getCurrentUser
} from 'aws-amplify/auth'; import { UserContext } from './UserContext';
import { AppContext } from './AppContext';
import { getUser, updateUser } from '../utils/api/users'

function UsersProvider(props) {

    const [userDetails, setUserDetails] = useState({});


    useEffect(() => {
        //fetchUserDetails();
    }, []);

    const fetchUserDetails = async () => {
        try {
            const response = await getUser();
            if (response.errorMessage) {
                throw new Error(response.errorMessage);
            }
            console.log(response);
            setUserDetails(response.item);
        } catch (error) {
            console.error(error);
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
            await getCurrentUser();
            await fetchAuthSession();
            fetchUserDetails();
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <UserContext.Provider
            value={{
                userDetails, setUserDetails, fetchUserDetails,
                updateUserAttributes,
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
