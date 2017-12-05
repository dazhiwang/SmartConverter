//metric
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector("#Highlight").addEventListener("change", highlight_handler);
});

function highlight_handler() {
	console.dir(Highlight)
    if(Highlight.checked){
        localStorage.setItem("highlight", true);
        console.log("HIGHLIGHTING ON")

    }
    else{
    	console.log("HIGHLIGHTING OFF")
        localStorage.setItem("highlight", false);
    }
}


