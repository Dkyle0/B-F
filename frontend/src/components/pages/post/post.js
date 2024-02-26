import styled from 'styled-components';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PostContent, Comments } from './components';
import { useMatch, useParams } from 'react-router-dom';
import { RESET_POST_DATA, loadPostAsync } from '../../../actions';
import { selectPost } from '../../../selectors';
import { PostForm } from './post-form/post-form';
import { Error } from '../../error/error';
import { PrivatContent } from '../../content';
import { ROLE } from '../../../constants';

const PostConatainer = ({ className }) => {
	const [error, setError] = useState(null);
	const [isLoading, setisLoading] = useState(true);
	const dispatch = useDispatch();
	const post = useSelector(selectPost);
	const params = useParams();
	const isCreating = !!useMatch('/post');
	const isEditing = !!useMatch('/post/:id/edit');

	useLayoutEffect(() => {
		dispatch(RESET_POST_DATA);
	}, [dispatch, isCreating]);

	useEffect(() => {
		if (isCreating) {
			setisLoading(false);
			return;
		}

		dispatch(loadPostAsync(params.id)).then((postData) => {
			setError(postData.error);
			setisLoading(false);
		});
	}, [params.id, dispatch, isCreating]);

	if (isLoading) {
		return null;
	}

	const SpecificPostPage =
		isEditing || isCreating ? (
			<PrivatContent access={[ROLE.ADMIN]} serverError={error}>
				<div className={className}>
					<PostForm post={post} />
				</div>
			</PrivatContent>
		) : (
			<div>
				<div className={className}>
					<PostContent post={post} />
					<Comments comments={post.comments} postId={post.id} />
				</div>
			</div>
		);

	return error ? <Error error={error} /> : SpecificPostPage;
};

export const Post = styled(PostConatainer)`
	margin: 40px 0;
	padding: 0px 80px;
`;
