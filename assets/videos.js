/* ==========================================================================
   Video cards: a YouTube thumbnail with a play button. The player (privacy-
   enhanced youtube-nocookie.com) loads only when the card is clicked, so
   pages stay fast and YouTube sets no cookies before that.
   Markup: <div class="mz-yt" data-id="VIDEO_ID" data-title="..."> ... <button class="mz-yt-play"> ...
   ========================================================================== */
function play(card) {
  const id = card.dataset.id;
  const f = document.createElement('iframe');
  f.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
  f.title = card.dataset.title || 'YouTube video';
  f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  f.allowFullscreen = true;
  f.referrerPolicy = 'strict-origin-when-cross-origin';
  const stage = card.querySelector('.mz-yt-stage');
  stage.innerHTML = '';
  stage.appendChild(f);
  card.classList.add('is-playing');
}
document.addEventListener('click', (e) => {
  const b = e.target.closest && e.target.closest('.mz-yt-play');
  if (!b) return;
  e.preventDefault();
  play(b.closest('.mz-yt'));
});
