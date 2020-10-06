const listHelper = require("../utils/list_helper");

describe("most blogs", () => {
	test("when list has only no blogs, equals no author and 0 blogs", () => {
		const listWithNoBlogs = [];
		const result = listHelper.mostBlogs(listWithNoBlogs);
		expect(result).toBe("No blogs in list");
	});

	test("when list has only one blog, equals the author of that blog", () => {
		const listWithOneBlog = [
			{
				_id: "5a422aa71b54a676234d17f8",
				title: "Go To Statement Considered Harmful",
				author: "Edsger W. Dijkstra",
				url:
					"http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
				likes: 5,
				__v: 0,
			},
		];
		const result = listHelper.mostBlogs(listWithOneBlog);
		expect(result).toEqual({
			author: "Edsger W. Dijkstra",
			blogs: 1,
		});
	});

	test("of many values is the author with most blogs", () => {
		const listWithManyBlogs = [
			{
				_id: "5f73b157db1c0bf60bad5b83",
				title: "Go To Statement Considered Harmful",
				author: "Edsger W. Dijkstra",
				url:
					"http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
				likes: 5,
				__v: 0,
			},
			{
				_id: "5f73d9c67db76c009eba7ba5",
				title: "4 factors that could help Heat upset Lakers",
				author: "Sekou Smith",
				url:
					"https://www.nba.com/article/2020/09/29/4-factors-how-heat-can-upset-lakers",
				likes: 50,
				__v: 0,
			},
			{
				_id: "5f73db12bce868015731ed34",
				title: "4 factors that could help Heat upset Lakers",
				author: "Sekou Smith",
				url:
					"https://www.nba.com/article/2020/09/29/4-factors-how-heat-can-upset-lakers",
				likes: 20,
				__v: 0,
			},
			{
				_id: "5f73b157db1c0bf60bad5b83",
				title: "Go To Statement Considered Harmful",
				author: "Edsger W. Dijkstra",
				url:
					"http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
				likes: 5,
				__v: 0,
			},
			{
				_id: "5f73b157db1c0bf60bad5b83",
				title: "Go To Statement Considered Harmful",
				author: "Edsger W. Dijkstra",
				url:
					"http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
				likes: 5,
				__v: 0,
			},
			{
				_id: "5f73b157db1c0bf60bad5b83",
				title: "Go To Statement Considered Harmful",
				author: "Edsger W. Dijkstra",
				url:
					"http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
				likes: 5,
				__v: 0,
			},
			{
				_id: "5f73b157db1c0bf60bad5b83",
				title: "Go To Statement Considered Harmful",
				author: "Edsger W. Dijkstra",
				url:
					"http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
				likes: 5,
				__v: 0,
			},
			{
				_id: "5f73b157db1c0bf60bad5b83",
				title:
					"‘Kelly Olynyk on LeBron James? Unless there’s a lot of alcohol’: Zach Lowe on how Lakers could beat Heat in NBA finals",
				author: "Samir Mehdi",
				url:
					"https://thesportsrush.com/nba-news-kelly-olynyk-on-lebron-james-unless-theres-a-lot-of-alcohol-zach-lowe-on-how-lakers-could-beat-heat-in-nba-finals/",
				likes: 5,
				__v: 0,
			},
			{
				_id: "5f73b157db1c0bf60bad5b83",
				title:
					"‘Kelly Olynyk on LeBron James? Unless there’s a lot of alcohol’: Zach Lowe on how Lakers could beat Heat in NBA finals",
				author: "Samir Mehdi",
				url:
					"https://thesportsrush.com/nba-news-kelly-olynyk-on-lebron-james-unless-theres-a-lot-of-alcohol-zach-lowe-on-how-lakers-could-beat-heat-in-nba-finals/",
				likes: 52,
				__v: 0,
			},
		];

		expect(listHelper.mostBlogs(listWithManyBlogs)).toEqual({
			author: "Edsger W. Dijkstra",
			blogs: 5,
		});
	});
});
