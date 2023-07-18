import Footer from "Components/Footer";
import TopNavbar from "Components/TopNavbar";
import Admin from "pages/Admin";
import Auth from "pages/Auth";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import { isAuthenticated } from "util/auth";
import history from "util/history";
import background from 'assets/images/background.png';
import Home from "pages/Home";

const Routes = () => {

    return(
        <Router history={history}> 
            <div className="flex-direction-row" style={{backgroundImage: `url(${background})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
            }}>
                <TopNavbar/>

                <Switch>
                    {isAuthenticated() ? (
                        <Redirect from='/' to='/exchanges' exact />
                    ) : (
                        <Redirect from='/' to='/home' exact />
                    )}
                    
                    <Route path="/home" exact>
                        <Home/>
                    </Route>

                    <Redirect from='/auth' to='/auth/login' exact />
                    <Route path="/auth">
                        <Auth/>
                    </Route>

                    <Redirect from="/admin" to="/admin/users" exact />
                    <Route path="/admin">
                        <Admin/>
                    </Route>

                    {isAuthenticated() && (
                        <div className="flex-direction-column">
                            <Switch>
                                <Route path="/tasks" exact>

                                </Route>

                                <Route path="/tasks/:taskId" exact>

                                </Route>

                                <Route path="/create" exact>

                                </Route>

                                <Route path="/profile" exact>

                                </Route>

                                <Route path="/createGroup" exact>

                                </Route>
                            </Switch>
                        </div>
                    )}
                </Switch>
            </div>
            <Footer/>
        </Router>
    );
}

export default Routes;