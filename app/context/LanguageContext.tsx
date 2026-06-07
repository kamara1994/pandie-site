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
  { code: "en",   name: "English",     nativeName: "English",           dir: "ltr", flag: "🇬🇧" },
  { code: "fr",   name: "French",      nativeName: "Français",          dir: "ltr", flag: "🇫🇷" },
  { code: "krio", name: "Krio",        nativeName: "Krio",              dir: "ltr", flag: "🇸🇱" },
  { code: "ha",   name: "Hausa",       nativeName: "Hausa",             dir: "ltr", flag: "🇳🇬" },
  { code: "yo",   name: "Yoruba",      nativeName: "Yorùbá",            dir: "ltr", flag: "🇳🇬" },
  { code: "ig",   name: "Igbo",        nativeName: "Igbo",              dir: "ltr", flag: "🇳🇬" },
  { code: "sw",   name: "Swahili",     nativeName: "Kiswahili",         dir: "ltr", flag: "🇰🇪" },
  { code: "am",   name: "Amharic",     nativeName: "አማርኛ",              dir: "ltr", flag: "🇪🇹" },
  { code: "so",   name: "Somali",      nativeName: "Soomaali",          dir: "ltr", flag: "🇸🇴" },
  { code: "rw",   name: "Kinyarwanda", nativeName: "Kinyarwanda",       dir: "ltr", flag: "🇷🇼" },
  { code: "ar",   name: "Arabic",      nativeName: "العربية",            dir: "rtl", flag: "🇸🇦" },
  { code: "fa",   name: "Persian",     nativeName: "فارسی",              dir: "rtl", flag: "🇮🇷" },
  { code: "es",   name: "Spanish",     nativeName: "Español",           dir: "ltr", flag: "🇪🇸" },
  { code: "pt",   name: "Portuguese",  nativeName: "Português",         dir: "ltr", flag: "🇧🇷" },
  { code: "de",   name: "German",      nativeName: "Deutsch",           dir: "ltr", flag: "🇩🇪" },
  { code: "it",   name: "Italian",     nativeName: "Italiano",          dir: "ltr", flag: "🇮🇹" },
  { code: "nl",   name: "Dutch",       nativeName: "Nederlands",        dir: "ltr", flag: "🇳🇱" },
  { code: "pl",   name: "Polish",      nativeName: "Polski",            dir: "ltr", flag: "🇵🇱" },
  { code: "ru",   name: "Russian",     nativeName: "Русский",           dir: "ltr", flag: "🇷🇺" },
  { code: "tr",   name: "Turkish",     nativeName: "Türkçe",            dir: "ltr", flag: "🇹🇷" },
  { code: "hi",   name: "Hindi",       nativeName: "हिन्दी",               dir: "ltr", flag: "🇮🇳" },
  { code: "bn",   name: "Bengali",     nativeName: "বাংলা",                dir: "ltr", flag: "🇧🇩" },
  { code: "zh",   name: "Chinese",     nativeName: "中文",                dir: "ltr", flag: "🇨🇳" },
  { code: "ja",   name: "Japanese",    nativeName: "日本語",               dir: "ltr", flag: "🇯🇵" },
  { code: "ko",   name: "Korean",      nativeName: "한국어",                dir: "ltr", flag: "🇰🇷" },
  { code: "vi",   name: "Vietnamese",  nativeName: "Tiếng Việt",        dir: "ltr", flag: "🇻🇳" },
  { code: "th",   name: "Thai",        nativeName: "ภาษาไทย",             dir: "ltr", flag: "🇹🇭" },
  { code: "id",   name: "Indonesian",  nativeName: "Bahasa Indonesia",  dir: "ltr", flag: "🇮🇩" },
  { code: "ms",   name: "Malay",       nativeName: "Bahasa Melayu",     dir: "ltr", flag: "🇲🇾" },
];

const BROWSER_MAP: Record<string, LangCode> = {
  en:"en","en-US":"en","en-GB":"en",
  fr:"fr","fr-FR":"fr","fr-CA":"fr",
  ar:"ar","ar-SA":"ar",
  es:"es","es-ES":"es","es-MX":"es","es-419":"es",
  pt:"pt","pt-BR":"pt","pt-PT":"pt",
  zh:"zh","zh-CN":"zh","zh-TW":"zh",
  ha:"ha", sw:"sw", hi:"hi", bn:"bn", ru:"ru",
  ja:"ja", ko:"ko", de:"de", it:"it", tr:"tr",
  vi:"vi", th:"th", pl:"pl", nl:"nl", id:"id",
  ms:"ms", fa:"fa", yo:"yo", ig:"ig", am:"am",
  so:"so", rw:"rw",
};

export interface Translations {
  nav: {
    about: string; getInvolved: string; programs: string;
    stories: string; events: string; contact: string; donate: string;
  };
  hero: {
    badge: string; line1: string; line2: string; line3a: string;
    line3b: string; line4: string; body: string; cta1: string; cta2: string;
    stat1Label: string; stat2Label: string; stat3Label: string;
  };
  core: {
    badge: string; heading1: string; heading2: string; body: string;
    exploreProgram: string;
    s: Array<{ title: string; description: string; statLabel: string }>;
    p5title: string; p5desc: string;
    p6title: string; p6desc: string;
    p7title: string; p7desc: string; p7new: string;
  };
  feature: {
    story1title: string; story1body: string; story1cta: string;
    story2title: string; story2body: string; story2cta: string;
    sideLabel: string; sideTitle: string; sideBody: string; sideCta: string;
  };
  event: {
    badge: string; heading1: string; heading2: string; body: string;
    locLabel: string; locVal: string;
    dateLabel: string; dateVal: string;
    goalLabel: string; goalVal: string;
    cta1: string; cta2: string;
    donateLabel: string; donateBody: string; donateCta: string;
  };
  impact: {
    badge: string; heading1: string; heading2: string; body: string;
    s: Array<{ label: string; sub: string }>;
    quote: string; quoteAuthor: string;
  };
  programs: {
    badge: string; heading1: string; heading2: string; body: string;
    exploreProgram: string; exploreTalent: string;
    talent7label: string; talent7new: string;
    talent7heading1: string; talent7heading2: string; talent7body: string;
    ctaBadge: string; ctaHeading1: string; ctaHeading2: string; ctaBody: string;
    ctaDonate: string; ctaTalent: string;
    supportBadge: string;
    p: Array<{ title: string; desc: string; statLabel: string }>;
  };
  chat: {
    greeting: string; placeholder: string; humanCta: string;
    poweredBy: string; online: string; suggestions: string[];
    donateBtn: string; comingSoon: string; typing: string; langSwitchMsg: string;
  };
  handoff: {
    title: string; body: string; nameLbl: string; emailLbl: string;
    submit: string; submitting: string; orEmail: string;
    successTitle: string; successBody: string; whileWait: string;
    whileWaitBody: string; back: string;
  };
}

