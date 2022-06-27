import SignupPage from "./signup_page";

export default class extends SignupPage {
    forgotPassword() {
        return cy.get('a[href="/reset-password"]');
    }

    backButton() {
        return cy.get("form > div:last-child > a > button");
    }

    deactivationInfoModal() {
        return cy.get("div.ant-modal-body");
    }
}
