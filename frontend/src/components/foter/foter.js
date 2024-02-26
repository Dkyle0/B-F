import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getWeather } from '../utils';

const FooterContainer = ({ className }) => {
	const [city, setCity] = useState('Москва');
	const [temperature, setTemperature] = useState('-5');
	const [wether, setWeather] = useState('облачно');

	useEffect(() => {
		getWeather('Moscow', 'ru')
			.then((data) => {
				if (data) {
					const { name, main, weather } = data;
					setCity(name);
					setTemperature(Math.round(main.temp));
					setWeather(weather[0].description);
				} else {
					console.log('Не удалось получить данные о погоде в Москве.');
				}
			})
			.catch((error) => console.error('Ошибка получения данных о погоде', error));
	}, []);

	const currentYear = new Date().toLocaleString('ru', {
		day: 'numeric',
		month: 'long',
	});
	return (
		<footer className={className}>
			<div>
				<div>Блог веб-разработчика</div>
				<div>web@developer.ru</div>
			</div>
			<div>
				<div>
					{city}, {currentYear}
				</div>
				<div>
					{temperature}°C, {wether}
				</div>
			</div>
		</footer>
	);
};

export const Footer = styled(FooterContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-weight: bold;
	width: 1000px;
	height: 120px;
	padding: 20px 40px;
	box-shadow: 0 2px 17px black;
	background-color: white;
`;
