import useFormReducer from "./useFormReducer";

function useFormValidity<T>(initialStates: T) {
	const [state, dispatch, Enum] = useFormReducer(initialStates);

	const setState = (id: string, error: T[keyof T]) => {
		dispatch({
			type: Enum.CHANGE_VALUE,
			payload: {
				key: id,
				value: error,
			},
		});
	};

	return [state, setState] as const;
}

export default useFormValidity;
