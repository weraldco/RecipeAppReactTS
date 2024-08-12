import { createContext, ReactNode, useState } from 'react';
import { useNavigate } from 'react-router';
import { useLocalstorage } from './customHooks';

export const GlobalContext = createContext<ContextT>();

export type ContextT = {
	searchParams?: string;
	setSearchParams;
	handleSubmit: (e: Event) => void;
	isLoading?: boolean;
	recipeList?: RecipeT[];
	recipeDetailsData: RecipeT;
	setRecipeDetailsData;
	handleAddFavorite: (recipeDetailsData: RecipeT) => void;
	favoriteList?: FavoriteT[];
};
type GlobalStateProps = {
	children: ReactNode;
};

type IngridientsT = {
	quantity?: number;
	unit?: string;
	description?: string;
};

type RecipeT = {
	id?: string;
	title?: string;
	image_url?: string;
	publisher?: string;
	ingredients?: IngridientsT[];
};

export type FavoriteT = {
	id?: string;
	title?: string;
	image_url?: string;
	publisher?: string;
	ingredients?: IngridientsT[];
};

export default function GlobalState({ children }: GlobalStateProps) {
	const [searchParams, setSearchParams] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [recipeList, setRecipeList] = useState<[]>([]);
	const [recipeDetailsData, setRecipeDetailsData] = useState<RecipeT>();
	const [favoriteList, setFavoriteList] = useLocalstorage<FavoriteT[]>(
		'favorites',
		[]
	);

	const navigate = useNavigate();
	function handleAddFavorite(currentDetailsData: RecipeT) {
		const cpyFavoriteList = [...favoriteList];

		const index = cpyFavoriteList.findIndex(
			(item) => item.id === currentDetailsData.id
		);
		if (index === -1) {
			cpyFavoriteList.push(currentDetailsData);
		} else {
			cpyFavoriteList.splice(index);
		}
		setFavoriteList(cpyFavoriteList);
	}
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
				navigate('/');
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

	const contextValue: ContextT = {
		searchParams,
		setSearchParams,
		handleSubmit,
		isLoading,
		recipeList,
		recipeDetailsData,
		setRecipeDetailsData,
		handleAddFavorite,
		favoriteList,
	};
	return (
		<>
			<GlobalContext.Provider value={contextValue}>
				{children}
			</GlobalContext.Provider>
		</>
	);
}
