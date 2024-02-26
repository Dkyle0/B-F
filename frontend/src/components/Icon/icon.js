import styled from 'styled-components';
import PropTypes from 'prop-types';

const IconContainer = ({ className, id, onClick, ...props }) => (
	<div className={className} onClick={onClick} {...props}>
		<i className={`fa ${id}`} aria-hidden="true"></i>
	</div>
);

export const Icon = styled(IconContainer)`
	font-size: ${({ size = '24px' }) => size};
	margin: ${({ margin = '0' }) => margin};
	display: flex;
	color: ${({ disabled }) => (disabled ? '#ccc' : '#000')};
	&:hover {
		cursor: ${({ cursor = 'pointer' }) => cursor};
	}
`;

Icon.propTypes = {
	id: PropTypes.string.isRequired,
	onClick: PropTypes.func,
};
