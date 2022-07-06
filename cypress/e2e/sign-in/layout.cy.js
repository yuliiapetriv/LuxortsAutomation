import { SIGNIN_URL, SigninTexts, CommonTexts } from "../../support/constants";
import SigninPage from "../../support/pages/signin_page";

const signinPage = new SigninPage();

describe("Layout", () => {
    beforeEach(() => {
        cy.visit(SIGNIN_URL);
    });

    context("Sign In form", () => {
        it("should display the correct text in the form switcher section", () => {
            signinPage
                .haveAccountText()
                .should("be.visible")
                .and("have.text", SigninTexts.HaveAnAccount);
            signinPage
                .switchPageButton()
                .should("be.visible")
                .and("have.text", CommonTexts.SignUp);
        });

        it("should properly display the main header", () => {
            signinPage
                .mainHeader()
                .should("be.visible")
                .and("have.text", SigninTexts.MainHeader);
        });

        it("should properly display the subheader", () => {
            signinPage
                .subHeader()
                .should("be.visible")
                .and("have.text", SigninTexts.SubHeader);
        });

        it("should properly display the email input", () => {
            signinPage
                .emailLabel()
                .should("be.visible")
                .and("have.text", CommonTexts.EmailLabel);
        });

        it("should properly display the password input and the password visibility icon", () => {
            signinPage
                .passwordLabel()
                .should("be.visible")
                .and("have.text", CommonTexts.PasswordLabel);
            signinPage
                .showPasswordIcon()
                .should("exist")
                .and("have.attr", "data-icon", "eye");
        });

        it("should properly display the forgot password option", () => {
            signinPage
                .forgotPassword()
                .should("be.visible")
                .and("have.text", SigninTexts.ForgotPassword);
        });

        it("should properly display the Sign In button", () => {
            signinPage
                .submitButton()
                .should("be.visible")
                .and("have.text", CommonTexts.SignIn);
        });
    });
});
