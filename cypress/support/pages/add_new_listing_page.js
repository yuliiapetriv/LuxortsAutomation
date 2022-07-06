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

    form() {
        return cy.get("form");
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

    listingTitleInput() {
        return cy.get("input[name='title']");
    }

    listingTitleLabel() {
        return cy.get("label[for='title']");
    }

    hiddenTitleInput() {
        return cy.get("input[name='hiddenTitle']");
    }

    hiddenTitleLabel() {
        return cy.get("label[for='hiddenTitle']");
    }

    descriptionInput() {
        return cy.get("textarea[name='description']");
    }

    descriptionLabel() {
        return cy.get("label[for='description']");
    }

    houseRulesSwitchesContainer() {
        return cy.get(".new-listing__switches");
    }

    priorNotifiedTimeList() {
        return cy.get("#priorNotifiedTime_list");
    }

    checkinStartInput() {
        return cy.get("#checkinStart");
    }

    checkinEndInput() {
        return cy.get("#checkinEnd");
    }

    checkinStartList() {
        return cy.get("#checkinStart_list");
    }

    checkinEndList() {
        return cy.get("#checkinEnd_list");
    }

    minNightsLabel() {
        return cy.get('label[for="minNights"]');
    }

    maxNightsLabel() {
        return cy.get('label[for="maxNights"]');
    }

    preparationTimeInput() {
        return cy.get("#preparationTime");
    }

    preparationTimeList() {
        return cy.get("#preparationTime_list");
    }

    basePriceInput() {
        return cy.get('input[id="pricePerDay"]');
    }

    basePriceLabel() {
        return cy.get('label[for="pricePerDay"]');
    }

    weeklyDiscountInput() {
        return cy.get('input[id="weeklyDiscount"]');
    }

    weeklyDiscountLabel() {
        return cy.get('label[for="weeklyDiscount"]');
    }

    mounthlyDiscountInput() {
        return cy.get('input[id="mounthlyDiscount"]');
    }

    mounthlyDiscountLabel() {
        return cy.get('label[for="mounthlyDiscount"]');
    }

    cleaningFeeInput() {
        return cy.get('input[id="extraCharges"]');
    }

    cleaningFeeLabel() {
        return cy.get('label[for="extraCharges"]');
    }

    modalWindow() {
        return cy.get(".ant-modal-content");
    }

    modalWindowTitle() {
        return cy.get(".ant-modal-title");
    }
}
