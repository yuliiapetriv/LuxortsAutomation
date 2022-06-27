export default class {
    mainHeader() {
        return cy.get("h1");
    }

    stepName() {
        return cy.get(".text-body-2");
    }

    saveAndExitButton() {
        return cy.get(".main-header__container").find("button");
    }

    nextButton() {
        return cy
            .get(".new-listing__footer")
            .children()
            .children()
            .last("button");
    }

    // Property Type Step

    propertyTypeInput() {
        return cy.get('input[type="search"]');
    }

    propertyTypeLabel() {
        return cy.get('label[for="listingPropertyType.propertyTypeId"]');
    }

    dropDown() {
        return cy.get(".rc-virtual-list-holder-inner");
    }

    firstDropDownOption() {
        return this.dropDown().children().first();
    }

    selectedItem() {
        return cy.get(".ant-select-selection-item");
    }

    plusButton() {
        return cy.get("span[aria-label='Increase Value']");
    }

    // Location Step

    countryInput() {
        return cy.get('input[id="country"]');
    }

    countryLabel() {
        return cy.get('label[for="country"]');
    }

    countryList() {
        return cy.get("#country_list");
    }

    streetInput() {
        return cy.get('input[id="street"]');
    }

    streetLabel() {
        return cy.get('label[for="street"]');
    }

    apartmentNumberInput() {
        return cy.get('input[id="apartmentNumber"]');
    }

    apartmentNumberLabel() {
        return cy.get('label[for="apartmentNumber"]');
    }

    cityInput() {
        return cy.get('input[id="city"]');
    }

    cityLabel() {
        return cy.get('label[for="city"]');
    }

    stateInput() {
        return cy.get('input[id="state"]');
    }

    stateLabel() {
        return cy.get('label[for="state"]');
    }

    stateList() {
        return cy.get("#state_list");
    }

    zipCodeInput() {
        return cy.get('input[id="zipCode"]');
    }

    zipCodeLabel() {
        return cy.get('label[for="zipCode"]');
    }

    newListingAddress() {
        return cy.get(".new-listing__address");
    }

    newListingAddressMap() {
        return cy.get(".new-listing__map");
    }

    checkbox() {
        return cy.get('input[type="checkbox"]');
    }

    radioButton() {
        return cy.get('input[type="radio"]');
    }

    uploadPhotosInput() {
        return cy.get(
            "input[accept='image/*,.jpeg,.png,.jpg'][multiple][type='file']"
        );
    }

    uploadPhotosButton() {
        return cy.get(".upload-photos > .ant-btn");
    }

    photosContainer() {
        return cy.get(".upload-photos__items");
    }

    mainPhotoBadge() {
        return this.photosContainer()
            .children()
            .first()
            .children()
            .first()
            .children()
            .last();
    }
}