type T = Translations;

function en(): T { return {
  nav: { about:"About Us", getInvolved:"Get Involved", programs:"Programs", stories:"Stories", events:"Events", contact:"Contact", donate:"Donate" },
  hero: { badge:"Sierra Leone · Est. 2024", line1:"Every", line2:"Child", line3a:"Deserves a", line3b:"Mother's", line4:"Love", body:"Pandie Foundation stands in the gap for vulnerable children across Sierra Leone — providing education, nutrition, medical care, and the warmth of human dignity.", cta1:"Make an Impact", cta2:"Our Story", stat1Label:"Children Reached", stat2Label:"In Education", stat3Label:"Fed & Nourished" },
  core: { badge:"Seven Programs", heading1:"Seven Pillars of", heading2:"Transformative Change", body:"We serve vulnerable children in Sierra Leone through programs that address every dimension of a child's life — from survival to discovering and launching their extraordinary potential.", exploreProgram:"Explore Program", s:[{title:"Education Support",description:"School fees, uniforms, books, and supplies — removing every barrier between a child and their right to learn and grow.",statLabel:"Children in school"},{title:"Nutrition & Feeding",description:"Nutritious daily meals so that no child sits in a classroom too hungry to concentrate, dream, or believe in themselves.",statLabel:"Children fed daily"},{title:"Medical Assistance",description:"Access to healthcare, treatment, and prevention for children who would otherwise suffer in silence from preventable illness.",statLabel:"Medical cases supported"},{title:"Child Protection",description:"Safe spaces, advocacy, and emergency support for vulnerable children facing neglect, hardship, and uncertain futures.",statLabel:"Commitment to dignity"}], p5title:"Child Sponsorship", p5desc:"Connect directly with one child — your monthly commitment transforms their life and inspires an entire community.", p6title:"Community Outreach", p6desc:"Partnering with local families and leaders to ensure our impact runs deep and lasts for generations.", p7title:"Talent & Mentorship", p7desc:"We discover extraordinary talent in Sierra Leone's communities — football, music, arts, academics — and build a pathway to the world stage.", p7new:"New" },
  feature: { story1title:"A Child Back in School", story1body:"Through support, encouragement, and basic school materials, a vulnerable child was able to return to class with confidence and renewed hope.", story1cta:"Success Stories", story2title:"Acts of Kindness", story2body:"From meals and medical help to school support, every act of care restores dignity and protects the future of vulnerable children.", story2cta:"More Good News", sideLabel:"Featured Program", sideTitle:"Pandie Child Support Program", sideBody:"Our flagship program supports the most vulnerable children in Sierra Leone with education assistance, nutrition support, and access to basic medical care.", sideCta:"View Program" },
  event: { badge:"Upcoming Campaign", heading1:"Back to School &", heading2:"Child Wellness Drive", body:"Join us as we provide school materials, nutrition support, and basic health assistance for vulnerable children in Sierra Leone.", locLabel:"Location", locVal:"Freetown, Sierra Leone", dateLabel:"Date", dateVal:"August — September 2025", goalLabel:"Goal", goalVal:"500 children supported", cta1:"View Full Event →", cta2:"Support This Drive", donateLabel:"Every $10 donated", donateBody:"Feeds a child for one week", donateCta:"Donate $10 →" },
  impact: { badge:"Our Impact", heading1:"Behind Every Number", heading2:"Is a Name", body:"Every statistic represents a real child in Sierra Leone whose life changed because someone chose to care.", s:[{label:"Children Reached",sub:"Through all programs combined"},{label:"In Education",sub:"Back in school with supplies"},{label:"Fed & Nourished",sub:"Regular nutrition support"},{label:"Core Programs",sub:"Addressing every need"}], quote:'"When a child receives food, they can concentrate in school. When they receive education, they gain independence. When they receive compassion, they gain belief in their own worth."', quoteAuthor:"— The Pandie Mission" },
  programs: { badge:"What We Do · Sierra Leone", heading1:"Seven Pillars of", heading2:"Transformative Change", body:"From keeping children alive to discovering who they truly are — every program is built on one principle: treat each child as if they were our own.", exploreProgram:"Explore Program", exploreTalent:"Explore Talent & Mentorship →", talent7label:"Talent Discovery & Mentorship", talent7new:"New — Program 07", talent7heading1:"We don't just keep", talent7heading2:"children alive — we discover who they truly are", talent7body:"We find extraordinary talent hidden in Sierra Leone's communities — football, music, arts, academics — surround it with world-class mentors, and build a pathway to the world stage. The next Mohamed Salah. The next Angélique Kidjo. We find them first.", ctaBadge:"Support Our Work", ctaHeading1:"Every program runs", ctaHeading2:"because someone gave.", ctaBody:"Your donation directly funds these seven programs — keeping children safe, fed, educated, and helping extraordinary talent reach the world.", ctaDonate:"Donate Now", ctaTalent:"Discover Talent Program", supportBadge:"Support Our Work", p:[{title:"Education Support",desc:"School fees, uniforms, books, and learning supplies — removing every barrier between a child and their right to learn.",statLabel:"Children in school"},{title:"Nutrition & Feeding",desc:"Daily nutritious meals so no child sits in a classroom too hungry to concentrate, learn, or dream.",statLabel:"Children fed daily"},{title:"Medical Assistance",desc:"Healthcare access, treatment, and prevention for children suffering from preventable and treatable conditions.",statLabel:"Medical cases supported"},{title:"Child Protection",desc:"Safe spaces, advocacy, and emergency support for vulnerable children facing neglect and hardship.",statLabel:"Commitment to dignity"},{title:"Child Sponsorship",desc:"Connect directly with a child — your monthly commitment transforms one life and inspires a whole community.",statLabel:"Sponsor to child"},{title:"Community Outreach",desc:"Partnering with families, schools, and local leaders to ensure our impact runs deep and lasts for generations.",statLabel:"Community impact"}] },
  chat: { greeting:"Hi! I'm Pamela 👋 I'm here to help you learn about Pandie Foundation and how you can change a child's life in Sierra Leone. What would you like to know?", placeholder:"Ask Pamela anything…", humanCta:"Prefer to talk to a real person?", poweredBy:"Powered by Groq AI · Pandie Foundation", online:"Online", suggestions:["How can I donate?","Tell me about your programs","How do I sponsor a child?","How can I volunteer?"], donateBtn:"Donate Now", comingSoon:"Online donations coming soon! To donate now, please email info@pandiefoundation.org 💛", typing:"Pamela is typing…", langSwitchMsg:"I've switched to English for you! How can I help?" },
  handoff: { title:"Talk to our team 👤", body:"Leave your details and we'll get back to you personally — usually within a few hours.", nameLbl:"Your Name", emailLbl:"Email Address", submit:"Connect with Our Team →", submitting:"Sending…", orEmail:"Or email us directly at", successTitle:"We got your message!", successBody:"Our team will reach out to", whileWait:"While you wait", whileWaitBody:"Pamela can still answer most questions instantly.", back:"← Back to Pamela" },
};}

