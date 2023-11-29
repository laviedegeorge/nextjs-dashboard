/// <reference types="cypress" />

const customerLogin = () => {
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

describe("Test all flows in customers page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:6002");
    cy.viewport(1440, 800);
    customerLogin();
    cy.wait(500);
    cy.get("a").contains("Customers").click();
  });

  it("Should add new customer", () => {
    cy.wait(2000);
    // Add customer
    cy.get("a").contains("Add Customer").click();
    cy.get(`input[id="name"]`)
      .clear()
      .type("John Doe")
      .should("have.value", "John Doe");
    cy.get(`input[id="email"]`)
      .clear()
      .type("john@doe.com")
      .should("have.value", "john@doe.com");
    cy.get("button").contains("Add Customer").click();
  });

  it("Should search for a customer", () => {
    // Search to confirm that customer has been added
    cy.wait(2000);
    cy.get(`input[placeholder="Search customers..."]`)
      .clear()
      .type("john doe")
      .should("have.value", "john doe");

    cy.wait(2000);
    cy.get("tr").should("have.length", 2);
    cy.get("td").contains("John Doe").should("be.visible");
  });

  it("Should edit customer", () => {
    cy.wait(2000);
    cy.get("tr").eq(1).as("editCustomer");
    cy.get("tr > td > div > a").first().click();

    // Edit customer
    cy.get(`input[id="email"]`)
      .clear()
      .type("amy_edited@burns.com")
      .should("have.value", "amy_edited@burns.com");
    cy.get("button").contains("Edit customer").click();

    cy.wait(2000);
    // Confirm that edited customer is available in customer table
    cy.get("@editCustomer")
      .children()
      .eq(1)
      .should("contain.text", "amy_edited@burns.com");
  });
});
