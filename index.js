/**
 * Main node web server
 */

/* eslint-disable no-console */

import http from 'http'
import { createReadStream } from 'fs'

const TITLE = 'tracey likes to dev'
const SLIDES = 'https://archive.org/~tracey/slides/'
const ME = {
  Presentations: [{
    slug: 'gitlab-commit',
    title: 'GitLab Commit 2020',
    img: '48_IG_Wall.png',
    descrip: 'Simple CI/CD with GitLab + Nomad',
  }, {
    slug: 'kubecon',
    title: 'KubeCon 2018 - Seattle',
    img: 'kubecon.jpg',
    descrip: `Migrating Internet Archive to Kubernetes
      <br><b><a href="https://www.youtube.com/watch?v=rzgKDdFTEmQ">Video 📺</a></b>`,
  }, {
    slug: 'mozfest17',
    title: 'MozFest 2017 - London',
    img: 'mozfest17.jpg',
    descrip: 'TV Archives cracked Open "AI for IA" -- Artificial Intelligence for Internet Archive',
  }, {
    slug: 'demuxed-third-eye',
    title: 'Demuxed 2018 - San Francisco',
    img: 'https://archive.org/download/third-eye/third-eye.png',
    descrip: 'Third Eye - tweeting TV text overlays.  CNN MSNBC FOXNEWS BBCNEWS.  (chyrons / lower thirds)',
  }, {
    href: 'https://www.youtube.com/watch?v=0gVOlDDg4z4',
    title: 'Demuxed 2016 - San Francisco',
    img: 'popcorn.jpg',
    descrip: `Tracey Jaquith - Popcorn Reborn! Open Video Editor from Mozilla
      <br><b><a href="https://docs.google.com/presentation/d/1UfyTmXhe39EohAZxS_lktnqspF5uwV4_QsQsT7AoRbs/edit?ts=57fe4fc0#slide=id.g1840168ce8_2_0">Slides 📰</a></b>`,
  },
  ],
  // https://github.com/traceypooh/textAV
  // https://www.slideshare.net/tracey_pooh/presentations
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
  <link href="/node_modules/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
  <style>
.list {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(275px, 1fr));
  align-items: top;
}
h2 {
  margin-top: 75px;
}
.card {
  text-align: center;
}
.card img {
  max-width: 250px;
  max-height: 250px;
}
.card a {
  display: block;
}
  </style>
</head>

<body>
<div class="container" style="width:98%; max-width:98%">

<h1>${TITLE}</h1>
`
}


function markup() {
  let str = ''

  for (const [header, list] of Object.entries(ME)) {
    str += `
<h2>${header}</h2>
<div class="list">`

    for (const card of list) {
      const href = card.href || `${SLIDES}${card.slug}`
      str += `
        <div class="card card-body bg-light">
          <a href="${href}">
            <img src="${card.img}"/>
          </a>
          <h3>
            <a href="${href}">${card.title}</a>
          </h3>
          ${card.descrip || ''}
        </div>`
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
