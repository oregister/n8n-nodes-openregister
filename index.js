import { OpenRegister } from './nodes/OpenRegister/OpenRegister.node';
import { OpenRegisterApi } from './credentials/OpenRegisterApi.credentials';


export const nodes = [new OpenRegister()];
export const credentials = [new OpenRegisterApi()];


// For CommonJS default export compatibility used by n8n loader
export default {
nodes,
credentials,
};