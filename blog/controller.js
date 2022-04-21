// https://w3schools.com/js/js_cookies.asp (Unknown license) Unmodified
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
// End of w3schools snippet
// Convenience functions:
function setIndex(i) {
	setCookie("index", String(i), "7");
}
function getIndex() {
	return Number(getCookie("index"));
}
window.onload = (function () {
	let URL="https://ethienduckett.github.io/blog/database.json"
	fetch(URL)
		.then(response => response.json())
			.then(json => {
				console.log("Successful database fetch");
				window.database = json;
				setIndex(0);
				nextPage();
			});
})
function nextPage(){
	let index = getIndex();
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
			setIndex(index);
			return;
		}
	}
	setIndex(index);
}

function prevPage(){
	let index = getIndex();
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
			setIndex(0);
			return;
		}
	}
	setIndex(index);
}
