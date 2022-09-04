import { Router } from "wouter";
import { HomeRoutes } from './home'
import { MoviesRoutes } from './movies'

export function AppRouter(){
    return (
        <Router>
            <HomeRoutes />
            <MoviesRoutes />
        </Router>
    )
}