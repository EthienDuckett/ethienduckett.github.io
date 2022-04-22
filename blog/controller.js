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
				window.keys = Object.keys(window.database);
				window.len = window.keys.length;
				setIndex(0);
				nextPage();
			});
})
function copyIndex() {
	navigator.clipboard.writeText(String(getIndex()));
}
function goToIndex(inputID) {
	let input = document.getElementById(inputID);
	let num = Number(input.value)
	if (isNaN(num)) {
		console.log(`index is Not a Number`);
		alert(`${input.value} is not a number`);
		return;
	}
	if (num >= window.len) {
		num = window.len-1
	} else if (num < 0) {
		num = 0;
	}
	let blogs = document.getElementsByClassName("blog");
	// Clear blogs
	for (blog of blogs) {
		blog.children[0].innerHTML = "";
		blog.children[1].innerHTML = "";
		blog.children[2].children[0].innerHTML = "";
		let start_file = "";
		blog.children[2].children[1].innerHTML = "";
	}
	setIndex(num);
	nextPage();
}
function nextPage(){
	let index = getIndex();
	let blogs = document.getElementsByClassName("blog");
	if (window.lastPaging == "prev") {
		index += blogs.length;
		if (index >= window.len) {
			index=len;
		}
	}
	window.lastPaging = "next";
	if (index >= window.len) {
		setIndex(len);
		alert("There are no more blogs left");
		return;
	}
	const re = new RegExp("(?<=\/).*");
	
	for (const blog of blogs) {
		let name = window.keys[index];
		let blog_data = window.database[name];

		blog.children[0].innerHTML = name;
		blog.children[1].innerHTML = blog_data["hook"];
		blog.children[2].children[0].innerHTML = blog_data["creation_time"];
		let start_file = blog_data["start_file"];
		blog.children[2].children[1].innerHTML = `<a href="${start_file}">${re.exec(start_file)}</a>`;
		index++;
		if (index >= window.len) {
			setIndex(len);
			return;
		}
	}
	setIndex(index);
}

function prevPage(){
	let index = getIndex();
	let blogs = document.getElementsByClassName("blog");
	if (window.lastPaging == "next") {
		//index -= blogs.length;
		if (index < 0) {
			index=0;
		}
	}
	window.lastPaging = "prev";
	if (index <= 0) {
		alert("There are no more blogs left");
		return;
	}
	if (index >= window.len) {
		index = window.len-1;
	}
	const re = new RegExp("(?<=\/).*");
	let blog;
	for (let i = index; i >= 0; i--) {
		blog = blogs[i];
		let name = window.keys[index];
		let blog_data = window.database[name];
		blog.children[0].innerHTML = name;
		blog.children[1].innerHTML = blog_data["hook"];
		blog.children[2].children[0].innerHTML = blog_data["creation_time"];
		let start_file = blog_data["start_file"];
		blog.children[2].children[1].innerHTML = `<a href="${start_file}">${re.exec(start_file)}</a>`;
		index--;
		if (index < 0) {
			setIndex(0);
			return;
		}
	}
	setIndex(index);
}
