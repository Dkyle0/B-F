import styled from 'styled-components';
import PropTypes from 'prop-types';

const tableRowContainer = ({ children, className }) => (
	<div className={className}>{children}</div>
);

export const TableRow = styled(tableRowContainer)`
	display: flex;
	align-items: center;
	border: ${({ border }) => (border ? '1px solid black' : 'none')};

	& > div {
		display: flex;
		padding: 0 10px;
	}

	& .login-column {
		width: 172px;
	}

	& .registred-at-column {
		width: 213px;
	}

	& .role-column {
		width: auto;
	}
`;

TableRow.propTypes = {
	children: PropTypes.node.isRequired,
};
