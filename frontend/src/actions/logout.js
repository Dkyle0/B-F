import { request } from '../components/utils';
import { ACTION_TYPE } from './type';

export const logout = () => {
	request('/logout', 'POST');

	return {
		type: ACTION_TYPE.LOGOUT,
	};
};
