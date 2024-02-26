import { request } from '../components/utils';
import { setPostDataAsync } from './set-post-data';

export const loadPostAsync = (postId) => (dispatch) =>
	request(`/posts/${postId}`).then((postData) => {
		if (postData.data) {
			dispatch(setPostDataAsync(postData.data));
		}

		return postData;
	});
