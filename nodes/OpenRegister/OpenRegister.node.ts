import type { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';

export class OpenRegister implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'OpenRegister',
    name: 'openRegister',
    icon: 'file:openregistersvg.svg',
    group: ['transform'],
    version: 1,
    description: 'Interact with the OpenRegister API',
    defaults: { name: 'OpenRegister' },
    inputs: [NodeConnectionType.Main],
    outputs: [NodeConnectionType.Main],
    usableAsTool: true,
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
            name: 'Get Company Details',
            value: 'companyDetails',
            action: 'Get company details',
            description: 'Fetch company details by ID',
            routing: {
              request: {
                method: 'GET',
                url: '={{"/v1/company/" + encodeURIComponent($parameter["companyId"])}}',
              },
            },
          },
          {
            name: 'Get Company Financials',
            value: 'companyFinancials',
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
            name: 'Get Company Holdings',
            value: 'companyHoldings',
            action: 'Get company holdings',
            description: 'Fetch companies this company holds stakes in',
            routing: {
              request: {
                method: 'GET',
                url: '={{"/v1/company/" + encodeURIComponent($parameter["companyId"]) + "/holdings"}}',
              },
              output: {
                postReceive: [
                  {
                    type: 'rootProperty',
                    properties: {
                      property: 'holdings',
                    },
                  },
                ],
              },
            },
          },
          {
            name: 'Get Company Owners',
            value: 'companyOwners',
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
          {
            name: 'Search for a Company',
            value: 'search',
            action: 'Get companies by name',
            description: 'Search companies by name',
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
        ],
        default: 'search',
      },
      // Autocomplete fields
      {
        displayName: 'Company Name',
        name: 'query',
        type: 'string',
        required: true,
        displayOptions: { show: { resource: ['company'], operation: ['search'] } },
        default: '',
        description: 'Search for a company by name',
      },
      // Details fields
      {
        displayName: 'Company ID',
        name: 'companyId',
        type: 'string',
        required: true,
        displayOptions: { show: { resource: ['company'], operation: ['companyDetails', 'companyFinancials', 'companyOwners', 'companyHoldings'] } },
        default: '',
        description: 'The ID of the company to fetch',
      },
    ],
  };
}
