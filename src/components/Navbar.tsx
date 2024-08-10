import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { GlobalContext } from './context';

export default function Navbar() {
	const { searchParams, setSearchParams, handleSubmit, isLoading } =
		useContext(GlobalContext);
	console.log(searchParams);
	const apiKey = process.env.REACT_APP_API_URL;

	return (
		<>
			<div className="p-3 grid grid-cols-4 gap-2 items-center bg-slate-100">
				<span className="text-xl">
					<NavLink to="/">Food Recipe</NavLink>
				</span>
				<div className="col-span-2">
					<form onSubmit={handleSubmit}>
						<input
							className="px-3 py-2 rounded-full w-full"
							type="text"
							placeholder="Search any recipe.."
							value={searchParams}
							onChange={(e) => setSearchParams(e.target.value)}
						/>
					</form>
				</div>

				<div className="grid place-content-end">
					<ul className="flex grid-cols-2 text-xs  gap-1 text-center ">
						<li className=" rounded-full py-1 px-2 hover:bg-slate-200 active:bg-slate-300 cursor-pointer">
							<NavLink to="/">Home</NavLink>
						</li>
						<li className=" rounded-full py-1 px-2 hover:bg-slate-200 active:bg-slate-300 cursor-pointer ">
							<NavLink to="/favorites">Favorites</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
}
