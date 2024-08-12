import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { GlobalContext } from '../components/context';
import RecipeDetails from '../components/RecipeDetails';
export default function Details() {
	const { recipeDetailsData, setRecipeDetailsData } = useContext(GlobalContext);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const { id } = useParams();

	async function fetchData(url: string) {
		setIsLoading(true);
		const response = await fetch(url);
		if (response.ok) {
			const data = await response.json();
			if (data) {
				setRecipeDetailsData(data.data.recipe);
			}

			setIsLoading(false);
		} else {
			setError('404: Cannot fetch the data from the server');
			setIsLoading(false);
		}
	}
	useEffect(() => {
		fetchData(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
	}, [id]);

	return (
		<>
			{isLoading ? (
				<div>Loading data..</div>
			) : (
				<div>
					<RecipeDetails id={id} />
				</div>
			)}
		</>
	);
}
