/// <reference types="cypress" />

const invoiceLogin = () => {
  cy.get("a").contains("Log in").click();
  cy.get(`input[name="email"]`)
    .clear()
    .type("user@nextmail.com")
    .should("have.value", "user@nextmail.com");
  cy.get(`input[name="password"]`)
    .clear()
    .type("123456")
    .should("have.value", "123456");
  cy.get("p.text-red-500").should("not.exist");
  cy.get("button").contains("Log in").click();
  cy.get("p.text-red-500").should("not.exist");
  cy.wait(5000);

  cy.get("a").contains("Home").parent().should("have.class", "bg-sky-100");
};
describe("Test all flows in invoice", () => {
  beforeEach(() => {
    cy.visit("http://localhost:6002"); // https://laviedegeorge-sample-dashboard.vercel.app
    cy.viewport(1440, 800);
    invoiceLogin();
    cy.wait(500);
    cy.get("a").contains("Invoices").click();
  });

  it.skip("Should search for an invoice", () => {
    cy.wait(2000);
    cy.get(`input[placeholder="Search invoices..."]`)
      .clear()
      .type("emeka")
      .should("have.value", "emeka");

    cy.wait(2000);
    cy.get("tr").should("have.length", 3);
  });

  it.skip("Should add new invoice", () => {
    cy.wait(2000);
    // Create invoice
    cy.get("a").contains("Create Invoice").click();
    cy.get("select")
      .select("Kelechi Apugo")
      .should("have.value", "7426b00b-4d2c-4e82-8993-5e5fd535520d");
    cy.get(`input[id="amount"]`).clear().type("50").should("have.value", "50");
    cy.get(`input[id="pending"]`).check().should("be.checked");
    cy.get("button").contains("Create Invoice").click();

    cy.wait(2000);
    // Confirm that new invoice is available in invoice table
    cy.get("tr").eq(1).as("newInvoice");
    cy.get("@newInvoice")
      .children()
      .eq(0)
      .should("contain.text", "Kelechi Apugo");
    cy.get("@newInvoice").children().eq(2).should("contain.text", "$50.00");
  });

  it("Should edit invoice", () => {
    cy.wait(2000);
    cy.get("tr").eq(1).as("editInvoice");
    // Edit invoice
    cy.get(`tr > td > div > a`).first().click();
    cy.get(`input[id="amount"]`).clear().type("75").should("have.value", "75");
    cy.get("button").contains("Edit Invoice").click();

    cy.wait(2000);
    // Confirm that edited invoice is available in invoice table

    cy.get("@editInvoice")
      .children()
      .eq(0)
      .should("contain.text", "Kelechi Apugo");
    cy.get("@editInvoice").children().eq(2).should("contain.text", "$75.00");
  });

  it.skip("Should delete invoice", () => {
    cy.wait(2000);
    // Delete invoice
    cy.get(`tr > td > div > form > button`).first().click();

    cy.wait(2000);
    // Confirm that deleted invoice is not available in invoice table
    cy.get("tr")
      .eq(1)
      .children()
      .eq(0)
      .should("not.contain.text", "Kelechi Apugo");
  });
});
