# n8n-nodes-openregister

This package provides n8n community nodes to interact with the OpenRegister API from your workflows. See the official documentation at [docs.openregister.de](https://docs.openregister.de).

OpenRegister provides programmatic access to structured company registry data from the Handels- and Unternehmensregister. See what data exactly are available [here](https://docs.openregister.de/coverage).

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

- Search: Search companies by name. Endpoint: `/v1/autocomplete/company` (query param: `query`).
- Company Details: Fetch company details by company ID. Endpoint: `/v1/company/{companyId}`.
- Company Financials: Fetch company financials by company ID. Endpoint: `/v1/company/{companyId}/financials`.
- Company Owners: Fetch company owners by company ID. Endpoint: `/v1/company/{companyId}/owners`.
- Company Holdings: Fetch companies this company holds stakes in by company ID. Endpoint: `/v1/company/{companyId}/holdings`.

The company id is a unique identifier for a company in the OpenRegister database. You can get the company ID for a company in the results of the `Company Search` operation.

## Credentials

This node uses API key authentication via an `Authorization: Bearer` header.

How to get an API key:

1. Create an account at `https://openregister.de` and sign in.
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

- Search companies: Choose resource `Company` and operation `Search`, set "Company Name" (`query`). The node returns the `results` array of the matching companies.
- Get details/financials/owners/holdings: Use the `id` from a previous search as `Company ID`.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [OpenRegister Documentation](https://docs.openregister.de)
- [OpenRegister Authentication](https://docs.openregister.de/authentication)
- [OpenRegister Coverage](https://docs.openregister.de/coverage)

## Version history

- 0.1.0: Initial release
