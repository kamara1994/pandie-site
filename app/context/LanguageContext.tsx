"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type LangCode =
  | "en" | "fr" | "ar" | "krio" | "es" | "pt" | "zh" | "ha"
  | "sw" | "hi" | "bn" | "ru" | "ja" | "ko" | "de" | "it"
  | "tr" | "vi" | "th" | "pl" | "nl" | "id" | "ms" | "fa"
  | "yo" | "ig" | "am" | "so" | "rw";

export interface Lang {
  code: LangCode;
  name: string;
  nativeName: string;
  dir: "ltr" | "rtl";
  flag: string;
}

export const LANGUAGES: Lang[] = [
  { code: "en",   name: "English",    nativeName: "English",      dir: "ltr", flag: "🇬🇧" },
  { code: "fr",   name: "French",     nativeName: "Français",     dir: "ltr", flag: "🇫🇷" },
  { code: "krio", name: "Krio",       nativeName: "Krio",         dir: "ltr", flag: "🇸🇱" },
  { code: "ha",   name: "Hausa",      nativeName: "Hausa",        dir: "ltr", flag: "🇳🇬" },
  { code: "yo",   name: "Yoruba",     nativeName: "Yorùbá",       dir: "ltr", flag: "🇳🇬" },
  { code: "ig",   name: "Igbo",       nativeName: "Igbo",         dir: "ltr", flag: "🇳🇬" },
  { code: "sw",   name: "Swahili",    nativeName: "Kiswahili",    dir: "ltr", flag: "🇰🇪" },
  { code: "am",   name: "Amharic",    nativeName: "አማርኛ",         dir: "ltr", flag: "🇪🇹" },
  { code: "so",   name: "Somali",     nativeName: "Soomaali",     dir: "ltr", flag: "🇸🇴" },
  { code: "rw",   name: "Kinyarwanda",nativeName: "Kinyarwanda",  dir: "ltr", flag: "🇷🇼" },
  { code: "ar",   name: "Arabic",     nativeName: "العربية",       dir: "rtl", flag: "🇸🇦" },
  { code: "fa",   name: "Persian",    nativeName: "فارسی",         dir: "rtl", flag: "🇮🇷" },
  { code: "es",   name: "Spanish",    nativeName: "Español",      dir: "ltr", flag: "🇪🇸" },
  { code: "pt",   name: "Portuguese", nativeName: "Português",    dir: "ltr", flag: "🇧🇷" },
  { code: "de",   name: "German",     nativeName: "Deutsch",      dir: "ltr", flag: "🇩🇪" },
  { code: "it",   name: "Italian",    nativeName: "Italiano",     dir: "ltr", flag: "🇮🇹" },
  { code: "nl",   name: "Dutch",      nativeName: "Nederlands",   dir: "ltr", flag: "🇳🇱" },
  { code: "pl",   name: "Polish",     nativeName: "Polski",       dir: "ltr", flag: "🇵🇱" },
  { code: "ru",   name: "Russian",    nativeName: "Русский",      dir: "ltr", flag: "🇷🇺" },
  { code: "tr",   name: "Turkish",    nativeName: "Türkçe",       dir: "ltr", flag: "🇹🇷" },
  { code: "hi",   name: "Hindi",      nativeName: "हिन्दी",          dir: "ltr", flag: "🇮🇳" },
  { code: "bn",   name: "Bengali",    nativeName: "বাংলা",           dir: "ltr", flag: "🇧🇩" },
  { code: "zh",   name: "Chinese",    nativeName: "中文",           dir: "ltr", flag: "🇨🇳" },
  { code: "ja",   name: "Japanese",   nativeName: "日本語",          dir: "ltr", flag: "🇯🇵" },
  { code: "ko",   name: "Korean",     nativeName: "한국어",           dir: "ltr", flag: "🇰🇷" },
  { code: "vi",   name: "Vietnamese", nativeName: "Tiếng Việt",   dir: "ltr", flag: "🇻🇳" },
  { code: "th",   name: "Thai",       nativeName: "ภาษาไทย",        dir: "ltr", flag: "🇹🇭" },
  { code: "id",   name: "Indonesian", nativeName: "Bahasa Indonesia", dir: "ltr", flag: "🇮🇩" },
  { code: "ms",   name: "Malay",      nativeName: "Bahasa Melayu", dir: "ltr", flag: "🇲🇾" },
];

// Browser lang code → our LangCode
const BROWSER_MAP: Record<string, LangCode> = {
  en: "en", "en-US": "en", "en-GB": "en",
  fr: "fr", "fr-FR": "fr", "fr-CA": "fr",
  ar: "ar", "ar-SA": "ar",
  es: "es", "es-ES": "es", "es-MX": "es", "es-419": "es",
  pt: "pt", "pt-BR": "pt", "pt-PT": "pt",
  zh: "zh", "zh-CN": "zh", "zh-TW": "zh",
  ha: "ha",
  sw: "sw",
  hi: "hi",
  bn: "bn",
  ru: "ru",
  ja: "ja",
  ko: "ko",
  de: "de",
  it: "it",
  tr: "tr",
  vi: "vi",
  th: "th",
  pl: "pl",
  nl: "nl",
  id: "id",
  ms: "ms",
  fa: "fa",
  yo: "yo",
  ig: "ig",
  am: "am",
  so: "so",
  rw: "rw",
};

export interface Translations {
  nav: {
    about: string; getInvolved: string; programs: string;
    stories: string; events: string; contact: string; donate: string;
  };
  hero: {
    badge: string; heading1: string; heading2: string; heading3: string;
    body: string; cta1: string; cta2: string;
  };
  stats: { children: string; education: string; fed: string; };
  chat: {
    greeting: string; placeholder: string; humanCta: string;
    poweredBy: string; online: string; suggestions: string[];
    donateBtn: string; comingSoon: string; typing: string;
    langSwitchMsg: string;
  };
  handoff: {
    title: string; body: string; nameLbl: string; emailLbl: string;
    submit: string; submitting: string; orEmail: string;
    successTitle: string; successBody: string; whileWait: string;
    whileWaitBody: string; back: string;
  };
}

