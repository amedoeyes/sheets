import { useReducer } from "react";

export type Value = string | File;

export default function useFormReducer<T>(
	initialStates: Record<keyof T, { value: string; message: string }> & Object
) {
	type Action = {
		type: string;
		payload: {
			key: string;
			value: Value;
		};
	};

	const reducer = (state: typeof initialStates, action: Action) => {
		switch (action.type) {
			case "UPDATE_VALUE":
				return {
					...state,
					[action.payload.key]: {
						value: action.payload.value,
						message: "",
					},
				};
			case "UPDATE_MESSAGE":
				return {
					...state,
					[action.payload.key]: {
						...state[action.payload.key as keyof T],
						message: action.payload.value,
					},
				};
			default:
				return state;
		}
	};

	const [state, dispatch] = useReducer(reducer, initialStates);

	const setValueOf = (key: string, value: Value) =>
		dispatch({
			type: "UPDATE_VALUE",
			payload: {
				key: key,
				value: value,
			},
		});

	const setMessageOf = (key: string, message: string) =>
		dispatch({
			type: "UPDATE_MESSAGE",
			payload: {
				key: key,
				value: message,
			},
		});

	return { state, setValueOf, setMessageOf } as const;
}
