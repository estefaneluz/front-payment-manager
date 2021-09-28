import { useState, useContext } from "react";
import { 
    BrowserRouter as Router, 
    Route, 
    Switch,
    Redirect 
} from "react-router-dom";
import { AuthContext } from "./contexts/authContext";

import Main from './pages/Main';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from "./pages/Home";

const ProtectedRoutes = (props) => {
    const { token } = useContext(AuthContext);
    return (
      <Route render={() => (token ? props.children : <Redirect to="/" />)} />
    );
};

function Routes() {
    const [token, setToken] = useState("");

    const valueContext = {token, setToken}

    return (
        <AuthContext.Provider value={valueContext}>
            <Router>
                <Switch>
                    <Route path="/" exact component={SignIn} />
                    <Route path="/sign-up" component={SignUp} />
                    <ProtectedRoutes>
                        <Main>
                            <Route path="/home" component={Home} />
                        </Main>
                    </ProtectedRoutes>
                </Switch>
            </Router>
        </AuthContext.Provider>
    )
}

export default Routes;