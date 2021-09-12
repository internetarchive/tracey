/**
 * Main node web server
 */

/* eslint-disable no-console */

import http from 'http'
import { createReadStream } from 'fs'

const TITLE = 'tracey jaquith likes to dev 🐋'
const SLIDES = 'https://archive.org/~tracey/slides/'
const ME = {
  // When updating a "slides only" w/ a new video link:
  //   [add] href: 'https://www.youtube.com/watch?v=1n1gPMxg8bg',
  //   [add (derived from 'slug')] slides: 'https://archive.org/~tracey/slides/hashiconf',
  //   [drop] slug
  'Presentations & Talks': [{
    href: 'https://www.youtube.com/watch?v=1n1gPMxg8bg',
    slides: 'https://archive.org/~tracey/slides/hashiconf',
    title: 'HashiConf Europe 2021',
    img: 'hashiconf.jpg',
    descrip: 'GitLab + Nomad = A Dream Come True<hr><a href="https://twitter.com/HashiCorp/status/1400845639009906693">☀️ (cute!) TEASER VIDEO 🌲</a><hr>',
  }, {
    href: 'https://archive.org/details/tracey-jaquith-kubernetes-to-nomad?start=0',
    slides: 'https://archive.org/~tracey/slides/nomad',
    title: 'Moving archive.org from Kubernetes to Nomad',
    img: 'https://archive.org/~tracey/slides/nomad/deploys.jpg',
    descrip: 'What is Orchestration?  How do Containers help?  How did we move Kubernetes to Nomad using GitLab plus a single templated common job file?',
  }, {
    href: 'https://archive.org/details/tracey-jaquith-kubernetes-to-nomad?start=1057',
    slides: 'https://archive.org/~tracey/slides/derive-speedups',
    title: 'Deriver (Item Processing) Speedups',
    img: 'https://media.giphy.com/media/11CGJUWW1TqnHW/source.gif',
    descrip: 'Speeding up item processing at archive.org.  GPUs, single-pass mp4 processing, serverless deriving with arbitrary containers, and more!',
  }, {
    href: 'https://archive.org/details/tracey-jaquith-kubernetes-to-nomad?start=1734',
    slides: 'https://archive.org/~tracey/slides/word-salad',
    title: 'Word Salad - a word game',
    img: 'https://archive.org/~tracey/slides/word-salad/screenshot.jpg',
    descrip: 'I made a NY Times Spelling Bee knock-off game.  What can you do with 7 letters? 😺',
  }, {
    href: 'https://archive.org/details/devops-gitlab-nomad-cicd-from-scratch--part1of2',
    slides: 'https://archive.org/~tracey/slides/devops/2021-03-31',
    title: '[1/2] Setup GitLab, Nomad, Consul & Fabio',
    img: 'https://archive.org/download/devops-gitlab-nomad-cicd-from-scratch--part1of2/devops-gitlab-nomad-cicd-from-scratch--part1of2_itemimage.png',
    descrip: '🚂  DevOps Training: part 1 of 2: Build up GitLab (via Docker omnibus) + basic & secure Nomad & Consul pair of daemons, towards full CI/CD pipelines, on Digital Ocean'
  }, {
    href: 'https://archive.org/details/devops-gitlab-nomad-cicd-from-scratch--part2of2',
    slides: 'https://archive.org/~tracey/slides/devops/2021-04-07',
    title: '[2/2] Add GitLab Runner & Setup full CI/CD pipelines',
    img: 'https://archive.org/download/devops-gitlab-nomad-cicd-from-scratch--part2of2/devops-gitlab-nomad-cicd-from-scratch--part2of2_itemimage.jpg',
    descrip: '🚂  DevOps Training: part 2 of 2: setup GitLab Runner and tie everything together to get full end-to-end CI/CD pipelines working cleanly'
  }, {
    href: 'https://archive.org/~tracey/slides/devops/2021-02-17',
    slides: 'https://archive.org/~tracey/slides/devops/2021-02-17',
    title: 'setup GitLab, Nomad, Consul & GitLab Runner on your Mac/laptop',
    img: 'gitlab-runner.jpg',
    descrip: '🚂  DevOps Training: 3 part series: <a href="https://archive.org/~tracey/slides/devops/2021-02-17">[1/3] Setup GitLab & GitLab Runner on Mac</a> <a href="https://archive.org/~tracey/slides/devops/2021-02-24">[2/3] Setup Nomad & Consul</a> <a href="https://archive.org/~tracey/slides/devops/2021-03-10">[3/3] connect everything</a>'
  }, {
    href: 'https://archive.org/~tracey/slides/devops/2021-02-03',
    slides: 'https://archive.org/~tracey/slides/devops/2021-02-03',
    title: 'Create a webapp on GitLab',
    img: 'create-webapp.jpg',
    descrip: '🚂  DevOps Training: hands on webapp creation, start to finish, full CI/CD pipelines'
  }, {
    href: 'https://www.hashicorp.com/resources/gitlab-nomad-gitops-internet-archive-migrated-from-kubernetes-nomad-consul',
    slides: 'https://archive.org/~tracey/slides/hashitalks',
    title: 'HashiTalks 2021',
    img: 'hashitalks.png',
    descrip: 'GitLab + Nomad: a GitOps Dream Come True',
  }, {
    href: 'https://youtu.be/L7_endXVkHY?t=2084',
    slides: 'https://archive.org/~tracey/slides/aaron-swartz-day-2020',
    title: 'Aaron Swartz Day 2020',
    img: 'aaron2.jpg',
    descrip: 'Processing Hype Project 🚀<br> (It\'s not PHP ;-)<br> Modern JS and Serverless processing',
  }, {
    href: 'https://www.youtube.com/watch?v=6mAmH_-HCxg',
    slides: 'https://archive.org/~tracey/slides/gitlab-commit',
    title: 'GitLab Commit 2020',
    img: '48_IG_Wall.png',
    descrip: 'Simple CI/CD with GitLab + Nomad',
  }, {
    href: 'https://www.youtube.com/watch?v=3g8VmHQux6s',
    slides: 'https://archive.org/~tracey/slides/aaron-swartz-day-2019',
    title: 'Aaron Swartz Day 2019',
    img: 'aaron.jpg',
    descrip: 'Internet Archive - Pods & Pods - ++diversity',
  }, {
    href: 'https://www.youtube.com/watch?v=rzgKDdFTEmQ',
    slides: 'https://archive.org/~tracey/slides/kubecon',
    title: 'KubeCon 2018 - Seattle',
    img: 'kubecon.jpg',
    descrip: 'Migrating Internet Archive to Kubernetes',
  }, {
    href: 'https://archive.org/details/auto-devops',
    slides: 'https://archive.org/~tracey/slides/auto-devops',
    title: 'Internet Archive Engineering 2018 - San Francisco',
    img: 'https://archive.org/~tracey/slides/auto-devops/devops-loop-and-spans-small-490x227.png',
    descrip: `GitLab 'Auto DevOps' Changes Everything<br>
      Dev & Ops Harmony - Confessions of a middle child`,
  }, {
    // talk w/o video
    slug: 'demuxed-third-eye',
    title: 'Demuxed 2018 - San Francisco',
    img: 'https://archive.org/download/third-eye/third-eye.png',
    descrip: 'Third Eye - tweeting TV text overlays.  CNN MSNBC FOXNEWS BBCNEWS.  (chyrons / lower thirds)',
  }, {
    href: 'https://www.youtube.com/watch?v=LSoWf3E-IPo',
    slides: 'https://archive.org/~tracey/slides/demuxed-webamp',
    title: 'Demuxed 2018 - San Francisco',
    img: 'webamp.jpg',
    descrip: 'WebAmp Lightning Talk [WinAmp in JS]<i>(and i tell bad jokes)</i>',
  }, {
    slug: 'mozfest17',
    title: 'MozFest 2017 - London',
    img: 'mozfest17.jpg',
    descrip: 'TV Archives cracked Open "AI for IA" -- Artificial Intelligence for Internet Archive',
  }, {
    href: 'https://www.youtube.com/watch?v=0gVOlDDg4z4',
    slides: 'https://docs.google.com/presentation/d/1UfyTmXhe39EohAZxS_lktnqspF5uwV4_QsQsT7AoRbs/edit?ts=57fe4fc0#slide=id.g1840168ce8_2_0',
    title: 'Demuxed 2016 - San Francisco',
    img: 'popcorn.jpg',
    descrip: 'Tracey Jaquith - Popcorn Reborn! Open Video Editor from Mozilla',
  },
  ],
  // xxxx https://github.com/traceypooh/textAV
  // xxxx https://www.slideshare.net/tracey_pooh/presentations
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
👆 <i><b> expert plastic square presser</b></i>
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
          ${card.slides ? `<b><a href="${card.slides}">SLIDES 📰</a></b>` : ''}
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

  if (file === 'node_modules/bootstrap/dist/css/bootstrap.min.css' ||
      file === 'node_modules/bootstrap/dist/css/bootstrap.min.css.map') {
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
  try {
    createReadStream(file).pipe(res)
  } catch (e) {
  }
}).listen(5000)
