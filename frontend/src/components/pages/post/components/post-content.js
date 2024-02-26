import styled from 'styled-components';
import { H2 } from '../../../h2';
import { SpecialPanel } from './components/special-panel';
import { Icon } from '../../../Icon';
import { useNavigate } from 'react-router-dom';
import { PROP_TYPE } from '../../../../constants';

const EditButton = () => (
	<Icon id="fa-pencil-square-o" margin="5px 0 0 10px" size="21px" />
);

const PostContentContainer = ({
	className,
	post: { id, title, imageUrl, content, publishedAt },
}) => {
	const navigate = useNavigate();
	const onEdit = () => navigate(`/post/${id}/edit`);
	return (
		<div className={className}>
			<img src={imageUrl} alt={title} />
			<H2>{title}</H2>
			<SpecialPanel
				id={id}
				publishedAt={publishedAt}
				margin="-20px 0 20px"
				EditButton={EditButton}
				onEdit={onEdit}
			/>
			<div className="post-text">{content}</div>
		</div>
	);
};

export const PostContent = styled(PostContentContainer)`
	& img {
		float: left;
		width: 280px;
		height: 150px;
		margin: 0 20px 10px 0;
	}

	& .post-text {
		font-size: 18px;
		white-space: pre-line;
	}
`;

PostContent.propTypes = {
	post: PROP_TYPE.POST,
};
