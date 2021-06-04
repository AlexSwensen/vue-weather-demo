// https://docs.cypress.io/api/introduction/api.html

describe("Zip Input", () => {
  it("should start with null validation state", () => {
    cy.visit("/");
    cy.contains("div.invalid-feedback", "Must be a valid US Zip Code").should(
      "not.be.visible"
    );
    cy.contains("div", "Looks Good.").should("not.be.visible");
  });
});
