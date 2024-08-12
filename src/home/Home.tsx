import { useContext } from 'react';
import Card from '../components/Card';
import { GlobalContext } from '../components/context';

export default function Home() {
	const { searchParams, setSearchParams, handleSubmit, isLoading, recipeList } =
		useContext(GlobalContext);
	return (
		<>
			<div>
				{isLoading ? (
					<div>Loading data</div>
				) : recipeList && recipeList.length > 0 ? (
					<ul className="grid gap-4 grid-cols-4 ">
						{recipeList.map((recipe) => (
							<li key={recipe.id}>
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
