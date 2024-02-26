const baseURL = 'https://api.openweathermap.org/data/2.5/';
const params = {
	APPID: '0b53e40528f8d3c52f4b23c77a7f134b',
	units: 'metric',
	lang: 'ru',
};

export const getWeather = async (city, countryCode) => {
	const url = `${baseURL}/weather?q=${city},${countryCode}&${new URLSearchParams(params).toString()}`;

	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error('Ошибка запроса данных о погоде: ' + response.statusText);
		}

		return await response.json();
	} catch (error) {
		console.error('Ошибка запроса данных о погоде:', error.message);
		throw error;
	}
};
