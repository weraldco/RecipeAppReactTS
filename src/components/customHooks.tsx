import { Context, useContext, useEffect, useState } from 'react';
import { ContextT } from './context';

export function useFetchData(givenUrl: string, context: Context<unknown>) {
	const { recipeDetailsData, setRecipeDetailsData } =
		useContext<ContextT>(context);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	async function fetchData(url: string) {
		try {
			setIsLoading(true);
			const response = await fetch(url);
			if (response.ok) {
				const data = await response.json();
				setRecipeDetailsData(data);
				setIsLoading(false);
				setError('');
			} else {
				setError('Error 404: Impossible to get the data of that item');
				setIsLoading(false);
			}
		} catch (error) {
			console.log(error);
			setError('Error 404: Cannot retrieved data');
			setIsLoading(false);
		}
	}
	useEffect(() => {
		fetchData(givenUrl);
	}, []);

	return { recipeDetailsData, isLoading, error };
	// return [data, error, isLoading];
}

function resolveType<T>(initialValue: T): T {
	return typeof initialValue === 'function' ? initialValue() : initialValue;
}

export function useLocalstorage<T>(key: string, defaultValue?: T) {
	const [value, setValue] = useState<T>(() => {
		const currentValue = localStorage.getItem(key);
		try {
			if (currentValue === undefined || currentValue === null) {
				return resolveType(defaultValue);
			} else {
				return JSON.parse(currentValue);
			}
		} catch (error) {
			console.error('Error: ', error);
			return resolveType(defaultValue);
		}
	});
	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);
	return [value, setValue] as const;
}
