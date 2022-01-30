import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfileScreen from './screens/ProfileScreen';
import HomeScreen from './screens/HomeScreen';
import Nav from './components/Nav';
import './styles/styles.css';

import {
	createTheme,
	ThemeProvider,
	responsiveFontSizes,
} from '@mui/material/styles';
import Lato from './assets/Lato-Regular.ttf';
let theme = createTheme({
	typography: {
		fontFamily: 'Lato',
	},
});
theme = responsiveFontSizes(theme);

function App() {
	return (
		<main>
			<Router>
				<ThemeProvider theme={theme}>
					<Nav />
					<Routes>
						<Route path='/' element={<HomeScreen />} />
						<Route path='/profile' element={<ProfileScreen />} />
					</Routes>
				</ThemeProvider>
			</Router>
		</main>
	);
}

export default App;
