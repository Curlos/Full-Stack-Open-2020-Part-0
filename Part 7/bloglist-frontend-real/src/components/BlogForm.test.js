import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";

test("<BlogForm /> updates parent state and calls onSubmit", () => {
	const createBlog = jest.fn();

	const component = render(<BlogForm createBlog={createBlog} />);

	const title = component.container.querySelector(".titleInput");
	const author = component.container.querySelector(".authorInput");
	const url = component.container.querySelector(".urlInput");
	const createButton = component.getByText("create");

	component.debug(title);

	fireEvent.change(title, {
		target: { value: "LeBron James or Anthony Davis for NBA Finals MVP?" },
	});

	fireEvent.change(author, {
		target: { value: "Samir Mehdi" },
	});

	fireEvent.change(url, {
		target: {
			value:
				"https://thesportsrush.com/nba-news-lebron-james-or-anthony-davis-for-nba-finals-mvp-scottie-pippen-choses-which-lakers-star-deserves-fmvp/",
		},
	});
	fireEvent.click(createButton);
	createBlog.mock.calls[0][0];

	expect(createBlog.mock.calls).toHaveLength(1);

	expect(createBlog.mock.calls[0][0].title).toBe(
		"LeBron James or Anthony Davis for NBA Finals MVP?"
	);

	expect(createBlog.mock.calls[0][0].author).toBe("Samir Mehdi");

	expect(createBlog.mock.calls[0][0].url).toBe(
		"https://thesportsrush.com/nba-news-lebron-james-or-anthony-davis-for-nba-finals-mvp-scottie-pippen-choses-which-lakers-star-deserves-fmvp/"
	);
});
