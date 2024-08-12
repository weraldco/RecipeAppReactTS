import { Link } from 'react-router-dom';

export default function Card({ recipe }) {
	const { id, image_url, publisher, title } = recipe;

	return (
		<>
			<div
				key={id}
				className=" grid w-72 bg-white p-3 rounded-xl shadow-lg hover:scale-105 transition-all"
			>
				<div className=" h-44 mb-7">
					<img
						className="w-full h-full object-cover rounded-xl "
						src={image_url}
						alt=""
					/>
				</div>

				<div className="text-gray-700 text-sm">{publisher}</div>
				<div className="text-gray-700 text-lg font-bold">{title}</div>

				<Link
					className="text-sm bg-gray-700 text-white rounded-lg px-1 py-2 w-44 mt-5 cursor-pointer text-center hover:bg-blue-500 transition-all"
					to={`/recipe-item/${id}`}
				>
					RECIPE DETAILS
				</Link>
			</div>
		</>
	);
}
