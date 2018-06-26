
//Show Winner Modal


function showWin() {



    var modal = document.getElementById('winModal');


    var content = document.getElementById('winContent');


    var starPanel = document.createElement("div");


    for (let i=0; i<= game.stars; i++){
        if (i>0){
        const starImage = document.createElement("img");
        starImage.src = "images/Star.png";
        starPanel.appendChild(starImage);
        }
    }

    content.appendChild(starPanel);

    var closeBar = document.getElementsByClassName("close")[0];

    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    closeBar.onclick = function() {
    modal.style.display = "none";
    startOver();
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }


    }


}

function startOver() {
    location.reload();
}



/* Update timer display */
function updateDisplay() {
    let value = parseInt($('#timer').find('.value').text(), 10);
    value++;
    $('#timer').find('.value').text(value);
}
