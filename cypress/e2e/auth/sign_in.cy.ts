/// <reference types="cypress" />

describe("Test Logout and Sign in", () => {
  beforeEach(() => {
    cy.visit("http://localhost:6002");
  });

  it("Should be able to sign in", () => {
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
  });
});
