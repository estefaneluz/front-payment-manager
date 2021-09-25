import { 
    BrowserRouter as Router, 
    Route, 
    Switch 
} from "react-router-dom";

import Main from './pages/Main';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function Routes() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/sign-in" component={SignIn} />
                <Route path="/sign-up" component={SignUp} />
            </Switch>
        </Router>
    )
}

export default Routes;