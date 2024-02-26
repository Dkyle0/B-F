import styled from 'styled-components';
import { Button } from '../button';
import { useSelector } from 'react-redux';
import {
	selectModalIsOpen,
	selectModalText,
	selectModalonCencel,
	selectModalonConfirm,
} from '../../selectors';

const ModalContainer = ({ className }) => {
	const text = useSelector(selectModalText);
	const onConfirm = useSelector(selectModalonConfirm);
	const onCancel = useSelector(selectModalonCencel);
	const isOpen = useSelector(selectModalIsOpen);

	if (!isOpen) {
		return null;
	}

	return (
		<div className={className}>
			<div className="overlay"></div>
			<div className="box">
				<h3>{text}</h3>
				<div className="buttons">
					<Button onClick={onConfirm} width="120px">
						Да
					</Button>
					<Button onClick={onCancel} width="120px">
						Отмена
					</Button>
				</div>
			</div>
		</div>
	);
};

export const Modal = styled(ModalContainer)`
	position: fixed;
	z-index: 20;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;

	& .overlay {
		position: absolute;
		background-color: rgba(0, 0, 0, 0.7);
		width: 100%;
		height: 100%;
	}

	& .box {
		position: relative;
		margin: 0 auto;
		padding: 0 20px 20px;
		width: 400px;
		background-color: white;
		text-align: center;
		border: 3px solid black;
		z-index: 30;
		top: 50%;
		transform: translate(0, -50%);
	}

	& .buttons {
		display: flex;
		justify-content: center;
	}

	& .buttons button {
		margin: 0 5px;
	}
`;