function fr(): T { return {
  nav: { about:"À Propos", getInvolved:"S'impliquer", programs:"Programmes", stories:"Histoires", events:"Événements", contact:"Contact", donate:"Donner" },
  hero: { badge:"Sierra Leone · Fondée 2024", line1:"Chaque", line2:"Enfant", line3a:"Mérite un", line3b:"Amour", line4:"Maternel", body:"La Fondation Pandie soutient les enfants vulnérables de Sierra Leone — offrant éducation, nutrition, soins médicaux et dignité humaine.", cta1:"Faire un Impact", cta2:"Notre Histoire", stat1Label:"Enfants Touchés", stat2Label:"À l'École", stat3Label:"Nourris & Soutenus" },
  core: { badge:"Sept Programmes", heading1:"Sept Piliers de", heading2:"Changement Transformateur", body:"Nous servons les enfants vulnérables en Sierra Leone à travers des programmes qui répondent à chaque dimension de la vie d'un enfant.", exploreProgram:"Explorer le Programme", s:[{title:"Soutien Éducatif",description:"Frais de scolarité, uniformes, livres et fournitures — supprimant chaque obstacle entre un enfant et son droit d'apprendre.",statLabel:"Enfants à l'école"},{title:"Nutrition & Alimentation",description:"Des repas nutritifs quotidiens pour qu'aucun enfant ne soit trop affamé pour se concentrer, rêver ou croire en soi.",statLabel:"Enfants nourris par jour"},{title:"Assistance Médicale",description:"Accès aux soins de santé, traitement et prévention pour les enfants qui souffriraient autrement en silence.",statLabel:"Cas médicaux soutenus"},{title:"Protection de l'Enfance",description:"Des espaces sûrs, du plaidoyer et un soutien d'urgence pour les enfants vulnérables confrontés à la négligence.",statLabel:"Engagement pour la dignité"}], p5title:"Parrainage d'Enfant", p5desc:"Connectez-vous directement avec un enfant — votre engagement mensuel transforme une vie et inspire toute une communauté.", p6title:"Sensibilisation Communautaire", p6desc:"En partenariat avec les familles locales et les dirigeants pour que notre impact soit profond et durable.", p7title:"Talent & Mentorat", p7desc:"Nous découvrons des talents extraordinaires dans les communautés de Sierra Leone — football, musique, arts, académique.", p7new:"Nouveau" },
  feature: { story1title:"Un Enfant de Retour à l'École", story1body:"Grâce au soutien, aux encouragements et au matériel scolaire, un enfant vulnérable a pu retourner en classe avec confiance et espoir renouvelé.", story1cta:"Histoires de Réussite", story2title:"Actes de Gentillesse", story2body:"Des repas à l'aide médicale en passant par le soutien scolaire, chaque acte de soin restaure la dignité et protège l'avenir des enfants vulnérables.", story2cta:"Plus de Bonnes Nouvelles", sideLabel:"Programme Phare", sideTitle:"Programme de Soutien Pandie", sideBody:"Notre programme phare soutient les enfants les plus vulnérables de Sierra Leone avec une aide à l'éducation, un soutien nutritionnel et un accès aux soins médicaux.", sideCta:"Voir le Programme" },
  event: { badge:"Campagne à Venir", heading1:"Retour à l'École &", heading2:"Programme de Bien-être", body:"Rejoignez-nous pour fournir du matériel scolaire, un soutien nutritionnel et une aide sanitaire aux enfants vulnérables de Sierra Leone.", locLabel:"Lieu", locVal:"Freetown, Sierra Leone", dateLabel:"Date", dateVal:"Août — Septembre 2025", goalLabel:"Objectif", goalVal:"500 enfants soutenus", cta1:"Voir l'Événement →", cta2:"Soutenir Cette Initiative", donateLabel:"Chaque don de 10$", donateBody:"Nourrit un enfant pendant une semaine", donateCta:"Donner 10$ →" },
  impact: { badge:"Notre Impact", heading1:"Derrière Chaque Chiffre", heading2:"Se Cache un Nom", body:"Chaque statistique représente un enfant réel en Sierra Leone dont la vie a changé parce que quelqu'un a choisi de s'en soucier.", s:[{label:"Enfants Touchés",sub:"À travers tous les programmes"},{label:"En Éducation",sub:"De retour à l'école avec des fournitures"},{label:"Nourris & Soutenus",sub:"Soutien nutritionnel régulier"},{label:"Programmes Principaux",sub:"Répondant à chaque besoin"}], quote:'"Quand un enfant reçoit de la nourriture, il peut se concentrer à l\'école. Quand il reçoit une éducation, il gagne en indépendance. Quand il reçoit de la compassion, il croit en sa propre valeur."', quoteAuthor:"— La Mission Pandie" },
  programs: { badge:"Ce Que Nous Faisons · Sierra Leone", heading1:"Sept Piliers de", heading2:"Changement Transformateur", body:"De garder les enfants en vie à découvrir qui ils sont vraiment — chaque programme est fondé sur un principe : traiter chaque enfant comme s'il était le nôtre.", exploreProgram:"Explorer le Programme", exploreTalent:"Explorer Talent & Mentorat →", talent7label:"Découverte des Talents & Mentorat", talent7new:"Nouveau — Programme 07", talent7heading1:"Nous ne faisons pas que garder", talent7heading2:"les enfants en vie — nous découvrons qui ils sont vraiment", talent7body:"Nous trouvons des talents extraordinaires cachés dans les communautés de Sierra Leone — football, musique, arts, académique — nous les entourons de mentors de classe mondiale.", ctaBadge:"Soutenir Notre Travail", ctaHeading1:"Chaque programme fonctionne", ctaHeading2:"parce que quelqu'un a donné.", ctaBody:"Votre don finance directement ces sept programmes — gardant les enfants en sécurité, nourris, éduqués et aidant des talents extraordinaires à atteindre le monde.", ctaDonate:"Donner Maintenant", ctaTalent:"Découvrir le Programme Talent", supportBadge:"Soutenir Notre Travail", p:[{title:"Soutien Éducatif",desc:"Frais de scolarité, uniformes, livres et fournitures d'apprentissage — supprimant chaque obstacle entre un enfant et son droit d'apprendre.",statLabel:"Enfants à l'école"},{title:"Nutrition & Alimentation",desc:"Des repas nutritifs quotidiens pour qu'aucun enfant ne soit trop affamé pour se concentrer, apprendre ou rêver.",statLabel:"Enfants nourris par jour"},{title:"Assistance Médicale",desc:"Accès aux soins de santé, traitement et prévention pour les enfants souffrant de conditions évitables.",statLabel:"Cas médicaux soutenus"},{title:"Protection de l'Enfance",desc:"Des espaces sûrs, du plaidoyer et un soutien d'urgence pour les enfants vulnérables confrontés à la négligence.",statLabel:"Engagement pour la dignité"},{title:"Parrainage d'Enfant",desc:"Connectez-vous directement avec un enfant — votre engagement mensuel transforme une vie et inspire toute une communauté.",statLabel:"Parrain pour enfant"},{title:"Sensibilisation Communautaire",desc:"En partenariat avec les familles, les écoles et les dirigeants locaux pour que notre impact soit profond et durable.",statLabel:"Impact communautaire"}] },
  chat: { greeting:"Bonjour! Je suis Pamela 👋 Je suis ici pour vous aider à en savoir plus sur la Fondation Pandie. Que souhaitez-vous savoir?", placeholder:"Posez une question à Pamela…", humanCta:"Préférez-vous parler à une vraie personne?", poweredBy:"Propulsé par Groq AI · Fondation Pandie", online:"En ligne", suggestions:["Comment puis-je faire un don?","Parlez-moi de vos programmes","Comment parrainer un enfant?","Comment puis-je m'impliquer?"], donateBtn:"Faire un Don", comingSoon:"Les dons en ligne arrivent bientôt! Pour donner maintenant, envoyez un email à info@pandiefoundation.org 💛", typing:"Pamela écrit…", langSwitchMsg:"Je suis passée au français pour vous! Comment puis-je vous aider?" },
  handoff: { title:"Parler à notre équipe 👤", body:"Laissez vos coordonnées et nous vous répondrons personnellement.", nameLbl:"Votre Nom", emailLbl:"Adresse Email", submit:"Contacter Notre Équipe →", submitting:"Envoi…", orEmail:"Ou envoyez-nous un email à", successTitle:"Message reçu!", successBody:"Notre équipe contactera", whileWait:"En attendant", whileWaitBody:"Pamela peut toujours répondre à la plupart des questions.", back:"← Retour à Pamela" },
};}

