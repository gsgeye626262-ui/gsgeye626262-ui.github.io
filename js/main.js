gsap.registerPlugin(ScrollTrigger);


gsap.from('.intro h1', {opacity:0, y:30, duration:1.1, ease:'power3.out', delay:.2});
gsap.from('.intro .eyebrow, .intro .sub', {opacity:0, y:14, duration:.9, ease:'power2.out', delay:.5, stagger:.1});


gsap.from('.about h2, .about p, .tools', {
  scrollTrigger: { trigger: '.about', start: 'top 70%' },
  opacity:0, y:26, duration:.9, stagger:.12, ease:'power2.out'
});

function fitLiveEmbeds() {
  document.querySelectorAll('.live-embed').forEach(wrap => {
    const iframe = wrap.querySelector('iframe');
    const w = Number(wrap.dataset.embedWidth);
    const h = Number(wrap.dataset.embedHeight);
    iframe.style.width = w + 'px';
    iframe.style.height = h + 'px';
    // cover (not just width-fit) so the embed fills the container with no gap
    const scale = Math.max(wrap.clientWidth / w, wrap.clientHeight / h);
    iframe.style.transform = `scale(${scale})`;
  });
}
fitLiveEmbeds();
window.addEventListener('load', fitLiveEmbeds);
window.addEventListener('resize', fitLiveEmbeds);


window.addEventListener('load', () => ScrollTrigger.refresh());
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => ScrollTrigger.refresh());
}


// Horizontal pin-scroll only for non-touch, wide viewports (matches media.css).
// Touch devices always get the vertical layout, even if wide (e.g. iPad landscape),
// since scroll-jacked pin+scrub feels janky with touch. gsap.matchMedia() re-runs
// this automatically on resize/orientation change, so the mode never gets stuck.
const mm = gsap.matchMedia();

mm.add('(min-width: 861px) and (hover: hover) and (pointer: fine)', () => {
  const track = document.getElementById('track');
  const items = gsap.utils.toArray('.item');

  const getScrollAmount = () => track.scrollWidth - window.innerWidth;

  let tween = gsap.to(track, {
    x: () => -getScrollAmount(),
    ease: 'none',
    scrollTrigger: {
      trigger: '.showroom-pin',
      start: 'top top',
      end: () => `+=${getScrollAmount()}`,
      scrub: 1,
      pin: true,
      invalidateOnRefresh: true
    }
  });

  items.forEach(item=>{
    const visual = item.querySelector('.item-visual');
    gsap.fromTo(visual, {opacity:.4}, {
      opacity:1,
      scrollTrigger:{
        trigger: item,
        containerAnimation: tween,
        start: 'left 80%',
        end: 'left 30%',
        scrub:true
      }
    });
  });
});

window.addEventListener('resize', ()=>{ ScrollTrigger.refresh(); fitLiveEmbeds(); });
