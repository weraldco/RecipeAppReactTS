import { useContext } from 'react';
import Card from '../components/Card';
import { GlobalContext } from '../components/context';

export default function Home() {
	const { searchParams, setSearchParams, handleSubmit, isLoading, recipeList } =
		useContext(GlobalContext);
	console.log(recipeList);
	return (
		<>
			<div>
				{isLoading ? (
					<div>Loading data</div>
				) : (
					<ul className="grid gap-4 grid-cols-3 ">
						{recipeList.map((recipe) => (
							<li key={recipe.id}>
								<Card recipe={recipe} />
							</li>
						))}
					</ul>
				)}
			</div>
		</>
	);
}