function es(): T { return {
  nav: { about:"Nosotros", getInvolved:"Participar", programs:"Programas", stories:"Historias", events:"Eventos", contact:"Contacto", donate:"Donar" },
  hero: { badge:"Sierra Leona · Fund. 2024", line1:"Cada", line2:"Niño", line3a:"Merece un", line3b:"Amor", line4:"Maternal", body:"La Fundación Pandie apoya a niños vulnerables en Sierra Leona — brindando educación, nutrición, atención médica y dignidad humana.", cta1:"Hacer un Impacto", cta2:"Nuestra Historia", stat1Label:"Niños Alcanzados", stat2Label:"En Educación", stat3Label:"Alimentados" },
  core: { badge:"Siete Programas", heading1:"Siete Pilares de", heading2:"Cambio Transformador", body:"Servimos a niños vulnerables en Sierra Leona a través de programas que abordan cada dimensión de la vida de un niño.", exploreProgram:"Explorar Programa", s:[{title:"Apoyo Educativo",description:"Cuotas escolares, uniformes, libros y útiles — eliminando cada barrera entre un niño y su derecho a aprender.",statLabel:"Niños en la escuela"},{title:"Nutrición & Alimentación",description:"Comidas nutritivas diarias para que ningún niño esté demasiado hambriento para concentrarse, soñar o creer en sí mismo.",statLabel:"Niños alimentados diariamente"},{title:"Asistencia Médica",description:"Acceso a atención médica, tratamiento y prevención para niños que de otro modo sufrirían en silencio.",statLabel:"Casos médicos apoyados"},{title:"Protección Infantil",description:"Espacios seguros, defensa y apoyo de emergencia para niños vulnerables que enfrentan negligencia.",statLabel:"Compromiso con la dignidad"}], p5title:"Apadrinamiento", p5desc:"Conéctate directamente con un niño — tu compromiso mensual transforma una vida e inspira a toda una comunidad.", p6title:"Extensión Comunitaria", p6desc:"Asociándonos con familias locales y líderes para que nuestro impacto sea profundo y duradero.", p7title:"Talento & Mentoría", p7desc:"Descubrimos talentos extraordinarios en las comunidades de Sierra Leona — fútbol, música, artes, académico.", p7new:"Nuevo" },
  feature: { story1title:"Un Niño de Regreso a la Escuela", story1body:"Con apoyo, aliento y materiales escolares básicos, un niño vulnerable pudo regresar a clase con confianza y esperanza renovada.", story1cta:"Historias de Éxito", story2title:"Actos de Bondad", story2body:"Desde comidas y ayuda médica hasta apoyo escolar, cada acto de cuidado restaura la dignidad y protege el futuro de los niños vulnerables.", story2cta:"Más Buenas Noticias", sideLabel:"Programa Destacado", sideTitle:"Programa de Apoyo Pandie", sideBody:"Nuestro programa insignia apoya a los niños más vulnerables de Sierra Leona con asistencia educativa, apoyo nutricional y acceso a atención médica.", sideCta:"Ver Programa" },
  event: { badge:"Próxima Campaña", heading1:"Regreso a la Escuela &", heading2:"Programa de Bienestar", body:"Únase a nosotros para proporcionar materiales escolares, apoyo nutricional y asistencia sanitaria a niños vulnerables en Sierra Leona.", locLabel:"Ubicación", locVal:"Freetown, Sierra Leona", dateLabel:"Fecha", dateVal:"Agosto — Septiembre 2025", goalLabel:"Meta", goalVal:"500 niños apoyados", cta1:"Ver Evento Completo →", cta2:"Apoyar Esta Iniciativa", donateLabel:"Cada $10 donados", donateBody:"Alimenta a un niño durante una semana", donateCta:"Donar $10 →" },
  impact: { badge:"Nuestro Impacto", heading1:"Detrás de Cada Número", heading2:"Hay un Nombre", body:"Cada estadística representa a un niño real en Sierra Leona cuya vida cambió porque alguien eligió importarse.", s:[{label:"Niños Alcanzados",sub:"A través de todos los programas"},{label:"En Educación",sub:"De regreso a la escuela"},{label:"Alimentados & Nutridos",sub:"Apoyo nutricional regular"},{label:"Programas Principales",sub:"Abordando cada necesidad"}], quote:'"Cuando un niño recibe comida, puede concentrarse en la escuela. Cuando recibe educación, gana independencia. Cuando recibe compasión, cree en su propio valor."', quoteAuthor:"— La Misión Pandie" },
  programs: { badge:"Lo Que Hacemos · Sierra Leona", heading1:"Siete Pilares de", heading2:"Cambio Transformador", body:"Desde mantener a los niños con vida hasta descubrir quiénes son realmente — cada programa se basa en un principio: tratar a cada niño como si fuera el nuestro.", exploreProgram:"Explorar Programa", exploreTalent:"Explorar Talento & Mentoría →", talent7label:"Descubrimiento de Talento & Mentoría", talent7new:"Nuevo — Programa 07", talent7heading1:"No solo mantenemos", talent7heading2:"a los niños con vida — descubrimos quiénes son realmente", talent7body:"Encontramos talentos extraordinarios escondidos en las comunidades de Sierra Leona — fútbol, música, artes, académico.", ctaBadge:"Apoya Nuestro Trabajo", ctaHeading1:"Cada programa funciona", ctaHeading2:"porque alguien dio.", ctaBody:"Tu donación financia directamente estos siete programas — manteniendo a los niños seguros, alimentados, educados y ayudando a talentos extraordinarios a alcanzar el mundo.", ctaDonate:"Donar Ahora", ctaTalent:"Descubrir Programa de Talento", supportBadge:"Apoya Nuestro Trabajo", p:[{title:"Apoyo Educativo",desc:"Cuotas escolares, uniformes, libros y útiles de aprendizaje.",statLabel:"Niños en la escuela"},{title:"Nutrición & Alimentación",desc:"Comidas nutritivas diarias para que ningún niño esté demasiado hambriento.",statLabel:"Niños alimentados diariamente"},{title:"Asistencia Médica",desc:"Acceso a atención médica y prevención para niños que sufren condiciones evitables.",statLabel:"Casos médicos apoyados"},{title:"Protección Infantil",desc:"Espacios seguros, defensa y apoyo de emergencia para niños vulnerables.",statLabel:"Compromiso con la dignidad"},{title:"Apadrinamiento",desc:"Conéctate directamente con un niño — tu compromiso mensual transforma una vida.",statLabel:"Padrino por niño"},{title:"Extensión Comunitaria",desc:"Asociándonos con familias, escuelas y líderes locales para que nuestro impacto sea duradero.",statLabel:"Impacto comunitario"}] },
  chat: { greeting:"¡Hola! Soy Pamela 👋 Estoy aquí para ayudarte a conocer la Fundación Pandie. ¿Qué te gustaría saber?", placeholder:"Pregúntale algo a Pamela…", humanCta:"¿Prefieres hablar con una persona real?", poweredBy:"Impulsado por Groq AI · Fundación Pandie", online:"En línea", suggestions:["¿Cómo puedo donar?","Cuéntame sobre sus programas","¿Cómo apadrinar un niño?","¿Cómo puedo ser voluntario?"], donateBtn:"Donar Ahora", comingSoon:"¡Las donaciones en línea llegan pronto! Para donar ahora, envía un correo a info@pandiefoundation.org 💛", typing:"Pamela está escribiendo…", langSwitchMsg:"¡Cambié al español para ti! ¿En qué puedo ayudarte?" },
  handoff: { title:"Hablar con nuestro equipo 👤", body:"Déjanos tus datos y te responderemos personalmente.", nameLbl:"Tu Nombre", emailLbl:"Correo Electrónico", submit:"Conectar con Nuestro Equipo →", submitting:"Enviando…", orEmail:"O escríbenos a", successTitle:"¡Recibimos tu mensaje!", successBody:"Nuestro equipo contactará a", whileWait:"Mientras esperas", whileWaitBody:"Pamela puede responder la mayoría de preguntas.", back:"← Volver a Pamela" },
};}

