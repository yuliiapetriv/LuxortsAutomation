export default class {
    haveAccountText() {
        return cy.get(".main-header__caption");
    }

    switchPageButton() {
        return cy.get("a > .ant-btn");
    }
    // import to login
    mainHeader() {
        return cy.get("h1");
    }
    // import to login
    subHeader() {
        return this.mainHeader().next();
    }

    firstNameInput() {
        return cy.get('input[id="userProfile.firstName"]');
    }

    firstNameLabel() {
        return cy.get("label[for='userProfile.firstName']");
    }

    lastNameInput() {
        return cy.get('input[id="userProfile.lastName"]');
    }

    lastNameLabel() {
        return cy.get("label[for='userProfile.lastName']");
    }

    dateOfBirthInput() {
        return cy.get('input[id="userProfile.dateOfBirth"]');
    }

    dateOfBirthLabel() {
        return cy.get("label[for='userProfile.dateOfBirth']");
    }

    dateOfBirthHint() {
        return cy.get(".ant-form-item-explain > div > .subline-message");
    }

    openCalendarIcon() {
        return cy.get("span[aria-label='calendar'] > svg");
    }

    // import to login
    emailInput() {
        return cy.get('input[id="email"]');
    }
    // import to login
    emailLabel() {
        return cy.get('label[for="email"]');
    }

    phoneNumberInput() {
        return cy.get('input[id="userProfile.phoneNumber"]');
    }

    phoneNumberLabel() {
        return cy.get("label[for='userProfile.phoneNumber']");
    }

    phoneCountryDropdown() {
        return cy.get("select.PhoneInputCountrySelect");
    }

    phoneUkrainianFlag() {
        return cy.get('img[alt="Ukraine"]');
    }

    phoneUnitedStatesFlag() {
        return cy.get('img[alt="United States"]');
    }

    phoneCanadianFlag() {
        return cy.get('img[alt="Canada"]');
    }

    // Cannot use the input type here as clicking the show/hide button changes this from 'password' to 'text'
    passwordInput() {
        return cy.get('input[id="password"]');
    }

    passwordLabel() {
        return cy.get('label[for="password"]');
    }

    passwordHint() {
        return cy.get(".password-progress > .subline-message");
    }

    showPasswordIcon() {
        return cy.get("span.anticon > svg");
    }

    lengthValidator() {
        return cy.get(".password-progress > p.subline-message");
    }

    submitButton() {
        return cy.get("form").children().last().children("button");
    }

    agreements() {
        return cy.get("p.main-footer__text");
    }

    agreementTermOfServiceLink() {
        return this.agreements().children().first();
    }

    agreementPrivacyPolicyLink() {
        return this.agreementTermOfServiceLink().next();
    }

    /*
    Get the error notification that appears after certain actions (e.g. invalid email-password sign-in attempt)
     */
    errorMessage() {
        return cy.get("div.flash-message--error");
    }

    sublineErrorMessage() {
        return cy.get("p.subline-message--error");
    }

    successMessage() {
        return cy.get("p.MuiFormHelperText-root");
    }
}
