"use strict";

////////////////////////////////////////////////////////////
//
//  One explicit route. Any route have to extend this class 
//  to register in the router!
//
////////////////////////////////////////////////////////////


const app = document.getElementById("mainModel");

export default class Bash_Route{
    ////////////////////////////////////////////////////////
    // Any route needs a slug and a template name
    // The template name is the file name in the /templates-folder
    // Without the .tpl-extension!
    ////////////////////////////////////////////////////////
    constructor(slug, template) {
        this.slug = slug;
        this.template = template;
        
        window.addEventListener("templateChanged", this.listen.bind(this));
    }

    listen(e){
        if(e.detail.slug == this.slug)
        this.init();
    }

    ////// OVERWRITE init() IN THE ROUTE CLASS!!!!! ////// 
    init() {
        console.log("INITED");
    }

    ////// If this route is called, return true ///////
    isActive(){
        return (window.location.hash.substr(1).replace('#','') === this.slug);
    }

    ////// Render the template and translate the markups ///////
    renderMarkup(){
        if(typeof(this.template) === "function")
            app.innerHTML = this.template();
        else
            this.tpl();
    }


    tpl(){
        let slug = this.slug;
        /// Get the tpl-document and save it in 'markup'-variable ///
        $.get(window.bash.system.webRoot + window.bash.system.templatesPath + "/" + this.template + ".tpl", function(tpl){
            let markup = tpl,
            //// Words to translate are serrounded by <%>! ////
                open = /<%>/gi,
                result,
                // Array for open tags index
                indices_open = [],
                // Array for close tags index
                indices_close = [],
                even = true;

                while((result = open.exec(tpl))){
                    // if even == true its a open-tag, otherwise its a close-tag
                    even ? indices_open.push(result.index) : indices_close.push(result.index);
                    even = !even;
                }
                for(let i = 0; i < indices_close.length; i++) {
                    // get the translated word from bash-translator... //
                    let word = window.bash.t(tpl.substring(indices_open[i]+3, indices_close[i]));
                    // ...and replace the word in the template //
                    markup = markup.replace(tpl.substring(indices_open[i], indices_close[i]+3), word);
                }
                // If done, write the markup in the html-document...
                app.innerHTML = markup;
                // ...and call the "templateChanged"-Event
                window.dispatchEvent(new CustomEvent("templateChanged", {detail: {slug: slug}}));
        });
    }
}
