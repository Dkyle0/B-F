const initPostsState = {};

export function postsReducer(state = initPostsState, action) {
	switch (action.type) {
		case 'initTodos':
			return { ...state, todos: action.payload, filtredTodos: action.payload };
		default:
			return state;
	}
}
