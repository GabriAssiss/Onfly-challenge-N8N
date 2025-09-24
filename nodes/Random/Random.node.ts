import type { IExecuteFunctions, IHttpRequestOptions } from 'n8n-workflow';

import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
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
				typeOptions: {
					maxValue: 1_000_000_000,
					minValue: -1_000_000_000,
					numberPrecision: 0,
				},
				description: 'Enter an integer value here',
			},
			{
				displayName: 'Max',
				name: 'maxNumber',
				type: 'number',
				default: 60,
				noDataExpression: true,
				required: true,
				typeOptions: {
					maxValue: 	1_000_000_000,
					minValue: -1_000_000_000,
					numberPrecision: 0,
				},
				description: 'Enter an integer value here',
			},
			{
				displayName: 'True Random Number Generator',
				name: 'generate',
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

		const operation = this.getNodeParameter('generate', 0) as string;

		for (let i = 0; i < items.length; i++) {
			const minNumber = this.getNodeParameter('minNumber', i) as number;
			const maxNumber = this.getNodeParameter('maxNumber', i) as number;

			if (minNumber >= maxNumber) {
				throw new NodeOperationError(
					this.getNode(),
					'Min number cannot be equal or higher than max number.',
				);
			}

			const url = `https://www.random.org/integers/?num=1&min=${minNumber}&max=${maxNumber}&col=1&base=10&format=plain&rnd=new`;

			if (operation === 'generate') {
				const options: IHttpRequestOptions = {
					method: 'GET',
					url,
				};

				responseData = await this.helpers.httpRequest(options);
				returnData.push(responseData);
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}
