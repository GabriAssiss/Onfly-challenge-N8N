/* eslint-disable n8n-nodes-base/node-execute-block-wrong-error-thrown */
import type { IExecuteFunctions, IHttpRequestOptions } from 'n8n-workflow';

import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

export class Random implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Random',
		name: 'random',
		icon: 'file:icon.svg',
		group: ['transform'],
		version: 1,
		description: 'Get a random number between 2 parameters',
		defaults: {
			name: 'Random',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
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
			{
				displayName: 'True Random Number Generator',
				name: 'generateNumber',
				type: 'options',
				options: [
					{
						name: 'True Random Number Generator',
						value: 'generate',
						description: 'Randomize a number',
						action: 'Generate a number',
					},
				],
				default: 'generate',
				noDataExpression: true,
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		let responseData;
		const returnData = [];

		const operation = this.getNodeParameter('generateNumber', 0) as string;

		for (let i = 0; i < items.length; i++) {
			const minNumber = this.getNodeParameter('minNumber', i) as number;
			const maxNumber = this.getNodeParameter('maxNumber', i) as number;

			if (minNumber >= maxNumber) {
				throw new Error('Min number cannot be equal or higher than max number.');
			}

			if (!Number.isInteger(maxNumber) || !Number.isInteger(minNumber)) {
				throw new TypeError('The parameters must be Integer');
			}

			const url = `https://www.random.org/integers/?num=1&min=${minNumber}&max=${maxNumber}&col=1&base=10&format=plain&rnd=new`;

			if (operation === 'generateNumber') {
				const options: IHttpRequestOptions = {
					method: 'GET',
					url,
					headers: {
						Accept: 'application/json',
					},
				};
				responseData = await this.helpers.httpRequest(options);
				returnData.push(responseData);
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}
