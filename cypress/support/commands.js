// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import "cypress-file-upload";

Cypress.Commands.add("signIn", (email, password) => {
    cy.session([email, password], () => {
        cy.request({
            method: "POST",
            url: `${Cypress.env("backend_url")}${Cypress.env(
                "api_server"
            )}user_account/session`,
            body: { email, password },
        }).then(({ body }) => {
            cy.setCookie("tokens", JSON.stringify(body.meta));
            const userInfo = {
                id: body.data.id,
                email: body.data.attributes.email,
                publicId: body.data.attributes.public_id,
                verifiedStatus: body.data.attributes.verified_status,
                status: body.data.attributes.status,
                userProfile: {
                    id: body.included[0].id,
                    about: body.included[0].attributes.about,
                    address: body.included[0].attributes.address,
                    avatarUrls: body.included[0].attributes.avatar_urls,
                    dateOfBirth: body.included[0].attributes.date_of_birth,
                    drivingLicenseFirstName:
                        body.included[0].attributes.driving_license_first_name,
                    drivingLicenseLastName:
                        body.included[0].attributes.driving_license_last_name,
                    firstName: body.included[0].attributes.first_name,
                    gender: body.included[0].attributes.gender,
                    lastName: body.included[0].attributes.last_name,
                    phoneNumber: body.included[0].attributes.phone_number,
                    country: body.included[0].attributes.country,
                    city: body.included[0].attributes.city,
                    state: body.included[0].attributes.state,
                    street: body.included[0].attributes.street,
                    apartmentNumber:
                        body.included[0].attributes.apartment_number,
                },
            };
            cy.setCookie("currentUser", JSON.stringify(userInfo));
        });
    });
});

Cypress.Commands.add("deactivateUserAccount", (authToken, password) => {
    cy.request({
        method: "POST",
        url: `${Cypress.env("backend_url")}${Cypress.env(
            "api_server"
        )}user_account/status/deactivation`,
        headers: {
            Authorization: `${authToken}`,
        },
        body: {
            current_password: `${password}`,
        },
    }).then((response) => {
        expect(response.status).to.eq(204);
    });
});
