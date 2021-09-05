const express = require("express");
const app = express();
const data = require('./postBank')
const morgan = require('morgan');

app.use(morgan('dev'));

app.use(express.static('public')) 

app.get("/", (req, res) => {
  
  const postList = data.list();

  const html = `
    <!DOCTYPE html>
      <html>
        <head>
          <title>Wizard News</title>
          <link rel="stylesheet" href="/style.css" />
        </head>
        <body>
        <div class="news-list">
        <header><img src="/logo.png"/>Wizard News</header>
            ${postList.map(post => `
              <div class='news-item'>
                <p>
                  <span class="news-position">${post.id}. ▲</span>  <a href="/posts/${post.id}">${post.title}</a>
                  <small>(by ${post.name})</small>
                </p>
                <small class="news-info">
                  ${post.upvotes} upvotes | ${post.date}
                </small>
              </div>`
            ).join('')}
          </div>
        </body>
      </html>
    `

  res.send(html)

});

app.get('/posts/:id', (req, res, next) => {

  const id = req.params.id;
  const postItem = data.find(id);

    if(!postItem.id) {
      next(error)
    } else {
      console.log("no error thrown")
    

    const {title, name, content} = postItem;
    const html = `
        <!DOCTYPE html>
          <html>
            <head>
              <title>Wizard News</title>
              <link rel="stylesheet" href="/style.css" />
            </head>
            <body>
              <div class="news-list">
                <header><img src="/logo.png"/>Wizard News</header>
                <div class='news-item'>
                  <h1>${title} <small>(by ${name})</small></h1>
                    <p>
                      ${content}
                    </p>
                </div>
              </div>
            </body>
          </html>
        `
      res.send(html);
    }

});


app.use((error, req, res, next) => {
  if (res.headersSent) {
    console.log("headers sent")
    return next(err)
  } else {
    console.log("headers not sent")
    res.status(404)
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <header><img src="/logo.png"/>Wizard News</header>
      <div class="not-found">
        <p>Accio Page! 🧙‍♀️ ... Page Not Found</p>
        <img src="/dumbledore-404.gif" />
      </div>
    </body>
    </html>`
    res.send(html)
  }
  
})

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
