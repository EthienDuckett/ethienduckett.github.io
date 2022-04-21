window.onload = (function () {
	let URL="https://ethienduckett.github.io/blog/database.json"
	fetch(URL)
		.then(response => response.json())
			.then(json => {
				console.log("Successful database fetch");
				window.database = JSON.parse(json);
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
	if (index >= blogs.length) {
		alert("There are no more blogs left");
		return;
	}
	for (const blog of blogs) {
		let name = Object.keys(window.database)[index];
		let blog_data = window.database[name];

		blog.children[0].innerHTML = name;
		blog.children[1].innerHTML = blog_data["hook"];
		blog.children[2].children[0].innerHTML = blog_data["creation_time"];
		
		blog.children[2].children[1].innerHTML = `<a>${blog_data["start_file"]}</a>`;
		index++;
		if (index >= blogs.length) {
			count.index = String(index);
			return;
		}

	}
	count.index = String(index);
}
