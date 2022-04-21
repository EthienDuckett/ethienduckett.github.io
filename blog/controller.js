window.onload = (function () {
	let URL="https://ethienduckett.github.io/blog/database.json"
	fetch(URL)
		.then(response => response.json())
			.then(json => {
				console.log("Successful database fetch");
				window.database = json;
				let count = document.createElement("meta");
				count.id = "blog_index";
				count.index = "0";
				document.getRootNode().children[0].appendChild(count);
				nextPage();
			});
})
function nextPage(){
	let count = document.getElementById("blog_index");
	let index = Number(count.index);
	let blogs = document.getElementsByClassName("blog");
	if (window.lastPaging == "prev") {
		index += blogs.length;
		if (index >= blogs.length) {
			index=blogs.length;
		}
	}
	window.lastPaging = "next";
	if (index >= blogs.length) {
		alert("There are no more blogs left");
		return;
	}
	const re = new RegExp("(?<=\/).*");
	for (const blog of blogs) {
		let name = Object.keys(window.database)[index];
		let blog_data = window.database[name];

		blog.children[0].innerHTML = name;
		blog.children[1].innerHTML = blog_data["hook"];
		blog.children[2].children[0].innerHTML = blog_data["creation_time"];
		
		let start_file = blog_data["start_file"];
		blog.children[2].children[1].innerHTML = `<a href="${start_file}">${re.exec(start_file)}</a>`;
		index++;
		if (index >= blogs.length) {
			count.index = String(index);
			return;
		}
	}
	count.index = String(index);
}

function prevPage(){
	let count = document.getElementById("blog_index");
	let index = Number(count.index);
	let blogs = document.getElementsByClassName("blog");
	if (window.lastPaging == "next") {
		index -= blogs.length;
		if (index < 0) {
			index=0;
		}
	}
	window.lastPaging = "prev";
	console.log("prevPage()");
	if (index-blogs.length+1 <= 0) {
		alert("There are no more blogs left");
		return;
	}
	if (index >= blogs.length) {
		index--;
	}
	const re = new RegExp("(?<=\/).*");
	let blog;
	for (let i = blogs.length-1; i >= 0; i--) {
		console.log("iteration");
		blog = blogs[i];
		let name = Object.keys(window.database)[index];
		let blog_data = window.database[name];

		blog.children[0].innerHTML = name;
		blog.children[1].innerHTML = blog_data["hook"];
		blog.children[2].children[0].innerHTML = blog_data["creation_time"];
		let start_file = blog_data["start_file"];
		blog.children[2].children[1].innerHTML = `<a href="${start_file}">${re.exec(start_file)}</a>`;
		index--;
		if (index <= 0) {
			index = 0
			count.index = String(index);
			return;
		}
	}
	count.index = String(index);
}
