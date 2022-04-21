# Blogging System
There are a few components to this blogging system and they are:
- index.html: a file which provides a front end to blog navigation.
- controller.js: a file which dynamically loads blog metadata and summaries.
- new_blog.sh: a file which creates and prepends to a blog metadata database.
- pretty.json: a file which new_blog.sh prepends to.
- database.json: a file which new_blog.sh compiles pretty.json to.

## new_blog.sh
run -h for help.
Advice: 
1. only pass pretty.json when editing the database
2. compile pretty.json to database.json (see -c option) whenever pushing a new blog to github.
