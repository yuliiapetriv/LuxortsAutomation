import {
    Password,
    Email,
    SIGNIN_URL,
    ADD_NEW_LISTING_URL,
    NOTFOUND_URL,
    SigninTexts,
    CommonTexts,
    NotFoundTexts,
} from "../../support/constants";
import SigninPage from "../../support/pages/signin_page";
import NotFoundPage from "../../support/pages/not_found_page";

const signinPage = new SigninPage();
const notFoundPage = new NotFoundPage();

let authToken = undefined;

describe("Sign In Page", () => {
    beforeEach(() => {
        cy.visit(SIGNIN_URL);
    });

    context("User", () => {
        it("should not be able to log in with incorrect credentials", () => {
            cy.intercept("POST", "**/user_account/session").as(
                "authentication"
            );
            signinPage
                .emailInput()
                .clear()
                .type(Email.Registered)
                .should("have.value", Email.Registered);
            signinPage
                .passwordInput()
                .clear()
                .type(Password.Moderate)
                .should("have.value", Password.Moderate);
            signinPage.submitButton().click();
            cy.wait("@authentication").then((interception) => {
                assert.equal(interception.response.statusCode, "422");
            });
            signinPage
                .errorMessage()
                .should("be.visible")
                .and("contain", SigninTexts.InvalidCombinationError);
        });

        it("should be able to log in with correct credentials", () => {
            cy.intercept("POST", "**/user_account/session").as(
                "authentication"
            );
            signinPage
                .emailInput()
                .clear()
                .type(Email.Registered)
                .should("have.value", Email.Registered);
            signinPage
                .passwordInput()
                .clear()
                .type(Password.Registered)
                .should("have.value", Password.Registered);
            signinPage.submitButton().click();
            cy.wait("@authentication").then((interception) => {
                assert.equal(interception.response.statusCode, "200");
            });
            cy.url().should("not.include", SIGNIN_URL);
        });

        it("should be able to reset password", () => {
            cy.intercept("POST", "**/user_account/forgot_password").as(
                "resetPassword"
            );
            signinPage.forgotPassword().click();
            signinPage
                .emailInput()
                .type(Email.Registered)
                .should("have.value", Email.Registered);
            signinPage.submitButton().contains("Recover").click();
            cy.wait("@resetPassword").then((interception) => {
                assert.equal(interception.response.statusCode, "200");
            });
            cy.url().should("include", "/recover-password");
        });
    });

    context("Email", () => {
        it("should not accept an empty email", () => {
            signinPage
                .passwordInput()
                .type(Password.Registered)
                .should("have.value", Password.Registered);
            signinPage.submitButton().contains(CommonTexts.SignIn).click();
            signinPage
                .sublineErrorMessage()
                .should("be.visible")
                .and("have.text", CommonTexts.BlankFieldError);
        });

        it('should not accept emails without "@"', () => {
            signinPage
                .emailInput()
                .type(Email.NoAt)
                .should("have.value", Email.NoAt);
            signinPage.passwordInput().click();
            signinPage
                .sublineErrorMessage()
                .should("be.visible")
                .and("have.text", CommonTexts.InvalidEmailFormatError);
        });
    });

    context("Password", () => {
        it("should not accept an empty password", () => {
            signinPage
                .emailInput()
                .type(Email.Registered)
                .should("have.value", Email.Registered);
            signinPage.submitButton().contains(CommonTexts.SignIn).click();
            signinPage
                .sublineErrorMessage()
                .should("contain", CommonTexts.BlankFieldError);
        });

        it("should mask/unmask password", () => {
            signinPage
                .passwordInput()
                .type(Password.Registered)
                .should("have.value", Password.Registered)
                .invoke("attr", "type")
                .should("eq", "password");
            signinPage.showPasswordIcon().click();
            signinPage
                .passwordInput()
                .invoke("attr", "type")
                .should("eq", "text");
            signinPage.showPasswordIcon().click();
            signinPage
                .passwordInput()
                .invoke("attr", "type")
                .should("eq", "password");
        });
    });

    context("Navigation", () => {
        it("should redirect to the signup page when the user clicks the respective button", () => {
            cy.url().should("match", /sign-in$/);
            signinPage.switchPageButton().click();
            cy.url().should("match", /sign-up$/);
        });
    });

    context("Forgot password", () => {
        it("should not allow the user to request a forgot password email without filling in the email input", () => {
            signinPage
                .forgotPassword()
                .contains(SigninTexts.ForgotPassword)
                .click();
            signinPage.submitButton().contains("Recover").click();
            signinPage
                .sublineErrorMessage()
                .should("contain", CommonTexts.BlankFieldError);
        });

        it("should send a forgot password request with the user's email", () => {
            cy.intercept("POST", "**/user_account/forgot_password").as(
                "recoverPassword"
            );
            signinPage.forgotPassword().click();
            signinPage
                .emailInput()
                .type(Email.Registered)
                .should("have.value", Email.Registered);
            signinPage.submitButton().contains("Recover").click();
            cy.wait("@recoverPassword").then((interception) => {
                assert.equal(interception.response.statusCode, "200");
            });
            cy.location().should((loc) => {
                expect(loc.pathname).to.eq("/recover-password");
            });
        });

        it("should redirect to the sign in page from the reset password page", () => {
            signinPage
                .forgotPassword()
                .contains(SigninTexts.ForgotPassword)
                .click();
            signinPage
                .backButton()
                .contains("Back to Sign In")
                .should("be.visible")
                .click();
            cy.location().should((loc) => {
                expect(loc.pathname).to.eq("/sign-in");
            });
        });

        it("should redirect to the sign in page from the recover password page", () => {
            cy.intercept("POST", "**/user_account/forgot_password").as(
                "forgotPasswordRequest"
            );
            signinPage
                .forgotPassword()
                .contains(SigninTexts.ForgotPassword)
                .click();
            signinPage
                .emailInput()
                .type(Email.Registered)
                .should("have.value", Email.Registered);
            signinPage.submitButton().contains("Recover").click();
            cy.wait("@forgotPasswordRequest").then((interception) => {
                assert.equal(interception.response.statusCode, "200");
            });
            cy.url().should("include", "/recover-password");
            signinPage
                .backButton()
                .contains("Back to Sign In")
                .should("be.visible")
                .click();
            cy.location().should((loc) => {
                expect(loc.pathname).to.eq("/sign-in");
            });
        });
    });

    context("Sign In", () => {
        it("should show an error with notification when the user tries to sign in with invalid credentials", () => {
            signinPage
                .emailInput()
                .type(Email.Registered)
                .should("have.value", Email.Registered);
            signinPage
                .passwordInput()
                .type(Password.Invalid)
                .should("have.value", Password.Invalid);
            signinPage.submitButton().contains(CommonTexts.SignIn).click();
            signinPage
                .errorMessage()
                .should("be.visible")
                .and("have.text", SigninTexts.InvalidCombinationError);
        });

        it("should send an auth request with input data after the user clicks the sign in button", () => {
            cy.intercept("POST", "**/user_account/session").as("logIn");
            signinPage
                .emailInput()
                .type(Email.Registered)
                .should("have.value", Email.Registered);
            signinPage
                .passwordInput()
                .type(Password.Registered)
                .should("have.value", Password.Registered);
            signinPage.submitButton().click();
            cy.wait("@logIn").then((interception) => {
                const requestBody = interception.request.body;
                expect(requestBody.email).to.eq(Email.Registered);
                expect(requestBody.password).to.eq(Password.Registered);
            });
        });

        it("should show a notification when the user tries to sign in and their account is being deactivated by Admin", () => {
            signinPage
                .emailInput()
                .type(Email.DeactivatedByAdmin)
                .should("have.value", Email.DeactivatedByAdmin);
            signinPage
                .passwordInput()
                .type(Password.Registered)
                .should("have.value", Password.Registered);
            signinPage.submitButton().click();
            signinPage
                .deactivationInfoModal()
                .should("be.visible")
                .and(
                    "have.text",
                    SigninTexts.AccountIsBeingDeactivatedByAdminNotification
                );
            cy.contains("Ok").click();
            signinPage.deactivationInfoModal().should("not.exist");
            cy.location().should((loc) => {
                expect(loc.pathname).to.eq("/support");
            });
        });

        it("should show a notification when the user tries to sign in and their account is being deactivated by themself", () => {
            signinPage
                .emailInput()
                .type(Email.DeactivatedByUser)
                .should("have.value", Email.DeactivatedByUser);
            signinPage
                .passwordInput()
                .type(Password.Registered)
                .should("have.value", Password.Registered);
            signinPage.submitButton().click();
            signinPage
                .deactivationInfoModal()
                .should("be.visible")
                .and(
                    "have.text",
                    SigninTexts.AccountIsBeingDeactivatedByUserNotification
                );
            cy.contains("No, keep it deactivated").click();
            signinPage.deactivationInfoModal().should("not.exist");
            cy.url().should("not.include", SIGNIN_URL);
        });

        it("should activate user's account when the deactivated by themself user tries to sign in", () => {
            cy.intercept("POST", "**/user_account/status/activation").as(
                "accountActivation"
            );
            signinPage
                .emailInput()
                .type(Email.DeactivatedByUser)
                .should("have.value", Email.DeactivatedByUser);
            signinPage
                .passwordInput()
                .type(Password.Registered)
                .should("have.value", Password.Registered);
            signinPage.submitButton().click();
            signinPage
                .deactivationInfoModal()
                .should("be.visible")
                .and(
                    "have.text",
                    SigninTexts.AccountIsBeingDeactivatedByUserNotification
                );
            cy.contains("Yes, reactivate my account").click();
            cy.wait("@accountActivation").then((interception) => {
                const responseBody = interception.response.body;
                assert.equal(interception.response.statusCode, "200");
                assert.equal(responseBody.data.attributes.status, "active");
            });
            signinPage.deactivationInfoModal().should("not.exist");
            cy.getCookie("tokens").then((cookie) => {
                const tokensObj = JSON.parse(decodeURIComponent(cookie.value));
                authToken = tokensObj.access;
            });
        });

        it("should display not found page when url is incorrect", () => {
            cy.visit(`${SIGNIN_URL}${NOTFOUND_URL}`, {
                failOnStatusCode: false,
            });
            notFoundPage
                .message()
                .should("be.visible")
                .and("have.text", NotFoundTexts.Message);
        });

        it("should redirect user to signin page when unauthorized", () => {
            cy.visit(ADD_NEW_LISTING_URL);
            cy.url()
                .should("include", SIGNIN_URL)
                .should("not.include", ADD_NEW_LISTING_URL);
        });
    });

    after(() => {
        cy.deactivateUserAccount(authToken, Password.Registered);
    });
});
