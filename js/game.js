

//Show Winner Modal

function showWin() {
	var modal = document.getElementById('winModal');

	var span = document.getElementsByClassName("close")[0];

	modal.style.display = "block";

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
    modal.style.display = "none";
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
