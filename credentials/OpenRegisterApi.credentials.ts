import type { IAuthenticateGeneric, ICredentialTestRequest, ICredentialType, INodeProperties } from 'n8n-workflow';


export class OpenRegisterApi implements ICredentialType {
    name = 'openRegisterApi';
    displayName = 'OpenRegister API';
    documentationUrl = 'https://docs.openregister.de';
    properties: INodeProperties[] = [
        {
            displayName: 'API Base URL',
            name: 'baseUrl',
            type: 'string',
            default: 'https://api.openregister.de',
            required: true,
            description: 'Base URL of the OpenRegister API',
        },
        {
            displayName: 'API Key',
            name: 'apiKey',
            type: 'string',
            default: '',
            required: true,
            typeOptions: { password: true },
            description: 'Create an API key in OpenRegister and paste the key here',
        },
    ];


    authenticate: IAuthenticateGeneric = {
        type: 'generic',
        properties: {
            headers: {
                Authorization: '={{"Bearer " + $credentials.apiKey}}',
            },
        },
    };

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.openregister.de',
			url: '/v1/company/DE-HRB-F1103-267645',
            headers: {
                Authorization: '={{"Bearer " + $credentials.apiKey}}',
            },
            method: 'GET',
		},

    };
}