/**
 * Main node web server
 */

/* eslint-disable no-console */

import http from 'http'
import { createReadStream } from 'fs'

const TITLE = 'Tracey'
const SLIDES = 'https://archive.org/~tracey/slides'
const ME = {
  talks: [{
    slug: 'gitlab-commit',
    title: 'GitLab Commit 2020',
    img: '48_IG_Wall.png',
  },
  ],
}

/**
 * Outputs nice micro access.log like entry
 * @param string file  File being served
 * @param int code  HTTP status code
 */
function alog(file, code = 200) {
  console.log(`${new Date().toISOString().slice(0, 19).replace(/T/, ' ')} ${code} /${file || ''}`)
}


/**
 * Returns beginning static markup for @see markup()
 *
 * @param string title  Page / H1 title
 */
function markup_pre() {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta property="title" content="${TITLE}">
  <link href="/services/clusters/node_modules/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
  <style>
.groups {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  align-items: top;
}
h2 {
  margin-top: 75px;
}
h2 img {
  max-width: 50px;
  max-height: 50px;
}
.groups li {
  list-style-type: none;
}
.groups a {
  display: block;
}
  </style>
</head>

<body>
<div class="container" style="width:98%; max-width:98%">

<h1>${TITLE}</h1>
`
}


async function markup() {
  let str = ''
  for (const [header, group] of Object.entries(ME)) {
    str += `
<h2>${header}</h2>
<div class="groups">`

    for (const [project] of group) {
      str += `
        <div class="card card-body bg-light">
          <a href="${SLIDES}${group.slug}">
            <img src="${group.img}"/>
          </a>
          <h3>
            <a href="${SLIDES}${group.slug}">${project.title}</a>
          </h3>`
    }

    str += '</div>'
  }

  return str
}


// Main web server
http.createServer((req, res) => {
  let type = 'text/html'
  const file = req.url
    .slice(1) // nix lead /
    .replace(/^services\/clusters\//, '') // sigh - current way paths are proxy-passed to us

  if (file === 'node_modules/bootstrap/dist/css/bootstrap.min.css') {
    type = 'text/css'
  } else if (file.endsWith('.jpg')) {
    type = 'image/jpg'
  } else if (file.endsWith('.png')) {
    type = 'image/png'
  } else if (file.endsWith('.svg')) {
    type = 'image/svg'
  } else if (file === 'favicon.ico') {
    type = 'image/x-icon'
  } else if (file === '') {
    alog()
    res.writeHead(200)
    res.end(markup_pre().concat(markup()))
    return
  } else {
    alog(file, 404)
    res.writeHead(404)
    res.end(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"></head><body>
            🇫🇷 Merde, il n'y a rien ici! - Corentin`)
    return
  }

  // static file - send it directly out
  alog(file)
  res.writeHead(200, { 'Content-Type': type })

  createReadStream(file).pipe(res)
}).listen(5000)
