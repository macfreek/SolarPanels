'use strict';

const Homey = require('homey');
const fetch = require('node-fetch');

const baseUrl = 'https://monitoringapi.solaredge.com/site/';

class SolarEdge extends Homey.Driver {
    onPair(socket) {
        socket.on('validate', (device, callback) => {
            const validationUrl = `${baseUrl}${device.data.sid}/overview?api_key=${device.data.key}&format=json`;
            this.log(validationUrl);

            fetch(validationUrl)
                .then(result => {
                    if (result.ok || result.status === 304) {
                        callback(true);
                    } else {
                        callback(Homey.__('login_error'));
                    }
                }).catch(error => {
                    callback(Homey.__('network_error'));
                });
        });
    }
}

module.exports = SolarEdge;