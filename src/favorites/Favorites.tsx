import { useContext } from 'react';
import Card from '../components/Card';
import { GlobalContext } from '../components/context';

export default function Favorites() {
	const { favoriteList, isLoading } = useContext(GlobalContext);
	return (
		<>
			<div>
				{isLoading ? (
					<div>Loading data</div>
				) : favoriteList && favoriteList.length > 0 ? (
					<ul className="grid gap-4 grid-cols-3 ">
						{favoriteList.map((favorite) => (
							<li key={favorite.id}>
								<Card recipe={favorite} />
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
