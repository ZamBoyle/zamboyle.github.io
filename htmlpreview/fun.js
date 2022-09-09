document.addEventListener("DOMContentLoaded", function () {
    let imgUrl = "../assets/img/Sexyboy.png"
    let colors = ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark", "muted", "white"]
    let nb = 100;
    let previous = document.body;
    let padding = "p-2";
    for (let index = 0; index < colors.length; index++) {
        var element = document.createElement("div");
        element.className = padding + " mt-2 bg-" + colors[index];
        previous.appendChild(element);
        previous = element;
        setTimeout(function(){console.log("j'attends 1 seconde."+index)},1000);
        console.log((index+1)+". Hello");
        //delay(1000).then(() => console.log('ran after 1 second1 passed'));
    }
    let imgElement = document.createElement("img");
    imgElement.setAttribute("src", imgUrl);
    imgElement.className = "img-fluid w-100";
    previous.appendChild(imgElement);


    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }



});
