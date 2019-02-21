
//Filter-state.
let filter_colors = {
    count : 0,
    White : false,
    Blue : false,
    Black : false,
    Red : false,
    Green : false,
    toggle : function(color) {
        this[color] = !this[color];
        return this[color];
    },
    colors : function() {
        let arr = [];
        if (this.White) arr.push("White");
        if (this.Blue) arr.push("Blue");
        if (this.Black) arr.push("Black");
        if (this.Red) arr.push("Red");
        if (this.Green) arr.push("Green");
        return arr;
    }
};

//Check if a card is castable with the colors in the colors-array.
function castable(card, colors) {
    var result = card.colors.filter(function(item){ return colors.indexOf(item) > -1});   
    var containsAll = (result.length == card.colors.length);  
    var containsAny = (result.length > 0);  

    return card.manaCost.includes("/") ? containsAny : containsAll; 

}

//Toggles the visibility of cards with the color of the button that was clicked.
function filter(button) {
    let toggled = filter_colors.toggle(button.id);
    button.className = (toggled) ? "toggled" : "";
    let colors = filter_colors.colors();
    let imgs = document.getElementsByTagName('img');

    let prev_id; //To remove split duplicates. Assumes cards are sorted.
    for (let img of imgs) {
        let id = img.card.multiverseid;
        if (id != prev_id && (castable(img.card, colors) || colors.length == 0)) {
            img.style.display =  "";
        } else {
            img.style.display =  "none";
        }
        prev_id = id;
    };
}

//Generates all card images.
function initialize() {
    let div = document.getElementById("cards");

    //Converts multiverseid to image url.
    let to_image = (id) => "./img/"+id+".png";

    let prev;
    cards.forEach( (card) => {
        var img = document.createElement("img");
        img.src = to_image(card.multiverseid);
        img.card = card;
        img.width = 170;
        if (prev && card.multiverseid == prev.multiverseid) img.style.display = "none";
        div.appendChild(img);
        prev = card;
    });
}


