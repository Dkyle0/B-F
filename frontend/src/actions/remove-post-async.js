import { request } from '../components/utils';

export const removePostAsync = (id) => () => request(`/posts/${id}`, 'DELETE');
