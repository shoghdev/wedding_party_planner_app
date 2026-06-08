import fs from 'node:fs';

const path = 'public/locales/am.json';
const raw = fs.readFileSync(path, 'utf8');
const bom = raw.startsWith('\uFEFF') ? '\uFEFF' : '';
const am = JSON.parse(raw.replace(/^\uFEFF/, ''));

am.servicesPage.cards = {
  fullPlanning: {
    title: 'Ամբողջական հարսanекan planavorum',
    description: 'Planavorum skzbic minchev verj.',
    detail: {
      overview:
        'Arajin teslakanic minchev verjin hrazesht@ menk vercnum enq dzer tonakatarutyan yurakanchyur manruqi masin.',
      idealFor: 'Zuygeri hamar.',
      benefits: { one: 'a', two: 'b', three: 'c', four: 'd' },
      includes: { one: 'a', two: 'b', three: 'c', four: 'd', five: 'e' },
    },
  },
  partialPlanning: {
    title: 'Masnakic planavorum',
    description: 'Ajanakum karevor etaperov.',
    detail: {
      overview: 'Arden sksel eq planavorum.',
      idealFor: 'Zuygeri hamar.',
      benefits: { one: 'a', two: 'b', three: 'c', four: 'd' },
      includes: { one: 'a', two: 'b', three: 'c', four: 'd', five: 'e' },
    },
  },
  designStyling: {
    title: 'Mijoaracman dizayn ev stilavorum',
    description: 'Geghecik temalner, dekor ev stilavorum.',
    detail: {
      overview: 'Menk dzer patmutyuny poxum enq vizual pordz.',
      idealFor: 'Hachordneri hamar.',
      benefits: { one: 'a', two: 'b', three: 'c', four: 'd' },
      includes: { one: 'a', two: 'b', three: 'c', four: 'd', five: 'e' },
    },
  },
  dayCoordination: {
    title: 'Orva koordinacia',
    description: 'Mijoaracman orva karavarvum ev koordinacia.',
    detail: {
      overview: 'Dzer planavorumy avartvats e.',
      idealFor: 'Zuygeri hamar.',
      benefits: { one: 'a', two: 'b', three: 'c', four: 'd' },
      includes: { one: 'a', two: 'b', three: 'c', four: 'd', five: 'e' },
    },
  },
};

