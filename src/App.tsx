import { Route, Routes } from 'react-router';
import Navbar from './components/Navbar';
import Details from './details/Details';
import Favorites from './favorites/Favorites';
import Home from './home/Home';

function App() {
	return (
		<>
			<div>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/favorites" element={<Favorites />} />
					<Route path="/recipe-item/:id" element={<Details />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
