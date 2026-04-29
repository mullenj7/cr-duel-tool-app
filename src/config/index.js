import { clientpoolId, clientpoolClientId } from '../params';
import dev from './dev';

const configs = {
    Cognito: {
        // Amazon Cognito Region
        region: 'eu-west-1',
        // Amazon Cognito User Pool ID
        userPoolId: clientpoolId,
        // Amazon Cognito Web Client ID
        userPoolWebClientId: clientpoolClientId,

             // loginWith: { }
    },
}

const config = {
    ...configs,
    ...dev
}
export default config;
