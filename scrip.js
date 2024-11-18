// Initialize EmailJS with your User ID
emailjs.init("YOUR_USER_ID"); // Replace with your actual EmailJS User ID

document.addEventListener("DOMContentLoaded", function () {
    const bookingForm = document.getElementById("bookingForm");

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

        // Send the email using EmailJS
        emailjs
            .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", emailData)
            .then(function (response) {
                console.log("SUCCESS!", response);
                // Show confirmation message
                const confirmationMessage = document.getElementById("confirmation");
                confirmationMessage.style.display = "block";
                // Reset the form
                bookingForm.reset();
            })
            .catch(function (error) {
                console.error("FAILED...", error);
                alert("Something went wrong. Please try again later.");
            });
    });
});
