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
    const scale = wrap.clientWidth / w;
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


function initShowroom(){
  const track = document.getElementById('track');
  const items = gsap.utils.toArray('.item');

  if(window.innerWidth <= 860){ return; } // mobile: vertical, no pin

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
}
initShowroom();
window.addEventListener('resize', ()=>{ ScrollTrigger.refresh(); fitLiveEmbeds(); });
