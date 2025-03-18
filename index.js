const SLIDES = 'https://tracey.archive.org/'
const GAMES = [
  {
    href: 'https://word-salad.archive.org',
    title: 'Word Salad',
    img: 'https://word-salad.archive.org/logo.png',
    descrip: 'Word puzzle game very similar to NY Times Spelling Bee 🐝 https://www.nytimes.com/puzzles/spelling-bee but all hand-made...',
    src: 'https://github.com/traceypooh/word-salad',
  },
  {
    href: 'https://wordsmith.archive.org',
    title: 'WordSmith: Wordle game',
    img: 'wordsmith.jpg',
    descrip: 'Home grown and like a typewriter ~/:::/º <br> Very similar to https://www.nytimes.com/games/wordle, but all hand-made. <br> Infinite play.',
    src: 'https://github.com/internetarchive/wordsmith',
  },
]
const TALKS = [
  // When updating a "slides only" w/ a new video link:
  //   [add] href: 'https://www.youtube.com/watch?v=1n1gPMxg8bg',
  //   [add (derived from 'slug')] slides: 'https://tracey.archive.org/hashiconf',
  //   [drop] slug
  {
    href: 'https://youtu.be/MZ-PQjP-XRo?t=4314',
    slides: 'https://tracey.archive.org/aaron-swartz-day-2024',
    title: 'Microservices, Monoliths & Operational Security <br> The Internet Archive in 2024',
    img: 'first-big-break.jpg',
    descrip: 'Aaron Swartz Day 2024',
  },
  {
    href: 'https://www.youtube.com/watch?v=iNpMjj2qtNw',
    slides: 'https://tracey.archive.org/demuxed-2024',
    title: 'Demuxed 2024:<br> What\'s on TV?<br> 4 editors and 2 robots walk into a bar..',
    img: 'demuxed-2024.jpg',
    descrip: `We social post hourly: "What's on TV?"<br>
from TV news "chyrons".<hr>

The non-captions news text (eg: BIDEN VISITS MEXICO) which shows up at the bottom of the TV, are  written by human editors -- yet are not carried anywhere inside the TV streams.<br>
What's a girl with robots to do?<hr>

We use ffmpeg to crop the image area; tesseract to OCR the image into text; and GPT AI to summarize, remove ads, and cleanup the text.`,
  },
  {
    // href: 'https://traceypooh.github.io/slides/aaron-swartz-day-2023',
    slug: 'aaron-swartz-day-2023',
    title: 'What\'s on TV? <br> 4 editors and 2 robots walk into a bar..',
    img: 'aaron3.jpg',
    descrip: 'Aaron Swartz Day 2023. <br> Using TV news "chyron" text overlays in the "lower third" (from human editors), image-to-text (OCR), grouping/filtering, and AI gpt-4 to summarize --> we social post hourly: <br> "What\'s on TV?"',
  },
  {
    href: 'https://archive.org/details/safer-containers-at-archive-2023',
    slides: 'https://tracey.archive.org/podman',
    title: 'Safer Containers at the Archive in 2023',
    img: 'safer-containers.jpg',
    descrip: 'Tracey Jaquith & Rob Keizer talk about how to run docker containers more safely & quickly.<br>  Our team shares some high-level reasons why we\'re finding `podman` (a drop-in replacement for `docker` from RedHat) a more secure way to run containers',
  },
  {
    href: 'https://archive.org/details/thunder_day2_1000_-_tracey_jaquith',
    slides: 'https://tracey.archive.org/dweb-2023',
    title: 'Blogtini: Blogs & static Websites: Markdown + 1 line of Javascript',
    img: 'dwebcamp.jpg',
    descrip: 'DWebCamp 2023 Talk.<br>  Create blogs and websites with just MarkDown and a single JavaScript include.  Decentralize & Archive your content forever with content-first beautiful blogs & sites.  Host & serve it for free.  Change your theme with one line change.  <a href="https://blogtini.com">blogtini.com</a>',
  },
  {
    href: 'https://www.youtube.com/watch?v=dnPzJyfKTcg',
    slides: 'https://tracey.archive.org/aaron-swartz-day-2022',
    title: 'Markdown & JS Blogs/Websites; Call for volunteers for IA JS project',
    img: 'aaron2.jpg',
    descrip: 'Create free blogs and websites entirely from markdown leveraging one JavaScript file.  Take back control of your content with a newer vision for internetworked, decentralized social sharing with friends, family, and the world.  Your website will be archivable, decentralize-able, 100% content-first, and will live forever.  <a href="https://blogtini.com">blogtini.com</a>',
  },
  {
    slug: 'dweb-2022',
    slides: 'https://tracey.archive.org/dweb-2022',
    title: 'Decentralized Social via markdown Blogs (+JS)',
    img: 'view-source.jpg',
    descrip: 'Create free blogs and websites entirely from markdown leveraging one JavaScript file.  Take back control of your content with a newer vision for internetworked, decentralized social sharing with friends, family, and the world.  Your website will be archivable, decentralize-able, 100% content-first, and will live forever.  <a href="https://blogtini.com">blogtini.com</a>',
  },
  {
    href: 'https://www.youtube.com/watch?v=NXsvhSgYKfk',
    slides: 'https://tracey.archive.org/hashitalks-2022',
    title: 'HashiTalks 2022',
    img: 'hashitalks-2022.jpg',
    descrip: 'Nomad the Easy Way - Creating GitHub & GitLab Pipelines in Minutes<hr><i>(also pre-announcing<br> <a style="display:inline" href="https://github.com/internetarchive/hind">HinD - Hashistack-in-Docker</a>)</i>',
  },
  {
    href: 'https://www.youtube.com/watch?v=LAL5js2vl0E&t=5192s',
    slides: 'https://github.com/traceypooh/multi-line-chart',
    title: 'Aaron Swartz Day 2021',
    img: 'aaron.jpg',
    descrip: 'How a Denosaur 🦕 is making it so Everyone Can Code.<br>Aaron wanted to democratize everything - power to everyone.  I live code a single JS file & fun graph visualization of archive.org live concerts, and how anyone can code with zero setup.',
  },
  {
    href: 'https://www.youtube.com/watch?v=pzMlOtrhEwc&t=786s',
    img: 'https://archive.org/download/internet-archive-25th-anniversary-event/internet-archive-25th-anniversary-event.thumbs/Internet%20Archive%2025th%20Anniversary%20102121_000001.jpg',
    title: 'Internet Archive 25th Anniversary',
    descrip: 'As founding coder of Internet Archive, I get to emcee our 25th Anniversary Celebration at our San Francisco Headquarters!',
  },
  {
    href: 'https://www.youtube.com/watch?v=yPwF2ms9MQ8',
    slides: 'https://tracey.archive.org/demuxed',
    title: 'Demuxed 2021',
    img: 'demuxed.jpg',
    descrip: '30,000 fps nginx - To Russia with Love<hr>Working a patch upstream to nginx mp4 module for exact start/end lossless server-side mp4 clipping<br><a href="https://2021.demuxed.com/">Demuxed 2021</a><hr><img style="float:right" src="images/tracey-memoji-love.png">I won audience favorite talk award for the day!',
  },
  {
    href: 'https://www.youtube.com/watch?v=1n1gPMxg8bg',
    slides: 'https://tracey.archive.org/hashiconf',
    title: 'HashiConf Europe 2021',
    img: 'hashiconf.jpg',
    descrip: 'GitLab + Nomad = A Dream Come True<hr><a href="https://twitter.com/HashiCorp/status/1400845639009906693">☀️ (cute!) TEASER VIDEO 🌲</a><hr>',
  },
  {
    href: 'https://archive.org/details/tracey-jaquith-kubernetes-to-nomad?start=0',
    slides: 'https://tracey.archive.org/nomad',
    title: 'Moving archive.org from Kubernetes to Nomad',
    img: 'https://tracey.archive.org/nomad/deploys.jpg',
    descrip: 'What is Orchestration?  How do Containers help?  How did we move Kubernetes to Nomad using GitLab plus a single templated common job file?',
  },
  {
    href: 'https://archive.org/details/tracey-jaquith-kubernetes-to-nomad?start=1057',
    slides: 'https://tracey.archive.org/derive-speedups',
    title: 'Deriver (Item Processing) Speedups',
    img: 'https://media.giphy.com/media/11CGJUWW1TqnHW/source.gif',
    descrip: 'Speeding up item processing at archive.org.  GPUs, single-pass mp4 processing, serverless deriving with arbitrary containers, and more!',
  },
  {
    href: 'https://archive.org/details/tracey-jaquith-kubernetes-to-nomad?start=1734',
    slides: 'https://tracey.archive.org/word-salad',
    title: 'Word Salad - a word game',
    img: 'https://tracey.archive.org/word-salad/screenshot.jpg',
    descrip: 'I made a NY Times Spelling Bee knock-off game.  What can you do with 7 letters? 😺',
  },
  {
    href: 'https://archive.org/details/devops-gitlab-nomad-cicd-from-scratch--part1of2',
    slides: 'https://tracey.archive.org/devops/2021-03-31',
    title: '[1/2] Setup GitLab, Nomad, Consul & Fabio',
    img: 'https://archive.org/download/devops-gitlab-nomad-cicd-from-scratch--part1of2/devops-gitlab-nomad-cicd-from-scratch--part1of2_itemimage.png',
    descrip: '🚂  DevOps Training: part 1 of 2: Build up GitLab (via Docker omnibus) + basic & secure Nomad & Consul pair of daemons, towards full CI/CD pipelines, on Digital Ocean',
  },
  {
    href: 'https://archive.org/details/devops-gitlab-nomad-cicd-from-scratch--part2of2',
    slides: 'https://tracey.archive.org/devops/2021-04-07',
    title: '[2/2] Add GitLab Runner & Setup full CI/CD pipelines',
    img: 'https://archive.org/download/devops-gitlab-nomad-cicd-from-scratch--part2of2/devops-gitlab-nomad-cicd-from-scratch--part2of2_itemimage.jpg',
    descrip: '🚂  DevOps Training: part 2 of 2: setup GitLab Runner and tie everything together to get full end-to-end CI/CD pipelines working cleanly',
  },
  {
    href: 'https://tracey.archive.org/devops/2021-02-17',
    slides: 'https://tracey.archive.org/devops/2021-02-17',
    title: 'setup GitLab, Nomad, Consul & GitLab Runner on your Mac/laptop',
    img: 'gitlab-runner.jpg',
    descrip: '🚂  DevOps Training: 3 part series: <a href="https://tracey.archive.org/devops/2021-02-17">[1/3] Setup GitLab & GitLab Runner on Mac</a> <a href="https://tracey.archive.org/devops/2021-02-24">[2/3] Setup Nomad & Consul</a> <a href="https://tracey.archive.org/devops/2021-03-10">[3/3] connect everything</a>',
  },
  {
    href: 'https://tracey.archive.org/devops/2021-02-03',
    slides: 'https://tracey.archive.org/devops/2021-02-03',
    title: 'Create a webapp on GitLab',
    img: 'create-webapp.jpg',
    descrip: '🚂  DevOps Training: hands on webapp creation, start to finish, full CI/CD pipelines',
  },
  {
    href: 'https://www.hashicorp.com/resources/gitlab-nomad-gitops-internet-archive-migrated-from-kubernetes-nomad-consul',
    slides: 'https://tracey.archive.org/hashitalks',
    title: 'HashiTalks 2021',
    img: 'hashitalks.png',
    descrip: 'GitLab + Nomad: a GitOps Dream Come True',
  },
  {
    href: 'https://youtu.be/L7_endXVkHY?t=2084',
    slides: 'https://tracey.archive.org/aaron-swartz-day-2020',
    title: 'Aaron Swartz Day 2020',
    img: 'aaron2.jpg',
    descrip: 'Processing Hype Project 🚀<br> (It\'s not PHP ;-)<br> Modern JS and Serverless processing',
  },
  {
    href: 'https://www.youtube.com/watch?v=6mAmH_-HCxg',
    slides: 'https://tracey.archive.org/gitlab-commit',
    title: 'GitLab Commit 2020',
    img: '48_IG_Wall.png',
    descrip: 'Simple CI/CD with GitLab + Nomad',
  },
  {
    href: 'https://www.youtube.com/watch?v=3g8VmHQux6s',
    slides: 'https://tracey.archive.org/aaron-swartz-day-2019',
    title: 'Aaron Swartz Day 2019',
    img: 'aaron.jpg',
    descrip: 'Internet Archive - Pods & Pods - ++diversity',
  },
  {
    href: 'https://www.youtube.com/watch?v=rzgKDdFTEmQ',
    slides: 'https://tracey.archive.org/kubecon',
    title: 'KubeCon 2018 - Seattle',
    img: 'kubecon.jpg',
    descrip: 'Migrating Internet Archive to Kubernetes',
  },
  {
    href: 'https://archive.org/details/auto-devops',
    slides: 'https://tracey.archive.org/auto-devops',
    title: 'Internet Archive Engineering 2018 - San Francisco',
    img: 'https://tracey.archive.org/auto-devops/devops-loop-and-spans-small-490x227.png',
    descrip: `GitLab 'Auto DevOps' Changes Everything<br>
      Dev & Ops Harmony - Confessions of a middle child`,
  },
  {
    // talk w/o video
    slug: 'demuxed-third-eye',
    title: 'Demuxed 2018 - San Francisco',
    img: 'https://archive.org/download/third-eye/third-eye.png',
    descrip: 'Third Eye - tweeting TV text overlays.  CNN MSNBC FOXNEWS BBCNEWS.  (chyrons / lower thirds)',
  },
  {
    href: 'https://www.youtube.com/watch?v=LSoWf3E-IPo',
    slides: 'https://tracey.archive.org/demuxed-webamp',
    title: 'Demuxed 2018 - San Francisco',
    img: 'webamp.jpg',
    descrip: 'WebAmp Lightning Talk [WinAmp in JS]<i>(and i tell bad jokes)</i>',
  },
  {
    slug: 'mozfest17',
    title: 'MozFest 2017 - London',
    img: 'mozfest17.jpg',
    descrip: 'TV Archives cracked Open "AI for IA" -- Artificial Intelligence for Internet Archive',
  },
  {
    slug: 'textAV',
    title: 'Archive TV & Captions',
    img: 'nyu.jpg',
    descrip: 'textAV conference <br> New York University, July 2017',
  },
  {
    href: 'https://www.youtube.com/watch?v=0gVOlDDg4z4',
    slides: 'https://docs.google.com/presentation/d/1UfyTmXhe39EohAZxS_lktnqspF5uwV4_QsQsT7AoRbs/edit?ts=57fe4fc0#slide=id.g1840168ce8_2_0',
    title: 'Demuxed 2016 - San Francisco',
    img: 'popcorn.jpg',
    descrip: 'Tracey Jaquith - Popcorn Reborn! Open Video Editor from Mozilla',
  },
  // xxxx https://www.slideshare.net/tracey_pooh/presentations
]


function main() {
  for (const [name, cards] of Object.entries({ GAMES, TALKS })) {
    let str = ''
    for (const card of cards) {
      const href = card.href || `${SLIDES}${card.slug}`
      str += `
        <div class="card card-body bg-light">
          <a href="${href}">
            <img src="${card.img?.startsWith('https://') ? '' : 'images/'}${card.img}"/>
          </a>
          <h3>
            <a href="${href}">${card.title}</a>
          </h3>
          ${card.descrip || ''}
          <br clear="all">
          ${card.slides ? `<b><a href="${card.slides}">SLIDES 📰</a></b>` : ''}
          ${card.src ? `<a href="${card.src}">(source code)</a>` : ''}
        </div>`
    }
    document.getElementById(name.toLowerCase()).innerHTML = str
  }
}


document.addEventListener('DOMContentLoaded', () => {
  main()
})
