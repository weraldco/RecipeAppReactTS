import { createContext, ReactNode, useState } from 'react';

export const GlobalContext = createContext(null);

type GlobalStateProps = {
	children: ReactNode;
};

export default function GlobalState({ children }: GlobalStateProps) {
	const [searchParams, setSearchParams] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [recipeList, setRecipeList] = useState<[]>([]);

	async function handleSubmit(e: { preventDefault: () => void }) {
		e.preventDefault();

		try {
			const response = await fetch(
				`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParams}`
			);

			if (response.ok) {
				setIsLoading(true);
				const data = await response.json();

				setRecipeList(data?.data?.recipes);
				setIsLoading(false);
				setSearchParams('');
			} else {
				setError(`404: Cannot connect to server data.`);
				setIsLoading(false);
				setSearchParams('');
			}
		} catch (error) {
			console.log(error);
			setSearchParams('');
		}
	}
	return (
		<>
			<GlobalContext.Provider
				value={{
					searchParams,
					setSearchParams,
					handleSubmit,
					isLoading,
					recipeList,
				}}
			>
				{children}
			</GlobalContext.Provider>
		</>
	);
}
