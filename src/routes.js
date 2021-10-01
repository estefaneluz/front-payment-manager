import { useState, useContext } from "react";
import { 
    BrowserRouter as Router, 
    Route, 
    Switch,
    Redirect 
} from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import { Backdrop, CircularProgress, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import { useStyles } from './styles/loading-material-ui';
import Main from './pages/Main';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from "./pages/Home";
import RegisterCostumer from "./pages/RegisterCustomer";

const ProtectedRoutes = (props) => {
    const { token } = useContext(AuthContext);
    return (
      <Route render={() => (token ? props.children : <Redirect to="/" />)} />
    );
};

function Routes() {
    const [token, setToken] = useState("");
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({});
    const styles = useStyles();

    const login = (value) => {
        setToken(value.token);
        setUser(value.userData);
    }
    const logout = () => setToken('');

    const clearAlert = () => setAlert({});

    const valueContext = {
        token, 
        login, 
        logout, 
        user, 
        setUser,
        setLoading,
        setAlert,
        clearAlert
    }

    return (
        <AuthContext.Provider value={valueContext}>
            <Router>
                <Switch>
                    <Route path="/" exact component={SignIn} />
                    <Route path="/sign-up" component={SignUp} />
                    <ProtectedRoutes>
                        <Main>
                            <Route path="/home" component={Home} />
                            <Route path="/customers" component={RegisterCostumer} />
                        </Main>
                    </ProtectedRoutes>
                </Switch>
            </Router>

            <Snackbar
                open={!!alert.message}
                autoHideDuration={4000}
                onClose={clearAlert}
            >
                <Alert onClose={clearAlert} severity={alert.type}>
                    {alert.message}
                </Alert>
            </Snackbar>

            <Backdrop
                className={styles.backdrop}
                open={loading}
                onClick={() => setLoading(false)}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </AuthContext.Provider>
    )
}

export default Routes;