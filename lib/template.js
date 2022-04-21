module.exports = {
  HTML:function(title, body){
    return `
    <!doctype html>
    <html>
    <head>
      <title>Rest - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">JSON</a></h1>
      ${body}
    </body>
    </html>
    `;
  }
}
