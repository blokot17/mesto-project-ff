function showInputError(formElement, inputElement, errorMessage, 
inputErrorClass, errorClass) {
    const errorElement = formElement.querySelector(`.${inputElement.name}_input_error`);
        inputElement.classList.add(inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(errorClass);
};

function hideInputError(formElement, inputElement, 
inputErrorClass, errorClass) {
    const errorElement = formElement.querySelector(`.${inputElement.name}_input_error`);
        inputElement.classList.remove(inputErrorClass);
        errorElement.classList.remove(errorClass)
        errorElement.textContent = "";
};


function checkInputValidity(formElement, inputElement, inputErrorClass, errorClass) {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    };

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    } else {
        hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    };
};

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid
    });
};

function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(inactiveButtonClass)
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(inactiveButtonClass)
    };
};

function setEventListeners(formElement, inputSelector, inputErrorClass, errorClass, 
    submitButtonSelector, inactiveButtonClass) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
            toggleButtonState(inputList, buttonElement, inactiveButtonClass)
         });
    });
};

function enableValidation(validationConfig) {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, 
            validationConfig.inputSelector, 
            validationConfig.inputErrorClass, 
            validationConfig.errorClass, 
            validationConfig.submitButtonSelector, 
            validationConfig.inactiveButtonClass);
    });
};

function clearValidation(formElement, validationConfig) {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, validationConfig.inputErrorClass, validationConfig.errorClass);
        inputElement.setCustomValidity('');
    });

    toggleButtonState(inputList, buttonElement, validationConfig.inactiveButtonClass);
};

export{enableValidation, clearValidation};
