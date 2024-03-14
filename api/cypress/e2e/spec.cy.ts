describe("API testing", () => {
  it("passes", () => {
    cy.visit("/");
  });

  it("fetches product data", () => {
    cy.request({
      method: "GET",
      url: "/api/products?populate=*",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((productResponse) => {
      expect(productResponse.status).to.eq(200);
      const productData = productResponse.body.data[0];
      expect(productData.attributes.name).to.exist;
      expect(productData.attributes.price).to.exist;
      expect(productData.attributes.name).to.be.a("string");
      expect(productData.attributes.price).to.be.a("number");
      cy.log(productData.attributes.name);
    });
  });
  it("fetches workshop data", () => {
    cy.request({
      method: "GET",
      url: "/api/workshops",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((workshopResponse) => {
      expect(workshopResponse.status).to.eq(200);
      const workshopData = workshopResponse.body.data[0];
      expect(workshopData.attributes.title).to.exist;
      expect(workshopData.attributes.title).to.be.a("string");
      expect(workshopData.attributes.price).to.be.a("number");
      cy.log(workshopData.attributes.title);
    });
  });
  it("fetches collection data", () => {
    cy.request({
      method: "GET",
      url: "/api/collections",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((collectionResponse) => {
      function getAllCollectionTitles(jsonData) {
        let titles = [];
        jsonData.data.forEach((collection) => {
          titles.push(collection.attributes.title);
        });
        return titles;
      }

      let titles = getAllCollectionTitles(collectionResponse.body);
      cy.log(JSON.stringify(titles));
    });
  });
  it("fetches workshop dates", () => {
    cy.request({
      method: "GET",
      url: "/api/orders",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((ordersResponse) => {
      function getAllWorkshopDates(jsonData) {
        let workshopDates = [];
        jsonData.data.forEach((order) => {
          order.attributes.workshops.forEach((workshop) => {
            workshop.selectedDates.forEach((date) => {
              workshopDates.push(date);
            });
          });
        });
        return workshopDates;
      }

      let allWorkshopDates = getAllWorkshopDates(ordersResponse.body);
      cy.log(JSON.stringify(allWorkshopDates));
    });
  });
});
