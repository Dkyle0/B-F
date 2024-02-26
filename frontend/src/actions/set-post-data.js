import { ACTION_TYPE } from './type';

export const setPostDataAsync = (postData) => ({
	type: ACTION_TYPE.SET_POST_DATA,
	payload: postData,
});