export const TRANSLATIONS: Record<LangCode, Translations> = {
  en: {
    nav: { about: "About Us", getInvolved: "Get Involved", programs: "Programs", stories: "Stories", events: "Events", contact: "Contact", donate: "Donate" },
    hero: { badge: "Sierra Leone · Est. 2024", heading1: "Every Child", heading2: "Deserves a", heading3: "Mother's Love", body: "Pandie Foundation stands in the gap for vulnerable children across Sierra Leone — providing education, nutrition, medical care, and the warmth of human dignity.", cta1: "Make an Impact", cta2: "Our Story" },
    stats: { children: "Children Reached", education: "In Education", fed: "Fed & Nourished" },
    chat: { greeting: "Hi! I'm Pamela 👋 I'm here to help you learn about Pandie Foundation and how you can change a child's life in Sierra Leone. What would you like to know?", placeholder: "Ask Pamela anything…", humanCta: "Prefer to talk to a real person?", poweredBy: "Powered by Groq AI · Pandie Foundation", online: "Online", suggestions: ["How can I donate?", "Tell me about your programs", "How do I sponsor a child?", "How can I volunteer?"], donateBtn: "Donate Now", comingSoon: "Online donations coming soon! To donate now, please email info@pandiefoundation.org 💛", typing: "Pamela is typing…", langSwitchMsg: "I've switched to English for you! How can I help?" },
    handoff: { title: "Talk to our team 👤", body: "Leave your details and we'll get back to you personally — usually within a few hours.", nameLbl: "Your Name", emailLbl: "Email Address", submit: "Connect with Our Team →", submitting: "Sending…", orEmail: "Or email us directly at", successTitle: "We got your message!", successBody: "Our team will reach out to", whileWait: "While you wait", whileWaitBody: "Pamela can still answer most questions instantly.", back: "← Back to Pamela" },
  },

  fr: {
    nav: { about: "À Propos", getInvolved: "S'impliquer", programs: "Programmes", stories: "Histoires", events: "Événements", contact: "Contact", donate: "Donner" },
    hero: { badge: "Sierra Leone · Fondée 2024", heading1: "Chaque Enfant", heading2: "Mérite un", heading3: "Amour Maternel", body: "La Fondation Pandie soutient les enfants vulnérables de Sierra Leone — offrant éducation, nutrition, soins médicaux et dignité humaine.", cta1: "Faire un Impact", cta2: "Notre Histoire" },
    stats: { children: "Enfants Touchés", education: "À l'École", fed: "Nourris & Soutenus" },
    chat: { greeting: "Bonjour! Je suis Pamela 👋 Je suis ici pour vous aider à en savoir plus sur la Fondation Pandie. Que souhaitez-vous savoir?", placeholder: "Posez une question à Pamela…", humanCta: "Préférez-vous parler à une vraie personne?", poweredBy: "Propulsé par Groq AI · Fondation Pandie", online: "En ligne", suggestions: ["Comment puis-je faire un don?", "Parlez-moi de vos programmes", "Comment parrainer un enfant?", "Comment puis-je m'impliquer?"], donateBtn: "Faire un Don", comingSoon: "Les dons en ligne arrivent bientôt! Pour donner maintenant, envoyez un email à info@pandiefoundation.org 💛", typing: "Pamela écrit…", langSwitchMsg: "Je suis passée au français pour vous! Comment puis-je vous aider?" },
    handoff: { title: "Parler à notre équipe 👤", body: "Laissez vos coordonnées et nous vous répondrons personnellement — généralement dans quelques heures.", nameLbl: "Votre Nom", emailLbl: "Adresse Email", submit: "Contacter Notre Équipe →", submitting: "Envoi…", orEmail: "Ou envoyez-nous un email à", successTitle: "Message reçu!", successBody: "Notre équipe contactera", whileWait: "En attendant", whileWaitBody: "Pamela peut toujours répondre à la plupart des questions.", back: "← Retour à Pamela" },
  },

  krio: {
    nav: { about: "Abot Wi", getInvolved: "Jɔyn Wi", programs: "Pograms", stories: "Storis", events: "Ivents", contact: "Kɔntakt", donate: "Giv Mɔni" },
    hero: { badge: "Salone · Start 2024", heading1: "Evri Pikin", heading2: "Dizerv", heading3: "Mama Lɔv", body: "Pandie Fɔndeshɔn de hɛlp pikin wɛ nɔ gɛt famili pan Salone — giv dem skul, chop, dɔkta, en dignitɛ.", cta1: "Mek Difrans", cta2: "Wi Stori" },
    stats: { children: "Pikin Wi Rish", education: "Dɛn De Skul", fed: "Dɛn Gɛt Chop" },
    chat: { greeting: "Kushɛ! A nɛm Pamela 👋 A de ya fɔ hɛlp yu lɛn abot Pandie Fɔndeshɔn. Wetin yu wɛn nɔ?", placeholder: "Aks Pamela ɛnitin…", humanCta: "Yu wɛn tɔk wit rial pɛsin?", poweredBy: "Groq AI pawa am · Pandie Fɔndeshɔn", online: "Olayn", suggestions: ["Aw fɔ giv mɔni?", "Tɛl mi abot yu pograms", "Aw fɔ hɛlp wan pikin?", "Aw fɔ vɔlɔntia?"], donateBtn: "Giv Mɔni Naw", comingSoon: "Olayn gɛtin mɔni dɛ kɔmɔt sun! Fɔ giv naw, sɛn imel go info@pandiefoundation.org 💛", typing: "Pamela de rayt…", langSwitchMsg: "A don swich go Krio fɔ yu! Wetin yu nid?" },
    handoff: { title: "Tɔk wit wi tim 👤", body: "Liv yu nɛm en imel, wi go kɔl bak — yuzhuali insaid few awa.", nameLbl: "Yu Nɛm", emailLbl: "Imel Adres", submit: "Kɔnɛkt wit Wi Tim →", submitting: "Sɛnin…", orEmail: "Ɔ sɛn imel go", successTitle: "Wi gɛt yu mɛsej!", successBody: "Wi tim go rish yu na", whileWait: "Wɛl yu wet", whileWaitBody: "Pamela kin ɔnsɛ mɔs kwɛschɔns kwik.", back: "← Bak to Pamela" },
  },

  es: {
    nav: { about: "Nosotros", getInvolved: "Participar", programs: "Programas", stories: "Historias", events: "Eventos", contact: "Contacto", donate: "Donar" },
    hero: { badge: "Sierra Leona · Fund. 2024", heading1: "Cada Niño", heading2: "Merece un", heading3: "Amor Maternal", body: "La Fundación Pandie apoya a niños vulnerables en Sierra Leona — brindando educación, nutrición, atención médica y dignidad humana.", cta1: "Hacer un Impacto", cta2: "Nuestra Historia" },
    stats: { children: "Niños Alcanzados", education: "En Educación", fed: "Alimentados" },
    chat: { greeting: "¡Hola! Soy Pamela 👋 Estoy aquí para ayudarte a conocer la Fundación Pandie. ¿Qué te gustaría saber?", placeholder: "Pregúntale algo a Pamela…", humanCta: "¿Prefieres hablar con una persona real?", poweredBy: "Impulsado por Groq AI · Fundación Pandie", online: "En línea", suggestions: ["¿Cómo puedo donar?", "Cuéntame sobre sus programas", "¿Cómo apadrinar un niño?", "¿Cómo puedo ser voluntario?"], donateBtn: "Donar Ahora", comingSoon: "¡Las donaciones en línea llegan pronto! Para donar ahora, envía un correo a info@pandiefoundation.org 💛", typing: "Pamela está escribiendo…", langSwitchMsg: "¡Cambié al español para ti! ¿En qué puedo ayudarte?" },
    handoff: { title: "Hablar con nuestro equipo 👤", body: "Déjanos tus datos y te responderemos personalmente.", nameLbl: "Tu Nombre", emailLbl: "Correo Electrónico", submit: "Conectar con Nuestro Equipo →", submitting: "Enviando…", orEmail: "O escríbenos a", successTitle: "¡Recibimos tu mensaje!", successBody: "Nuestro equipo contactará a", whileWait: "Mientras esperas", whileWaitBody: "Pamela puede responder la mayoría de preguntas.", back: "← Volver a Pamela" },
  },

  pt: {
    nav: { about: "Sobre Nós", getInvolved: "Participe", programs: "Programas", stories: "Histórias", events: "Eventos", contact: "Contato", donate: "Doar" },
    hero: { badge: "Serra Leoa · Fund. 2024", heading1: "Cada Criança", heading2: "Merece um", heading3: "Amor Materno", body: "A Fundação Pandie apoia crianças vulneráveis em Serra Leoa — fornecendo educação, nutrição, cuidados médicos e dignidade humana.", cta1: "Fazer Impacto", cta2: "Nossa História" },
    stats: { children: "Crianças Alcançadas", education: "Em Educação", fed: "Alimentadas" },
    chat: { greeting: "Olá! Eu sou a Pamela 👋 Estou aqui para ajudá-lo a conhecer a Fundação Pandie. O que você gostaria de saber?", placeholder: "Pergunte algo à Pamela…", humanCta: "Prefere falar com uma pessoa real?", poweredBy: "Desenvolvido por Groq AI · Fundação Pandie", online: "Online", suggestions: ["Como posso doar?", "Fale sobre os programas", "Como apadrinhar uma criança?", "Como ser voluntário?"], donateBtn: "Doe Agora", comingSoon: "Doações online em breve! Para doar agora, envie um e-mail para info@pandiefoundation.org 💛", typing: "Pamela está digitando…", langSwitchMsg: "Mudei para português para você! Como posso ajudar?" },
    handoff: { title: "Falar com nossa equipe 👤", body: "Deixe seus dados e entraremos em contato pessoalmente.", nameLbl: "Seu Nome", emailLbl: "Endereço de Email", submit: "Conectar com Nossa Equipe →", submitting: "Enviando…", orEmail: "Ou envie um e-mail para", successTitle: "Recebemos sua mensagem!", successBody: "Nossa equipe entrará em contato com", whileWait: "Enquanto espera", whileWaitBody: "Pamela ainda pode responder a maioria das perguntas.", back: "← Voltar para Pamela" },
  },

  zh: {
    nav: { about: "关于我们", getInvolved: "参与其中", programs: "项目", stories: "故事", events: "活动", contact: "联系我们", donate: "捐款" },
    hero: { badge: "塞拉利昂 · 成立于2024", heading1: "每个孩子", heading2: "都值得拥有", heading3: "母亲的爱", body: "潘迪基金会为塞拉利昂的弱势儿童提供教育、营养、医疗和人类尊严。", cta1: "产生影响", cta2: "我们的故事" },
    stats: { children: "受助儿童", education: "在校学习", fed: "获得营养" },
    chat: { greeting: "你好！我是帕梅拉 👋 我在这里帮助您了解潘迪基金会，以及您如何改变塞拉利昂一个孩子的生活。您想了解什么？", placeholder: "向帕梅拉提问…", humanCta: "想与真人交谈？", poweredBy: "由 Groq AI 驱动 · 潘迪基金会", online: "在线", suggestions: ["我如何捐款？", "介绍您的项目", "如何资助一个孩子？", "如何做志愿者？"], donateBtn: "立即捐款", comingSoon: "在线捐款即将推出！现在捐款请发邮件至 info@pandiefoundation.org 💛", typing: "帕梅拉正在输入…", langSwitchMsg: "我已为您切换到中文！有什么可以帮助您的？" },
    handoff: { title: "联系我们的团队 👤", body: "留下您的联系方式，我们会亲自与您联系。", nameLbl: "您的姓名", emailLbl: "电子邮件地址", submit: "与我们的团队联系 →", submitting: "发送中…", orEmail: "或直接发邮件至", successTitle: "我们收到了您的留言！", successBody: "我们的团队将联系", whileWait: "在等待期间", whileWaitBody: "帕梅拉仍可即时回答大多数问题。", back: "← 返回帕梅拉" },
  },

  ar: {
    nav: { about: "من نحن", getInvolved: "شارك معنا", programs: "البرامج", stories: "القصص", events: "الفعاليات", contact: "تواصل معنا", donate: "تبرع" },
    hero: { badge: "سيراليون · تأسست 2024", heading1: "كل طفل", heading2: "يستحق", heading3: "حب الأم", body: "مؤسسة باندي تقف في الفجوة للأطفال الضعفاء في سيراليون — توفير التعليم والتغذية والرعاية الطبية وكرامة الإنسان.", cta1: "أحدث فرقاً", cta2: "قصتنا" },
    stats: { children: "طفل وصلنا إليه", education: "في التعليم", fed: "تغذية ورعاية" },
    chat: { greeting: "مرحباً! أنا باميلا 👋 أنا هنا لمساعدتك في التعرف على مؤسسة باندي. ماذا تريد أن تعرف؟", placeholder: "اسأل باميلا أي شيء…", humanCta: "تفضل التحدث مع شخص حقيقي؟", poweredBy: "مدعوم بـ Groq AI · مؤسسة بانديغ", online: "متصل", suggestions: ["كيف يمكنني التبرع؟", "أخبرني عن برامجكم", "كيف أكفل طفلاً؟", "كيف يمكنني التطوع؟"], donateBtn: "تبرع الآن", comingSoon: "التبرعات الإلكترونية قادمة قريباً! للتبرع الآن، راسلنا على info@pandiefoundation.org 💛", typing: "باميلا تكتب…", langSwitchMsg: "لقد تحولت إلى العربية من أجلك! كيف يمكنني مساعدتك؟" },
    handoff: { title: "تحدث مع فريقنا 👤", body: "اترك تفاصيلك وسنتواصل معك شخصياً.", nameLbl: "اسمك", emailLbl: "عنوان البريد الإلكتروني", submit: "تواصل مع فريقنا →", submitting: "جار الإرسال…", orEmail: "أو راسلنا مباشرة على", successTitle: "تلقينا رسالتك!", successBody: "سيتواصل فريقنا مع", whileWait: "في انتظارك", whileWaitBody: "لا تزال باميلا قادرة على الإجابة على معظم الأسئلة.", back: "← العودة إلى باميلا" },
  },

  ha: {
    nav: { about: "Game da Mu", getInvolved: "Shiga Tare", programs: "Shirye-shirye", stories: "Labarai", events: "Ayyuka", contact: "Tuntuɓe", donate: "Ba da Taimako" },
    hero: { badge: "Saliyo · Kafuwa 2024", heading1: "Kowane Yaro", heading2: "Ya Cancanci", heading3: "Ƙaunar Mahaifiya", body: "Gidauniyar Pandie tana tsaye don yara masu rauni a Saliyo — tana ba da ilimi, abinci, kiwon lafiya, da daraja.", cta1: "Yi Tasiri", cta2: "Labarinmu" },
    stats: { children: "Yara da Muka Taimaka", education: "A Makaranta", fed: "An Ciyar da Su" },
    chat: { greeting: "Sannu! Ni Pamela 👋 Ina nan don taimaka maka ka koyi game da Gidauniyar Pandie. Me kake son sani?", placeholder: "Yi wa Pamela tambaya…", humanCta: "Kana so ka yi magana da mutum na gaske?", poweredBy: "Groq AI ne ke tafiyar da shi · Gidauniyar Pandie", online: "Kan layi", suggestions: ["Yaya zan bayar da gudummawa?", "Gaya min game da shirye-shiryen ku", "Yaya zan tallafa wa yaro?", "Yaya zan yi aikin sa-kai?"], donateBtn: "Ba da Gudummawa Yanzu", comingSoon: "Ba da gudummawa ta yanar gizo yana zuwa nan ba da daɗewa ba! Don bayarwa yanzu, aika imel zuwa info@pandiefoundation.org 💛", typing: "Pamela tana rubuta…", langSwitchMsg: "Na canza zuwa Hausa saboda ka! Ta yaya zan taimake ka?" },
    handoff: { title: "Yi magana da ƙungiyarmu 👤", body: "Bar bayananka kuma za mu tuntuɓe ka da kanka.", nameLbl: "Sunanka", emailLbl: "Adireshin Imel", submit: "Tuntuɓi Ƙungiyarmu →", submitting: "Aika…", orEmail: "Ko aika imel zuwa", successTitle: "Mun karɓi saƙonka!", successBody: "Ƙungiyarmu za ta tuntuɓe", whileWait: "Yayin da kake jira", whileWaitBody: "Pamela na iya amsa mafi yawan tambayoyi.", back: "← Koma zuwa Pamela" },
  },

  sw: {
    nav: { about: "Kuhusu Sisi", getInvolved: "Shiriki", programs: "Programu", stories: "Hadithi", events: "Matukio", contact: "Wasiliana", donate: "Changia" },
    hero: { badge: "Sierra Leone · Ilianzishwa 2024", heading1: "Kila Mtoto", heading2: "Anastahili", heading3: "Upendo wa Mama", body: "Msingi wa Pandie unasimama kwa niaba ya watoto walio hatarini Sierra Leone — ukitoa elimu, lishe, huduma ya afya na heshima.", cta1: "Fanya Mabadiliko", cta2: "Hadithi Yetu" },
    stats: { children: "Watoto Waliofikiwa", education: "Wanasoma", fed: "Wanalishwa" },
    chat: { greeting: "Habari! Mimi ni Pamela 👋 Niko hapa kukusaidia kujifunza kuhusu Msingi wa Pandie. Unataka kujua nini?", placeholder: "Uliza Pamela chochote…", humanCta: "Unapendelea kuzungumza na mtu halisi?", poweredBy: "Inajumuishwa na Groq AI · Msingi wa Pandie", online: "Mtandaoni", suggestions: ["Nawezaje kuchangia?", "Niambie kuhusu programu zenu", "Nawezaje kusaidia mtoto?", "Nawezaje kujitolea?"], donateBtn: "Changia Sasa", comingSoon: "Michango ya mtandaoni inakuja hivi karibuni! Kuchangia sasa, tuma barua pepe kwa info@pandiefoundation.org 💛", typing: "Pamela anaandika…", langSwitchMsg: "Nimebadilisha hadi Kiswahili kwako! Ninawezaje kukusaidia?" },
    handoff: { title: "Zungumza na timu yetu 👤", body: "Acha maelezo yako nasi tutawasiliana nawe kibinafsi.", nameLbl: "Jina Lako", emailLbl: "Anwani ya Barua Pepe", submit: "Wasiliana na Timu Yetu →", submitting: "Inatuma…", orEmail: "Au tutumie barua pepe moja kwa moja", successTitle: "Tumepokea ujumbe wako!", successBody: "Timu yetu itawasiliana na", whileWait: "Unaposubiri", whileWaitBody: "Pamela bado anaweza kujibu maswali mengi.", back: "← Rudi kwa Pamela" },
  },

  hi: {
    nav: { about: "हमारे बारे में", getInvolved: "जुड़ें", programs: "कार्यक्रम", stories: "कहानियाँ", events: "कार्यक्रम", contact: "संपर्क", donate: "दान करें" },
    hero: { badge: "सिएरा लियोन · स्थापित 2024", heading1: "हर बच्चा", heading2: "पाने का हकदार है", heading3: "माँ का प्यार", body: "पंडी फाउंडेशन सिएरा लियोन के कमज़ोर बच्चों के लिए खड़ी है — शिक्षा, पोषण, चिकित्सा देखभाल और मानवीय गरिमा प्रदान करते हुए।", cta1: "प्रभाव डालें", cta2: "हमारी कहानी" },
    stats: { children: "बच्चे पहुँचे", education: "शिक्षा में", fed: "पोषित" },
    chat: { greeting: "नमस्ते! मैं पामेला हूँ 👋 मैं आपको पंडी फाउंडेशन के बारे में जानने में मदद करने के लिए यहाँ हूँ। आप क्या जानना चाहेंगे?", placeholder: "पामेला से कुछ भी पूछें…", humanCta: "क्या आप किसी असली व्यक्ति से बात करना चाहेंगे?", poweredBy: "Groq AI द्वारा संचालित · पंडी फाउंडेशन", online: "ऑनलाइन", suggestions: ["मैं कैसे दान कर सकता हूँ?", "अपने कार्यक्रमों के बारे में बताएं", "किसी बच्चे को कैसे प्रायोजित करें?", "मैं कैसे स्वयंसेवा कर सकता हूँ?"], donateBtn: "अभी दान करें", comingSoon: "ऑनलाइन दान जल्द आ रहा है! अभी दान करने के लिए info@pandiefoundation.org पर ईमेल करें 💛", typing: "पामेला टाइप कर रही है…", langSwitchMsg: "मैंने आपके लिए हिंदी में बदल दिया है! मैं कैसे मदद कर सकती हूँ?" },
    handoff: { title: "हमारी टीम से बात करें 👤", body: "अपना विवरण छोड़ें और हम व्यक्तिगत रूप से आपसे संपर्क करेंगे।", nameLbl: "आपका नाम", emailLbl: "ईमेल पता", submit: "हमारी टीम से जुड़ें →", submitting: "भेज रहे हैं…", orEmail: "या सीधे हमें ईमेल करें", successTitle: "हमें आपका संदेश मिला!", successBody: "हमारी टीम संपर्क करेगी", whileWait: "प्रतीक्षा करते हुए", whileWaitBody: "पामेला अभी भी अधिकांश प्रश्नों का उत्तर दे सकती है।", back: "← पामेला पर वापस जाएं" },
  },

  bn: {
    nav: { about: "আমাদের সম্পর্কে", getInvolved: "যোগ দিন", programs: "কার্যক্রম", stories: "গল্প", events: "অনুষ্ঠান", contact: "যোগাযোগ", donate: "দান করুন" },
    hero: { badge: "সিয়েরা লিওন · প্রতিষ্ঠিত ২০২৪", heading1: "প্রতিটি শিশু", heading2: "পাওয়ার যোগ্য", heading3: "মায়ের ভালোবাসা", body: "পান্ডি ফাউন্ডেশন সিয়েরা লিওনের দুর্বল শিশুদের জন্য দাঁড়িয়ে আছে।", cta1: "প্রভাব ফেলুন", cta2: "আমাদের গল্প" },
    stats: { children: "শিশুদের কাছে পৌঁছানো", education: "শিক্ষায়", fed: "পুষ্টি প্রাপ্ত" },
    chat: { greeting: "হ্যালো! আমি পামেলা 👋 আমি আপনাকে পান্ডি ফাউন্ডেশন সম্পর্কে জানতে সাহায্য করতে এখানে আছি। আপনি কি জানতে চান?", placeholder: "পামেলাকে কিছু জিজ্ঞেস করুন…", humanCta: "একজন সত্যিকারের মানুষের সাথে কথা বলতে চান?", poweredBy: "Groq AI দ্বারা পরিচালিত · পান্ডি ফাউন্ডেশন", online: "অনলাইন", suggestions: ["আমি কীভাবে দান করতে পারি?", "আপনার কার্যক্রম সম্পর্কে বলুন", "কীভাবে একটি শিশুকে স্পনসর করব?", "কীভাবে স্বেচ্ছাসেবী হতে পারি?"], donateBtn: "এখন দান করুন", comingSoon: "অনলাইন দান শীঘ্রই আসছে! এখন দান করতে info@pandiefoundation.org এ ইমেইল করুন 💛", typing: "পামেলা টাইপ করছেন…", langSwitchMsg: "আমি আপনার জন্য বাংলায় পরিবর্তন করেছি! আমি কীভাবে সাহায্য করতে পারি?" },
    handoff: { title: "আমাদের দলের সাথে কথা বলুন 👤", body: "আপনার বিবরণ রেখে যান এবং আমরা ব্যক্তিগতভাবে যোগাযোগ করব।", nameLbl: "আপনার নাম", emailLbl: "ইমেইল ঠিকানা", submit: "আমাদের দলের সাথে সংযোগ করুন →", submitting: "পাঠানো হচ্ছে…", orEmail: "অথবা সরাসরি ইমেইল করুন", successTitle: "আমরা আপনার বার্তা পেয়েছি!", successBody: "আমাদের দল যোগাযোগ করবে", whileWait: "অপেক্ষার সময়", whileWaitBody: "পামেলা এখনও বেশিরভাগ প্রশ্নের উত্তর দিতে পারেন।", back: "← পামেলায় ফিরে যান" },
  },

  ru: {
    nav: { about: "О нас", getInvolved: "Участвовать", programs: "Программы", stories: "Истории", events: "События", contact: "Контакт", donate: "Пожертвовать" },
    hero: { badge: "Сьерра-Леоне · Основана 2024", heading1: "Каждый Ребёнок", heading2: "Заслуживает", heading3: "Материнской Любви", body: "Фонд Панди поддерживает уязвимых детей Сьерра-Леоне — обеспечивая образование, питание, медицинскую помощь и человеческое достоинство.", cta1: "Изменить Жизнь", cta2: "Наша История" },
    stats: { children: "Охваченных Детей", education: "Получают Образование", fed: "Накормлены" },
    chat: { greeting: "Привет! Я Памела 👋 Я здесь, чтобы помочь вам узнать о Фонде Панди. Что вы хотите знать?", placeholder: "Спросите Памелу что угодно…", humanCta: "Предпочитаете поговорить с живым человеком?", poweredBy: "Работает на Groq AI · Фонд Панди", online: "Онлайн", suggestions: ["Как я могу пожертвовать?", "Расскажите о программах", "Как стать спонсором ребёнка?", "Как стать волонтёром?"], donateBtn: "Пожертвовать Сейчас", comingSoon: "Онлайн-пожертвования скоро будут доступны! Чтобы пожертвовать сейчас, напишите на info@pandiefoundation.org 💛", typing: "Памела печатает…", langSwitchMsg: "Я переключилась на русский для вас! Чем могу помочь?" },
    handoff: { title: "Поговорить с нашей командой 👤", body: "Оставьте свои данные, и мы свяжемся с вами лично.", nameLbl: "Ваше Имя", emailLbl: "Адрес Электронной Почты", submit: "Связаться с Нашей Командой →", submitting: "Отправка…", orEmail: "Или напишите нам напрямую", successTitle: "Мы получили ваше сообщение!", successBody: "Наша команда свяжется с", whileWait: "Пока вы ждёте", whileWaitBody: "Памела может ответить на большинство вопросов.", back: "← Вернуться к Памеле" },
  },

  ja: {
    nav: { about: "私たちについて", getInvolved: "参加する", programs: "プログラム", stories: "ストーリー", events: "イベント", contact: "お問い合わせ", donate: "寄付する" },
    hero: { badge: "シエラレオネ · 2024年設立", heading1: "すべての子どもに", heading2: "ふさわしい", heading3: "母の愛", body: "パンディ財団はシエラレオネの弱い立場の子どもたちのために、教育、栄養、医療、人間としての尊厳を提供しています。", cta1: "インパクトを与える", cta2: "私たちの物語" },
    stats: { children: "支援した子ども", education: "就学中", fed: "栄養支援" },
    chat: { greeting: "こんにちは！パメラです 👋 パンディ財団についてお伝えするためにここにいます。何を知りたいですか？", placeholder: "パメラに何でも聞いてください…", humanCta: "実際の人と話したいですか？", poweredBy: "Groq AI 搭載 · パンディ財団", online: "オンライン", suggestions: ["寄付するにはどうすればいいですか？", "プログラムについて教えてください", "子どもをスポンサーするには？", "ボランティアになるには？"], donateBtn: "今すぐ寄付する", comingSoon: "オンライン寄付は近日公開予定です！今すぐ寄付するには info@pandiefoundation.org にメールしてください 💛", typing: "パメラが入力中…", langSwitchMsg: "日本語に切り替えました！どのようにお手伝いできますか？" },
    handoff: { title: "チームに連絡する 👤", body: "詳細を残してください。個人的にご連絡します。", nameLbl: "お名前", emailLbl: "メールアドレス", submit: "チームに連絡する →", submitting: "送信中…", orEmail: "または直接メールを送る", successTitle: "メッセージを受け取りました！", successBody: "チームが連絡します", whileWait: "お待ちの間", whileWaitBody: "パメラはほとんどの質問にすぐに答えられます。", back: "← パメラに戻る" },
  },

  ko: {
    nav: { about: "우리 소개", getInvolved: "참여하기", programs: "프로그램", stories: "이야기", events: "이벤트", contact: "연락처", donate: "기부하기" },
    hero: { badge: "시에라리온 · 2024년 설립", heading1: "모든 아이는", heading2: "받을 자격이 있다", heading3: "어머니의 사랑을", body: "판디 재단은 시에라리온의 취약한 아이들을 위해 교육, 영양, 의료 및 인간의 존엄성을 제공합니다.", cta1: "변화 만들기", cta2: "우리의 이야기" },
    stats: { children: "지원 아동", education: "교육 중", fed: "영양 지원" },
    chat: { greeting: "안녕하세요! 저는 파멜라입니다 👋 판디 재단에 대해 알려드리기 위해 여기 있습니다. 무엇이 궁금하신가요?", placeholder: "파멜라에게 무엇이든 물어보세요…", humanCta: "실제 사람과 대화하고 싶으신가요?", poweredBy: "Groq AI 기반 · 판디 재단", online: "온라인", suggestions: ["어떻게 기부할 수 있나요?", "프로그램에 대해 알려주세요", "아이를 후원하려면?", "봉사활동 방법은?"], donateBtn: "지금 기부하기", comingSoon: "온라인 기부가 곧 시작됩니다! 지금 기부하려면 info@pandiefoundation.org로 이메일 보내주세요 💛", typing: "파멜라가 입력 중…", langSwitchMsg: "한국어로 전환했습니다! 어떻게 도와드릴까요?" },
    handoff: { title: "팀에 연락하기 👤", body: "연락처를 남겨주시면 직접 연락드리겠습니다.", nameLbl: "성함", emailLbl: "이메일 주소", submit: "팀에 연결하기 →", submitting: "전송 중…", orEmail: "또는 직접 이메일 보내기", successTitle: "메시지를 받았습니다!", successBody: "팀이 연락할 예정입니다", whileWait: "기다리는 동안", whileWaitBody: "파멜라가 대부분의 질문에 즉시 답변할 수 있습니다.", back: "← 파멜라로 돌아가기" },
  },

  de: {
    nav: { about: "Über Uns", getInvolved: "Mitmachen", programs: "Programme", stories: "Geschichten", events: "Veranstaltungen", contact: "Kontakt", donate: "Spenden" },
    hero: { badge: "Sierra Leone · Gegr. 2024", heading1: "Jedes Kind", heading2: "Verdient", heading3: "Mutterliebe", body: "Die Pandie-Stiftung steht für gefährdete Kinder in Sierra Leone — mit Bildung, Ernährung, medizinischer Versorgung und Menschenwürde.", cta1: "Etwas Bewirken", cta2: "Unsere Geschichte" },
    stats: { children: "Erreichte Kinder", education: "In Bildung", fed: "Ernährt" },
    chat: { greeting: "Hallo! Ich bin Pamela 👋 Ich bin hier, um Ihnen mehr über die Pandie-Stiftung zu erzählen. Was möchten Sie wissen?", placeholder: "Stellen Sie Pamela eine Frage…", humanCta: "Möchten Sie lieber mit einem echten Menschen sprechen?", poweredBy: "Powered by Groq AI · Pandie-Stiftung", online: "Online", suggestions: ["Wie kann ich spenden?", "Erzählen Sie mir von Ihren Programmen", "Wie kann ich ein Kind fördern?", "Wie kann ich mich ehrenamtlich engagieren?"], donateBtn: "Jetzt Spenden", comingSoon: "Online-Spenden kommen bald! Um jetzt zu spenden, senden Sie eine E-Mail an info@pandiefoundation.org 💛", typing: "Pamela schreibt…", langSwitchMsg: "Ich habe für Sie auf Deutsch umgeschaltet! Wie kann ich helfen?" },
    handoff: { title: "Mit unserem Team sprechen 👤", body: "Hinterlassen Sie Ihre Daten und wir melden uns persönlich bei Ihnen.", nameLbl: "Ihr Name", emailLbl: "E-Mail-Adresse", submit: "Mit Unserem Team Verbinden →", submitting: "Wird gesendet…", orEmail: "Oder schreiben Sie uns direkt an", successTitle: "Wir haben Ihre Nachricht erhalten!", successBody: "Unser Team wird sich bei Ihnen melden", whileWait: "Während Sie warten", whileWaitBody: "Pamela kann die meisten Fragen sofort beantworten.", back: "← Zurück zu Pamela" },
  },

  it: {
    nav: { about: "Chi Siamo", getInvolved: "Partecipa", programs: "Programmi", stories: "Storie", events: "Eventi", contact: "Contatti", donate: "Dona" },
    hero: { badge: "Sierra Leone · Fond. 2024", heading1: "Ogni Bambino", heading2: "Merita", heading3: "L'Amore di una Madre", body: "La Fondazione Pandie sostiene i bambini vulnerabili in Sierra Leone — offrendo istruzione, nutrizione, cure mediche e dignità umana.", cta1: "Fai la Differenza", cta2: "La Nostra Storia" },
    stats: { children: "Bambini Raggiunti", education: "In Istruzione", fed: "Nutriti" },
    chat: { greeting: "Ciao! Sono Pamela 👋 Sono qui per aiutarti a conoscere la Fondazione Pandie. Cosa vorresti sapere?", placeholder: "Chiedi qualcosa a Pamela…", humanCta: "Preferisci parlare con una persona reale?", poweredBy: "Powered by Groq AI · Fondazione Pandie", online: "Online", suggestions: ["Come posso donare?", "Parlami dei tuoi programmi", "Come adottare un bambino?", "Come fare volontariato?"], donateBtn: "Dona Ora", comingSoon: "Le donazioni online arrivano presto! Per donare ora, scrivi a info@pandiefoundation.org 💛", typing: "Pamela sta scrivendo…", langSwitchMsg: "Ho cambiato in italiano per te! Come posso aiutarti?" },
    handoff: { title: "Parla con il nostro team 👤", body: "Lascia i tuoi dati e ti contatteremo personalmente.", nameLbl: "Il Tuo Nome", emailLbl: "Indirizzo Email", submit: "Connettiti con il Nostro Team →", submitting: "Invio…", orEmail: "O scrivici direttamente a", successTitle: "Abbiamo ricevuto il tuo messaggio!", successBody: "Il nostro team contatterà", whileWait: "Mentre aspetti", whileWaitBody: "Pamela può ancora rispondere alla maggior parte delle domande.", back: "← Torna a Pamela" },
  },

  tr: { nav: { about: "Hakkımızda", getInvolved: "Katılın", programs: "Programlar", stories: "Hikayeler", events: "Etkinlikler", contact: "İletişim", donate: "Bağış Yap" }, hero: { badge: "Sierra Leone · Kur. 2024", heading1: "Her Çocuk", heading2: "Hak Eder", heading3: "Anne Sevgisini", body: "Pandie Vakfı, Sierra Leone'deki savunmasız çocuklar için eğitim, beslenme, sağlık hizmetleri ve insan onuru sağlıyor.", cta1: "Fark Yarat", cta2: "Hikayemiz" }, stats: { children: "Ulaşılan Çocuk", education: "Eğitimde", fed: "Beslenen" }, chat: { greeting: "Merhaba! Ben Pamela 👋 Pandie Vakfı hakkında bilgi vermeye hazırım. Ne öğrenmek istersiniz?", placeholder: "Pamela'ya bir şey sorun…", humanCta: "Gerçek bir kişiyle konuşmayı tercih eder misiniz?", poweredBy: "Groq AI ile çalışır · Pandie Vakfı", online: "Çevrimiçi", suggestions: ["Nasıl bağış yapabilirim?", "Programlarınız hakkında bilgi verin", "Bir çocuğu nasıl destekleyebilirim?", "Nasıl gönüllü olabilirim?"], donateBtn: "Şimdi Bağış Yap", comingSoon: "Online bağışlar yakında! Şimdi bağış yapmak için info@pandiefoundation.org adresine e-posta gönderin 💛", typing: "Pamela yazıyor…", langSwitchMsg: "Sizin için Türkçe'ye geçtim! Nasıl yardımcı olabilirim?" }, handoff: { title: "Ekibimizle konuşun 👤", body: "Bilgilerinizi bırakın, kişisel olarak iletişime geçeceğiz.", nameLbl: "Adınız", emailLbl: "E-posta Adresi", submit: "Ekibimizle Bağlantı Kurun →", submitting: "Gönderiliyor…", orEmail: "Veya doğrudan e-posta gönderin", successTitle: "Mesajınızı aldık!", successBody: "Ekibimiz iletişime geçecek", whileWait: "Beklerken", whileWaitBody: "Pamela çoğu soruyu anında yanıtlayabilir.", back: "← Pamela'ya Geri Dön" } },

  vi: { nav: { about: "Về Chúng Tôi", getInvolved: "Tham Gia", programs: "Chương Trình", stories: "Câu Chuyện", events: "Sự Kiện", contact: "Liên Hệ", donate: "Quyên Góp" }, hero: { badge: "Sierra Leone · Thành lập 2024", heading1: "Mọi Trẻ Em", heading2: "Xứng Đáng Được", heading3: "Tình Yêu Của Mẹ", body: "Quỹ Pandie hỗ trợ trẻ em dễ bị tổn thương ở Sierra Leone — cung cấp giáo dục, dinh dưỡng, chăm sóc y tế và phẩm giá con người.", cta1: "Tạo Ảnh Hưởng", cta2: "Câu Chuyện Của Chúng Tôi" }, stats: { children: "Trẻ Em Được Tiếp Cận", education: "Đang Học", fed: "Được Nuôi Dưỡng" }, chat: { greeting: "Xin chào! Tôi là Pamela 👋 Tôi ở đây để giúp bạn tìm hiểu về Quỹ Pandie. Bạn muốn biết điều gì?", placeholder: "Hỏi Pamela bất cứ điều gì…", humanCta: "Bạn muốn nói chuyện với người thật?", poweredBy: "Được hỗ trợ bởi Groq AI · Quỹ Pandie", online: "Trực tuyến", suggestions: ["Tôi có thể quyên góp như thế nào?", "Cho tôi biết về các chương trình", "Làm thế nào để bảo trợ một trẻ em?", "Tôi có thể tình nguyện như thế nào?"], donateBtn: "Quyên Góp Ngay", comingSoon: "Quyên góp trực tuyến sẽ sớm ra mắt! Để quyên góp ngay, hãy gửi email đến info@pandiefoundation.org 💛", typing: "Pamela đang nhập…", langSwitchMsg: "Tôi đã chuyển sang tiếng Việt cho bạn! Tôi có thể giúp gì?" }, handoff: { title: "Nói chuyện với đội của chúng tôi 👤", body: "Để lại thông tin của bạn và chúng tôi sẽ liên hệ cá nhân.", nameLbl: "Tên của bạn", emailLbl: "Địa chỉ Email", submit: "Kết Nối với Đội Của Chúng Tôi →", submitting: "Đang gửi…", orEmail: "Hoặc gửi email trực tiếp tới", successTitle: "Chúng tôi đã nhận được tin nhắn của bạn!", successBody: "Đội của chúng tôi sẽ liên hệ", whileWait: "Trong khi chờ đợi", whileWaitBody: "Pamela vẫn có thể trả lời hầu hết các câu hỏi ngay lập tức.", back: "← Quay lại Pamela" } },

  th: { nav: { about: "เกี่ยวกับเรา", getInvolved: "มีส่วนร่วม", programs: "โปรแกรม", stories: "เรื่องราว", events: "กิจกรรม", contact: "ติดต่อ", donate: "บริจาค" }, hero: { badge: "เซียร์ราลีโอน · ก่อตั้ง 2024", heading1: "เด็กทุกคน", heading2: "สมควรได้รับ", heading3: "ความรักจากแม่", body: "มูลนิธิแพนดีสนับสนุนเด็กที่เปราะบางในเซียร์ราลีโอน — ให้การศึกษา โภชนาการ การดูแลสุขภาพ และศักดิ์ศรีความเป็นมนุษย์", cta1: "สร้างผลกระทบ", cta2: "เรื่องราวของเรา" }, stats: { children: "เด็กที่ได้รับความช่วยเหลือ", education: "ในการศึกษา", fed: "ได้รับโภชนาการ" }, chat: { greeting: "สวัสดี! ฉันชื่อปาเมลา 👋 ฉันอยู่ที่นี่เพื่อช่วยให้คุณเรียนรู้เกี่ยวกับมูลนิธิแพนดี คุณอยากรู้อะไร?", placeholder: "ถามปาเมลาอะไรก็ได้…", humanCta: "ต้องการพูดคุยกับคนจริงๆ?", poweredBy: "ขับเคลื่อนโดย Groq AI · มูลนิธิแพนดี", online: "ออนไลน์", suggestions: ["ฉันจะบริจาคได้อย่างไร?", "บอกฉันเกี่ยวกับโปรแกรมของคุณ", "จะอุปการะเด็กได้อย่างไร?", "จะเป็นอาสาสมัครได้อย่างไร?"], donateBtn: "บริจาคเดี๋ยวนี้", comingSoon: "การบริจาคออนไลน์กำลังจะมาเร็วๆ นี้! หากต้องการบริจาคตอนนี้ โปรดส่งอีเมลไปที่ info@pandiefoundation.org 💛", typing: "ปาเมลากำลังพิมพ์…", langSwitchMsg: "ฉันเปลี่ยนเป็นภาษาไทยสำหรับคุณแล้ว! ฉันจะช่วยได้อย่างไร?" }, handoff: { title: "พูดคุยกับทีมของเรา 👤", body: "ทิ้งรายละเอียดของคุณไว้แล้วเราจะติดต่อคุณเป็นการส่วนตัว", nameLbl: "ชื่อของคุณ", emailLbl: "ที่อยู่อีเมล", submit: "เชื่อมต่อกับทีมของเรา →", submitting: "กำลังส่ง…", orEmail: "หรือส่งอีเมลโดยตรงถึง", successTitle: "เราได้รับข้อความของคุณแล้ว!", successBody: "ทีมของเราจะติดต่อ", whileWait: "ในขณะที่รอ", whileWaitBody: "ปาเมลายังสามารถตอบคำถามส่วนใหญ่ได้ทันที", back: "← กลับไปที่ปาเมลา" } },

  pl: { nav: { about: "O Nas", getInvolved: "Dołącz", programs: "Programy", stories: "Historie", events: "Wydarzenia", contact: "Kontakt", donate: "Darowiźna" }, hero: { badge: "Sierra Leone · Zał. 2024", heading1: "Każde Dziecko", heading2: "Zasługuje na", heading3: "Miłość Matki", body: "Fundacja Pandie wspiera bezbronnych dzieci w Sierra Leone — zapewniając edukację, żywienie, opiekę medyczną i godność człowieka.", cta1: "Zrób Różnicę", cta2: "Nasza Historia" }, stats: { children: "Objętych Dzieci", education: "W Edukacji", fed: "Odżywionych" }, chat: { greeting: "Cześć! Jestem Pamela 👋 Jestem tutaj, żeby pomóc Ci dowiedzieć się o Fundacji Pandie. Co chciałbyś wiedzieć?", placeholder: "Zapytaj Pamelę o cokolwiek…", humanCta: "Wolisz porozmawiać z prawdziwą osobą?", poweredBy: "Zasilane przez Groq AI · Fundacja Pandie", online: "Online", suggestions: ["Jak mogę przekazać darowiznę?", "Opowiedz o swoich programach", "Jak sponsorować dziecko?", "Jak zostać wolontariuszem?"], donateBtn: "Przekaż Darowiznę Teraz", comingSoon: "Darowizny online wkrótce! Aby przekazać darowiznę teraz, wyślij e-mail na info@pandiefoundation.org 💛", typing: "Pamela pisze…", langSwitchMsg: "Przełączyłam się na polski dla Ciebie! Jak mogę pomóc?" }, handoff: { title: "Porozmawiaj z naszym zespołem 👤", body: "Zostaw swoje dane, a skontaktujemy się z Tobą osobiście.", nameLbl: "Twoje Imię", emailLbl: "Adres E-mail", submit: "Połącz się z Naszym Zespołem →", submitting: "Wysyłanie…", orEmail: "Lub napisz do nas bezpośrednio na", successTitle: "Otrzymaliśmy Twoją wiadomość!", successBody: "Nasz zespół skontaktuje się z", whileWait: "Podczas oczekiwania", whileWaitBody: "Pamela wciąż może natychmiast odpowiedzieć na większość pytań.", back: "← Wróć do Pameli" } },

  nl: { nav: { about: "Over Ons", getInvolved: "Doe Mee", programs: "Programma's", stories: "Verhalen", events: "Evenementen", contact: "Contact", donate: "Doneer" }, hero: { badge: "Sierra Leone · Opger. 2024", heading1: "Elk Kind", heading2: "Verdient", heading3: "Moederliefde", body: "De Pandie Foundation staat op voor kwetsbare kinderen in Sierra Leone — met onderwijs, voeding, medische zorg en menselijke waardigheid.", cta1: "Maak Impact", cta2: "Ons Verhaal" }, stats: { children: "Bereikte Kinderen", education: "In Onderwijs", fed: "Gevoed" }, chat: { greeting: "Hallo! Ik ben Pamela 👋 Ik ben hier om je meer te vertellen over de Pandie Foundation. Wat wil je weten?", placeholder: "Stel Pamela een vraag…", humanCta: "Praat je liever met een echte persoon?", poweredBy: "Aangedreven door Groq AI · Pandie Foundation", online: "Online", suggestions: ["Hoe kan ik doneren?", "Vertel me over jullie programma's", "Hoe een kind sponsoren?", "Hoe vrijwilliger worden?"], donateBtn: "Doneer Nu", comingSoon: "Online donaties komen eraan! Om nu te doneren, stuur een e-mail naar info@pandiefoundation.org 💛", typing: "Pamela typt…", langSwitchMsg: "Ik heb overgeschakeld naar het Nederlands voor jou! Hoe kan ik helpen?" }, handoff: { title: "Spreek met ons team 👤", body: "Laat je gegevens achter en we nemen persoonlijk contact met je op.", nameLbl: "Jouw Naam", emailLbl: "E-mailadres", submit: "Verbind met Ons Team →", submitting: "Verzenden…", orEmail: "Of mail ons rechtstreeks op", successTitle: "We hebben je bericht ontvangen!", successBody: "Ons team neemt contact op met", whileWait: "Terwijl je wacht", whileWaitBody: "Pamela kan de meeste vragen direct beantwoorden.", back: "← Terug naar Pamela" } },

  id: { nav: { about: "Tentang Kami", getInvolved: "Ikut Serta", programs: "Program", stories: "Cerita", events: "Acara", contact: "Kontak", donate: "Donasi" }, hero: { badge: "Sierra Leone · Didirikan 2024", heading1: "Setiap Anak", heading2: "Berhak Mendapat", heading3: "Kasih Sayang Ibu", body: "Yayasan Pandie berdiri untuk anak-anak rentan di Sierra Leone — memberikan pendidikan, nutrisi, perawatan kesehatan, dan martabat manusia.", cta1: "Buat Dampak", cta2: "Cerita Kami" }, stats: { children: "Anak Dijangkau", education: "Dalam Pendidikan", fed: "Diberi Makan" }, chat: { greeting: "Halo! Saya Pamela 👋 Saya di sini untuk membantu Anda belajar tentang Yayasan Pandie. Apa yang ingin Anda ketahui?", placeholder: "Tanya Pamela apa saja…", humanCta: "Lebih suka berbicara dengan orang nyata?", poweredBy: "Didukung oleh Groq AI · Yayasan Pandie", online: "Online", suggestions: ["Bagaimana cara berdonasi?", "Ceritakan tentang program Anda", "Bagaimana mensponsori anak?", "Bagaimana menjadi sukarelawan?"], donateBtn: "Donasi Sekarang", comingSoon: "Donasi online segera hadir! Untuk donasi sekarang, kirim email ke info@pandiefoundation.org 💛", typing: "Pamela sedang mengetik…", langSwitchMsg: "Saya sudah beralih ke Bahasa Indonesia untuk Anda! Bagaimana saya bisa membantu?" }, handoff: { title: "Bicara dengan tim kami 👤", body: "Tinggalkan detail Anda dan kami akan menghubungi Anda secara pribadi.", nameLbl: "Nama Anda", emailLbl: "Alamat Email", submit: "Hubungkan dengan Tim Kami →", submitting: "Mengirim…", orEmail: "Atau email kami langsung di", successTitle: "Kami menerima pesan Anda!", successBody: "Tim kami akan menghubungi", whileWait: "Sementara menunggu", whileWaitBody: "Pamela masih bisa langsung menjawab sebagian besar pertanyaan.", back: "← Kembali ke Pamela" } },

  ms: { nav: { about: "Tentang Kami", getInvolved: "Sertai", programs: "Program", stories: "Kisah", events: "Acara", contact: "Hubungi", donate: "Derma" }, hero: { badge: "Sierra Leone · Ditubuhkan 2024", heading1: "Setiap Kanak-kanak", heading2: "Layak Mendapat", heading3: "Kasih Sayang Ibu", body: "Yayasan Pandie berdiri untuk kanak-kanak yang terdedah di Sierra Leone — menyediakan pendidikan, pemakanan, penjagaan perubatan dan maruah manusia.", cta1: "Buat Impak", cta2: "Kisah Kami" }, stats: { children: "Kanak-kanak Dicapai", education: "Dalam Pendidikan", fed: "Diberi Makan" }, chat: { greeting: "Helo! Saya Pamela 👋 Saya di sini untuk membantu anda mengetahui tentang Yayasan Pandie. Apa yang anda ingin tahu?", placeholder: "Tanya Pamela apa sahaja…", humanCta: "Lebih suka bercakap dengan orang sebenar?", poweredBy: "Dikuasakan oleh Groq AI · Yayasan Pandie", online: "Dalam Talian", suggestions: ["Bagaimana saya boleh menderma?", "Ceritakan tentang program anda", "Bagaimana menaja kanak-kanak?", "Bagaimana menjadi sukarelawan?"], donateBtn: "Derma Sekarang", comingSoon: "Derma dalam talian akan datang! Untuk menderma sekarang, hantar e-mel ke info@pandiefoundation.org 💛", typing: "Pamela sedang menaip…", langSwitchMsg: "Saya telah beralih ke Bahasa Melayu untuk anda! Bagaimana saya boleh membantu?" }, handoff: { title: "Bercakap dengan pasukan kami 👤", body: "Tinggalkan butiran anda dan kami akan menghubungi anda secara peribadi.", nameLbl: "Nama Anda", emailLbl: "Alamat E-mel", submit: "Hubungi Pasukan Kami →", submitting: "Menghantar…", orEmail: "Atau e-mel kami terus di", successTitle: "Kami menerima mesej anda!", successBody: "Pasukan kami akan menghubungi", whileWait: "Semasa menunggu", whileWaitBody: "Pamela masih boleh menjawab kebanyakan soalan dengan segera.", back: "← Kembali ke Pamela" } },

  fa: { nav: { about: "درباره ما", getInvolved: "شرکت کنید", programs: "برنامه‌ها", stories: "داستان‌ها", events: "رویدادها", contact: "تماس", donate: "کمک مالی" }, hero: { badge: "سیرالئون · تأسیس ۲۰۲۴", heading1: "هر کودکی", heading2: "سزاوار", heading3: "عشق مادری است", body: "بنیاد پاندی برای کودکان آسیب‌پذیر در سیرالئون می‌ایستد — آموزش، تغذیه، مراقبت پزشکی و کرامت انسانی فراهم می‌کند.", cta1: "تأثیرگذار باشید", cta2: "داستان ما" }, stats: { children: "کودکان تحت پوشش", education: "در آموزش", fed: "تغذیه شده" }, chat: { greeting: "سلام! من پاملا هستم 👋 اینجام تا به شما در یادگیری درباره بنیاد پاندی کمک کنم. چه می‌خواهید بدانید؟", placeholder: "از پاملا هر چیزی بپرسید…", humanCta: "ترجیح می‌دهید با یک انسان واقعی صحبت کنید؟", poweredBy: "با استفاده از Groq AI · بنیاد پاندی", online: "آنلاین", suggestions: ["چطور می‌توانم کمک مالی کنم؟", "درباره برنامه‌هایتان بگویید", "چطور یک کودک را حمایت کنم؟", "چطور داوطلب شوم؟"], donateBtn: "همین الان کمک کنید", comingSoon: "کمک‌های مالی آنلاین به زودی! برای کمک الان به info@pandiefoundation.org ایمیل بزنید 💛", typing: "پاملا در حال تایپ…", langSwitchMsg: "برای شما به فارسی تغییر دادم! چطور می‌توانم کمک کنم؟" }, handoff: { title: "با تیم ما صحبت کنید 👤", body: "اطلاعات خود را بگذارید و ما شخصاً با شما تماس می‌گیریم.", nameLbl: "نام شما", emailLbl: "آدرس ایمیل", submit: "ارتباط با تیم ما ←", submitting: "در حال ارسال…", orEmail: "یا مستقیماً به ما ایمیل بزنید", successTitle: "پیام شما را دریافت کردیم!", successBody: "تیم ما با", whileWait: "در انتظار", whileWaitBody: "پاملا هنوز می‌تواند بیشتر سوالات را فوری پاسخ دهد.", back: "→ بازگشت به پاملا" } },

  yo: { nav: { about: "Nípa Wa", getInvolved: "Darapọ Mọ", programs: "Àwọn Ètò", stories: "Àwọn Ìtàn", events: "Àwọn Ìṣẹ̀lẹ̀", contact: "Kàn Sí Wa", donate: "Ṣetọrẹ" }, hero: { badge: "Sierra Leone · Dásílẹ̀ 2024", heading1: "Ọmọ Kọọkan", heading2: "Yẹ Láti Gba", heading3: "Ifẹ Ìyá", body: "Àjọ Pandie dúró fún àwọn ọmọdé alágbàáṣeyọrí ní Sierra Leone — pípèsè ẹ̀kọ́, oúnjẹ, ìtọ́jú ìlera, àti ọlá ènìyàn.", cta1: "Ṣe Iyipada", cta2: "Ìtàn Wa" }, stats: { children: "Àwọn Ọmọdé Tí A Dé", education: "Nínú Ẹ̀kọ́", fed: "Tí A Jẹ Ní Oúnjẹ" }, chat: { greeting: "Ẹ káàbọ̀! Pamela ni mi 👋 Mo wà níbí láti ràn yín lọ́wọ́ láti kọ̀ nípa Àjọ Pandie. Kíni ẹ fẹ́ mọ̀?", placeholder: "Béèrè lọ́wọ́ Pamela nǹkan…", humanCta: "Ṣé ẹ fẹ́ sọrọ pẹ̀lú ènìyàn gidi?", poweredBy: "Groq AI ló ń ṣiṣẹ́ rẹ̀ · Àjọ Pandie", online: "Lórí Àyelujára", suggestions: ["Báwo ni mo ṣe lè ṣetọrẹ?", "Sọ fún mi nípa àwọn ètò yín", "Báwo ni mo ṣe lè ṣètìlẹ́yìn ọmọdé?", "Báwo ni mo ṣe lè jẹ́ olùyọọda?"], donateBtn: "Ṣetọrẹ Báyìí", comingSoon: "Àwọn ẹbọ lórí àyelujára ń bọ̀! Láti ṣetọrẹ báyìí, fi ìmẹ̀lẹ̀ránṣẹ́ sí info@pandiefoundation.org 💛", typing: "Pamela ń kọ̀wé…", langSwitchMsg: "Mo yí padà sí Yorùbá fún yín! Báwo ni mo ṣe lè ràn yín lọ́wọ́?" }, handoff: { title: "Sọrọ pẹ̀lú ẹgbẹ́ wa 👤", body: "Fi àwọn àlàyé yín sílẹ̀ a ó sọ̀rọ̀ pẹ̀lú yín fún ara ẹni.", nameLbl: "Orúkọ Rẹ", emailLbl: "Àdírẹ́sì Ìmẹ̀lẹ̀", submit: "Sopọ Mọ Ẹgbẹ́ Wa →", submitting: "Ń ránsẹ́…", orEmail: "Tàbí fi ìmẹ̀lẹ̀ ránṣẹ́ sí wa tààràtà", successTitle: "A gba ìfọ̀rọ̀ yín!", successBody: "Ẹgbẹ́ wa yóò kan sí", whileWait: "Nígbà tí ẹ ń dúró", whileWaitBody: "Pamela ṣì lè dáhùn sí ọ̀pọ̀lọpọ̀ ìbéèrè lẹ́sẹ̀kẹsẹ̀.", back: "← Padà sí Pamela" } },

  ig: { nav: { about: "Maka Anyị", getInvolved: "Sonye", programs: "Mmemme", stories: "Akụkọ", events: "Omume", contact: "Kpọtụrụ Anyị", donate: "Nye Onyinye" }, hero: { badge: "Sierra Leone · Hichapụtara 2024", heading1: "Nwa Ọ Bụla", heading2: "Érékwé Nweta", heading3: "Ịhụnanya Nne", body: "Ntọala Pandie na-akwado ụmụaka ndị adịghị ike na Sierra Leone — na-enye mmụta, nri, ọrụ ahụike, na ùgwù mmadụ.", cta1: "Mee Ihe Dị Mkpa", cta2: "Akụkọ Anyị" }, stats: { children: "Ụmụaka Ruru", education: "Na Mmụta", fed: "Nọ Nri" }, chat: { greeting: "Nnọọ! Aha m bụ Pamela 👋 Anọ m ebe a ịnyere gị aka ịmụta banyere Ntọala Pandie. Gịnị chọrọ ịmara?", placeholder: "Jụọ Pamela ihe ọ bụla…", humanCta: "Ị chọrọ ikwu okwu na mmadụ n'ezie?", poweredBy: "Groq AI na-eme ka o rụọ ọrụ · Ntọala Pandie", online: "Na ntanetị", suggestions: ["Olee otú m ga-enye onyinye?", "Kọọ m maka mmemme gị", "Olee otú m ga-akwado nwa?", "Olee otú m ga-abụ onye ọrụ afọ ofufo?"], donateBtn: "Nye Onyinye Ugbu a", comingSoon: "Onyinye na ntanetị na-abịa n'oge na-adịghị anya! Iji nye ugbu a, ziga email gaa info@pandiefoundation.org 💛", typing: "Pamela na-ede…", langSwitchMsg: "Agbanwela m gaa Igbo maka gị! Olee otú m ga-enyere gị aka?" }, handoff: { title: "Kwuo okwu na ndị otu anyị 👤", body: "Hapụ nkọwa gị anyị ga-akpọtụrụ gị n'onwe anyị.", nameLbl: "Aha Gị", emailLbl: "Adreesị Email", submit: "Jikọọ na Ndị Otu Anyị →", submitting: "Na-eziga…", orEmail: "Ma ọ bụ ziee anyị email ozugbo na", successTitle: "Anyị natara ozi gị!", successBody: "Ndị otu anyị ga-akpọtụrụ", whileWait: "Ka ị na-atọ ndụ", whileWaitBody: "Pamela nwere ike isi azịza ọtụtụ ajụjụ ozugbo ozugbo.", back: "← Laghachi na Pamela" } },

  am: { nav: { about: "ስለ እኛ", getInvolved: "ተሳተፉ", programs: "ፕሮግራሞች", stories: "ታሪኮች", events: "ዝግጅቶች", contact: "ያግኙን", donate: "ይለግሱ" }, hero: { badge: "ሲዬራ ሊዮን · ተቋቋመ 2024", heading1: "እያንዳንዱ ልጅ", heading2: "ይገባዋል", heading3: "የእናት ፍቅር", body: "ፓንዲ ፋውንዴሽን በሲዬራ ሊዮን ለተጋለጡ ልጆች ይቆማል — ትምህርት፣ ምግብ፣ ሕክምና እና የሰው ክብር ይሰጣል።", cta1: "ለውጥ አምጡ", cta2: "ታሪካችን" }, stats: { children: "ልጆች ደርሰናል", education: "በትምህርት", fed: "የተመገቡ" }, chat: { greeting: "ሰላም! እኔ ፓሜላ ነኝ 👋 ስለ ፓንዲ ፋውንዴሽን ለማወቅ ልረዳዎ ዝግጁ ነኝ። ምን ማወቅ ይፈልጋሉ?", placeholder: "ፓሜላን ምንም ይጠይቁ…", humanCta: "ከእውነተኛ ሰው ጋር ማውራት ይፈልጋሉ?", poweredBy: "Groq AI ያንቀሳቅሰዋል · ፓንዲ ፋውንዴሽን", online: "ኦንላይን", suggestions: ["እንዴት ልለግስ እችላለሁ?", "ስለ ፕሮግራሞቻችሁ ንገሩኝ", "ልጅ እንዴት እደግፋለሁ?", "እንዴት በፈቃደኝነት መሳተፍ ይቻላል?"], donateBtn: "አሁን ይለግሱ", comingSoon: "የኦንላይን ልግስና በቅርቡ ይመጣል! አሁን ለመለገስ info@pandiefoundation.org ኢሜይል ይላኩ 💛", typing: "ፓሜላ እየጻፈ ነው…", langSwitchMsg: "ለእርስዎ ወደ አማርኛ ቀየርኩ! እንዴት ልርዳዎ?" }, handoff: { title: "ከቡድናችን ጋር ያውሩ 👤", body: "ዝርዝሮቻቸውን ይተዉ፤ በግልዎ እናነጋግሮዎታለን።", nameLbl: "ስምዎ", emailLbl: "የኢሜይል አድራሻ", submit: "ከቡድናችን ጋር ይገናኙ →", submitting: "እየተላከ…", orEmail: "ወይም ቀጥታ ኢሜይል ይላኩልን", successTitle: "መልእክቶዎን ተቀበልን!", successBody: "ቡድናችን ያናግሮዎታል", whileWait: "እየጠበቁ ሳሉ", whileWaitBody: "ፓሜላ አብዛኛዎቹን ጥያቄዎች ወዲያውኑ ሊመልስ ይችላል።", back: "← ወደ ፓሜላ ተመለስ" } },

  so: { nav: { about: "Naga", getInvolved: "Ku Biir", programs: "Barnaamijyada", stories: "Sheekooyin", events: "Xafladaha", contact: "Nala Xiriir", donate: "Ku Deeq" }, hero: { badge: "Sierra Leone · La Aasaasay 2024", heading1: "Cunug Kasta", heading2: "Xaq Ayuu U Leeyahay", heading3: "Jacaylka Hooyo", body: "Aasaaska Pandie wuxuu taageeraa carruurta nugul ee Sierra Leone — waxbarasho, nafaqo, daryeel caafimaad, iyo sharafta aadanaha.", cta1: "Saameyn Samee", cta2: "Sheekadayada" }, stats: { children: "Carruur La Gaartay", education: "Waxbarasho", fed: "La Quudiyay" }, chat: { greeting: "Salaan! Waxaan ahay Pamela 👋 Waxaan halkan u joogo in aan kuu caawio inaad barato Aasaaska Pandie. Maxaad jeceshahay inaad ogaato?", placeholder: "Pamela wax weydii…", humanCta: "Ma doorbidaysaa inaad la hadasho qof dhabta ah?", poweredBy: "Groq AI ayaa u shaqeynaysa · Aasaaska Pandie", online: "Online", suggestions: ["Sidee ayaan ku deeqi karaa?", "I sheeg barnaamijyadiinna", "Sidee ayaan u taageeri karaa cunug?", "Sidee ayaan u noqon karaa goo-goo?"], donateBtn: "Hadda Ku Deeq", comingSoon: "Deeqaha khadka tooska ah waxay soo socdaan! Si aad hadda u deeqdo, u soo dir iimayl info@pandiefoundation.org 💛", typing: "Pamela waxay qoraysa…", langSwitchMsg: "Waxaan kuu beddelay Soomaali! Sidee kuu caawin karaa?" }, handoff: { title: "La hadal kooxdayada 👤", body: "Xogta koowaad ee taada ka tag oo si shakhsi ahaan ayaan kuula soo xiriiri.", nameLbl: "Magacaaga", emailLbl: "Ciwaanka Iimaylka", submit: "Xiriir La Samee Kooxdayada →", submitting: "Waa la dirayo…", orEmail: "Ama si toos ah noogu soo dir iimayl", successTitle: "Farriintaada waanu helnay!", successBody: "Kooxdayadu waxay kula xiriiri", whileWait: "Intaad sugeyso", whileWaitBody: "Pamela weli si degdeg ah ayay u jawaabi kartaa su'aalaha badan.", back: "← Ku laabo Pamela" } },

  rw: { nav: { about: "Abo Turi Bo", getInvolved: "Kwiyemeza", programs: "Gahunda", stories: "Inkuru", events: "Ibikorwa", contact: "Twandikire", donate: "Gutera Inkunga" }, hero: { badge: "Sierra Leone · Ishyizweho 2024", heading1: "Buri Mwana", heading2: "Akwiye Guhabwa", heading3: "Urukundo rw'Umubyeyi", body: "Fondation Pandie iharanira abana bafite ubukene muri Sierra Leone — itanga uburezi, indyo, ubuvuzi, n'agaciro k'ikiremwamuntu.", cta1: "Kora Impinduka", cta2: "Inkuru Yacu" }, stats: { children: "Abana Batugezeho", education: "Mu Burezi", fed: "Bariye" }, chat: { greeting: "Muraho! Ndi Pamela 👋 Ndi hano kugufasha kwiga ku Fondation Pandie. Ni iki wifuza kumenya?", placeholder: "Baza Pamela ikigihe cyose…", humanCta: "Urashaka kuvugana n'umuntu nyawe?", poweredBy: "Ikoreshwa na Groq AI · Fondation Pandie", online: "Kumurongo", suggestions: ["Nakora gute inkunga?", "Mboze ku bikorwa byanyu", "Nakora gute gufata umwana?", "Nakora gute ubutegetsi?"], donateBtn: "Tanga Inkunga Nonaha", comingSoon: "Inkunga kuri interineti iri hafi kuza! Gutanga nonaha, ohereza imeli kuri info@pandiefoundation.org 💛", typing: "Pamela yandika…", langSwitchMsg: "Nhinduye ururimi rw'Ikinyarwanda kugira ngo nkufashe! Nakufasha gute?" }, handoff: { title: "Vugana n'itsinda ryacu 👤", body: "Siga amakuru yawe turaguhurira ku giti cyawe.", nameLbl: "Izina Ryawe", emailLbl: "Aderesi ya Imeli", submit: "Huza n'Itsinda Ryacu →", submitting: "Kohereza…", orEmail: "Cyangwa twohereze imeli kuri", successTitle: "Twabonye ubutumwa bwawe!", successBody: "Itsinda ryacu rizaguhurira", whileWait: "Mugihe utegereje", whileWaitBody: "Pamela ashobora gusubiza ibibazo byinshi vuba.", back: "← Garuka kuri Pamela" } },
};

