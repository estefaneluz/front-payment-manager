import { 
    BrowserRouter as Router, 
    Route, 
    Switch 
} from "react-router-dom";

import Main from './pages/Main';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from "./pages/Home";

function Routes() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={SignIn} />
                <Route path="/sign-up" component={SignUp} />
                <Main>
                    <Route path="/home" component={Home} />
                </Main>
            </Switch>
        </Router>
    )
}

export default Routes;