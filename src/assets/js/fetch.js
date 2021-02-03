import Axios from 'axios';

export default (url = '', data = {}, type = 'GET') => {
	const newType = type.toUpperCase();
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: process.env.VUE_APP_API_TOKEN,
		},
		responseType: 'json',
	};
	const instance = Axios.create(config);
	let result;
	switch (newType) {
	case 'POST':
		result = instance.post(url, data);
		break;
	case 'GET':
		result = instance.get(url, {
			params: data,
		});
		break;
	case 'DELETE':
		result = instance.delete(url);
		break;
	default:
		break;
	}
	return result;
};
