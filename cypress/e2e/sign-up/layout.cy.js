import {
    SIGNUP_URL,
    SignupTexts,
    CommonTexts,
    Dates,
    PhoneCode,
} from "../../support/constants";
import SignupPage from "../../support/pages/signup_page";

const signupPage = new SignupPage();

describe("Layout", () => {
    beforeEach(() => {
        cy.visit(SIGNUP_URL);
    });

    context("Signup form", () => {
        it("should properly display the correct text in the page switcher section", () => {
            signupPage
                .haveAccountText()
                .should("be.visible")
                .and("have.text", SignupTexts.HaveAnAccount);
            signupPage
                .switchPageButton()
                .should("be.visible")
                .and("have.text", CommonTexts.SignIn);
        });

        it("should properly display the main header", () => {
            signupPage
                .mainHeader()
                .should("be.visible")
                .and("have.text", SignupTexts.MainHeader);
        });

        it("should properly display the first name input", () => {
            signupPage
                .firstNameLabel()
                .should("be.visible")
                .and("have.text", CommonTexts.FirstNameLabel);
        });

        it("should properly display the last name input", () => {
            signupPage
                .lastNameLabel()
                .should("be.visible")
                .and("have.text", CommonTexts.LastNameLabel);
        });

        it("should properly display the date of birth input, its format, hint and calendar icon", () => {
            signupPage
                .dateOfBirthLabel()
                .should("be.visible")
                .and("have.text", CommonTexts.DateOfBirthLabel);
            signupPage
                .dateOfBirthHint()
                .should("be.visible")
                .and("have.text", CommonTexts.DateOfBirthHint);
            signupPage
                .dateOfBirthInput()
                .should("be.visible")
                .and("have.attr", "placeholder", Dates.Format);
            signupPage.openCalendarIcon().should("be.visible");
        });

        it("should properly display the email input", () => {
            signupPage
                .emailLabel()
                .should("be.visible")
                .and("have.text", CommonTexts.EmailLabel);
        });

        it("should properly display the phone input", () => {
            signupPage
                .phoneNumberLabel()
                .should("be.visible")
                .and("have.text", CommonTexts.PhoneNumberLabel);
            signupPage.phoneUnitedStatesFlag().should("be.visible");
            signupPage
                .phoneNumberInput()
                .should("be.visible")
                .and("have.value", PhoneCode.NorthAmerica);
        });

        it("should properly display the password input, its hint and eye icon", () => {
            signupPage
                .passwordLabel()
                .should("be.visible")
                .and("have.text", CommonTexts.PasswordLabel);
            signupPage
                .passwordHint()
                .should("be.visible")
                .and("have.text", CommonTexts.PasswordHint);
            signupPage.showPasswordIcon().should("be.visible");
        });

        it("should properly display the signup button", () => {
            signupPage
                .submitButton()
                .should("be.visible")
                .and("have.text", CommonTexts.SignUp);
        });

        it("should properly display the agreements", () => {
            signupPage
                .agreements()
                .should("be.visible")
                .and("have.text", SignupTexts.Agreements);
        });
    });
});
