/// <reference types="cypress" />
import chaiColors from "chai-colors";
import { darkTheme, lightTheme } from "../../styles/themes";
chai.use(chaiColors);

context("Home Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should find Hello title, click to navigate to Hello page", () => {
    cy.get("h1").contains("Hello").click();
  });

  it("should navigate to Hello, Work and Blog via the navbar", () => {
    cy.get("h2").contains("Hello").click();
    cy.url().should("include", "/hello");
    cy.get("#right > a").click(); //go back home
    cy.wait(1000);
    cy.get("h2").contains("Work").click();
    cy.url().should("include", "/work");
    cy.get("#right > a").click(); //go back home
    cy.wait(1000);
    cy.get("h2").contains("Blog").click();
    cy.url().should("include", "/blog");
  });

  it("Should be able to toggle darkmode on", () => {
    cy.get("#toggle-container").click();
    cy.get("body").should("have.css", "background-color").and("be.colored", darkTheme.background);
  });

  it("Should be able to toggle darkmode off", () => {
    cy.get("#toggle-container").click().click();
    cy.get("body").should("have.css", "background-color").and("be.colored", lightTheme.background);
  });
});
