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
let authToken = undefined;

describe("Layout", () => {
    beforeEach(() => {
        cy.signIn(Email.Registered, Password.Registered);
    });
    const checkInputs = (input, text) => {
        input().should("be.visible").and("have.text", text);
    };
    context("Property Type step", () => {
        beforeEach(() => {
            cy.visit(ADD_NEW_LISTING_URL);
        });
        after(() => {
            cy.getCookie("tokens").then((cookie) => {
                const tokensObj = JSON.parse(decodeURIComponent(cookie.value));
                authToken = tokensObj.access;
                cy.request({
                    method: "POST",
                    url: `${Cypress.env("backend_url")}${Cypress.env(
                        "api_server"
                    )}listings`,
                    headers: {
                        Authorization: authToken,
                    },
                    body: {
                        listing_property_type: {
                            property_type_id:
                                "21c7f5c3-9bb4-4d7f-ab3f-4bd50a824248",
                            type_of_place: "entire_room",
                        },
                    },
                }).then(({ body }) => {
                    listingId = body.data.id;
                });
            });
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
        it("should properly display the Next button", () => {
            addNewListingPage
                .nextButton()
                .should("be.visible")
                .and("have.text", CommonTexts.NextButton);
        });
    });
    context("Accommodation step", () => {
        beforeEach(() => {
            cy.visit(`${ADD_NEW_LISTING_URL}/accommodation/${listingId}`);
        });
        after(() => {
            cy.getCookie("tokens").then((cookie) => {
                const tokensObj = JSON.parse(decodeURIComponent(cookie.value));
                authToken = tokensObj.access;
                cy.request({
                    method: "PUT",
                    url: `${Cypress.env("backend_url")}${Cypress.env(
                        "api_server"
                    )}listings/${listingId}/listing_accomodation`,
                    headers: {
                        Authorization: authToken,
                    },
                    body: {
                        guests_number: 4,
                        beds_amount: 2,
                        listing_bedrooms: [
                            {
                                default_beds: [
                                    {
                                        kind: "queen",
                                        amount: 2,
                                    },
                                ],
                            },
                        ],
                        listing_bathrooms: [
                            {
                                default_baths: [
                                    {
                                        kind: "shower",
                                        amount: 2,
                                    },
                                ],
                            },
                        ],
                    },
                }).then((response) => {
                    expect(response.status).to.eq(200);
                });
            });
        });
        it("should display the correct text in the header section", () => {
            addNewListingPage
                .stepName()
                .should("be.visible")
                .and("have.text", AddNewListingTexts.AccommodationStep);
            addNewListingPage
                .saveAndExitButton()
                .should("be.visible")
                .and("have.text", AddNewListingTexts.SaveAndExitButton);
        });
        it("should properly display the step title and description", () => {
            addNewListingPage
                .mainHeader()
                .should("be.visible")
                .and("have.text", AddNewListingTexts.AccommodationStepHeader);
            addNewListingPage
                .mainHeader()
                .next()
                .should("be.visible")
                .and("have.text", AddNewListingTexts.AccommodationDescription);
        });
        it("should properly display the Accommodation inputs", () => {
            checkInputs(
                addNewListingPage.guestsNumberLabel,
                AddNewListingTexts.NumberOfGuests
            );
            checkInputs(
                addNewListingPage.bedroomsNumberLabel,
                AddNewListingTexts.NumberOfBedrooms
            );
            checkInputs(
                addNewListingPage.bedsNumberLabel,
                AddNewListingTexts.NumberOfBeds
            );
            checkInputs(
                addNewListingPage.bathroomsNumberLabel,
                AddNewListingTexts.NumberOfBathrooms
            );
        });
        it("should properly display the Next and Back buttons", () => {
            addNewListingPage
                .nextButton()
                .should("be.visible")
                .and("have.text", CommonTexts.NextButton);
            addNewListingPage
                .backButton()
                .should("be.visible")
                .and("have.text", CommonTexts.BackButton);
        });
    });
    context("Location step", () => {
        beforeEach(() => {
            cy.visit(`${ADD_NEW_LISTING_URL}/location/${listingId}`);
        });
        after(() => {
            cy.getCookie("tokens").then((cookie) => {
                const tokensObj = JSON.parse(decodeURIComponent(cookie.value));
                authToken = tokensObj.access;
                cy.request({
                    method: "PUT",
                    url: `${Cypress.env("backend_url")}${Cypress.env(
                        "api_server"
                    )}listings/${listingId}/listing_location`,
                    headers: {
                        Authorization: authToken,
                    },
                    body: {
                        country: "USA",
                        state: "Utah",
                        city: "Monroe",
                        street: "S Main St",
                        zip_code: "84754",
                        apartment_number: "198",
                        latitude: 38.69651,
                        longitude: -112.09851,
                    },
                }).then((response) => {
                    expect(response.status).to.eq(200);
                });
            });
        });
        it("should display the correct text in the header section", () => {
            addNewListingPage
                .stepName()
                .should("be.visible")
                .and("have.text", AddNewListingTexts.LocationStep);
            addNewListingPage
                .saveAndExitButton()
                .should("be.visible")
                .and("have.text", AddNewListingTexts.SaveAndExitButton);
        });
        it("should properly display the Location inputs", () => {
            checkInputs(
                addNewListingPage.countryLabel,
                AddNewListingTexts.CountryLabel
            );
            checkInputs(
                addNewListingPage.streetLabel,
                AddNewListingTexts.StreetLabel
            );
            checkInputs(
                addNewListingPage.apartmentNumberLabel,
                AddNewListingTexts.ApartmentLabel
            );
            checkInputs(
                addNewListingPage.cityLabel,
                AddNewListingTexts.CityLabel
            );
            checkInputs(
                addNewListingPage.stateLabel,
                AddNewListingTexts.StateLabel
            );
            checkInputs(
                addNewListingPage.zipCodeLabel,
                AddNewListingTexts.ZipCodeLabel
            );
        });
        it("should properly display the Next and Back buttons", () => {
            addNewListingPage
                .nextButton()
                .should("be.visible")
                .and("have.text", CommonTexts.NextButton);
            addNewListingPage
                .backButton()
                .should("be.visible")
                .and("have.text", CommonTexts.BackButton);
        });
    });
    context("Amenities step", () => {
        beforeEach(() => {
            cy.visit(`${ADD_NEW_LISTING_URL}/amenities/${listingId}`);
        });
        after(() => {
            cy.getCookie("tokens").then((cookie) => {
                const tokensObj = JSON.parse(decodeURIComponent(cookie.value));
                authToken = tokensObj.access;
                cy.request({
                    method: "PUT",
                    url: `${Cypress.env("backend_url")}${Cypress.env(
                        "api_server"
                    )}listings/${listingId}/amenities`,
                    headers: {
                        Authorization: authToken,
                    },
                    body: {
                        amenities: [],
                    },
                }).then((response) => {
                    expect(response.status).to.eq(200);
                });
            });
        });
        it("should display the correct text in the header section", () => {
            addNewListingPage
                .stepName()
                .should("be.visible")
                .and("have.text", AddNewListingTexts.AmenitiesStep);
            addNewListingPage
                .saveAndExitButton()
                .should("be.visible")
                .and("have.text", AddNewListingTexts.SaveAndExitButton);
        });
        it("should properly display the step title", () => {
            addNewListingPage
                .mainHeader()
                .should("be.visible")
                .and("have.text", AddNewListingTexts.AmenitiesStepHeader);
        });
        it("should properly display the Additional amenities section", () => {
            addNewListingPage
                .subTitle()
                .last()
                .should(
                    "have.text",
                    AddNewListingTexts.AdditionalAmenitiesTitle
                );
            addNewListingPage
                .additionalEntityTitleInput()
                .should("be.visible")
                .and(
                    "have.attr",
                    "placeholder",
                    AddNewListingTexts.AmenityTitlePlaceholder
                );
            addNewListingPage
                .additionalEntityDescriptionInput()
                .should("be.visible")
                .and(
                    "have.attr",
                    "placeholder",
                    AddNewListingTexts.AmenityDescriptionPlaceholder
                );
            cy.contains("button", CommonTexts.AddButton).should("be.disabled");
        });
        it("should properly display the Next and Back buttons", () => {
            addNewListingPage
                .nextButton()
                .should("be.visible")
                .and("have.text", CommonTexts.NextButton);
            addNewListingPage
                .backButton()
                .should("be.visible")
                .and("have.text", CommonTexts.BackButton);
        });
    });
    context("Capabilities step", () => {
        beforeEach(() => {
            cy.visit(`${ADD_NEW_LISTING_URL}/capabilities/${listingId}`);
        });
        after(() => {
            cy.getCookie("tokens").then((cookie) => {
                const tokensObj = JSON.parse(decodeURIComponent(cookie.value));
                authToken = tokensObj.access;
                cy.request({
                    method: "PUT",
                    url: `${Cypress.env("backend_url")}${Cypress.env(
                        "api_server"
                    )}listings/${listingId}/capabilities`,
                    headers: {
                        Authorization: authToken,
                    },
                    body: {
                        capabilities: [],
                    },
                }).then((response) => {
                    expect(response.status).to.eq(200);
                });
            });
        });
        it("should display the correct text in the header section", () => {
            addNewListingPage
                .stepName()
                .should("be.visible")
                .and("have.text", AddNewListingTexts.CapabilitiesStep);
            addNewListingPage
                .saveAndExitButton()
                .should("be.visible")
                .and("have.text", AddNewListingTexts.SaveAndExitButton);
        });
        it("should properly display the step title", () => {
            addNewListingPage
                .mainHeader()
                .should("be.visible")
                .and("have.text", AddNewListingTexts.CapabilitiesStepHeader);
        });
        it("should properly display the Additional capabilities section", () => {
            addNewListingPage
                .subTitle()
                .last()
                .should(
                    "have.text",
                    AddNewListingTexts.AdditionalCapabilitiesTitle
                );
            addNewListingPage
                .additionalEntityTitleInput()
                .should("be.visible")
                .and(
                    "have.attr",
                    "placeholder",
                    AddNewListingTexts.CapabilityTitlePlaceholder
                );
            addNewListingPage
                .additionalEntityDescriptionInput()
                .should("be.visible")
                .and(
                    "have.attr",
                    "placeholder",
                    AddNewListingTexts.CapabilityDescriptionPlaceholder
                );
            cy.contains("button", CommonTexts.AddButton).should("be.disabled");
        });
        it("should properly display the Next and Back buttons", () => {
            addNewListingPage
                .nextButton()
                .should("be.visible")
                .and("have.text", CommonTexts.NextButton);
            addNewListingPage
                .backButton()
                .should("be.visible")
                .and("have.text", CommonTexts.BackButton);
        });
    });
});
