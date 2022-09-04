import { Route, Switch } from "wouter";
import { CreateMovie } from "pages"

export function MoviesRoutes(){
    // for later when multyple routes in movies
    // return (
    //     <Switch>
    //         <Route path="/" component={AllOrders} />
    //     </Switch>
    // )
    return (
            <Route path="/movies/create" component={CreateMovie} />
    )
}