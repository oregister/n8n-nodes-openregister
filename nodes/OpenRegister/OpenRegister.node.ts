import type { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';

export class OpenRegister implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'OpenRegister',
    name: 'openRegister',
    icon: 'fa:building',
    group: ['transform'],
    version: 1,
    description: 'Interact with OpenRegister API (v1)',
    defaults: { name: 'OpenRegister' },
    inputs: [NodeConnectionType.Main],
    outputs: [NodeConnectionType.Main],
    credentials: [
      {
        name: 'openRegisterApi',
        required: true,
      },
    ],
    requestDefaults: {
      baseURL: '={{$credentials.baseUrl}}',
    },
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [{ name: 'Company', value: 'company' }],
        default: 'company',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: { show: { resource: ['company'] } },
        options: [
          {
            name: 'Autocomplete',
            value: 'autocomplete',
            action: 'Autocomplete company',
            description: 'Search-as-you-type companies',
            routing: {
              request: {
                method: 'GET',
                url: '=/v1/autocomplete/company',
                qs: {
                  query: '={{$parameter["query"]}}',
                },
              },
              output: {
                postReceive: [
                  {
                    type: 'rootProperty',
                    properties: {
                      property: 'results',
                    },
                  },
                ],
              },
            },
          },
          {
            name: 'Get Details',
            value: 'getDetails',
            action: 'Get company details',
            description: 'Fetch a company by ID',
            routing: {
              request: {
                method: 'GET',
                url: '={{"/v1/company/" + encodeURIComponent($parameter["companyId"])}}',
              },
            },
          },
          {
            name: 'Get Financials',
            value: 'getFinancials',
            action: 'Get company financials',
            description: 'Fetch company financials by ID',
            routing: {
              request: {
                method: 'GET',
                url: '={{"/v1/company/" + encodeURIComponent($parameter["companyId"]) + "/financials"}}',
              },
            },
          },
          {
            name: 'Get Owners',
            value: 'getOwners',
            action: 'Get company owners',
            description: 'Fetch company owners by ID',
            routing: {
              request: {
                method: 'GET',
                url: '={{"/v1/company/" + encodeURIComponent($parameter["companyId"]) + "/owners"}}',
              },
              output: {
                postReceive: [
                  {
                    type: 'rootProperty',
                    properties: {
                      property: 'owners',
                    },
                  },
                ],
              },
            },
          },
        ],
        default: 'autocomplete',
      },
      // Autocomplete fields
      {
        displayName: 'Query',
        name: 'query',
        type: 'string',
        required: true,
        displayOptions: { show: { resource: ['company'], operation: ['autocomplete'] } },
        default: '',
        description: 'Free-text query for company autocomplete',
      },
      // Details fields
      {
        displayName: 'Company ID',
        name: 'companyId',
        type: 'string',
        required: true,
        displayOptions: { show: { resource: ['company'], operation: ['getDetails', 'getFinancials', 'getOwners'] } },
        default: '',
        description: 'The ID of the company to fetch',
      },
    ],
  };
}
       