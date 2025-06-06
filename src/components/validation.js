const enableValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

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

function validationConfig(enableValidation) {
    const formList = Array.from(document.querySelectorAll(enableValidation.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, 
            enableValidation.inputSelector, 
            enableValidation.inputErrorClass, 
            enableValidation.errorClass, 
            enableValidation.submitButtonSelector, 
            enableValidation.inactiveButtonClass);
    });
};

function clearValidation(formElement, enableValidation) {
    const inputList = Array.from(formElement.querySelectorAll(enableValidation.inputSelector));
    const buttonElement = formElement.querySelector(enableValidation.submitButtonSelector);
    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, enableValidation.inputErrorClass, enableValidation.errorClass);
        inputElement.setCustomValidity('');
    });

    toggleButtonState(inputList, buttonElement, enableValidation.inactiveButtonClass);
};

export{enableValidation, validationConfig, clearValidation};
