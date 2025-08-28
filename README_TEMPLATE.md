# n8n-nodes-openregister

This is an n8n community node. It lets you use OpenRegister in your n8n workflows.

OpenRegister provides programmatic access to structured company registry data. See the official documentation at [docs.openregister.de](https://docs.openregister.de).

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.
[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Usage](#usage)  
[Resources](#resources)  
[Version history](#version-history)  

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

Package name (for local development): `n8n-nodes-openregister`.

## Operations

Resource: Company

- Search: Search-as-you-type companies. Endpoint: `/v1/autocomplete/company` (query param: `query`).
- Company Details: Fetch company details by ID. Endpoint: `/v1/company/{companyId}`.
- Company Financials: Fetch company financials by ID. Endpoint: `/v1/company/{companyId}/financials`.
- Company Owners: Fetch company owners by ID. Endpoint: `/v1/company/{companyId}/owners`.
- Company Holdings: Fetch companies this company holds stakes in. Endpoint: `/v1/company/{companyId}/holdings`.

## Credentials

This node uses API key authentication via an `Authorization: Bearer` header.

How to get an API key:

1. Create an account at `https://openregister.de` and sign in.
2. In your dashboard, open the API keys section and create a new API key.
3. Copy the key value. Keep it secure.

Details and up-to-date instructions: see [Authentication](https://docs.openregister.de/authentication).

In n8n, create credentials of type `OpenRegister API` and set:

- Base URL: `https://api.openregister.de` (default; override if needed)
- API Key: your generated key

Requests are sent with:

```
Authorization: Bearer YOUR_API_KEY
```

## Compatibility

- n8n Nodes API version: 1
- Node.js: >= 20.15

## Usage

- Search companies: Choose resource `Company` and operation `Search`, set "Company Name" (`query`). The node returns the `results` array from the API response.
- Get details/financials/owners/holdings: Use the `id` from a previous search as `Company ID`. For owners and holdings, the node flattens the `owners` and `holdings` arrays from the response.

If you're new to n8n, see [Try it out](https://docs.n8n.io/try-it-out/).

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [OpenRegister documentation](https://docs.openregister.de)
- [OpenRegister Authentication](https://docs.openregister.de/authentication)

## Version history

- 0.1.0: Initial release