function zh(): T { return {
  nav: { about:"关于我们", getInvolved:"参与其中", programs:"项目", stories:"故事", events:"活动", contact:"联系我们", donate:"捐款" },
  hero: { badge:"塞拉利昂 · 成立于2024", line1:"每个", line2:"孩子", line3a:"都值得拥有", line3b:"母亲的", line4:"爱", body:"潘迪基金会为塞拉利昂的弱势儿童提供教育、营养、医疗和人类尊严。", cta1:"产生影响", cta2:"我们的故事", stat1Label:"受助儿童", stat2Label:"在校学习", stat3Label:"获得营养" },
  core: { badge:"七个项目", heading1:"七大支柱", heading2:"变革性改变", body:"我们通过涵盖儿童生活各个方面的项目，为塞拉利昂的弱势儿童提供服务。", exploreProgram:"了解项目", s:[{title:"教育支持",description:"学费、制服、书籍和用品——消除儿童与学习权利之间的每一个障碍。",statLabel:"在校儿童"},{title:"营养与喂养",description:"每日营养膳食，让没有孩子因饥饿而无法集中注意力、学习或做梦。",statLabel:"每日受助儿童"},{title:"医疗援助",description:"为否则会默默受苦的儿童提供医疗服务、治疗和预防。",statLabel:"医疗病例"},{title:"儿童保护",description:"为面临忽视和困境的弱势儿童提供安全空间、倡导和紧急支持。",statLabel:"对尊严的承诺"}], p5title:"儿童赞助", p5desc:"直接与一个孩子建立联系——您每月的承诺改变一个生命，激励整个社区。", p6title:"社区外展", p6desc:"与当地家庭和领导人合作，确保我们的影响深远持久。", p7title:"才能与导师制", p7desc:"我们发现塞拉利昂社区中隐藏的非凡才能——足球、音乐、艺术、学术。", p7new:"新" },
  feature: { story1title:"重返校园的孩子", story1body:"通过支持、鼓励和基本学习材料，一个弱势儿童能够充满信心和希望地重返课堂。", story1cta:"成功案例", story2title:"善意之举", story2body:"从膳食和医疗帮助到学校支持，每一个关爱行为都恢复了尊严，保护了弱势儿童的未来。", story2cta:"更多好消息", sideLabel:"重点项目", sideTitle:"潘迪儿童支持项目", sideBody:"我们的旗舰项目为塞拉利昂最弱势的儿童提供教育援助、营养支持和基本医疗服务。", sideCta:"查看项目" },
  event: { badge:"即将开展的活动", heading1:"返校 &", heading2:"儿童健康计划", body:"加入我们，为塞拉利昂的弱势儿童提供学习材料、营养支持和基本卫生援助。", locLabel:"地点", locVal:"弗里敦，塞拉利昂", dateLabel:"日期", dateVal:"2025年8月—9月", goalLabel:"目标", goalVal:"支持500名儿童", cta1:"查看完整活动 →", cta2:"支持此活动", donateLabel:"每捐赠10美元", donateBody:"可喂养一名儿童一周", donateCta:"捐赠10美元 →" },
  impact: { badge:"我们的影响", heading1:"每个数字背后", heading2:"都是一个名字", body:"每一项统计数据代表一个真实的塞拉利昂儿童，他们的生活因为有人选择关心而改变。", s:[{label:"受助儿童",sub:"通过所有项目"},{label:"接受教育",sub:"重返校园并获得用品"},{label:"获得营养",sub:"定期营养支持"},{label:"核心项目",sub:"满足每一种需求"}], quote:'"当孩子得到食物，他们可以在学校集中注意力。当他们接受教育，他们获得独立。当他们得到关爱，他们相信自己的价值。"', quoteAuthor:"— 潘迪使命" },
  programs: { badge:"我们的工作 · 塞拉利昂", heading1:"七大支柱", heading2:"变革性改变", body:"从让儿童存活到发现他们真正的潜能——每个项目都建立在一个原则上：像对待自己的孩子一样对待每一个孩子。", exploreProgram:"了解项目", exploreTalent:"探索才能与导师制 →", talent7label:"才能发现与导师制", talent7new:"新 — 项目07", talent7heading1:"我们不仅仅是让", talent7heading2:"孩子们活着——我们发现他们真正是谁", talent7body:"我们发现塞拉利昂社区中隐藏的非凡才能——足球、音乐、艺术、学术——用世界级的导师围绕他们，并建立通向世界舞台的道路。", ctaBadge:"支持我们的工作", ctaHeading1:"每个项目的运作", ctaHeading2:"都因为有人慷慨捐助。", ctaBody:"您的捐款直接资助这七个项目——让儿童安全、受食、受教育，并帮助非凡才能走向世界。", ctaDonate:"立即捐款", ctaTalent:"了解才能项目", supportBadge:"支持我们的工作", p:[{title:"教育支持",desc:"学费、制服、书籍和学习用品——消除儿童与学习权利之间的每一个障碍。",statLabel:"在校儿童"},{title:"营养与喂养",desc:"每日营养膳食，让没有孩子因饥饿而无法集中注意力。",statLabel:"每日受助儿童"},{title:"医疗援助",desc:"为儿童提供医疗服务、治疗和预防。",statLabel:"医疗病例"},{title:"儿童保护",desc:"为弱势儿童提供安全空间、倡导和紧急支持。",statLabel:"对尊严的承诺"},{title:"儿童赞助",desc:"直接与一个孩子建立联系——您每月的承诺改变一个生命。",statLabel:"赞助人对儿童"},{title:"社区外展",desc:"与家庭、学校和当地领导人合作，确保我们的影响深远持久。",statLabel:"社区影响"}] },
  chat: { greeting:"你好！我是帕梅拉 👋 我在这里帮助您了解潘迪基金会。您想了解什么？", placeholder:"向帕梅拉提问…", humanCta:"想与真人交谈？", poweredBy:"由 Groq AI 驱动 · 潘迪基金会", online:"在线", suggestions:["我如何捐款？","介绍您的项目","如何资助一个孩子？","如何做志愿者？"], donateBtn:"立即捐款", comingSoon:"在线捐款即将推出！现在捐款请发邮件至 info@pandiefoundation.org 💛", typing:"帕梅拉正在输入…", langSwitchMsg:"我已为您切换到中文！有什么可以帮助您的？" },
  handoff: { title:"联系我们的团队 👤", body:"留下您的联系方式，我们会亲自与您联系。", nameLbl:"您的姓名", emailLbl:"电子邮件地址", submit:"与我们的团队联系 →", submitting:"发送中…", orEmail:"或直接发邮件至", successTitle:"我们收到了您的留言！", successBody:"我们的团队将联系", whileWait:"在等待期间", whileWaitBody:"帕梅拉仍可即时回答大多数问题。", back:"← 返回帕梅拉" },
};}

