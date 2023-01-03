import { useReducer } from "react";

function useFormReducer<T>(initialStates: T) {
	type Action = {
		type: string;
		payload: { key: string; value: T[keyof T] };
	};

	const reducer = (state: T, action: Action) => {
		switch (action.type) {
			case "update":
				return {
					...state,
					[action.payload.key]: action.payload.value,
				};
			default:
				return state;
		}
	};

	const [state, dispatch] = useReducer(reducer, initialStates);

	const setState = (key: string, value: T[keyof T]) =>
		dispatch({
			type: "update",
			payload: {
				key: key,
				value: value,
			},
		});

	return [state, setState] as const;
}

export default useFormReducer;
