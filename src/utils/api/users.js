import config from '../../config';
import {
    getIdToken,
    getUserId,
} from '../userAuth';

const API_DOMAIN = config.APIDomain;
const ENDPOINT = 'users';


export const getUser = async () => {
    try {
        const [token, userId] = await Promise.all([
            getIdToken(),
            getUserId(),
        ]);
        const response = await fetch(
            `${API_DOMAIN}/${ENDPOINT}/${userId}`,
            {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
            },
        );
        // const response = await fetch(
        //     `${API_DOMAIN}/${ENDPOINT}`,
        //     {
        //         method: 'GET',
        //         mode: 'cors',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             Authorization: token,
        //         },
        //     },
        // );
        console.log('response ' + response);
        if (response.status === 200) {

            const parsedResponse = await response.json();

            return parsedResponse;
        }

        throw response;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const updateUser = async (body) => {
    try {
        const token = await getIdToken();
        const userId = await getUserId();

        const response = await fetch(
            `${API_DOMAIN}/${ENDPOINT}/${userId}`,
            {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
                body: JSON.stringify(body),
            },
        );

        if (response.status === 200) {
            const parsedResponse = await response.json();
            return parsedResponse;
        }
        throw response;
    } catch (err) {
        console.error(err);
        throw err;
    }
};
