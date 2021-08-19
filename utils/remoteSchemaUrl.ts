import axios from 'axios';

export async function getRemoteSchemaUrl() {
	let remoteSchemaUrl = '';
	const { data } = await axios.post(
		'https://mellw.hasura.app/v1/metadata',
		{
			type: 'export_metadata',
			args: {},
		},
		{
			headers: {
				'Content-Type': 'application/json',
				'x-hasura-admin-secret': 'rKpA@W3S2PlZsK',
			},
		}
	);
	console.log(data);
	if (data?.remote_schemas[0]?.definition?.url) {
		remoteSchemaUrl = ('' + data?.remote_schemas[0]?.definition?.url).replace(
			'/graphql',
			''
		);
	}
	// Convert http to https
	if (remoteSchemaUrl.includes('http://'))
		remoteSchemaUrl = remoteSchemaUrl.replace(
			'http://',
			'https://adyyagkqbq.cloudimg.io/v7/'
		);
	console.log('remoteSchemaUrl', remoteSchemaUrl);

	return remoteSchemaUrl;
}
