describe("Blog app", function () {
	beforeEach(function () {
		cy.request("POST", "http://localhost:3001/api/testing/reset");
		const user = {
			name: "Matti Luukkainen",
			username: "mluukkai",
			password: "salainen",
		};
		cy.request("POST", "http://localhost:3001/api/users/", user);
		cy.visit("http://localhost:3000");
	});

	it("Login form is shown", function () {
		// ...
		cy.contains("login").click();
	});

	describe("Login", function () {
		it("succeeds with correct credentials", function () {
			// ...
			cy.contains("login").click();
			cy.get("#username").type("mluukkai");
			cy.get("#password").type("salainen");
			cy.get("#login-button").click();

			cy.contains("Matti Luukkainen logged-in");
		});

		it("fails with wrong credentials", function () {
			// ...
			cy.contains("login").click();
			cy.get("#username").type("mluukkai");
			cy.get("#password").type("wrong");
			cy.get("#login-button").click();

			cy.get(".error")
				.should("contain", "Wrong credentials")
				.and("have.css", "color", "rgb(255, 0, 0)")
				.and("have.css", "border-style", "solid");

			cy.get("html").should("not.contain", "Matti Luukkainen logged in");
		});
	});

	describe("when logged in", function () {
		beforeEach(function () {
			cy.login({ username: "mluukkai", password: "salainen" });
		});

		it("a new blog can be created", function () {
			cy.contains("new blog").click();
			cy.get(".titleInput").type("4 factors that could help Heat upset Lakers");
			cy.get(".authorInput").type("Sekou Smith");
			cy.get(".urlInput").type(
				"https://www.nba.com/article/2020/09/29/4-factors-how-heat-can-upset-lakers"
			);
			cy.get(".create-button").click();

			cy.contains("4 factors that could help Heat upset Lakers");
		});

		describe("and a blog exists", function () {
			beforeEach(function () {
				cy.createBlog({
					title: "another blog cypress",
					url: "http://localhost:3001/randomblog",
					author: "Sekou Smith2",
				});
			});

			it("if a blog can be liked", function () {
				cy.contains("another blog cypress");

				cy.get(".view-button").click();
				cy.get(".likeButton").click();
				cy.contains("likes 1");
			});

			it.only("if a blog can be deleted", function () {
				cy.contains("another blog cypress");
				cy.get(".view-button").click();
				cy.contains("remove")
					.click()
					.then(function () {
						cy.reload(true);
						cy.get("html").should("not.contain", "another blog cypress");
					});
			});
		});
	});
});
