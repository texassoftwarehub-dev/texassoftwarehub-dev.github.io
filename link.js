// IPTV Max share links — fills the page from the link itself.
//
// A link names *what* was shared, never where it streams from:
//   /m/?t=<title>&y=<year>&tmdb=<id>&p=<TMDB poster path>   film
//   /s/?t=…&y=…&tmdb=…&p=…                                   series
//   /c/?t=<channel name>&id=<tvg-id>                         channel
// When the app is installed the OS opens it before this page loads; this is
// what everyone else sees. Everything from the link goes in via textContent
// or a validated image path — never as HTML.
(function () {
  'use strict';

  // Filled in once the apps are in their stores; an empty one hides its button.
  var APP_STORE_URL = '';
  var PLAY_STORE_URL = '';

  var KINDS = { m: 'Film', s: 'Series', c: 'Live channel' };
  var kind = (location.pathname.split('/').filter(Boolean)[0] || '').toLowerCase();
  var params = new URLSearchParams(location.search);
  var title = (params.get('t') || '').trim().slice(0, 200);
  var year = (params.get('y') || '').replace(/[^0-9]/g, '').slice(0, 4);
  var poster = params.get('p') || '';

  function $(id) { return document.getElementById(id); }

  function show(id, on) { var el = $(id); if (el) el.hidden = !on; }

  if (APP_STORE_URL) { $('appstore').href = APP_STORE_URL; show('appstore', true); }
  if (PLAY_STORE_URL) { $('playstore').href = PLAY_STORE_URL; show('playstore', true); }

  if (!KINDS[kind] || !title) {
    document.title = 'Link not found · IPTV Max';
    $('kind').textContent = '';
    $('title').textContent = 'This link is incomplete';
    $('year').textContent = 'Ask whoever sent it to share it again from the app.';
    $('art').textContent = '🔗';
    show('open', false);
    show('note', false);
    return;
  }

  var hasYear = year && title.indexOf(year) !== -1;
  var heading = year && !hasYear ? title + ' (' + year + ')' : title;
  document.title = heading + ' · IPTV Max';
  $('kind').textContent = KINDS[kind];
  $('title').textContent = title;
  $('year').textContent = year && !hasYear ? year : '';

  // Only a TMDB poster path ("/abc123.jpg") becomes an image, so a link can't
  // point the page at an arbitrary host.
  if (kind !== 'c' && /^\/[A-Za-z0-9_\-]{1,64}\.(jpg|jpeg|png|webp)$/.test(poster)) {
    var img = document.createElement('img');
    img.className = 'poster';
    img.alt = '';
    img.src = 'https://image.tmdb.org/t/p/w500' + poster;
    $('art').replaceWith(img);
  } else {
    $('art').textContent = kind === 'c' ? '📺' : '🎬';
  }

  // The app's own scheme, same kind and query — for when the browser kept the
  // link rather than handing it over.
  $('open').href = 'iptvmax://' + kind + '/' + location.search;
})();
