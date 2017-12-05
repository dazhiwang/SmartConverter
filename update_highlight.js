//metric
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector("Highlight").addEventListener("change", highlight_handler);
});

function highlight_handler() {
    if(Highlight.checked){
        console.log("Highlight checked")
        localStorage.setItem("highlight", true);
    }
    else{
        console.log("Highlight unchecked")
        localStorage.setItem("highlight", false);
    }
}
