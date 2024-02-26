import styled from 'styled-components';
import { Button } from '../../../../button';
import PropTypes from 'prop-types';

const PaginationContainer = ({ className, page, lastPage = 1, setPage }) => {
	return (
		<div className={className}>
			<Button disabled={page === 1} onClick={() => setPage(1)}>
				В начало
			</Button>
			<Button
				disabled={page === 1}
				onClick={() => setPage(page === 1 ? 1 : page - 1)}
			>
				Предыдущая
			</Button>
			<div className="current-page">Страница: {page}</div>
			<Button
				disabled={page === lastPage}
				onClick={() => setPage(page === lastPage ? lastPage : page + 1)}
			>
				Следующая
			</Button>
			<Button disabled={page === lastPage} onClick={() => setPage(lastPage)}>
				В конец
			</Button>
		</div>
	);
};

export const Pagination = styled(PaginationContainer)`
	display: flex;
	justify-content: center;
	margin: 0 0 20px;
	padding: 0 35px;

	& button {
		margin: 0 5px;
	}

	& .current-page {
		font-size: 18px;
		font-weight: 500;
		margin: 0 5px;
		width: 100%;
		height: 32px;
		line-height: 26px;
		text-align: center;
		border: 1px solid black;
	}
`;

Pagination.propTypes = {
	page: PropTypes.number.isRequired,
	lastPage: PropTypes.number.isRequired,
	setPage: PropTypes.func.isRequired,
};
