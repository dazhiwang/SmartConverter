//metric
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector("#Highlight").addEventListener("change", highlight_handler);
});

function highlight_handler() {
    if(Highlight.check){
        localStorage.setItem("highlight", true);
    }
    else{
        localStorage.setItem("highlight", false);
    }
}
