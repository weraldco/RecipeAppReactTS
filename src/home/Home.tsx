import { useContext, useEffect, useState } from 'react';
import Card from '../components/Card';
import { GlobalContext } from '../components/context';

export default function Home() {
	const { recipeList, setRecipeList } = useContext(GlobalContext);
	const [isLoading, setIsLoading] = useState(false);

	async function fetchData(url: string) {
		setIsLoading(true);
		const response = await fetch(url);
		if (response.ok) {
			const data = await response.json();
			if (data) {
				setRecipeList(data.recipes);
			}
			setIsLoading(false);
		} else {
			// setError('404: Cannot fetch the data from the server');
			setIsLoading(false);
		}
	}
	useEffect(() => {
		fetchData(`https://forkify-api.herokuapp.com/api/search?q=pizza`);
	}, []);

	return (
		<>
			<div>
				{isLoading ? (
					<div>Loading data</div>
				) : recipeList && recipeList.length > 0 ? (
					<ul className="grid gap-4 grid-cols-4 ">
						{recipeList.map((recipe, i) => (
							<li key={i}>
								{/* <Card recipe={recipe} que={searchParams} /> */}
								<Card recipe={recipe} />
							</li>
						))}
					</ul>
				) : (
					<div className="grid place-content-center p-5 text-2xl font-bold">
						No data retrieved, please search first..
					</div>
				)}
			</div>
		</>
	);
}
