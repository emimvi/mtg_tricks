
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
        if (this.White) arr.push("W");
        if (this.Blue) arr.push("U");
        if (this.Black) arr.push("B");
        if (this.Red) arr.push("R");
        if (this.Green) arr.push("G");
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
function filter(button, color) {
    let toggled = filter_colors.toggle(color);
    button.className = (toggled) ? "toggled" : "";
    let colors = filter_colors.colors();
    let imgs = document.getElementsByTagName('img');

    //Variable used to remove split duplicates. Assumes cards are sorted.
    let prev_id; 

    for (let img of imgs) {
        let id = img.card.scryfallId;

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
    let to_image = (id) => "./m21/"+id+".jpg";

    let prev;
    window.cards.sort( (c1, c2) => {
        if (c1.convertedManaCost > c2.convertedManaCost)
            return 1;
        if (c1.convertedManaCost < c2.convertedManaCost)
            return -1;
        return 0;
    });
    window.cards.forEach( (card) => {
        var img = document.createElement("img");
        img.src = to_image(card.scryfallId);
        img.card = card;
        img.width = 170;
        div.appendChild(img);
        prev = card;
    });
}


