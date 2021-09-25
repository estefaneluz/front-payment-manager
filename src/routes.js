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
                <Route path="/" exact component={SignIn} />
                <Route path="/sign-up" component={SignUp} />
                <Route path="/home" component={Main} />
            </Switch>
        </Router>
    )
}

export default Routes;