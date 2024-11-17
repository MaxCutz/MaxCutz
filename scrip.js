document.getElementById("bookingForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent page reload

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    // Check if all fields are filled
    if (name && email && date && time) {
        // Display a confirmation message
        document.getElementById("confirmation").style.display = "block";

        // (Optional) Log booking info to the console
        console.log(`Booking received: ${name}, ${email}, ${date}, ${time}`);

        // Reset the form
        document.getElementById("bookingForm").reset();
    } else {
        alert("Please fill in all the fields.");
    }
});
