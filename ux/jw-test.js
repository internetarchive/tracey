import $ from 'https://esm.ext.archive.org/jquery@3.6.1'
import { jwplayer, jwbase } from 'https://av.archive.org/js/jwplayer.js'

// eslint-disable-next-line no-console
const log = console.log.bind(console)

let idx = 0
const ready = {}

window.myplay = function myplay(trackno, vn, onPLI) {
  log(vn)
  log($(`#${vn}`))
  const $vnp = $(`#${vn}`).parent()
  let $rows = $vnp.find('.jwrow')// html5
  if (!$rows  ||  !$rows.length)
    $rows = $vnp.parent().find('.jwrow') // flash

  $rows.removeClass('playing')
  if (!ready[vn])
    return

  $($rows.get(trackno)).addClass('playing')
  if (!onPLI)
    jwplayer(vn).playlistItem(trackno)
}

function go(ttl, cfg, ialist) {
  // eslint-disable-next-line no-plusplus
  const vn = `v${++idx}`

  // eslint-disable-next-line no-param-reassign
  cfg.base = jwbase

  let htm = ''
  if (ialist) {
    $.each(cfg.playlist, (trackno, val) => {
      log(val)
      htm += (`<div class="jwrow" onclick="myplay(${trackno},'${vn}')">` +
              `<div class="tm">${typeof val.duration === 'undefined' ? '' : val.duration}</div>` +
              `<div class="n">${trackno + 1}</div>` +
              `<div class="ttl">${typeof (val.title) === 'undefined' ? '' : val.title}</div>` +
              '</div>')
    })
  }
  // eslint-disable-next-line no-param-reassign
  cfg.logo = {
    prefix: 'https://av.archive.org/jw/8',
    file: 'https://av.archive.org/jw/glogo-ghost.png',
    link: `https://archive.org${cfg.mediaid ? `/details/${cfg.mediaid}` : ''}`,
    hide: false,
  }

  if (cfg.mediaid) {
    // eslint-disable-next-line no-param-reassign
    cfg.sharing = {
      code: encodeURI(`<iframe src="http://example.com/embed/${cfg.mediaia}"/>`),
      link: `https://archive.org/details/${cfg.mediaid}`,
    }
  }

  const  wd = (typeof (cfg.width) === 'undefined' ? '' : `width: ${parseInt(cfg.width, 10)}px;`)
  const wd2 = (typeof (cfg.width) === 'undefined' ? '' : `width: ${parseInt(cfg.width, 10) + 25}px;`)
  log(htm)
  $('body').append(
    `<div style="display:inline-block;border:1px dashed gray;${wd2}">` +
    `<div style="display:inline-block;margin:5px;${wd}">` +
    `<div id="${vn}"></div>${
      htm
    }<h4 style="padding-left:50px;">(${vn}) ${ttl}</h4>` +
    '</div>' +
    '</div>',
  )
  jwplayer(vn).setup(cfg)
  if (cfg.mediaid  &&  typeof (cfg.height) !== 'undefined'   &&  (parseInt(cfg.height, 10) > 40)) {
    log(`giving buttons to ${vn}`)
    jwplayer(vn).on('ready', () => {
      ready[vn] = 1
      const iaid = cfg.mediaid
      this.addButton('https://av.archive.org/jw/glogo20x20.png', 'More Formats from Internet Archive', () => { location.href = `/details/${iaid}` }, 'btn1')
      this.addButton('https://av.archive.org/jw/share.png', 'Embedding Examples and Help', () => { location.href = `/help/video.php?identifier=${iaid}` }, 'btn2')
    })
  }
  if (ialist) {
    // eslint-disable-next-line no-return-assign
    jwplayer(vn).on('ready', () => ready[vn] = 1)
    jwplayer(vn).on('playlistItem', (e) => window.myplay(e.index, vn, true))
  }
}

function goL(ttl, cfg) {
  return go(ttl, cfg, 1)
}

