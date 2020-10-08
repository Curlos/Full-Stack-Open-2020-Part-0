import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe("<Blog />", () => {
	let blog;
	let user;
	let component;

	beforeEach(() => {
		blog = {
			title: "4 factors that could help Heat upset Lakers75",
			author: "Sekou Smith",
			url:
				"https://www.nba.com/article/2020/09/29/4-factors-how-heat-can-upset-lakers",
			user: {
				id: "5f7b6cbde09c2b458380405",
				name: "Carlos Martinez",
				username: "curlos",
			},
		};

		user = {
			username: "curlos",
			name: "Carlos Martinez",
		};

		component = render(<Blog blog={blog} user={user} />);
	});

	test("renders the blog's title and author", () => {
		expect(component.container.querySelector(".authorAndTitle")).toBeDefined();
	});

	test("by default likes and url are not rendered", () => {
		const div = component.container.querySelector(".likesAndUrl");

		expect(div).toHaveStyle("display: none");
	});

	test("url and likes shown when view button clicked", () => {
		const button = component.getByText("view");
		fireEvent.click(button);

		const div = component.container.querySelector(".likesAndUrl");
		expect(div).not.toHaveStyle("display: none");

		component.debug();
	});

	test("if like button clicked twice, there should be two event calls", () => {
		const likeHandler = jest.fn();

		const likeButton = component.getByText("like");
		likeButton.onclick = likeHandler;
		fireEvent.click(likeButton);
		fireEvent.click(likeButton);

		expect(likeHandler).toHaveBeenCalledTimes(2);
	});
});
