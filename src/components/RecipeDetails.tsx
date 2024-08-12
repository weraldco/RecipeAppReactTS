import { useContext } from 'react';
import { GlobalContext } from './context';

export default function RecipeDetails({ id }) {
	const {
		recipeDetailsData,
		setRecipeDetailsData,
		handleAddFavorite,
		favoriteList,
	} = useContext(GlobalContext);

	return (
		<>
			{recipeDetailsData !== undefined && (
				<div className=" grid grid-cols-2 p-5 gap-8">
					<div className=" h-4/5 rounded-xl">
						{/* Image */}
						<img
							className="w-full h-2/3 object-cover rounded-xl"
							src={recipeDetailsData.image_url}
							alt=""
						/>
					</div>
					<div className="grid place-content-start">
						{/* Title */}
						<div className="text-2xl font-bold">{recipeDetailsData.title}</div>
						{/* Publisher */}
						<div className="text-sm text-blue-400 mb-5">
							by {recipeDetailsData.publisher}
						</div>
						{favoriteList &&
						favoriteList.length > 0 &&
						favoriteList.findIndex((item) => item.id === id) !== -1 ? (
							<button
								className="mb-5 p-2 bg-gray-500 text-white rounded-xl hover:bg-blue-300"
								onClick={() => handleAddFavorite(recipeDetailsData)}
							>
								Remove from Favorites
							</button>
						) : (
							<button
								className="mb-5 p-2 bg-gray-800 text-white rounded-xl hover:bg-blue-500"
								onClick={() => handleAddFavorite(recipeDetailsData)}
							>
								Add to Favorites
							</button>
						)}

						<div>
							<span className="italic">Ingridients:</span>
							<ul className="grid place-content-start gap-2">
								{recipeDetailsData.ingredients?.map((item, index) => (
									<li key={index}>
										{item.quantity} {item.unit} {item.description}
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
