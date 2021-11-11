import LaunchDarkly, { LDFlagSet } from 'launchdarkly-node-client-sdk'

const clientID = "6189fac3837cea15252a40e7";

const getFeatureFlags = () => {
    const client = LaunchDarkly.initialize(clientID, { anonymous: true });
    return new Promise<LDFlagSet>((resolve, _reject) =>
        client.on('ready', () => resolve(client.allFlags()))
    );
};

export default getFeatureFlags;




