import {
    Password,
    Email,
    SIGNUP_URL,
    NOTFOUND_URL,
    FullName,
    Dates,
    PhoneNumber,
    PhoneCode,
    CountryCode,
    SignupTexts,
    CommonTexts,
    NotFoundTexts,
} from "../../support/constants";
import SignupPage from "../../support/pages/signup_page";
import notfoundPage from "../../support/pages/not_found_page";

const signupPage = new SignupPage();
const notFoundPage = new notfoundPage();

const currentDate = new Date();
const adultAge = 18;
const adultDateOfBirth = new Date(
    currentDate.getFullYear() - adultAge,
    currentDate.getMonth(),
    currentDate.getDate()
).toLocaleDateString("en-GB");
const underageDateOfBirth = new Date(
    currentDate.getFullYear() - adultAge,
    currentDate.getMonth(),
    currentDate.getDate() + 1
).toLocaleDateString("en-GB");

describe("Signup Page", () => {
    beforeEach(() => {
        cy.visit(SIGNUP_URL);
    });

    context("User", () => {
        it("should not be able to sign up if account already exists", () => {
            cy.intercept("POST", "**/user_account/registration").as(
                "registerAccount"
            );
            signupPage
                .firstNameInput()
                .type(FullName.FirstName)
                .should("have.value", FullName.FirstName);
            signupPage
                .lastNameInput()
                .type(FullName.LastName)
                .should("have.value", FullName.LastName);
            signupPage
                .dateOfBirthInput()
                .type(adultDateOfBirth, { force: true })
                .should("have.value", adultDateOfBirth);
            signupPage.dateOfBirthInput().type("{enter}");
            signupPage
                .emailInput()
                .type(Email.Registered)
                .should("have.value", Email.Registered);
            signupPage
                .phoneNumberInput()
                .type(PhoneNumber.ValidUSInput)
                .should("have.value", PhoneNumber.ValidUSResult);
            signupPage
                .passwordInput()
                .type(Password.Registered)
                .should("have.value", Password.Registered);
            signupPage.submitButton().contains(CommonTexts.SignUp).click();
            cy.wait("@registerAccount").then((interception) => {
                assert.equal(interception.response.statusCode, "422");
            });
            signupPage
                .sublineErrorMessage()
                .should("be.visible")
                .and("have.text", CommonTexts.AlreadyRegisteredEmailError);
        });

        it("should not be able to sign up if user is less than 18 years old", () => {
            signupPage
                .firstNameInput()
                .type(FullName.FirstName)
                .should("have.value", FullName.FirstName);
            signupPage
                .lastNameInput()
                .type(FullName.LastName)
                .should("have.value", FullName.LastName);
            signupPage
                .dateOfBirthInput()
                .type(underageDateOfBirth, { force: true })
                .should("have.value", underageDateOfBirth);
            signupPage.dateOfBirthInput().type("{enter}");
            signupPage
                .emailInput()
                .type(Email.New)
                .should("have.value", Email.New);
            signupPage
                .phoneNumberInput()
                .type(PhoneNumber.ValidUSInput)
                .should("have.value", PhoneNumber.ValidUSResult);
            signupPage
                .passwordInput()
                .type(Password.Registered)
                .should("have.value", Password.Registered);
            signupPage.submitButton().contains(CommonTexts.SignUp).click();
            signupPage
                .sublineErrorMessage()
                .should("be.visible")
                .and("have.text", SignupTexts.UnderageUserError);
        });
    });

    context("First Name", () => {
        it("should not accept an empty first name", () => {
            signupPage.sublineErrorMessage().should("not.exist");
            signupPage.firstNameInput().click();
            signupPage.lastNameInput().click();
            signupPage
                .sublineErrorMessage()
                .should("be.visible")
                .and("have.text", CommonTexts.BlankFieldError);
        });

        it("should not accept a first name with spaces", () => {
            signupPage
                .firstNameInput()
                .type(FullName.WithSpaces)
                .should("have.value", FullName.WithSpaces);
            signupPage
                .lastNameInput()
                .type(FullName.LastName)
                .should("have.value", FullName.LastName);
            signupPage
                .dateOfBirthInput()
                .type(adultDateOfBirth, { force: true })
                .should("have.value", adultDateOfBirth);
            signupPage.dateOfBirthInput().type("{enter}");
            signupPage
                .emailInput()
                .type(Email.New)
                .should("have.value", Email.New);
            signupPage
                .phoneNumberInput()
                .type(PhoneNumber.ValidUSInput)
                .should("have.value", PhoneNumber.ValidUSResult);
            signupPage
                .passwordInput()
                .type(Password.Registered)
                .should("have.value", Password.Registered);
            signupPage.submitButton().contains(CommonTexts.SignUp).click();
            signupPage
                .sublineErrorMessage()
                .should("be.visible")
                .and("have.text", "Can’t be blank");
        });
    });

    context("Last Name", () => {
        it("should not accept an empty last name", () => {
            signupPage.sublineErrorMessage().should("not.exist");
            signupPage.lastNameInput().click();
            signupPage.firstNameInput().click();
            signupPage
                .sublineErrorMessage()
                .should("be.visible")
                .and("have.text", CommonTexts.BlankFieldError);
        });

        it("should not accept a last name with spaces", () => {
            signupPage
                .firstNameInput()
                .clear()
                .type(FullName.FirstName)
                .should("have.value", FullName.FirstName);
            signupPage
                .lastNameInput()
                .clear()
                .type(FullName.WithSpaces)
                .should("have.value", FullName.WithSpaces);
            signupPage
                .dateOfBirthInput()
                .type(adultDateOfBirth, { force: true })
                .should("have.value", adultDateOfBirth);
            signupPage.dateOfBirthInput().type("{enter}");
            signupPage
                .emailInput()
                .type(Email.New)
                .should("have.value", Email.New);
            signupPage
                .phoneNumberInput()
                .type(PhoneNumber.ValidUSInput)
                .should("have.value", PhoneNumber.ValidUSResult);
            signupPage
                .passwordInput()
                .type(Password.Registered)
                .should("have.value", Password.Registered);
            signupPage.submitButton().contains(CommonTexts.SignUp).click();
            signupPage
                .sublineErrorMessage()
                .should("be.visible")
                .and("have.text", "Can’t be blank");
        });
    });

    context("Email", () => {
        it("should not accept an empty email", () => {
            signupPage.sublineErrorMessage().should("not.exist");
            signupPage.emailInput().click();
            signupPage.passwordInput().click();
            signupPage
                .sublineErrorMessage()
                .should("be.visible")
                .and("have.text", CommonTexts.BlankFieldError);
        });

        it('should not accept an invalid email without the "@" symbol', () => {
            signupPage
                .emailInput()
                .type(Email.NoAt)
                .should("have.value", Email.NoAt);
            signupPage.passwordInput().click();
            signupPage
                .sublineErrorMessage()
                .should("be.visible")
                .and("have.text", CommonTexts.InvalidEmailFormatError);
        });

        it("should not accept an email with more than 255 characters long", () => {
            signupPage
                .emailInput()
                .type(Email.Long)
                .should("have.value", Email.Long);
            signupPage.passwordInput().click();
            signupPage
                .sublineErrorMessage()
                .should("be.visible")
                .and("have.text", CommonTexts.LongEmailError);
        });
    });

    context("Password", () => {
        const verifyPasswordAcceptance = (password, lengthValidationFailed) => {
            signupPage
                .passwordInput()
                .type(password)
                .should("have.value", password)
                .blur();
            signupPage
                .lengthValidator()
                .should("be.visible")
                .and(
                    lengthValidationFailed ? "have.class" : "not.have.class",
                    "subline-message--error"
                );
        };

        it("should not accept an empty password", () => {
            signupPage.sublineErrorMessage().should("not.exist");
            signupPage.passwordInput().click();
            signupPage.emailInput().click();
            signupPage
                .sublineErrorMessage()
                .should("be.visible")
                .and("have.text", CommonTexts.BlankFieldError);
        });

        it("should not accept password less than 6 characters long", () => {
            verifyPasswordAcceptance(Password.Short, true);
        });

        it("should not accept password more than 72 characters long", () => {
            verifyPasswordAcceptance(Password.Long, true);
        });

        it("should accept a password with special characters", () => {
            verifyPasswordAcceptance(Password.WithSpecialSymbols, false);
        });

        it("should accept a valid password after fixing an invalid one", () => {
            verifyPasswordAcceptance(Password.Short, true);
            signupPage
                .passwordInput()
                .clear()
                .type(Password.Moderate)
                .should("have.value", Password.Moderate);
            signupPage
                .lengthValidator()
                .should("be.visible")
                .and("not.have.class", "subline-message--error");
        });
    });

    context("Date of birth", () => {
        it("should not accept an empty date of birth", () => {
            signupPage.sublineErrorMessage().should("not.exist");
            signupPage.dateOfBirthInput().click().blur();
            signupPage.emailInput().click();
            signupPage
                .sublineErrorMessage()
                .should("be.visible")
                .and("have.text", CommonTexts.BlankFieldError);
        });

        it("should not accept an invalid date of birth", () => {
            signupPage
                .dateOfBirthInput()
                .type(Dates.InvalidDate, { force: true })
                .should("have.value", Dates.InvalidDate);
            signupPage.dateOfBirthInput().type("{enter}").blur();
            signupPage
                .sublineErrorMessage()
                .should("be.visible")
                .and("have.text", CommonTexts.BlankFieldError);
        });

        it("should accept date of birth of the user who is 18 years old", () => {
            signupPage
                .dateOfBirthInput()
                .type(adultDateOfBirth, { force: true })
                .should("have.value", adultDateOfBirth);
            signupPage.dateOfBirthInput().type("{enter}").blur();
            signupPage.sublineErrorMessage().should("not.exist");
        });

        it("should not accept date of birth of the user who is less than 18 years old", () => {
            signupPage
                .dateOfBirthInput()
                .type(underageDateOfBirth, { force: true })
                .should("have.value", underageDateOfBirth);
            signupPage.dateOfBirthInput().type("{enter}").blur();
            signupPage
                .sublineErrorMessage()
                .should("be.visible")
                .and("have.text", SignupTexts.UnderageUserError);
        });
    });

    context("Phone Number", () => {
        it("should not accept an empty phone number", () => {
            signupPage.sublineErrorMessage().should("not.exist");
            signupPage.phoneNumberInput().click();
            signupPage.passwordInput().click();
            signupPage
                .sublineErrorMessage()
                .should("be.visible")
                .and("have.text", CommonTexts.BlankFieldError);
        });

        it("should accept a valid US phone", () => {
            signupPage
                .phoneNumberInput()
                .type(PhoneNumber.ValidUSInput)
                .should("have.value", PhoneNumber.ValidUSResult);
            signupPage.passwordInput().click();
            signupPage.sublineErrorMessage().should("not.exist");
        });

        it("should allow the user to select a different country", () => {
            signupPage.phoneUnitedStatesFlag().should("be.visible");
            signupPage.phoneCountryDropdown().select(CountryCode.Ukraine);
            signupPage.phoneUnitedStatesFlag().should("not.exist");
            signupPage.phoneUkrainianFlag().should("be.visible");
            signupPage
                .phoneNumberInput()
                .should("have.value", PhoneCode.Ukraine);
        });

        it("should automatically detect Canada as the country when the user manually inputs the entire number", () => {
            signupPage.phoneUnitedStatesFlag().should("be.visible");
            signupPage
                .phoneNumberInput()
                .clear()
                .type(PhoneNumber.ValidCAInput)
                .should("have.value", PhoneNumber.ValidCAResult);
            signupPage.phoneUnitedStatesFlag().should("not.exist");
            signupPage.phoneCanadianFlag().should("be.visible");
        });
    });

    context("Navigation", () => {
        it("should redirect to the signin page when the user clicks the respective button", () => {
            cy.url().should("match", /sign-up$/);
            signupPage.switchPageButton().click();
            cy.url().should("match", /sign-in$/);
        });
    });

    context("Sign Up", () => {
        it("should show an error if the email already exists", () => {
            cy.intercept("POST", "**/user_account/registration").as(
                "registerAccount"
            );
            signupPage
                .firstNameInput()
                .type(FullName.FirstName)
                .should("have.value", FullName.FirstName);
            signupPage
                .lastNameInput()
                .type(FullName.LastName)
                .should("have.value", FullName.LastName);
            signupPage
                .dateOfBirthInput()
                .type(adultDateOfBirth, { force: true })
                .should("have.value", adultDateOfBirth);
            signupPage.dateOfBirthInput().type("{enter}");
            signupPage
                .emailInput()
                .type(Email.Registered)
                .should("have.value", Email.Registered);
            signupPage
                .phoneNumberInput()
                .type(PhoneNumber.ValidUSInput)
                .should("have.value", PhoneNumber.ValidUSResult);
            signupPage
                .passwordInput()
                .type(Password.Registered)
                .should("have.value", Password.Registered);
            signupPage.submitButton().contains(CommonTexts.SignUp).click();
            cy.wait("@registerAccount").then((interception) => {
                assert.equal(interception.response.statusCode, "422");
            });
            signupPage
                .sublineErrorMessage()
                .should("be.visible")
                .and("have.text", CommonTexts.AlreadyRegisteredEmailError);
        });

        it("should show an error if the phone number already used", () => {
            cy.intercept("POST", "**/user_account/registration").as(
                "registerAccount"
            );
            signupPage
                .firstNameInput()
                .type(FullName.FirstName)
                .should("have.value", FullName.FirstName);
            signupPage
                .lastNameInput()
                .type(FullName.LastName)
                .should("have.value", FullName.LastName);
            signupPage
                .dateOfBirthInput()
                .type(adultDateOfBirth, { force: true })
                .should("have.value", adultDateOfBirth);
            signupPage.dateOfBirthInput().type("{enter}");
            signupPage
                .emailInput()
                .type(Email.New)
                .should("have.value", Email.New);
            signupPage
                .phoneNumberInput()
                .type(PhoneNumber.RegisteredInput)
                .should("have.value", PhoneNumber.RegisteredOutput);
            signupPage
                .passwordInput()
                .type(Password.Registered)
                .should("have.value", Password.Registered);
            signupPage.submitButton().contains(CommonTexts.SignUp).click();
            cy.wait("@registerAccount").then((interception) => {
                assert.equal(interception.response.statusCode, "422");
            });
            signupPage
                .sublineErrorMessage()
                .should("be.visible")
                .and(
                    "have.text",
                    CommonTexts.AlreadyRegisteredPhoneNumberError
                );
        });

        it("should display not found page when url is incorrect", () => {
            cy.visit(`${SIGNUP_URL}${NOTFOUND_URL}`, {
                failOnStatusCode: false,
            });
            notFoundPage
                .message()
                .should("be.visible")
                .and("have.text", NotFoundTexts.Message);
        });
    });
});