function ar(): T { return {
  nav: { about:"من نحن", getInvolved:"شارك معنا", programs:"البرامج", stories:"القصص", events:"الفعاليات", contact:"تواصل معنا", donate:"تبرع" },
  hero: { badge:"سيراليون · تأسست 2024", line1:"كل", line2:"طفل", line3a:"يستحق", line3b:"حب", line4:"الأم", body:"مؤسسة باندي تقف في الفجوة للأطفال الضعفاء في سيراليون — توفير التعليم والتغذية والرعاية الطبية وكرامة الإنسان.", cta1:"أحدث فرقاً", cta2:"قصتنا", stat1Label:"طفل وصلنا إليه", stat2Label:"في التعليم", stat3Label:"تغذية ورعاية" },
  core: { badge:"سبعة برامج", heading1:"سبعة ركائز من", heading2:"التغيير التحويلي", body:"نخدم الأطفال الضعفاء في سيراليون من خلال برامج تعالج كل بُعد من أبعاد حياة الطفل.", exploreProgram:"استكشف البرنامج", s:[{title:"دعم التعليم",description:"رسوم المدرسة والزي الرسمي والكتب واللوازم — إزالة كل حاجز بين الطفل وحقه في التعلم.",statLabel:"أطفال في المدرسة"},{title:"التغذية والإطعام",description:"وجبات يومية مغذية حتى لا يجلس أي طفل في الفصل جائعاً.",statLabel:"الأطفال الذين يتلقون الطعام يومياً"},{title:"المساعدة الطبية",description:"الوصول إلى الرعاية الصحية والعلاج والوقاية للأطفال.",statLabel:"الحالات الطبية المدعومة"},{title:"حماية الطفل",description:"أماكن آمنة ومناصرة ودعم طارئ للأطفال الضعفاء.",statLabel:"التزام بالكرامة"}], p5title:"كفالة الأطفال", p5desc:"تواصل مباشرة مع طفل — التزامك الشهري يحول حياة واحدة ويلهم مجتمعاً بأكمله.", p6title:"التوعية المجتمعية", p6desc:"الشراكة مع الأسر المحلية والقادة لضمان تأثيرنا العميق والدائم.", p7title:"المواهب والإرشاد", p7desc:"نكتشف المواهب الاستثنائية في مجتمعات سيراليون — كرة القدم والموسيقى والفنون والأكاديمية.", p7new:"جديد" },
  feature: { story1title:"طفل عاد إلى المدرسة", story1body:"من خلال الدعم والتشجيع والمواد المدرسية الأساسية، تمكن طفل ضعيف من العودة إلى الفصل بثقة وأمل متجدد.", story1cta:"قصص النجاح", story2title:"أعمال اللطف", story2body:"من الوجبات والمساعدة الطبية إلى دعم المدارس، كل عمل رعاية يعيد الكرامة ويحمي مستقبل الأطفال الضعفاء.", story2cta:"المزيد من الأخبار الجيدة", sideLabel:"البرنامج المميز", sideTitle:"برنامج دعم أطفال باندي", sideBody:"يدعم برنامجنا الرائد أكثر الأطفال ضعفاً في سيراليون بمساعدة تعليمية ودعم غذائي ورعاية طبية.", sideCta:"عرض البرنامج" },
  event: { badge:"حملة قادمة", heading1:"العودة إلى المدرسة &", heading2:"برنامج رعاية الأطفال", body:"انضم إلينا لتوفير المواد المدرسية ودعم التغذية والمساعدة الصحية للأطفال الضعفاء في سيراليون.", locLabel:"الموقع", locVal:"فريتاون، سيراليون", dateLabel:"التاريخ", dateVal:"أغسطس — سبتمبر 2025", goalLabel:"الهدف", goalVal:"دعم 500 طفل", cta1:"عرض الحدث الكامل →", cta2:"دعم هذه المبادرة", donateLabel:"كل 10 دولارات متبرع بها", donateBody:"تطعم طفلاً لمدة أسبوع", donateCta:"تبرع بـ 10 دولارات →" },
  impact: { badge:"تأثيرنا", heading1:"خلف كل رقم", heading2:"اسم", body:"كل إحصاء يمثل طفلاً حقيقياً في سيراليون تغيرت حياته لأن شخصاً ما اختار الاهتمام.", s:[{label:"الأطفال الذين وصلنا إليهم",sub:"من خلال جميع البرامج"},{label:"في التعليم",sub:"عادوا إلى المدرسة"},{label:"تغذية ورعاية",sub:"دعم غذائي منتظم"},{label:"البرامج الأساسية",sub:"تعالج كل احتياج"}], quote:'"عندما يتلقى الطفل الطعام، يمكنه التركيز في المدرسة. عندما يتلقى التعليم، يكتسب الاستقلالية. عندما يتلقى التعاطف، يؤمن بقيمته الذاتية."', quoteAuthor:"— مهمة باندي" },
  programs: { badge:"ما نفعله · سيراليون", heading1:"سبعة ركائز من", heading2:"التغيير التحويلي", body:"من إبقاء الأطفال على قيد الحياة إلى اكتشاف من هم حقاً — كل برنامج مبني على مبدأ واحد: عامل كل طفل كما لو كان طفلك.", exploreProgram:"استكشف البرنامج", exploreTalent:"استكشف المواهب والإرشاد →", talent7label:"اكتشاف المواهب والإرشاد", talent7new:"جديد — البرنامج 07", talent7heading1:"نحن لا نكتفي بإبقاء", talent7heading2:"الأطفال على قيد الحياة — نكتشف من هم حقاً", talent7body:"نجد مواهب استثنائية مخفية في مجتمعات سيراليون — كرة القدم والموسيقى والفنون والأكاديمية.", ctaBadge:"ادعم عملنا", ctaHeading1:"كل برنامج يعمل", ctaHeading2:"لأن شخصاً ما أعطى.", ctaBody:"تمول تبرعاتكم مباشرة هذه البرامج السبعة.", ctaDonate:"تبرع الآن", ctaTalent:"اكتشف برنامج المواهب", supportBadge:"ادعم عملنا", p:[{title:"دعم التعليم",desc:"رسوم المدرسة والزي والكتب واللوازم التعليمية.",statLabel:"أطفال في المدرسة"},{title:"التغذية والإطعام",desc:"وجبات يومية مغذية حتى لا يجلس أي طفل جائعاً.",statLabel:"أطفال يتغذون يومياً"},{title:"المساعدة الطبية",desc:"رعاية صحية وعلاج ووقاية للأطفال المعرضين للخطر.",statLabel:"الحالات الطبية المدعومة"},{title:"حماية الطفل",desc:"أماكن آمنة ومناصرة ودعم طارئ.",statLabel:"التزام بالكرامة"},{title:"كفالة الأطفال",desc:"تواصل مباشرة مع طفل — التزامك يحول حياة.",statLabel:"كافل لطفل"},{title:"التوعية المجتمعية",desc:"شراكة مع الأسر والمدارس والقادة المحليين.",statLabel:"تأثير مجتمعي"}] },
  chat: { greeting:"مرحباً! أنا باميلا 👋 أنا هنا لمساعدتك في التعرف على مؤسسة باندي. ماذا تريد أن تعرف?", placeholder:"اسأل باميلا أي شيء…", humanCta:"تفضل التحدث مع شخص حقيقي?", poweredBy:"مدعوم بـ Groq AI · مؤسسة باندي", online:"متصل", suggestions:["كيف يمكنني التبرع?","أخبرني عن برامجكم","كيف أكفل طفلاً?","كيف يمكنني التطوع?"], donateBtn:"تبرع الآن", comingSoon:"التبرعات الإلكترونية قادمة قريباً! راسلنا على info@pandiefoundation.org 💛", typing:"باميلا تكتب…", langSwitchMsg:"لقد تحولت إلى العربية من أجلك! كيف يمكنني مساعدتك?" },
  handoff: { title:"تحدث مع فريقنا 👤", body:"اترك تفاصيلك وسنتواصل معك شخصياً.", nameLbl:"اسمك", emailLbl:"عنوان البريد الإلكتروني", submit:"تواصل مع فريقنا →", submitting:"جار الإرسال…", orEmail:"أو راسلنا مباشرة على", successTitle:"تلقينا رسالتك!", successBody:"سيتواصل فريقنا مع", whileWait:"في انتظارك", whileWaitBody:"لا تزال باميلا قادرة على الإجابة.", back:"← العودة إلى باميلا" },
};}

