const initUsersState = {};

export function usersReducer(state = initUsersState, action) {
	switch (action.type) {
		case 'initTodos':
			return { ...state, todos: action.payload, filtredTodos: action.payload };
		default:
			return state;
	}
}
