import type {
    IDataObject,
    IExecuteFunctions,
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
    IHttpRequestOptions,
  } from 'n8n-workflow';
  import { NodeConnectionType } from 'n8n-workflow';
  
  interface Creds {
    baseUrl: string;
    apiKey: string;
  }
  
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
          displayOptions: { show: { resource: ['company'] } },
          options: [
            { name: 'Autocomplete', value: 'autocomplete', description: 'Search-as-you-type companies' },
            { name: 'Get Details', value: 'getDetails', description: 'Fetch a company by ID' },
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
          displayOptions: { show: { resource: ['company'], operation: ['getDetails'] } },
          default: '',
          description: 'The ID of the company to fetch',
        },
      ],
    };
  
    async execute(this: IExecuteFunctions) {
      const items = this.getInputData();
      const returnData: INodeExecutionData[] = [];
  
      const creds = (await this.getCredentials('openRegisterApi')) as unknown as Creds;
      const baseUrl = (creds.baseUrl || 'https://api.openregister.de').replace(/\/$/, '');
  
      const resource = this.getNodeParameter('resource', 0) as string;
      const operation = this.getNodeParameter('operation', 0) as string;
  
      for (let i = 0; i < items.length; i++) {
        const options: IHttpRequestOptions = { method: 'GET', url: '' };
  
        if (resource === 'company' && operation === 'autocomplete') {
          const query = this.getNodeParameter('query', i) as string;
          options.url = `${baseUrl}/v1/autocomplete/company`;
          options.qs = { query } as IDataObject;
        } else if (resource === 'company' && operation === 'getDetails') {
          const companyId = this.getNodeParameter('companyId', i) as string;
          options.url = `${baseUrl}/v1/company/${encodeURIComponent(companyId)}`;
        } else {
          throw new Error('Unknown resource/operation');
        }
  
        const responseData = await this.helpers.httpRequestWithAuthentication.call(
          this,
          'openRegisterApi',
          options,
        );
  
        if (resource === 'company' && operation === 'autocomplete') {
          const results = Array.isArray((responseData as IDataObject).results)
            ? ((responseData as IDataObject).results as IDataObject[])
            : ([] as IDataObject[]);
  
          for (const r of results) {
            returnData.push({ json: r });
          }
        } else {
          returnData.push({ json: responseData as IDataObject });
        }
      }
  
      return this.prepareOutputData(returnData);
    }
  }