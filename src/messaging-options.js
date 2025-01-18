export default {
    host: 'wss://mr-connection-ps0zcgv8ixw.messaging.solace.cloud:8443',
    username: 'solace-cloud-client',
    password: 'fh6eumcb0qaeq7imuoh2rcld62',
    clientId: 'myUniqueClientId',
    keepalive: 10,
    protocolId: 'MQTT',
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 10000,
    will: {
        topic: 'WillMsg',
        payload: 'Connection Closed abnormally..!',
        qos: 0,
        retain: false
    },
    rejectUnauthorized: false
};