goL('audio playlist, our own HTM playlist, flash primary', {
  controls: { hide: false },
  mediaid: 'cracker2008-09-06.teac.me80.ad20.flac16',
  primary: 'flash',
  playlist: [
    { file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t01.mp3', title: 'Intro', duration: 30 },
    { file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t02.mp3', title: 'One Fine Day', duration: 120 },
    { file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t03.mp3', title: 'Gimme One More Chance', duration: 110 },
    { file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t04.mp3', title: 'The Riverside', duration: 180 },
    { file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t05.mp3', title: 'Teen Angst', duration: 210 },
    { file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t06.mp3', title: '100 Flower Power Maximum', duration: 240 },
    { file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t07.mp3', title: 'Mr. Wrong', duration: 400 },
    { file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t08.mp3', title: 'Lonesome Johnny Blues', duration: 250 },
    { file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t09.mp3', title: 'Turn On Tune In Drop Out and then tracey added a very long title kind of thing for testing...', duration: 321 },
    { file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t10.mp3', title: 'EurotrashGirlanonbreakingsuperlongwordorsuchthatwillrequirebreakingoroverflowxhiddenkindofthingomanihopethispersonfinallystopstypingwhathaveidonetodeservethis', duration: 190 },
  ],
  width: 320,
  height: 30,
})


goL('audio playlist, our own HTM playlist, mp3 *and* ogg', {
  controls: { hide: false },
  mediaid: 'cracker2008-09-06.teac.me80.ad20.flac16',
  playlist: [
    { sources: [{ file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t01.mp3' }, { file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t01.ogg' }], title: 'Intro', duration: 30 },
    { sources: [{ file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t02.mp3' }, { file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t02.ogg' }], title: 'One Fine Day', duration: 120 },
    { sources: [{ file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t03.mp3' }, { file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t03.ogg' }], title: 'Gimme One More Chance', duration: 110 },
    { sources: [{ file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t04.mp3' }, { file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t04.ogg' }], title: 'The Riverside', duration: 180 },
    { sources: [{ file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t05.mp3' }, { file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t05.ogg' }], title: 'Teen Angst', duration: 210 },
    { sources: [{ file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t06.mp3' }, { file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t06.ogg' }], title: '100 Flower Power Maximum', duration: 240 },
    { sources: [{ file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t07.mp3' }, { file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t07.ogg' }], title: 'Mr. Wrong', duration: 400 },
    { sources: [{ file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t08.mp3' }, { file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t08.ogg' }], title: 'Lonesome Johnny Blues', duration: 250 },
    { sources: [{ file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t09.mp3' }, { file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t09.ogg' }], title: 'Turn On Tune In Drop Out and then tracey added a very long title kind of thing for testing...', duration: 321 },
    { sources: [{ file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t10.mp3' }, { file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t10.ogg' }], title: 'EurotrashGirlanonbreakingsuperlongwordorsuchthatwillrequirebreakingoroverflowxhiddenkindofthingomanihopethispersonfinallystopstypingwhathaveidonetodeservethis', duration: 190 },
  ],
  width: 320,
  height: 30,
})


go('everything attempt (including HD + captions)', {
  mediaid: 'camaro',
  playlist: [{
    sources: [{ file: 'https://archive.org/download/camaro/camaro.mp4', width: 640,     height: 480 },
              { file: 'https://archive.org/download/camaro/camaro.HD.mp4', width: 1920,    height: 1080 }],
    captions: [{ file: 'https://archive.org/download/camaro/camaro.en.srt', label: 'en' },
               { file: 'https://archive.org/download/camaro/camaro.fr.srt', label: 'fr' }],
    image: 'https://archive.org/download/camaro/format=Thumbnail&x=ignore.jpg',
    mediaid: 'camaro',
    title: 'Camaro!',
  }],
  related: {
    file: 'jw6.rss', // "http://archive.org/services/collection-rss.php?collection=dumb_bunny",
  },
  width: 640,
  height: 480,
})


go('related videos attempt (not showing up)', {
  mediaid: 'stairs',
  controls: true,
  file: 'https://archive.org/download/stairs/stairs.mp4',
  image: 'https://archive.org/download/stairs/format=Thumbnail&x=ignore.jpg',
  related: {
    file: 'jw.xml',
  },
})


go('sharing/embed attempt (not showing up,<br/> but hacking in 2 custom buttons)', {
  mediaid: 'stairs',
  sharing: {
    code: encodeURI("<iframe src='http://archive.org/embed/stairs' />"),
    link: 'http://archive.org/details/stairs',
  },
  height: 240,
  width: 320,
  image: 'https://archive.org/download/stairs/format=Thumbnail&x=ignore.jpg',
  file: 'https://archive.org/download/stairs/stairs.mp4',
})


go('mp4 + ogv', {
  mediaid: 'commute',
  playlist: [{
    sources: [{ file: 'https://archive.org/~tracey/_/commute/commute.mp4' },
              { file: 'https://archive.org/~tracey/_/commute/commute.ogv' }],
    image: 'https://archive.org/download/commute/format=Thumbnail&x=ignore.jpg',
    title: 'thrilling title',
  }],
  width: 320,
  height: 240,
})


go('ogv only', {
  mediaid: 'commute',
  file: 'https://archive.org/~tracey/_/commute/commute.ogv',
  image: 'https://archive.org/download/commute/format=Thumbnail&x=ignore.jpg',
  title: 'commute',
  width: 320,
  height: 240,
})


go('mp4 only', {
  mediaid: 'camels',
  file: 'https://archive.org/~tracey/_/camels/camels.mp4',
  image: 'https://archive.org/download/camels/format=Thumbnail&x=ignore.jpg',
  title: 'camels',
  width: 320,
  height: 240,
})


go('mp3 only', {
  mediaid: 'ellepurr',
  file: 'https://archive.org/~tracey/_/ellepurr/elle.mp3',
  title: 'elle purring',
  width: 320,
  height: 40,
})


go('video, showing a playlist', {
  playlist: [
    {
      file: 'https://archive.org/download/drascii/drascii.mp4', title: '1. drascii <span style="float:right">61:03</span>', mediaid: 'drascii', image: 'https://archive.org/download/drascii/format=Thumbnail&x=ignore.jpg',
    },
    { file: 'https://archive.org/download/commute/commute.mp4', title: '2. commute', mediaid: 'commute' },
    { file: 'https://archive.org/download/stairs/stairs.mp4',  title: '3. stairs',  mediaid: 'stairs' },
  ],
  width: 320,
  height: 480,
  listbar: {
    position: 'bottom',
    size: 240,
  },
  sharing: {
    code: encodeURI("<iframe src='http://example.com/embed/MEDIAID' />"),
    link: 'http://archive.org/details/MEDIAID',
  },
})


goL('video, showing a custom playlist', {
  playlist: [
    {
      file: 'https://archive.org/download/drascii/drascii.mp4', title: 'drascii', duration: 109, mediaid: 'drascii', image: 'https://archive.org/download/drascii/format=Thumbnail&x=ignore.jpg',
    },
    {
      file: 'https://archive.org/download/commute/commute.mp4', title: 'commute', duration: 183, mediaid: 'commute',
    },
    {
      file: 'https://archive.org/download/stairs/stairs.mp4',  title: 'stairs',  duration: 8,   mediaid: 'stairs',
    },
  ],
  width: 320,
  height: 240,
  sharing: {
    code: encodeURI("<iframe src='http://example.com/embed/MEDIAID' />"),
    link: 'http://archive.org/details/MEDIAID',
  },
})


go('audio playlist', {
  mediaid: 'cracker2008-09-06.teac.me80.ad20.flac16',
  playlist: [
    { file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t01.mp3', title: 'Intro', duration: 30 },
    { file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t02.mp3', title: 'One Fine Day', duration: 120 },
    { file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t03.mp3', title: 'Gimme One More Chance', duration: 110 },
    { file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t04.mp3', title: 'The Riverside', duration: 180 },
    { file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t05.mp3', title: 'Teen Angst', duration: 210 },
    { file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t06.mp3', title: '100 Flower Power Maximum', duration: 240 },
    { file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t07.mp3', title: 'Mr. Wrong', duration: 400 },
    { file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t08.mp3', title: 'Lonesome Johnny Blues', duration: 250 },
    { file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t09.mp3', title: 'Turn On Tune In Drop Out and then tracey added a very long title kind of thing for testing...', duration: 321 },
    { file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t10.mp3', title: 'Eurotrash Girl', duration: 190 },
  ],
  width: 320,
  height: 280,
  listbar: {
    position: 'bottom',
    size: 240,
  },
})


goL('audio playlist, our own HTM playlist', {
  mediaid: 'cracker2008-09-06.teac.me80.ad20.flac16',
  playlist: [
    { file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t01.mp3', title: 'Intro', duration: 30 },
    { file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t02.mp3', title: 'One Fine Day', duration: 120 },
    { file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t03.mp3', title: 'Gimme One More Chance', duration: 110 },
    { file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t04.mp3', title: 'The Riverside', duration: 180 },
    { file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t05.mp3', title: 'Teen Angst', duration: 210 },
    { file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t06.mp3', title: '100 Flower Power Maximum', duration: 240 },
    { file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t07.mp3', title: 'Mr. Wrong', duration: 400 },
    { file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t08.mp3', title: 'Lonesome Johnny Blues', duration: 250 },
    { file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t09.mp3', title: 'Turn On Tune In Drop Out and then tracey added a very long title kind of thing for testing...', duration: 321 },
    { file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t10.mp3', title: 'EurotrashGirlanonbreakingsuperlongwordorsuchthatwillrequirebreakingoroverflowxhiddenkindofthingomanihopethispersonfinallystopstypingwhathaveidonetodeservethis', duration: 190 },
  ],
  width: 320,
  height: 40,
})


goL('audio playlist, our own HTM playlist, very wide', {
  mediaid: 'cracker2008-09-06.teac.me80.ad20.flac16',
  playlist: [
    { file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t01.mp3', title: 'Intro', duration: 30 },
    { file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t02.mp3', title: 'One Fine Day', duration: 120 },
    { file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t03.mp3', title: 'Gimme One More Chance', duration: 110 },
    { file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t04.mp3', title: 'The Riverside', duration: 180 },
    { file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t05.mp3', title: 'Teen Angst', duration: 210 },
    { file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t06.mp3', title: '100 Flower Power Maximum', duration: 240 },
    { file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t07.mp3', title: 'Mr. Wrong', duration: 400 },
    { file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t08.mp3', title: 'Lonesome Johnny Blues', duration: 250 },
    { file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t09.mp3', title: 'Turn On Tune In Drop Out and then tracey added a very long title kind of thing for testing...', duration: 321 },
    { file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t10.mp3', title: 'EurotrashGirlanonbreakingsuperlongwordorsuchthatwillrequirebreakingoroverflowxhiddenkindofthingomanihopethispersonfinallystopstypingwhathaveidonetodeservethis', duration: 190 },
  ],
  width: 960,
  height: 40,
})


go('audio, no playlist, just bar + coverart', {
  mediaid: 'cracker2008-09-06.teac.me80.ad20.flac16',
  playlist: [
    {
      image: 'https://archive.org/download/GratefulDead/gdmain3.jpg', file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t01.mp3', title: 'Intro', duration: 30,
    },
    {
      image: 'https://archive.org/download/GratefulDead/gdmain3.jpg', file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t02.mp3', title: 'One Fine Day', duration: 120,
    },
    {
      image: 'https://archive.org/download/GratefulDead/gdmain3.jpg', file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t03.mp3', title: 'Gimme One More Chance', duration: 110,
    },
    {
      image: 'https://archive.org/download/GratefulDead/gdmain3.jpg', file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t04.mp3', title: 'The Riverside', duration: 180,
    },
    {
      image: 'https://archive.org/download/GratefulDead/gdmain3.jpg', file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t05.mp3', title: 'Teen Angst', duration: 210,
    },
    {
      image: 'https://archive.org/download/GratefulDead/gdmain3.jpg', file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t06.mp3', title: '100 Flower Power Maximum', duration: 240,
    },
    {
      image: 'https://archive.org/download/GratefulDead/gdmain3.jpg', file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t07.mp3', title: 'Mr. Wrong', duration: 400,
    },
    {
      image: 'https://archive.org/download/GratefulDead/gdmain3.jpg', file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t08.mp3', title: 'Lonesome Johnny Blues', duration: 250,
    },
    {
      image: 'https://archive.org/download/GratefulDead/gdmain3.jpg', file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t09.mp3', title: 'Turn On Tune In Drop Out and then tracey added a very long title kind of thing for testing...', duration: 321,
    },
    {
      image: 'https://archive.org/download/GratefulDead/gdmain3.jpg', file: 'http://archive.org/download/cracker2008-09-06.teac.me80.ad20.flac16/cracker2008-09-06d1t10.mp3', title: 'EurotrashGirlanonbreakingsuperlongwordorsuchthatwillrequirebreakingoroverflowxhiddenkindofthingomanihopethispersonfinallystopstypingwhathaveidonetodeservethis', duration: 190,
    },
  ],
  width: 320,
  height: 180,
})
