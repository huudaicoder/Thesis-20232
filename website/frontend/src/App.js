import Layout from "./hocs/Layout";
import { BrowserRouter } from "react-router-dom";
import Routes from "./hocs/Routes";
import { Provider } from "react-redux";
import { store } from "./store/store";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Layout>
					<Routes />
				</Layout>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
