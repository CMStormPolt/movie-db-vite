import { Route, Switch } from "wouter";
import { Home } from 'pages'

export function HomeRoutes(){
    return (
        // <Switch>
        //     <Route path="/" component={Home} />
        // </Switch>
        <Route path="/" component={Home} />
    )
}