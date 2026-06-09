import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const localePath = path.join(__dirname, '..', 'public', 'locales', 'am.json');

const raw = fs.readFileSync(localePath, 'utf8');
const bom = raw.startsWith('\uFEFF') ? '\uFEFF' : '';
const am = JSON.parse(raw.replace(/^\uFEFF/, ''));

/** Deep-set a value by dot path (e.g. "admin.dashboard.stats.gallery"). */
function set(obj, dotPath, value) {
  const keys = dotPath.split('.');
  let cur = obj;
  for (let i = 0; i < keys.length - 1; i += 1) {
    cur = cur[keys[i]];
  }
  cur[keys[keys.length - 1]] = value;
}

const fixes = {
  // ─── 1. servicesPage.cards ─────────────────────────────────────────────────
  'servicesPage.cards.fullPlanning.title': 'Ամբողջական հարսanekan planavorum',
  'servicesPage.cards.fullPlanning.description': 'Լիովին պլանավորում սկզբից մինչև վերջ։',
  'servicesPage.cards.fullPlanning.detail.overview':
    'Ձեր առաջին տեսլականից մինչև վերջին դ별ին հրաժեշտը մենք հոգ ենք տանում ձեր տոնակատարության յուրաքանչյուր մանրուքի մասին՝ խնամքով, ստեղծագործականությամբ և անչաճող կազմակերպությամբ, որպեսզի կարողանաք ներկա լինել յուրաքանչյուր կարևոր պահին։',
  'servicesPage.cards.fullPlanning.detail.idealFor':
    'Զույgերի համար, ովքեր ցանկանում են վստահելի գործակից բոլոր փուլերում և նախընտրում են լիովին ուղ伴որդվող, առանց սթրեսի փորձ։',
  'servicesPage.cards.fullPlanning.detail.benefits.one':
    'Նվiրված գլխավոր պլանավորող՝ անհատական ուղ伴որդություն ամբողջ գործընթացի ընթացքում',
  'servicesPage.cards.fullPlanning.detail.benefits.two':
    'Կուրատորավորված մատակարարների առաջարկներ՝ ձեր ոճին և բյուջեին համապատասխան',
  'servicesPage.cards.fullPlanning.detail.benefits.three':
    'Մանրամասն ժամանակացույցներ, բյուջեներ և դիզայնի ուղղություն մեկ տեղում',
  'servicesPage.cards.fullPlanning.detail.benefits.four':
    'Անխափան օրվա համակարգում՝ ձեր տոնակատարությունը վայելելու համար',
  'servicesPage.cards.fullPlanning.detail.includes.one':
    'Հaindelutyan sesianer ev stegcagorcakan kontsepti razviti',
  'servicesPage.cards.fullPlanning.detail.includes.two':
    'Matakararneri gorcynkerutyun, stugum ev paymanagri ajanakum',
  'servicesPage.cards.fullPlanning.detail.includes.three':
    'Dizayn anagramner, harkayin planer ev stilavorman uxum',
  'servicesPage.cards.fullPlanning.detail.includes.four':
    'Huyseri karavarvum ev repeticiai koordinacia',
  'servicesPage.cards.fullPlanning.detail.includes.five':
    'Liovin texayin team montajic minchev mijoaracumy avartel@',
};

for (const [pathKey, value] of Object.entries(fixes)) {
  set(am, pathKey, value);
}

const output = bom + `${JSON.stringify(am, null, 2)}\n`;
fs.writeFileSync(localePath, output, 'utf8');

console.log(`Applied ${Object.keys(fixes).length} Armenian locale fixes to public/locales/am.json`);
