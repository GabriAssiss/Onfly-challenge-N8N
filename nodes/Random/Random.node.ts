import type { IExecuteFunctions } from 'n8n-workflow';

import {
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
	IHttpRequestOptions
} from 'n8n-workflow';

//import { OptionsWithUri } from 'request';

export class Random implements INodeType {
	description: INodeTypeDescription = {
		// Basic node details will go here
		displayName: 'Random',
		name: 'random',
		icon: 'file:icon.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
		description: 'Get a random number between 2 parameters',
		defaults: {
			name: 'Random default',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		properties: [
			// Resources and operations will go here
			{
				displayName: 'Min',
				name: 'minNumber',
				type: 'number',
				default: 1,
				noDataExpression: true,
				required: true,
				description: 'Enter an integer value here',
			},
			{
				displayName: 'Max',
				name: 'maxNumber',
				type: 'number',
				default: 100,
				noDataExpression: true,
				required: true,
				description: 'Enter an integer value here',
			},

		],
	};
	// The execute method will go here
	/*async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		// Handle data coming from previous nodes




		const items = this.getInputData();
		let responseData;
		const returnData = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		// For each item, make an API call to create a contact
		for (let i = 0; i < items.length; i++) {
			if (resource === 'contact') {
				if (operation === 'create') {
					// Get email input
					const email = this.getNodeParameter('email', i) as string;
					// Get additional fields input
					const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
					const data: IDataObject = {
						email,
					};

					Object.assign(data, additionalFields);

					// Make HTTP request according to https://sendgrid.com/docs/api-reference/
					const options: OptionsWithUri = {
						headers: {
							Accept: 'application/json',
						},
						method: 'PUT',
						body: {
							contacts: [data],
						},
						uri: `https://api.sendgrid.com/v3/marketing/contacts`,
						json: true,
					};
					responseData = await this.helpers.requestWithAuthentication.call(
						this,
						'friendGridApi',
						options,
					);
					returnData.push(responseData);
				}
			}
		}
		// Map data to n8n data structure
		return [this.helpers.returnJsonArray(returnData)];
	}*/
}
