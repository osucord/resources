// We want to see what links people are most interested in the website,
// so we track clicks on the website. We use the Umami analytics tool
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a').forEach((a) => {
    a.setAttribute('data-umami-event', 'open-link');
    a.setAttribute('data-umami-event-title', a.textContent || '');
    a.setAttribute('data-umami-event-url', a.href);
  });
});