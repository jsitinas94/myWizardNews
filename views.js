function postList(posts) {

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
                ${posts.map(post => `
                <div class='news-item'>
                    <p>
                    <span class="news-position">${post.id}. ▲</span>  <a href="/posts/${post.id}">${post.title}</a>
                    <small>(by ${post.name})</small>
                    </p>
                    <small class="news-info">
                    ${post.upvotes} upvotes | ${ timeAgo(post.date)}
                    </small>
                </div>`
                ).join('')}
            </div>
            </body>
        </html>
        `
    return html;
}

function postDetails(post) {
    if(!post.id) {
        next(error)
      } else {
        console.log("no error thrown")
      
  
      const {title, name, content} = post;
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
        return html
    }
}

module.exports = { postList: postList, postDetails };