// Detect best language from browser
function detectLanguage(): LangCode {
  if (typeof window === "undefined") return "en";
  const saved = localStorage.getItem("pandie-lang") as LangCode | null;
  if (saved && TRANSLATIONS[saved]) return saved;
  const langs = navigator.languages || [navigator.language];
  for (const l of langs) {
    const code = BROWSER_MAP[l] || BROWSER_MAP[l.split("-")[0]];
    if (code) return code;
  }
  return "en";
}

interface LanguageContextType {
  lang: LangCode;
  setLang: (l: LangCode) => void;
  t: Translations;
  dir: "ltr" | "rtl";
  currentLang: Lang;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en", setLang: () => {}, t: TRANSLATIONS.en, dir: "ltr",
  currentLang: LANGUAGES[0],
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LangCode>("en");

  useEffect(() => {
    setLangState(detectLanguage());
  }, []);

  useEffect(() => {
    const l = LANGUAGES.find(x => x.code === lang)!;
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", l.dir);
    localStorage.setItem("pandie-lang", lang);
  }, [lang]);

  const setLang = (l: LangCode) => setLangState(l);
  const currentLang = LANGUAGES.find(x => x.code === lang) || LANGUAGES[0];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: TRANSLATIONS[lang], dir: currentLang.dir, currentLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
