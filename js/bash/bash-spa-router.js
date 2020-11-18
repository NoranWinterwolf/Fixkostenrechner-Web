"use strict";

////////////////////////////////////////////////////////////
//
//  Roter search the active route an call to render it
//
////////////////////////////////////////////////////////////

export default class Bash_SPA_Router{
    constructor(routes){
        this.routes = routes;
        this.route404 = undefined;
        this.homeRoute = this.routes[0];
        this.init();
    }

    init(){
        window.removeEventListener('hashchange', this.hasChanged);
        window.addEventListener('hashchange', this.hasChanged.bind(this));

        this.hasChanged();
    }

    hasChanged(){
        if(window.location.hash.length > 2){
            for(const route of this.routes){
                if(route.isActive()){
                    this.goToRoute(route);
                    return;
                }
            }
            if(this.route404)
                window.location.hash = this.route404.slug;
            else {
                console.log("No 404 page found. Redirect to homeRoute!")
                window.location.hash = this.homeRoute.slug;
            }
        }
        else {
            window.location.hash = this.homeRoute.slug;
            this.goToRoute(this.homeRoute);
        }
    }

    goToRoute(route){
        route.renderMarkup();
    }
}