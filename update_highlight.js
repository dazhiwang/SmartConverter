//metric
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector("#Highlight").addEventListener("change", highlight_handler);
});

function highlight_handler() {
    if(Highlight.checked){
        console.log("Highlight checked")
        localStorage.setItem("highlight", true);
        console.log(localStorage.getItem("highlight"))
        console.log(document.getElementById('Highlight').checked)
        document.getElementById('Highlight').checked=true
    }
    else{
        console.log("Highlight unchecked")
        localStorage.setItem("highlight", false);
        console.log(document.getElementById('Highlight').checked)
        document.getElementById('Highlight').checked=false
        
    }
}


