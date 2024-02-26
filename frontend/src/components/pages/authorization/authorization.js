import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '../../input/input';
import { Button } from '../../button/button';
import { H2 } from '../../h2';
import { setUser } from '../../../actions/';
import styled from 'styled-components';
import { selectUserRole } from '../../../selectors';
import { ROLE } from '../../../constants';
import { AuthFormError } from '../../auth-form-error/auth-form-error';
import { useResetForm } from '../../../hooks';
import { request } from '../../utils';

const authFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните поле с логином')
		.matches(/^\w+$/, 'Неверный логин. Допускаются только буквы и символы')
		.min(3, 'Неверный логин. Минимум 3 символа')
		.max(15, 'Неверный логин. Максимум 15 символов'),
	password: yup
		.string()
		.required('Заполните поле с паролем')
		.matches(
			/^[\w#%]+$/,
			'Допускаются только буквы, цифры, знаки "#", "%" и символы в пароле',
		)
		.min(6, 'Минимум 6 символов в поле ввода пароля')
		.max(30, 'Максимум 30 символов в поле ввода пароля'),
});

const AuthorizationContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	});

	const [serverError, setServerError] = useState(null);
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);

	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		request('/login', 'POST', { login, password }).then(({ error, user }) => {
			if (error) {
				setServerError(`Ошибка запроса. ${error}`);
				return;
			}

			dispatch(setUser(user));
			sessionStorage.setItem('userData', JSON.stringify(user));
		});
	};

	const formError = errors?.login?.message || errors?.password?.message;
	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<H2>Авторизации</H2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					placeholder="Логин..."
					{...register('login', { onChange: () => setServerError(null) })}
				/>
				<Input
					type="password"
					placeholder="Пароль..."
					{...register('password', { onChange: () => setServerError(null) })}
				/>
				<Button type="submit" disabled={!!formError}>
					Авторизации
				</Button>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
				<div className="registration">
					<Button>
						<Link to="/register">Регистрация</Link>
					</Button>
				</div>
			</form>
		</div>
	);
};

export const Authorization = styled(AuthorizationContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	& .registration {
		margin-top: 10px;
	}

	& > form {
		display: flex;
		flex-direction: column;
		width: 260px;
	}
`;
