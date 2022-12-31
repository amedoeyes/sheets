import { useReducer } from "react";

function useFormReducer<T>(initialStates: T) {
	enum Enum {
		CHANGE_VALUE = "CHANGE_VALUE",
	}

	type Action = {
		type: Enum;
		payload: { key: string; value: T[keyof T] };
	};

	const reducer = (state: T, action: Action) => {
		switch (action.type) {
			case Enum.CHANGE_VALUE:
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
			type: Enum.CHANGE_VALUE,
			payload: {
				key: key,
				value: value,
			},
		});

	return [state, setState] as const;
}

export default useFormReducer;
