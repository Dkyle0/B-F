import { request } from '../components/utils';
import { setPostDataAsync } from './set-post-data';

export const savePostAsync = (id, newPostData) => (dispatch) => {
	const seveRequest = id
		? request(`/posts/${id}`, 'PATCH', newPostData)
		: request('/posts', 'POST', newPostData);

	return seveRequest.then((updatedPost) => {
		dispatch(setPostDataAsync(updatedPost.data));

		return updatedPost.data;
	});
};
