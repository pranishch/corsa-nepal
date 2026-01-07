// Updated validation function
function generateLeadFromPlanYourTrip() {
    var tripName = document.getElementById("tripName");
    var tripNationality = document.getElementById("tripNationality");
    var tripEmail = document.getElementById("tripEmail");
    var tripMobile = document.getElementById("tripMobile");
    var tripMessage = document.getElementById("tripMessage");
    
    var nameValue = tripName.value.trim();
    var nationalityValue = tripNationality.value.trim();
    var emailValue = tripEmail.value.trim();
    var mobileValue = tripMobile.value.trim();
    var messageValue = tripMessage.value.trim();
    
    var isValid = true;
    
    // Reset all styles first
    resetFieldStyles(tripName);
    resetFieldStyles(tripNationality);
    resetFieldStyles(tripEmail);
    resetFieldStyles(tripMobile);
    resetFieldStyles(tripMessage);
    
    // Validate name
    if (nameValue === "") {
        markFieldInvalid(tripName, "Enter your name");
        isValid = false;
    }

    // Validate Nationalit
    if (nationalityValue === "") {
        markFieldInvalid(tripNationality, "Enter your Nationality");
        isValid = false;
    }
    
    // Validate email
    var atpos = emailValue.indexOf("@");
    var dotpos = emailValue.lastIndexOf(".");
    if (emailValue === "") {
        markFieldInvalid(tripEmail, "Enter your email");
        isValid = false;
    } else if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= emailValue.length) {
        markFieldInvalid(tripEmail, "Enter valid email");
        tripEmail.value = "";
        isValid = false;
    }
    
    // Validate mobile
    if (mobileValue === "") {
        markFieldInvalid(tripMobile, "Enter your mobile");
        isValid = false;
    } else if (!/^\d{10,15}$/.test(mobileValue)) {
        markFieldInvalid(tripMobile, "Enter valid mobile");
        tripMobile.value = "";
        isValid = false;
    }
    
    // Validate message
    if (messageValue === "") {
        markFieldInvalid(tripMessage, "Enter your message");
        isValid = false;
    }
    
    if (isValid) {

        // var request = new XMLHttpRequest();
        var url = 'https://www.corsanepaladventure.com/';
        url += "generate-Lead-From-Plan-Your-Trip.php?tripName=" + encodeURIComponent(nameValue) +
            "&tripNationality=" + encodeURIComponent(nationalityValue) +
            "&tripEmail=" + encodeURIComponent(emailValue) +
            "&tripMobile=" + encodeURIComponent(mobileValue) +
            "&tripMessage=" + encodeURIComponent(messageValue);
        // alert(url);
        request.open('GET', url, true);
        request.onreadystatechange = generateLeadFromPlanYourTripResponse;
        request.send(null);

        // var request = new XMLHttpRequest();
        // var url = 'https://www.corsanepaladventure.com/';
        // url += "generate-Lead-From-Plan-Your-Trip.php?tripName=" + encodeURIComponent(nameValue) +
        //        "&tripEmail=" + encodeURIComponent(emailValue) +
        //        "&tripMobile=" + encodeURIComponent(mobileValue) +
        //        "&tripMessage=" + encodeURIComponent(messageValue);

        // request.open('GET', url, true);
        // request.onreadystatechange = function() {
        //     if (request.readyState == 4) {
        //         if (request.status == 200) {
        //             console.log("Response:", request.responseText);
        //             document.getElementById("planTripMsg").innerHTML = "Thank you! We'll contact you soon.";
        //             document.getElementById("planTripForm").reset();
        //             setTimeout(function() {
        //                 document.getElementById("planTripModal").style.display = "none";
        //             }, 2000);
        //         } else {
        //             console.error("Error:", request.status, request.statusText);
        //             document.getElementById("planTripMsg").innerHTML = "Error submitting form. Please try again.";
        //         }
        //     }
        // };
        // request.send(null);
        
        // // Prevent form submission
        // return false;
    }
    return false;
}

function generateLeadFromPlanYourTripResponse() {
    if (request.readyState == 4) {
		// alert(request.readyState+" "+request.status);
        if (request.status == 200) {
            var xmlResponse = request.responseText;
            var resPatt = new RegExp("ER", "g");
            var numOcc = resPatt.exec(xmlResponse);
			// alert(request.readyState+" "+request.status);
            if (numOcc == null) {
                document.getElementById("planTripMsg").innerHTML = xmlResponse;
                document.getElementById("tripName").value = '';
                document.getElementById("tripNationality").value = '';
                document.getElementById("tripEmail").value = '';
                document.getElementById("tripMobile").value = '';
                document.getElementById("tripMessage").value = '';
            } else {
                document.getElementById("planTripMsg").innerHTML = xmlResponse;
            }
        } else if (request.status == 404) {
            alert("Request page doesn't exist");
        } else if (request.status == 403) {
            alert("Request page doesn't exist");
        } else {
            alert("Error: Status Code is " + request.statusText);
        }
    }
}


// Helper function to mark field as invalid
function markFieldInvalid(field, placeholderText) {
    field.classList.add("formInvalid");
    field.style.borderColor = "#f0988e";
    field.placeholder = placeholderText;
    field.setAttribute("data-original-placeholder", placeholderText);
    
    // Add input event listener to remove invalid style when user starts typing
    field.addEventListener('input', function() {
        if (this.value.trim() !== "") {
            resetFieldStyles(this);
        }
    });
}

// Helper function to reset field styles
function resetFieldStyles(field) {
    field.classList.remove("formInvalid");
    field.style.borderColor = "";
    var originalPlaceholder = field.getAttribute("data-original-placeholder");
    if (originalPlaceholder) {
        field.placeholder = originalPlaceholder;
    }
}

// Add original placeholder data attributes when page loads
document.addEventListener("DOMContentLoaded", function() {
    var tripName = document.getElementById("tripName");
    var tripName = document.getElementById("tripNationality");
    var tripEmail = document.getElementById("tripEmail");
    var tripMobile = document.getElementById("tripMobile");
    var tripMessage = document.getElementById("tripMessage");
    
    tripName.setAttribute("data-original-placeholder", tripName.placeholder);
    tripName.setAttribute("data-original-placeholder", tripNationality.placeholder);
    tripEmail.setAttribute("data-original-placeholder", tripEmail.placeholder);
    tripMobile.setAttribute("data-original-placeholder", tripMobile.placeholder);
    tripMessage.setAttribute("data-original-placeholder", tripMessage.placeholder);
});