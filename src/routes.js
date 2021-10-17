import { useState, useContext } from "react";
import { 
    BrowserRouter as Router, 
    Route, 
    Switch,
    Redirect 
} from "react-router-dom";
import { GlobalStatesContext } from "./contexts/GlobalStatesContext";
import { ReportsStatesContext } from './contexts/ReportsStatesContext';
import { OrderTableStatesContext } from "./contexts/OrderTableStatesContext";
import { Backdrop, CircularProgress, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import { useStyles } from './styles/loading-material-ui';
import Main from './pages/Main';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from "./pages/Home";
import RegisterClient from "./pages/RegisterClient";
import Client from "./pages/Client";
import Charges from "./pages/Charges";
import RegisterCharge from "./pages/RegisterCharge";
import Reports from './pages/Reports';

const ProtectedRoutes = (props) => {
    const { token } = useContext(GlobalStatesContext);
    return (
      <Route render={() => (token ? props.children : <Redirect to="/" />)} />
    );
};

function Routes() {
    const [token, setToken] = useState("");
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({});
    const [reportFilter, setReportFilter] = useState({page: '', status: ''});
    const [orderTable, setOrderTable] = useState('asc');
    
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

    const valueReport = { reportFilter, setReportFilter }

    const orderContextValue = { orderTable, setOrderTable }

    return (
        <GlobalStatesContext.Provider value={valueContext}>
            <Router>
                <Switch>
                    <Route path="/" exact component={SignIn} />
                    <Route path="/sign-up" component={SignUp} />
                    <ProtectedRoutes>
                        <Main>
                            <OrderTableStatesContext.Provider value={orderContextValue}>
                            <ReportsStatesContext.Provider value={valueReport}>
                                <Route path="/home" component={Home} />
                                <Route path="/reports" component={Reports}/>
                            </ReportsStatesContext.Provider>

                                <Route path="/clients" exact component={Client} />
                                <Route path="/charges" exact component={Charges} />
                            </OrderTableStatesContext.Provider>

                            <Route path="/clients/new" component={RegisterClient} />
                            <Route path="/charges/new" component={RegisterCharge} />
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
        </GlobalStatesContext.Provider>
    )
}

export default Routes;