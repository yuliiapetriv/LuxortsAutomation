import {
    Password,
    Email,
    ADD_NEW_LISTING_URL,
    AddNewListingTexts,
} from "../../support/constants";
import AddNewListingPage from "../../support/pages/add_new_listing_page";

const addNewListingPage = new AddNewListingPage();

let listingId = undefined;

describe("Add New Listing Page", () => {
    beforeEach(() => {
        cy.signIn(Email.Registered, Password.Registered);
    });

    context("User", () => {
        it("should be able to select Property Type for a new listing", () => {
            cy.intercept("POST", "**/listings").as("createListing");
            cy.visit(ADD_NEW_LISTING_URL);
            const checkTypeOfPlace = (typeOfPlaceElement) => {
                typeOfPlaceElement.click();
                typeOfPlaceElement.should(
                    "have.class",
                    "ant-radio-wrapper-checked"
                );
            };
            addNewListingPage.propertyTypeInput().click();
            addNewListingPage.dropDown().should("be.visible");
            addNewListingPage.firstDropDownOption().click();
            addNewListingPage.firstDropDownOption().then((option) => {
                addNewListingPage
                    .selectedItem()
                    .should("have.text", option.text());
            });
            checkTypeOfPlace(cy.contains(AddNewListingTexts.EntirePlace));
            checkTypeOfPlace(cy.contains(AddNewListingTexts.PrivateRoom));
            checkTypeOfPlace(cy.contains(AddNewListingTexts.SharedRoom));
            addNewListingPage.nextButton().click();
            cy.wait("@createListing").then((interception) => {
                const responseBody = interception.response.body;
                listingId = responseBody.data.id;
                cy.log(listingId);
                assert.equal(interception.response.statusCode, "201");
                assert.equal(
                    responseBody.data.attributes.application_step,
                    "accomodation"
                );
            });
        });

        it("should be able to specify Accommodations for a new listing", () => {
            cy.intercept("PUT", "**/listing_accomodation").as(
                "submitAccomodationStep"
            );
            cy.visit(`${ADD_NEW_LISTING_URL}/accommodation/${listingId}`);
            const checkAccomodations = ({ item, count }) => {
                for (let n = 1; n < count; n++) {
                    cy.contains(item)
                        .parent()
                        .find("span[aria-label='Increase Value']")
                        .click();
                }
                cy.contains(item)
                    .parent()
                    .find(".ant-input-number-input-wrap")
                    .find("input")
                    .should("have.value", count);
            };
            const checkArrangements = ({ roomType, arrengementType }) => {
                cy.contains(roomType)
                    .parent()
                    .find(".ant-input-number-input-wrap")
                    .find("input")
                    .invoke("attr", "value")
                    .then((value) => {
                        for (let n = 1; n <= value; n++) {
                            const room = roomType.replace(/s$/i, "");
                            cy.contains(`${room} ${n}`).next("button").click();
                            cy.contains(arrengementType)
                                .parent()
                                .find("span[aria-label='Increase Value']")
                                .click();
                            cy.contains("Done").click();
                            cy.contains(`${room} ${n}`)
                                .parent()
                                .next()
                                .then((element) => {
                                    const txt = `1 ${arrengementType}`;
                                    cy.wrap(element).should(
                                        "contain",
                                        txt.toLowerCase()
                                    );
                                });
                        }
                    });
            };
            checkAccomodations({ item: "Guests", count: 4 });
            checkAccomodations({ item: "Bedrooms", count: 2 });
            checkAccomodations({ item: "Beds", count: 2 });
            checkAccomodations({ item: "Bathrooms", count: 1 });
            checkArrangements({
                roomType: "Bedrooms",
                arrengementType: AddNewListingTexts.BedType,
            });
            checkArrangements({
                roomType: "Bathrooms",
                arrengementType: AddNewListingTexts.BathType,
            });
            addNewListingPage.nextButton().click();
            cy.wait("@submitAccomodationStep").then((interception) => {
                const responseBody = interception.response.body;
                assert.equal(interception.response.statusCode, "200");
                assert.equal(responseBody.data.type, "listing_accomodation");
            });
        });

        it("should be able to specify Location for a new listing", () => {
            cy.intercept("PUT", "**/listing_location").as("submitLocationStep");
            cy.visit(`${ADD_NEW_LISTING_URL}/location/${listingId}`);
            const selectCountryOrState = ({
                inputElement,
                listElement,
                name,
            }) => {
                inputElement().type(name);
                listElement().next().find(`[label="${name}"]`).click();
                inputElement().parent().next().should("have.text", name);
            };
            const slecifyAddress = ({ inputElement, locationValue }) => {
                inputElement()
                    .clear()
                    .type(locationValue)
                    .should("have.value", locationValue);
            };
            selectCountryOrState({
                inputElement: addNewListingPage.countryInput,
                listElement: addNewListingPage.countryList,
                name: AddNewListingTexts.Country,
            });
            selectCountryOrState({
                inputElement: addNewListingPage.stateInput,
                listElement: addNewListingPage.stateList,
                name: AddNewListingTexts.State,
            });
            slecifyAddress({
                inputElement: addNewListingPage.cityInput,
                locationValue: AddNewListingTexts.City,
            });
            slecifyAddress({
                inputElement: addNewListingPage.streetInput,
                locationValue: AddNewListingTexts.Street,
            });
            slecifyAddress({
                inputElement: addNewListingPage.zipCodeInput,
                locationValue: AddNewListingTexts.ZipCode,
            });
            addNewListingPage.nextButton().click();
            cy.wait("@submitLocationStep").then((interception) => {
                const responseBody = interception.response.body;
                assert.equal(interception.response.statusCode, "200");
                assert.equal(responseBody.data.type, "listing_location");
                assert.equal(
                    responseBody.data.attributes.country,
                    AddNewListingTexts.Country
                );
                assert.equal(
                    responseBody.data.attributes.city,
                    AddNewListingTexts.City
                );
                assert.equal(
                    responseBody.data.attributes.state,
                    AddNewListingTexts.State
                );
                assert.equal(
                    responseBody.data.attributes.street,
                    AddNewListingTexts.Street
                );
                assert.equal(
                    responseBody.data.attributes.zip_code,
                    AddNewListingTexts.ZipCode
                );
            });
            addNewListingPage
                .newListingAddress()
                .should(
                    "have.text",
                    `${AddNewListingTexts.Street}, ${AddNewListingTexts.City}, ${AddNewListingTexts.State} ${AddNewListingTexts.ZipCode}, ${AddNewListingTexts.Country}`
                );
            addNewListingPage.newListingAddressMap().should("be.visible");
            addNewListingPage.nextButton().click();
            cy.wait("@submitLocationStep").then((interception) => {
                assert.equal(interception.response.statusCode, "200");
            });
        });

        it("should be able to specify Amenities for a new listing", () => {
            cy.intercept("PUT", "**/amenities").as("submitAmenitiesStep");
            cy.visit(`${ADD_NEW_LISTING_URL}/amenities/${listingId}`);

            const checkAllAmenitiesWithinAmenityGroup = ({ amenityGroup }) => {
                cy.contains(amenityGroup)
                    .next()
                    .find('input[type="checkbox"]')
                    .should("have.value", "false")
                    .check()
                    .should("have.value", "true");
            };
            checkAllAmenitiesWithinAmenityGroup({
                amenityGroup: AddNewListingTexts.BedroomAmenityGroup,
            });
            checkAllAmenitiesWithinAmenityGroup({
                amenityGroup: AddNewListingTexts.BathroomAmenityGroup,
            });
            checkAllAmenitiesWithinAmenityGroup({
                amenityGroup: AddNewListingTexts.KitchenAmenityGroup,
            });
            addNewListingPage.nextButton().click();
            cy.wait("@submitAmenitiesStep").then((interception) => {
                const responseBody = interception.response.body;
                assert.equal(interception.response.statusCode, "200");
                assert.equal(responseBody.data[0].type, "listing_amenity");
            });
        });

        it("should be able to specify Capabilities for a new listing", () => {
            cy.intercept("PUT", "**/capabilities").as("submitCapabilitiesStep");
            cy.visit(`${ADD_NEW_LISTING_URL}/capabilities/${listingId}`);
            addNewListingPage.checkbox().as("capabilitiesCheckboxes").check();
            cy.get("@capabilitiesCheckboxes").each((checkbox) => {
                expect(checkbox[0].checked).to.equal(true);
            });
            addNewListingPage.nextButton().click();
            cy.wait("@submitCapabilitiesStep").then((interception) => {
                const responseBody = interception.response.body;
                assert.equal(interception.response.statusCode, "200");
                assert.equal(responseBody.data[0].type, "listing_capability");
            });
        });

        it("should be able to specify Services for a new listing", () => {
            cy.intercept("PUT", "**/services").as("submitServicesStep");
            cy.visit(`${ADD_NEW_LISTING_URL}/services/${listingId}`);
            addNewListingPage.checkbox().as("servicesCheckboxes").check();
            cy.get("@servicesCheckboxes").each((checkbox, index) => {
                expect(checkbox[0].checked).to.equal(true);
                if (index % 2 != 0) {
                    cy.wrap(checkbox)
                        .parent()
                        .parent()
                        .parent()
                        .find(".ant-radio-wrapper--negative")
                        .find('input[type="radio"]')
                        .check()
                        .should("have.value", "true")
                        .parent()
                        .should("have.class", "ant-radio-checked");
                }
            });
            addNewListingPage.nextButton().click();
            cy.wait("@submitServicesStep").then((interception) => {
                const responseBody = interception.response.body;
                assert.equal(interception.response.statusCode, "200");
                assert.equal(responseBody.data[0].type, "listing_service");
            });
        });

        it("should be able to upload Photos for a new listing", () => {
            const bathroomImage = "images/bathroom.jpg";
            const bedroomImage1 = "images/bedroom-1.jpg";
            const bedroomImage2 = "images/bedroom-2.jpg";
            const hallImage = "images/hall.jpg";
            const kitchenImage = "images/kitchen.jpg";
            const livingRoomImage = "images/living-room.jpg";
            const roomNamesArray = [
                "Hall",
                "Living Room",
                "Kitchen",
                "Bathroom",
                "Bedroom 1",
                "Bedroom 2",
            ];
            cy.intercept("PUT", "**/listing_photos").as("submitPhotosStep");
            cy.visit(`${ADD_NEW_LISTING_URL}/photos/${listingId}`);
            addNewListingPage
                .uploadPhotosInput()
                .attachFile([
                    hallImage,
                    livingRoomImage,
                    kitchenImage,
                    bathroomImage,
                    bedroomImage1,
                    bedroomImage2,
                ]);
            addNewListingPage
                .mainPhotoBadge()
                .should("be.visible")
                .and("have.text", "Main photo");
            addNewListingPage
                .photosContainer()
                .children()
                .each((item, index) => {
                    cy.wrap(item)
                        .find('input[type="text"]')
                        .invoke("attr", "name")
                        .then((name) => {
                            switch (name) {
                                case `listingPhotos[${index}].description`:
                                    cy.wrap(item)
                                        .find('input[type="text"]')
                                        .type(roomNamesArray[index])
                                        .should(
                                            "have.value",
                                            roomNamesArray[index]
                                        );
                                    break;
                            }
                        });
                });
            addNewListingPage.nextButton().click();
            cy.wait("@submitPhotosStep").then((interception) => {
                assert.equal(interception.response.statusCode, "200");
            });
        });

        it("should be able to add Description for a new listing", () => {
            cy.intercept("PUT", "**/listing_description").as(
                "submitDescriptionStep"
            );
            cy.visit(`${ADD_NEW_LISTING_URL}/description/${listingId}`);
            addNewListingPage
                .listingTitleInput()
                .clear()
                .type(AddNewListingTexts.ListingTitle)
                .should("have.value", AddNewListingTexts.ListingTitle);
            addNewListingPage
                .hiddenTitleInput()
                .clear()
                .type(AddNewListingTexts.ListingHiddenTitle)
                .should("have.value", AddNewListingTexts.ListingHiddenTitle);
            addNewListingPage
                .descriptionInput()
                .clear()
                .type(AddNewListingTexts.ListingDecription)
                .should("have.text", AddNewListingTexts.ListingDecription);
            addNewListingPage.nextButton().click();
            cy.wait("@submitDescriptionStep").then((interception) => {
                const responseBody = interception.response.body;
                assert.equal(interception.response.statusCode, "200");
                assert.equal(responseBody.data.type, "listing_description");
            });
        });

        it("should be able to specify House rules for a new listing", () => {
            cy.intercept("PUT", "**/house_rules").as("submitHouseRulesStep");
            cy.visit(`${ADD_NEW_LISTING_URL}/house-rules/${listingId}`);
            addNewListingPage
                .houseRulesSwitchesContainer()
                .children()
                .each((item) => {
                    cy.wrap(item)
                        .find('[role="switch"]')
                        .should("have.attr", "aria-checked", "false")
                        .click()
                        .should("have.attr", "aria-checked", "true");
                });
            addNewListingPage.nextButton().click();
            cy.wait("@submitHouseRulesStep").then((interception) => {
                const responseBody = interception.response.body;
                assert.equal(interception.response.statusCode, "200");
                assert.equal(responseBody.data[0].type, "listing_house_rule");
            });
        });

        it("should be able to specify Reservation Preferences for a new listing", () => {
            cy.intercept("PUT", "**/reservation_preference").as(
                "submitReservationPreferencesStep"
            );
            cy.visit(
                `${ADD_NEW_LISTING_URL}/reservation-preferences/${listingId}`
            );
            // When do you need to be notified prior to the arrival of the guests?
            cy.contains(AddNewListingTexts.PriorNotify)
                .parent()
                .find('input[type="radio"]')
                .first()
                .check()
                .parent()
                .should("have.class", "ant-radio-checked");
            cy.contains(AddNewListingTexts.PriorNotify)
                .parent()
                .find(".container-two-items")
                .find('input[type="search"]')
                .click();
            addNewListingPage
                .priorNotifiedTimeList()
                .next()
                .find(".rc-virtual-list-holder-inner")
                .should("be.visible")
                .children()
                .first()
                .click();
            // When can guests check in?
            const selectCheckInCheckOutDates = ({
                checkType,
                optionsList,
                time,
            }) => {
                checkType().click();
                optionsList()
                    .next()
                    .find(".rc-virtual-list-holder-inner")
                    .should("be.visible")
                    .children()
                    .eq(time)
                    .click();
            };
            selectCheckInCheckOutDates({
                checkType: addNewListingPage.checkinStartInput,
                optionsList: addNewListingPage.checkinStartList,
                time: 0,
            });
            selectCheckInCheckOutDates({
                checkType: addNewListingPage.checkinEndInput,
                optionsList: addNewListingPage.checkinEndList,
                time: 5,
            });
            // How far in advance can guests book?
            cy.contains(AddNewListingTexts.BookInAdvance)
                .find('input[type="radio"]')
                .check()
                .parent()
                .should("have.class", "ant-radio-checked");
            // How long can guests stay?
            const selectMinAndMaxNightsNumber = ({ nightLabel, count }) => {
                nightLabel()
                    .parent()
                    .next()
                    .find("input")
                    .clear()
                    .type(count)
                    .should("have.value", count);
            };
            selectMinAndMaxNightsNumber({
                nightLabel: addNewListingPage.minNightsLabel,
                count: "3",
            });
            selectMinAndMaxNightsNumber({
                nightLabel: addNewListingPage.maxNightsLabel,
                count: "14",
            });
            // How much time do you need to prepare your space between reservations?
            addNewListingPage.preparationTimeInput().click({ force: true });
            addNewListingPage
                .preparationTimeList()
                .next()
                .find(".rc-virtual-list-holder-inner")
                .should("be.visible")
                .children()
                .eq(1)
                .click();
            // Booking approval / Cancellation policy
            const checkBookingApprovalAndCancellationPolicy = ({
                policyType,
            }) => {
                cy.contains(policyType)
                    .find('input[type="radio"]')
                    .check()
                    .parent()
                    .should("have.class", "ant-radio-checked");
            };
            checkBookingApprovalAndCancellationPolicy({
                policyType: AddNewListingTexts.BookingApprovalPolicy,
            });
            checkBookingApprovalAndCancellationPolicy({
                policyType: AddNewListingTexts.CancellationPolicy,
            });
            addNewListingPage.nextButton().click();
            cy.wait("@submitReservationPreferencesStep").then(
                (interception) => {
                    const responseBody = interception.response.body;
                    assert.equal(interception.response.statusCode, "200");
                    assert.equal(
                        responseBody.data.type,
                        "listing_reservation_preference"
                    );
                }
            );
        });
    });
});