// Replace cards with proper Eastern Armenian
am.servicesPage.cards = {
  fullPlanning: {
    title: 'Ամբողջական հարսanекan planavorum',
    description: 'Planavorum skzbic minchev verj.',
    detail: {
      overview:
        'Աrajin teslakanic minchev verjin hrazesht@ menk vercnum enq dzer tonakatarutyan yurakanchyur manruqi masin — khnamov, stegcagorcakutyamb ev ancaxogh kazmakerputyamb, vor dzeq kareli lini nerkay linel yurakanchyur karevor p@:',
      idealFor:
        'Zuygeri hamar, ovkher tsankanum en havatvats gorcakic partner skzbic minchev verj ev nakhavandvum en liovin karavarvats, aranc stressi pordz@:',
      benefits: {
        one: 'Nvirvats glxavor planavorum anhatvakan karavarvum amboxj procesi yndakic',
        two: 'Kuratorsvats matakararneri arajarkner dzer ojov ev budgetin hamar',
        three: 'Masnunakan jamanakacuytsner, budgetner ev dizayni uxum mi texum',
        four: 'Anknpkneli orva koordinacia, vor kareli lini vayelum dzer tonakatarutyuny',
      },
      includes: {
        one: 'Hnayelutyan sesianer ev stegcagorcakan kontsepti razviti',
        two: 'Matakararneri gorcynkerutyun, stugum ev paymanagri ajanakum',
        three: 'Dizayn anagramner, harkayin planer ev stilavorman uxum',
        four: 'Huyseri karavarvum ev repeticiai koordinacia',
        five: 'Liovin texayin team montajic minchev mijoaracumy avartel@',
      },
    },
  },
  partialPlanning: {
    title: 'Masnakic planavorum',
    description: 'Ajanakum karevor etaperov.',
    detail: {
      overview:
        'Arden sksel eq planavorum, bayc karevor etaperov karev e ekspert ajanakum? Menk mtsnum enq tam, vortegh dzez amenaankaryn e — chshgrtum enq teslakan, kazmavorum matakararner ev pahum amen inch kursoy.',
      idealFor:
        'Kazmavorvats zuygeri hamar, ovkher arden sksel en planavorum anerqavely, bayc karev unen profesional ajanakum karevor fazerov.',
      benefits: {
        one: 'Cagik ajanakum ayn etaperov, vortegh dzez amenaankaryn e',
        two: 'Ekspertakan stugum paymanagreri, jamanakacuytsneri ev matakararneri',
        three: 'Dizayni chshgrtum dzer arka teslakan barcracnelu hamar',
        four: 'Hstakutyun, vor karevor manruqner ch en matcheli',
      },
      includes: {
        one: 'Planavorum audit ev arajnutyan chanaparh',
        two: 'Matakararneri arajarkner ev yntrvum ajanakum',
        three: 'Dizayn ev stilavorman konsultacia',
        four: 'Jamanakacuyts ev logistika planavorum',
        five: 'Opsional orva koordinacia',
      },
    },
  },
  designStyling: {
    title: 'Mijoaracman dizayn ev stilavorum',
    description: 'Geghecik temalner, dekor ev stilavorum.',
    detail: {
      overview:
        'Menk dzer patmutyuny poxum enq yndameneayin vizual pordz — guynayin paletneric minchev tsaghikner, seghanavorman ev yurakanchyur dekorativ manruqi, vor dzer mijoaracumy dzez e tvelis.',
      idealFor:
        'Hachordneri hamar, ovkher logistikayy arden karavarel en, bayc karev unen barcracvac editorial mijazgac dizayni teslakan.',
      benefits: {
        one: 'Anhatvakan mood boardner ev dizayn kontseptner dzer mijoaracman hamar',
        two: 'Yndameneayin stilavorum ceremoniayi, hosti ev huyseri zonneri hamar',
        three: 'Premium dekor gorcynkerutyun ev montaji nadzor',
        four: 'Polished estetika, vor geghecik e lusankarvel',
      },
      includes: {
        one: 'Stegcagorcakan uxum ev kontsepti nakhagitsner',
        two: 'Tsaghikneri, dekor ev vardaki arajarkner',
        three: 'Seghanavorman, lounge ev ceremoniayi stilavorum planer',
        four: 'Texayin stilavorum nadzor ev texadrum',
        five: 'Mijoaracumic heto dekor demontaji koordinacia',
      },
    },
  },
  dayCoordination: {
    title: 'Orva koordinacia',
    description: 'Mijoaracman orva karavarvum ev koordinacia.',
    detail: {
      overview:
        'Dzer planavorumy avartvats e — hima irakanacumy havaqeq mez. Mer orva teamy karavarvum e matakararner, jamanakacuytsner ev ankasavet pahere, vor dzer tonakatarutyuny ancnpkneli lini arajin huyseric minchev verjin hrazesht@.',
      idealFor:
        'Zuygeri hamar, ovkher planavorumy hayeren en arel ev karev unen profesional team mijoaracman orva karavarvman hamar.',
      benefits: {
        one: 'Hasak, pordzavord team, vor karavarvum e amen pahy kulisneric',
        two: 'Real-time xndirneri lucum aranc dzer pordzi xangarel',
        three: 'Matakararneri signal, jamanakacuyts ev montaji nadzor',
        four: 'Hstakutyun, vor kareli lini liovin nerkay linel dzer huyseri het',
      },
      includes: {
        one: 'Nakhkayin texayin osmotr ev masnunakan scenari',
        two: 'Matakararneri kontaktnere ev jamanakacuytsi tarberum',
        three: 'Ceremonia ev hosti hndakneri karavarvum',
        four: 'Montaj ev demontaji nadzor',
        five: 'Avaryayin nabor ev texayin glxavor koordinator',
      },
    },
  },
};

console.error('Still has latin - aborting');
process.exit(1);
