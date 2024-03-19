function goToQuestion(nextQuestionNumber) {
  var totalQuestions = 8;
  var currentQuestionNumber = nextQuestionNumber - 1;

  var currentQuestion = document.getElementById(
    "question" + currentQuestionNumber
  );
  var nextQuestion = document.getElementById("question" + nextQuestionNumber);

  // Check if the current question contains radio buttons
  var radioInputs = currentQuestion.querySelectorAll('input[type="radio"]');
  var hasRadioButtons = radioInputs.length > 0;

  if (hasRadioButtons) {
    var selectedOption = false;
    for (var i = 0; i < radioInputs.length; i++) {
      if (radioInputs[i].checked) {
        selectedOption = true;
        break;
      }
    }

    if (!selectedOption) {
      // Show error message for radio buttons
      var errorMessage = document.getElementById("error" + currentQuestionNumber);
      errorMessage.textContent = "Please select an option before proceeding.";
      return;
    }
  }

  // Check if the current question contains input fields
  var inputFields = currentQuestion.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"]');
  var hasInputFields = inputFields.length > 0;

  if (hasInputFields) {
    var fieldEmpty = false;
    for (var i = 0; i < inputFields.length; i++) {
      if (!inputFields[i].value.trim()) {
        fieldEmpty = true;
        // inputFields[i].style.border = "1px solid red"; 
      } else {
        inputFields[i].style.border = ""; // Clear red border for filled fields
      }

      // Remove red outline when focusing on an input field
      inputFields[i].addEventListener("focus", function () {
        this.style.outline = "none";
      });
    }

    if (fieldEmpty) {
      // Show error message for empty input fields
      var errorMessage = document.getElementById("error" + currentQuestionNumber);
      errorMessage.textContent = "Please fill in this field.";
      return;
    }
  }

  // If at least one radio option is selected or no radio buttons/input fields in the question, proceed to the next question
  currentQuestion.classList.remove("show");

  setTimeout(function () {
    currentQuestion.style.display = "none";
    nextQuestion.style.display = "block";

    setTimeout(function () {
      nextQuestion.classList.add("show");
    }, 10);
  }, 500);

  var progressPercentage = (nextQuestionNumber / totalQuestions) * 100;
  updateProgress(progressPercentage);
}

function submitSurvey() {
  // Get the survey form data
  var homeOwner = document.querySelector(
    'input[name="homeOwner"]:checked'
  ).value;
  var homeSize = document.querySelector('input[name="homeSize"]:checked').value;
  var scopeOfProject = document.querySelector(
    'input[name="scopeOfProject"]:checked'
  ).value;
  var roofInstallation = document.querySelector(
    'input[name="roofInstallation"]:checked'
  ).value;
  var address = document.getElementById("address").value;
  var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;

  // Create a JavaScript object with the survey form data
  var surveyData = {
    homeOwner: homeOwner,
    homeSize: homeSize,
    scopeOfProject: scopeOfProject,
    roofInstallation: roofInstallation,
    address: address,
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
  };

  // Send the survey data to the server using fetch or another method
  fetch("https://survey-server-lilac.vercel.app/mail-survey-form", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(surveyData),
  })
    .then((response) => response.json())
    .then((data) => {
      // Display the thank you container
      var thankYouContainer = document.getElementById("thankYouContainer");
      thankYouContainer.style.display = "flex";

      // Display the thank you message
      var thankYouMessage = document.getElementById("thankYouMessage");
      thankYouMessage.style.display = "block";
    })
    .catch((error) => {
      console.error("Error submitting survey:", error);
    });

  // Hide the survey container
  var surveyContainer = document.getElementById("main-surveyContainer");
  surveyContainer.style.display = "none";

  // Update the progress bar
  updateProgress(100);
}

function updateProgress(percentage) {
  var progressBar = document.getElementById("progress");
  var progressText = document.getElementById("progressText");

  progressBar.style.width = percentage + "%";
  progressText.textContent = percentage.toFixed(0) + "%"; // Update the text
}

// Initialize first question with fade-in effect
document.addEventListener("DOMContentLoaded", function () {
  var firstQuestion = document.getElementById("question1");
  firstQuestion.style.display = "block";
  setTimeout(function () {
    firstQuestion.classList.add("show");
  }, 10);

  // Add a new element for the thank you container
  var thankYouContainer = document.createElement("div");
  thankYouContainer.id = "thankYouContainer";
  thankYouContainer.style.display = "none";
  thankYouContainer.style.justifyContent = "center";
  thankYouContainer.style.alignItems = "center";
  thankYouContainer.style.position = "absolute";
  thankYouContainer.style.top = "0";
  thankYouContainer.style.left = "0";
  thankYouContainer.style.width = "100%";
  thankYouContainer.style.height = "100%";
  thankYouContainer.style.backgroundImage = "url('./new-housing-estate-from-above.png')";
  thankYouContainer.style.backgroundSize = "cover";
  thankYouContainer.style.backgroundPosition = "center";
  document.body.appendChild(thankYouContainer);

  // Add a new element for the thank you message inside the thank you container
  var thankYouMessage = document.createElement("div");
  thankYouMessage.id = "thankYouMessage";
  thankYouMessage.innerHTML = "<p style='font-size: 35px; border: 2px solid red; padding: 35px; font-weight: bold; background-color:#ececec;text-align: center;'>Thank you for your submission!</p>";
  thankYouMessage.style.display = "none";
  thankYouContainer.appendChild(thankYouMessage);
});
