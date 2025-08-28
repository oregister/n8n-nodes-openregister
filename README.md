# n8n-nodes-openregister

This package provides n8n community nodes to interact with the OpenRegister API from your workflows. See the official documentation at [docs.openregister.de](https://docs.openregister.de).

OpenRegister provides programmatic access to structured company registry data from official sources in Germany. See what data exactly are available [here](https://docs.openregister.de/coverage).

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Usage](#usage)  
[Resources](#resources)  
[Version history](#version-history)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation to add this package (`n8n-nodes-openregister`) to your n8n instance.

## Operations

Resource: Company

- **Search for a Company:** Search companies by name. Endpoint: `/v1/autocomplete/company` (query param: `query`).
- **Get Company Details:** Fetch company details by ID. Endpoint: `/v1/company/{companyId}`.
- **Get Company Financials:** Fetch company financials by ID. Endpoint: `/v1/company/{companyId}/financials`.
- **Get Company Owners:** Fetch company owners by ID. Endpoint: `/v1/company/{companyId}/owners`.
- **Get Company Holdings:** Fetch companies this company holds stakes in. Endpoint: `/v1/company/{companyId}/holdings`.

The company ID is a unique identifier for a company inside the OpenRegister ecosystem. You can get the company ID for a company in the results of the `Search for a Company` operation.

## Credentials

This node uses API key authentication via an `Authorization: Bearer` header.

How to get an API key:

1. Create an account at [openregister.de](https://openregister.de) and sign in.
2. In your dashboard, open the API keys section and create a new API key.
3. Copy the key value. Keep it secure.

Details and up-to-date instructions: see [Authentication](https://docs.openregister.de/authentication).

In n8n, create credentials of type `OpenRegister API` and set:

- Base URL: `https://api.openregister.de` (default)
- API Key: your generated key

Requests are sent with:

```
Authorization: Bearer YOUR_API_KEY
```

## Compatibility

- n8n Nodes API version: 1
- Node.js: >= 20.15

## Usage

- Search companies: Choose resource `Company` and operation `Search for a Company`, set "Company Name" (`query`). The node returns the `results` array of the matching companies.
- Get details/financials/owners/holdings: Use the `id` from a previous search as `Company ID`.

An example workflow doing exactly that is available [here](./examples/openregister-example-workflow.json).
To try it out, just add a company name as the search parameter in the first node and click _Execute Workflow_.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [OpenRegister Documentation](https://docs.openregister.de)
- [OpenRegister Authentication](https://docs.openregister.de/authentication)
- [OpenRegister Coverage](https://docs.openregister.de/coverage)
- [OpenRegister Example Workflow](./examples/openregister-example-workflow.json)

## Version history

- 0.1.0: Initial release
