import LaunchDarkly, { LDFlagSet } from 'launchdarkly-node-client-sdk'

const clientID = process.env.LAUNCH_DARKLY_CLIENT_ID || "INVALID_CLIENT_ID";
const getFeatureFlags = () => {
    const client = LaunchDarkly.initialize(clientID, { anonymous: true });
    return new Promise<LDFlagSet>((resolve, _reject) =>
        client.on('ready', () => resolve(client.allFlags()))
    );
};

export default getFeatureFlags;




