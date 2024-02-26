import styled from 'styled-components';
import { Icon } from '../../../../Icon';
import { TableRow } from '../table-row/table-row';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { PROP_TYPE } from '../../../../../constants';
import { request } from '../../../../utils';

const UserRowContainer = ({
	className,
	id,
	login,
	registredAt,
	userRoleId,
	roles,
	onUserRemove,
}) => {
	const [initialRoleId, setInitialRoleId] = useState(userRoleId);
	const [selectedRoleId, setSelectedRoleId] = useState(userRoleId);

	const onRoleChange = ({ target }) => {
		setSelectedRoleId(Number(target.value));
	};

	const onRoleSave = (id, newUserRoleId) => {
		request(`/users/${id}`, 'PATCH', { roleId: newUserRoleId }).then(() => {
			setInitialRoleId(newUserRoleId);
		});
	};

	const isSaveButtonDisabled = selectedRoleId === initialRoleId;

	return (
		<div className={className}>
			<TableRow border={true}>
				<div className="login-column">{login}</div>
				<div className="registred-at-column">{registredAt}</div>
				<div>
					<select value={selectedRoleId} onChange={onRoleChange}>
						{roles.map(({ id: roleId, name: roleName }) => {
							return (
								<option value={roleId} key={roleId}>
									{roleName}
								</option>
							);
						})}
					</select>
					<div
						className="save-role-button"
						onClick={() => onRoleSave(id, selectedRoleId)}
					>
						<Icon
							id="fa-floppy-o"
							margin="3px 0 0 6px"
							disabled={isSaveButtonDisabled}
						/>
					</div>
					<div />
				</div>
			</TableRow>
			<div className="del-icon" onClick={onUserRemove}>
				<Icon id="fa-trash-o" margin="3px 0 0 6px" />
			</div>
		</div>
	);
};

export const UserRow = styled(UserRowContainer)`
	display: flex;
	margin-top: 10px;

	& select {
		font-size: 16px;
		padding: 0 0 0 5px;
	}

	& .save-role-button {
		width: 21px;
		height: 32px;
	}
`;

UserRow.propTypes = {
	className: PropTypes.string,
	id: PropTypes.string.isRequired,
	login: PropTypes.string.isRequired,
	registredAt: PropTypes.string.isRequired,
	userRoleId: PROP_TYPE.ROLE_ID.isRequired,
	roles: PropTypes.arrayOf(PROP_TYPE.ROLE),
	onUserRemove: PropTypes.func.isRequired,
};
