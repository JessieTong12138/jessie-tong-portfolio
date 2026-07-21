const projects = {
  circle: {
    index: "03 / 04", title: "Circle Hub", type: { zh: "大学生活动中心设计", en: "University Activity Center" }, subtitle: { zh: "面向青年群体的校园公共客厅", en: "A campus living room for youth culture" }, summary: { zh: "以多个有机组合的圆形体量回应青年个体的独立与共鸣。连续曲线将多元活动串联为开放、包容且充满活力的共享场所。", en: "Organic circular volumes respond to the autonomy and resonance of youth. A continuous curve binds diverse programmes into an open, generous shared place." }, facts: [["课程", "Studio IV"], ["建筑面积", "4,700 ㎡"], ["场地面积", "8,500 ㎡"], ["地点", "成都"]], images: ["circle-1.webp", "circle-2.webp", "circle-3.webp", "circle-4.webp"]
  },
  forest: {
    index: "04 / 04", title: { zh: "林湾乐园", en: "Forest Bay" }, type: { zh: "上海市夏雨幼儿园改造设计", en: "Renovation for Shanghai Xiayu Kindergarten" }, subtitle: { zh: "在林间水湾中自由流动的幼儿园", en: "A kindergarten flowing freely through a wooded bay" }, summary: { zh: "改造以 S 形流线组织空间：木质与石质体块彼此穿插，连续庭院、走廊和活动场地让儿童在自然中自由穿行、停留与探索。", en: "An S-shaped circulation system organises the renovation. Timber and mineral volumes interlock to create a sequence of courtyards, corridors, and places for children to explore." }, facts: [["课程", "Studio IV"], ["建筑面积", "3,149 ㎡"], ["场地面积", "15,961 ㎡"], ["地点", "上海"]], images: ["forest-1.webp", "forest-2.webp", "forest-3.webp"]
  },
  ringverse: {
    index: "02 / 04", title: { zh: "环·宇", en: "Ringverse" }, type: { zh: "音乐人综合工作室设计", en: "Musician's Integrated Studio" }, subtitle: { zh: "为华晨宇设计的创作、生活与表演之间的环", en: "A ring between making, living, and performing for Hua Chenyu" }, summary: { zh: "从华晨宇演唱会中的环形舞台汲取灵感，以连续的环形路径连接录音、编曲、排练、健身与居住。环既是空间的边界，也是不断展开的创作轨迹。", en: "Inspired by Hua Chenyu’s circular concert stage, a continuous ring connects recording, composing, rehearsal, fitness, and living. The ring is both an edge and an unfolding creative route." }, facts: [["课程", "Studio II"], ["建筑面积", "398 ㎡"], ["场地面积", "600 ㎡"], ["类型", "综合居住"]], images: ["ringverse-1.webp", "ringverse-2.webp"]
  },
  tea: {
    index: "01 / 04", title: { zh: "茶隅·焙光", en: "Tea Nook · Baked Light" }, type: { zh: "滨水休闲空间设计", en: "Waterfront Leisure Space" }, subtitle: { zh: "茶室与面包烘焙坊相遇于湖岸", en: "A tea room and bakery meet on the lake edge" }, summary: { zh: "一层容纳面包售卖与阅读，二层成为茶饮与观景的场所。建筑借由临水平台、香气与光线，为师生提供可品茶、阅读、焙烤与停留的日常片段。", en: "The ground level joins bakery retail with reading; above, tea and a viewing terrace open to the water. Deck, aroma, and light create an everyday retreat for tea, baking, reading, and pause." }, facts: [["课程", "Studio I"], ["建筑面积", "352.4 ㎡"], ["场地面积", "1,360 ㎡"], ["类型", "茶室 + 烘焙坊"]], images: ["tea-1.webp", "tea-2.webp"]
  }
};

let lang = "zh";
const $ = (selector, element = document) => element.querySelector(selector);
const $$ = (selector, element = document) => [...element.querySelectorAll(selector)];
const getText = value => typeof value === "object" ? value[lang] : value;

function changeLanguage() {
  lang = lang === "zh" ? "en" : "zh";
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  $$('[data-zh]').forEach(node => node.textContent = node.dataset[lang]);
  $('.lang-switch span:first-child').style.opacity = lang === "zh" ? 1 : .35;
  $('.lang-switch span:last-child').style.opacity = lang === "en" ? 1 : .35;
}

$('.lang-switch').addEventListener('click', changeLanguage);

const dialog = $('#project-dialog');
const imageDialog = $('#image-dialog');
function openProject(slug) {
  const p = projects[slug];
  $('#dialog-index').textContent = p.index;
  $('#dialog-type').textContent = getText(p.type);
  $('#dialog-title').textContent = getText(p.title);
  $('#dialog-subtitle').textContent = getText(p.subtitle);
  $('#dialog-summary').textContent = getText(p.summary);
  $('#dialog-facts').innerHTML = p.facts.map(([label, value]) => `<div class="fact"><strong>${label}</strong><span>${value}</span></div>`).join('');
  $('#dialog-gallery').innerHTML = p.images.map((src, index) => `<figure><img loading="${index ? 'lazy' : 'eager'}" src="assets/${src}" alt="${getText(p.title)} project board ${index + 1}"><figcaption>${String(index + 1).padStart(2, '0')} / ${getText(p.title)}</figcaption></figure>`).join('');
  dialog.showModal();
  dialog.scrollTop = 0;
}

$$('.work-card').forEach(card => {
  card.addEventListener('click', event => { if (!event.target.closest('a')) openProject(card.dataset.project); });
  card.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openProject(card.dataset.project); } });
});
$('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
$('#dialog-gallery').addEventListener('click', event => {
  const image = event.target.closest('img'); if (!image) return;
  $('img', imageDialog).src = image.src; imageDialog.showModal();
});
$('.image-close').addEventListener('click', () => imageDialog.close());
imageDialog.addEventListener('click', event => { if (event.target === imageDialog) imageDialog.close(); });

window.addEventListener('scroll', () => $('.site-header').classList.toggle('scrolled', window.scrollY > 36), { passive: true });
$('.hero').addEventListener('pointermove', event => {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  const bounds = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty('--x', `${(event.clientX - bounds.width / 2) / -70}px`);
  event.currentTarget.style.setProperty('--y', `${(event.clientY - bounds.height / 2) / -70}px`);
});
