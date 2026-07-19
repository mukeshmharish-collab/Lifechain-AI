document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registrationForm");
    const steps = document.querySelectorAll(".form-step");
    const nextButtons = document.querySelectorAll(".next-btn");
    const prevButtons = document.querySelectorAll(".prev-btn");
    const progressBar = document.querySelector(".progress-bar");
    const progressSteps = document.querySelectorAll(".step");

    const donorSelect = document.getElementById("bloodDonor");
    const donorFields = document.getElementById("donorFields");

    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const passwordStrength = document.getElementById("passwordStrength");

    let currentStep = 0;

    function showStep(index) {
        steps.forEach((step) => {
            step.classList.remove("active");
        });

        steps[index].classList.add("active");
        updateProgress();
    }

    function updateProgress() {
        progressSteps.forEach((step, index) => {
            if (index <= currentStep) {
                step.classList.add("active");
            } else {
                step.classList.remove("active");
            }
        });

        const percentage = (currentStep / (progressSteps.length - 1)) * 100;
        progressBar.style.width = percentage + "%";
    }

    function validateCurrentStep() {
        const currentFields = steps[currentStep].querySelectorAll("input, select, textarea");

        for (let field of currentFields) {
            if (!field.checkValidity()) {
                field.reportValidity();
                field.focus();
                return false;
            }
        }

        return true;
    }

    nextButtons.forEach((button) => {
        button.addEventListener("click", () => {
            if (!validateCurrentStep()) {
                return;
            }

            if (currentStep < steps.length - 1) {
                currentStep++;
                showStep(currentStep);
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        });
    });

    prevButtons.forEach((button) => {
        button.addEventListener("click", () => {
            if (currentStep > 0) {
                currentStep--;
                showStep(currentStep);
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        });
    });

    donorSelect.addEventListener("change", () => {
        if (donorSelect.value === "Yes") {
            donorFields.style.display = "block";
        } else {
            donorFields.style.display = "none";
        }
    });

    password.addEventListener("input", () => {
        const value = password.value;

        let strength = "Weak";
        let color = "#ff5252";

        if (value.length >= 8) {
            strength = "Medium";
            color = "#ffb400";
        }

        if (
            value.length >= 10 &&
            /[A-Z]/.test(value) &&
            /[a-z]/.test(value) &&
            /\d/.test(value) &&
            /[@$!%*?&]/.test(value)
        ) {
            strength = "Strong";
            color = "#00e676";
        }

        passwordStrength.textContent = "Password Strength: " + strength;
        passwordStrength.style.color = color;
    });

    confirmPassword.addEventListener("input", () => {
        if (confirmPassword.value === "") {
            confirmPassword.style.borderColor = "";
            return;
        }

        if (confirmPassword.value === password.value) {
            confirmPassword.style.borderColor = "#00e676";
        } else {
            confirmPassword.style.borderColor = "#ff5252";
        }
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const emergencyContact = document.getElementById("emergencyContact").value.trim();
        const passwordValue = password.value;
        const confirmPasswordValue = confirmPassword.value;

        if (fullName.length < 3) {
            showError("Please enter your full name.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showError("Please enter a valid email address.");
            return;
        }

        if (!/^[6-9]\d{9}$/.test(phone)) {
            showError("Please enter a valid 10-digit mobile number.");
            return;
        }

        if (!/^[6-9]\d{9}$/.test(emergencyContact)) {
            showError("Please enter a valid emergency contact number.");
            return;
        }

        if (passwordValue.length < 8) {
            showError("Password must contain at least 8 characters.");
            return;
        }

        if (passwordValue !== confirmPasswordValue) {
            showError("Passwords do not match.");
            return;
        }

        const lifeChainId = generateLifeChainID();
        showSuccess(lifeChainId);
    });

    function generateLifeChainID() {
        const year = new Date().getFullYear();
        const random = Math.floor(100000 + Math.random() * 900000);
        return "LCAI-" + year + "-" + random;
    }

    function showError(message) {
        const popup = document.createElement("div");
        popup.className = "error-popup";

        popup.innerHTML = `
            <div class="popup-box">
                <h2>Validation Error</h2>
                <p>${message}</p>
                <button type="button" id="closeError">OK</button>
            </div>
        `;

        document.body.appendChild(popup);

        document.getElementById("closeError").addEventListener("click", () => {
            popup.remove();
        });
    }

    function showSuccess(id) {
        const popup = document.createElement("div");
        popup.className = "success-popup";

        popup.innerHTML = `
            <div class="popup-box">
                <h2>Registration Successful</h2>
                <p>Your LifeChain AI medical identity has been created.</p>
                <h3>${id}</h3>
                <button type="button" id="continueBtn">Continue</button>
            </div>
        `;

        document.body.appendChild(popup);

        document.getElementById("continueBtn").addEventListener("click", () => {
            localStorage.setItem("lifeChainId", id);
            window.location.href = "dashboard.html";
        });
    }

    showStep(currentStep);
});
const form = document.getElementById("registrationForm");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    alert("Frontend is ready to send data to the backend!");
});