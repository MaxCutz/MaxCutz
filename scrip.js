// Initialize EmailJS with your Public Key
emailjs.init("user_G1O4EV-Ao-9P6M7Tm"); // Replace with your actual Public Key

document.addEventListener("DOMContentLoaded", function () {
    const bookingForm = document.getElementById("bookingForm");
    const thankYouModal = document.getElementById("thankYouModal");
    const closeBtn = document.querySelector(".close-btn");

    bookingForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission behavior

        // Collect form values
        const name = document.getElementById("name").value;
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;

        // Validate the date and time
        const selectedDate = new Date(date);
        const dayOfWeek = selectedDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
        const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

        // Define valid time ranges for weekdays and weekends
        const isValidTime =
            (isWeekday && time >= "15:30" && time <= "18:00") ||
            (isWeekend && time >= "13:00" && time <= "16:00");

        if (!isValidTime) {
            alert("Please choose a time within our working hours:\nWeekdays: 15:30 - 18:00\nWeekends: 13:00 - 16:00");
            return;
        }

        // Prepare the email data
        const emailData = {
            name: name,
            date: date,
            time: time,
        };

        // Show a loading indicator (optional)
        const submitButton = bookingForm.querySelector("button[type='submit']");
        submitButton.textContent = "Sending...";
        submitButton.disabled = true;

        // Send the email using EmailJS
        emailjs
            .send("service_9k5plsk", "template_khs0oap", emailData)
            .then(function (response) {
                console.log("SUCCESS!", response);

                // Show the custom thank you modal
                thankYouModal.style.display = "block";

                // Reset the form
                bookingForm.reset();

                // Reset the button text
                submitButton.textContent = "Book Now";
                submitButton.disabled = false;
            })
            .catch(function (error) {
                console.error("FAILED...", error);

                // Show an error message
                alert("Something went wrong. Please try again later.");

                // Reset the button text
                submitButton.textContent = "Book Now";
                submitButton.disabled = false;
            });
    });

    // Close the modal when the close button is clicked
    closeBtn.addEventListener("click", function () {
        thankYouModal.style.display = "none";
    });

    // Close the modal if the user clicks anywhere outside of the modal
    window.addEventListener("click", function (event) {
        if (event.target === thankYouModal) {
            thankYouModal.style.display = "none";
        }
    });
});
