//metric
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector("#Highlight").addEventListener("change", highlight_handler);
});

function highlight_handler() {

    if(Highlight.checked){
        localStorage.setItem("highlight", true);
        document.getElementById('Highlight').checked=true
    }
    else{
        localStorage.setItem("highlight", false);
        document.getElementById('Highlight').checked=false
        
    }
}


