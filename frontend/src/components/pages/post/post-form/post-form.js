import styled from 'styled-components';
import { Input } from '../../../input/input';
import { SpecialPanel } from '../components/components/special-panel';
import { Icon } from '../../../Icon';
import { useLayoutEffect, useRef, useState } from 'react';
import { sanitizeContent } from './utils/sanitize-content';
import { useDispatch } from 'react-redux';
import { savePostAsync } from '../../../../actions';
import { useNavigate } from 'react-router-dom';
import { PROP_TYPE } from '../../../../constants';

const EditButton = () => <Icon id="fa-floppy-o" margin="0 0 0 10px" size="21px" />;

const PostFormContainer = ({
	className,
	post: { id, title, imageUrl, content, publishedAt },
}) => {
	const [imageField, setImageField] = useState(imageUrl);
	const [titleField, setTitleField] = useState(title);
	const contentRef = useRef(null);

	useLayoutEffect(() => {
		setImageField(imageUrl);
		setTitleField(title);
	}, [imageUrl, title]);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onImageChange = ({ target }) => setImageField(target.value);
	const onTitleChange = ({ target }) => setTitleField(target.value);

	const onSave = () => {
		const newContent = sanitizeContent(contentRef.current.innerHTML);

		dispatch(
			savePostAsync(id, {
				imageUrl: imageField,
				title: titleField,
				content: newContent,
			}),
		).then(({ id }) => {
			navigate(`/post/${id}`);
		});
	};

	return (
		<div className={className}>
			<Input
				value={imageField}
				placeholder="Изображение..."
				onChange={onImageChange}
			/>
			<Input
				value={titleField}
				placeholder="Заголовок..."
				onChange={onTitleChange}
			/>
			<SpecialPanel
				id={id}
				publishedAt={publishedAt}
				margin="20px 0"
				EditButton={EditButton}
				onEdit={onSave}
			/>
			<div
				ref={contentRef}
				className="post-text"
				contentEditable={true}
				suppressContentEditableWarning={true}
				placeholder="Статья..."
			>
				{content}
			</div>
		</div>
	);
};

export const PostForm = styled(PostFormContainer)`
	& .post-text {
		min-height: 80px;
		border: 1px solid black;
		font-size: 18px;
		white-space: pre-line;
	}
`;

PostForm.propTypes = {
	post: PROP_TYPE.POST.isRequired,
};
