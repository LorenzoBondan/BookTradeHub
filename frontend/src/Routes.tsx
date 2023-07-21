import Footer from "Components/Footer";
import TopNavbar from "Components/TopNavbar";
import Admin from "pages/Admin";
import Auth from "pages/Auth";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import { isAuthenticated } from "util/auth";
import history from "util/history";
import background from 'assets/images/background.png';
import Home from "pages/Home";
import Exchanges from "pages/Exchanges";
import DisponibleExchanges from "pages/DisponibleExchanges";
import Profile from "pages/Profile";

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
                        <Switch>
                            <Route path="/exchanges" exact>
                                <Exchanges/>
                            </Route>

                            <Route path="/disponibleExchanges" exact>
                                <DisponibleExchanges/>
                            </Route>

                            <Route path="/profile" exact>
                                <Profile/>
                            </Route>
                        </Switch>
                    )}
                </Switch>
            </div>
            <Footer/>
        </Router>
    );
}

export default Routes;