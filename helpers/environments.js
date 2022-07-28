/*
* Title: Environments
* Discription: Handle all environments variables
* Author: MD.Jahid Hasan
* Date: 27/07/2022
*
*/

// dependencies

// module - scaffoilding
const environments = {};

environments.staging = {
    port: 3000,
    envName: 'staging',
    hashSecretKey: 'uudkgssgogisyau',
};

environments.production = {
    port: 5000,
    envName: 'production',
    hashSecretKey: 'hifjsyatataayays',
};

// check environments

const currentEnvironment = typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV : 'staging';

// chose environments
const environmentToExport = typeof environments[currentEnvironment] === 'object' ? environments[currentEnvironment] : environments['staging'];

// export module
module.exports = environmentToExport;