// Fallback for all other languages — use English with the native greeting
function fallback(code: LangCode, nativeName: string): T {
  const base = en();
  base.chat.greeting = `Hello! I'm Pamela 👋 (${nativeName}) I'm here to help you learn about Pandie Foundation. What would you like to know?`;
  base.chat.langSwitchMsg = `Switched to ${nativeName}! How can I help?`;
  return base;
}

function getTranslations(code: LangCode): T {
  switch(code) {
    case "en": return en();
    case "fr": return fr();
    case "es": return es();
    case "zh": return zh();
    case "ar": return ar();
    default: {
      const lang = LANGUAGES.find(l => l.code === code);
      return fallback(code, lang?.nativeName || code);
    }
  }
}

function detectLanguage(): LangCode {
  if (typeof window === "undefined") return "en";
  const saved = localStorage.getItem("pandie-lang") as LangCode | null;
  if (saved && LANGUAGES.find(l => l.code === saved)) return saved;
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
  lang: "en", setLang: () => {}, t: en(), dir: "ltr",
  currentLang: LANGUAGES[0],
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LangCode>("en");

  useEffect(() => { setLangState(detectLanguage()); }, []);

  useEffect(() => {
    const l = LANGUAGES.find(x => x.code === lang)!;
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", l?.dir || "ltr");
    localStorage.setItem("pandie-lang", lang);
  }, [lang]);

  const setLang = (l: LangCode) => setLangState(l);
  const currentLang = LANGUAGES.find(x => x.code === lang) || LANGUAGES[0];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: getTranslations(lang), dir: currentLang.dir, currentLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
