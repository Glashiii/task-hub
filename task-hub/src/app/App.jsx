import Sidebar from "../widgets/sidebar/Sidebar.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./router/AppRouter.jsx";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>
        </div>
    )
}

export default App
