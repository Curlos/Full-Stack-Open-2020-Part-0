const listHelper = require("../utils/list_helper");

describe("totalLikes", () => {
	test("when list has only one blog, equals the likes of that", () => {
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
		const result = listHelper.totalLikes(listWithOneBlog);
		expect(result).toBe(5);
	});

	test("of many values is the sum of all the likes in each blog", () => {
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
		];

		expect(listHelper.totalLikes(listWithManyBlogs)).toBe(75);
	});
});
