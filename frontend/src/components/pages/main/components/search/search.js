import styled from 'styled-components';
import { Input } from '../../../../input/input';
import { Icon } from '../../../../Icon';
import PropTypes from 'prop-types';

const SearchContainer = ({ className, searchPhrase, onChange }) => {
	return (
		<div className={className}>
			<Input
				value={searchPhrase}
				placaholder="Поиск по заголовкам"
				onChange={onChange}
			/>
			<Icon id="fa-search" size="21px" cursor="auto" />
		</div>
	);
};

export const Search = styled(SearchContainer)`
	display: flex;
	position: relative;
	margin: 40px auto 0;
	height: 40px;
	width: 320px;

	& > input {
		padding: 10px 32px 10px 10px;
	}

	& div {
		position: absolute;
		right: 9px;
		top: 7px;
	}
`;

Search.propTypes = {
	searchPhrase: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};
