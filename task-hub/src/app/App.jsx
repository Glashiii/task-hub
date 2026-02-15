import {BrowserRouter} from "react-router-dom";
import AppRouter from "./router/AppRouter.jsx";
import {AuthInit} from "./AuthInit.jsx";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <AuthInit />
                <AppRouter/>
            </BrowserRouter>
        </div>
    )
}

export default App
