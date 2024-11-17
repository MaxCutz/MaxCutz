// Initialize EmailJS
emailjs.init("G1O4EV-Ao-9P6M7Tm");  // Replace with your EmailJS user ID

document.addEventListener('DOMContentLoaded', function () {
    const timeInput = document.getElementById("time");

    // Function to adjust the time picker to the allowed intervals based on the day and time
    function setTimeIntervals() {
        const now = new Date();
        const dayOfWeek = now.getDay(); // Get the current day (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
        const hours = now.getHours();
        const minutes = now.getMinutes();

        let startTime = new Date(now);
        let endTime = new Date(now);
        let formattedStartTime, formattedEndTime;

        // Check if it's a weekday (Monday to Friday)
        if (dayOfWeek >= 1 && dayOfWeek <= 5) {
            // Weekday hours: 15:30 to 18:00
            startTime.setHours(15, 30, 0); // Set the start time to 15:30
            endTime.setHours(18, 0, 0); // Set the end time to 18:00
        }
        // Check if it's a weekend (Saturday or Sunday)
        else if (dayOfWeek === 6 || dayOfWeek === 0) {
            // Weekend hours: 13:00 to 16:00
            startTime.setHours(13, 0, 0); // Set the start time to 13:00
            endTime.setHours(16, 0, 0); // Set the end time to 16:00
        }

        // Update the time input field with the available time range
        formattedStartTime = formatTime(startTime);
        formattedEndTime = formatTime(endTime);

        // Set the min and max attributes for the time input
        timeInput.setAttribute("min", formattedStartTime);
        timeInput.setAttribute("max", formattedEndTime);

        // Disable any time slots outside the allowed range (if the current time is beyond the allowed range)
        if (now > endTime) {
            // If the current time is later than the allowed end time, disable the time input
            timeInput.disabled = true;
        } else {
            // Enable the time input and set the allowed times
            timeInput.disabled = false;
        }
    }

    // Helper function to format the date to HH:mm (24-hour format)
    function formatTime(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        minutes = minutes < 10 ? "0" + minutes : minutes;
        return `${hours}:${minutes}`;
    }

    // Call the function to set the allowed time intervals when the page loads
    setTimeIntervals();

    // Handle form submission
    document.getElementById("bookingForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the page from reloading

        // Collect form values
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;

        // Create an object for the email data
        const emailParams = {
            name: name,
            email: email,
            date: date,
            time: time
        };

        // Send the form data using EmailJS
        emailjs.send("service_eo2bcls", "template_khs0oap", emailParams)
            .then(function (response) {
                console.log("SUCCESS", response);
                document.getElementById("confirmation").style.display = "block"; // Show confirmation message
                document.getElementById("bookingForm").reset(); // Reset the form
            }, function (error) {
                console.log("FAILED", error);
            });
    });
});
