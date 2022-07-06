import {
    Password,
    Email,
    ADD_NEW_LISTING_URL,
    CommonTexts,
    AddNewListingTexts,
} from "../../support/constants";
import AddNewListingPage from "../../support/pages/add_new_listing_page";

const addNewListingPage = new AddNewListingPage();

let listingId = undefined;

describe("Layout", () => {
    beforeEach(() => {
        cy.signIn(Email.Registered, Password.Registered);
    });
    context("Property Type step", () => {
        beforeEach(() => {
            cy.visit(ADD_NEW_LISTING_URL);
        });
        it("should display the correct text in the header section", () => {
            addNewListingPage
                .stepName()
                .should("be.visible")
                .and("have.text", AddNewListingTexts.PropertyTypeStep);
            addNewListingPage
                .saveAndExitButton()
                .should("be.visible")
                .and("have.text", AddNewListingTexts.SaveAndExitButton);
        });
        it("should properly display the step title", () => {
            addNewListingPage
                .mainHeader()
                .should("be.visible")
                .and("have.text", AddNewListingTexts.PropertyTypeStepHeader);
        });
        it("should properly display the Property Type input", () => {
            addNewListingPage
                .propertyTypeLabel()
                .should("be.visible")
                .and("have.text", AddNewListingTexts.PropertyTypeStep);
        });
        it("should properly display the step subtitle", () => {
            addNewListingPage
                .subHeader()
                .should("be.visible")
                .and(
                    "have.text",
                    AddNewListingTexts.TypeOfPlaceSectionSubHeader
                );
        });
        it("should properly display the Next button", () => {
            addNewListingPage
                .nextButton()
                .should("be.visible")
                .and("have.text", CommonTexts.NextButton);
        });
        it("should display the correct Types of place", () => {
            const TypesOfPlace = [
                AddNewListingTexts.EntirePlace,
                AddNewListingTexts.PrivateRoom,
                AddNewListingTexts.SharedRoom,
            ];
            addNewListingPage.radioButton().each((item, index) => {
                cy.wrap(item)
                    .parent()
                    .next()
                    .should("have.text", TypesOfPlace[index]);
            });
        });
    });
    context("Accommodation step", () => {
        beforeEach(() => {
            cy.visit(`${ADD_NEW_LISTING_URL}/accommodation/${listingId}`);
        });
    });
});
