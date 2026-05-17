import type { Project, Experience, Education } from "@/types";
import type { Lang } from "./config";

/* ---------------- Projects ---------------- */

type ProjectBase = Pick<
  Project,
  "id" | "tech" | "category" | "featured" | "github" | "demo"
>;

const projectBase: ProjectBase[] = [
  {
    id: "riceguard",
    tech: ["Python", "Django", "PyTorch", "Android", "Java", "Machine Learning"],
    category: "mobile",
    featured: true,
  },
  {
    id: "school-erp",
    tech: ["Angular", "TypeScript", "Node.js", "SQL", "Tailwind CSS"],
    category: "fullstack",
    featured: true,
  },
  {
    id: "report-builder",
    tech: ["React", "TypeScript", "Tailwind CSS", "Node.js", "SQL"],
    category: "fullstack",
    featured: true,
  },
  {
    id: "bus-tracking",
    tech: ["React", "Node.js", "SQL", "TypeScript", "Tailwind CSS"],
    category: "fullstack",
    featured: false,
  },
  {
    id: "finance-system",
    tech: ["React", "Node.js", "SQL", "TypeScript", "Tailwind CSS"],
    category: "fullstack",
    featured: false,
  },
];

type PText = { title: string; description: string; features: string[] };

const projectText: Record<Lang, Record<string, PText>> = {
  en: {
    riceguard: {
      title: "RiceGuard",
      description:
        "Real-time rice leaf disease detection and pesticide advisory app using PyTorch CNNs and ML. Features a Django Python backend with a native Android mobile app built in Android Studio for image analysis, disease identification, and crop protection recommendations.",
      features: [
        "On-device leaf image capture & disease classification",
        "PyTorch CNN model trained for high-accuracy detection",
        "Tailored pesticide & crop-protection recommendations",
        "Django REST backend serving the native Android app",
      ],
    },
    "school-erp": {
      title: "School ERP System",
      description:
        "Comprehensive school administration platform digitizing enrollment, attendance, staff management, timetable scheduling, fee collection, and performance reporting. Features role-based access for admins, teachers, and students with real-time dashboards.",
      features: [
        "Role-based access for admins, teachers & students",
        "Attendance, timetable & staff management modules",
        "Fee collection with automated enrollment workflows",
        "Real-time performance & reporting dashboards",
      ],
    },
    "report-builder": {
      title: "School Report Builder",
      description:
        "Dynamic report builder for generating customized school reports including student progress cards, exam result sheets, and academic summaries. Teachers can configure templates, apply grading logic, and export printable reports.",
      features: [
        "Drag-and-configure report template builder",
        "Custom grading logic & rule engine",
        "Progress cards, result sheets & academic summaries",
        "One-click export to printable PDF",
      ],
    },
    "bus-tracking": {
      title: "Student Bus Tracking",
      description:
        "Real-time school bus monitoring application tracking pick-up/drop-off operations, assigned routes, student boarding status, and live location updates for parents and administrators.",
      features: [
        "Live GPS bus location for parents & admins",
        "Pick-up / drop-off boarding status tracking",
        "Route assignment & management",
        "Instant arrival & boarding notifications",
      ],
    },
    "finance-system": {
      title: "Finance Management System",
      description:
        "Kissflow-inspired school finance platform covering end-to-end workflows — fee collection, invoice generation, expense management, and reporting with configurable multi-step approval chains and role-based access.",
      features: [
        "Configurable multi-step approval chains",
        "Fee collection & automated invoice generation",
        "Expense management with audit reporting",
        "Role-based financial access controls",
      ],
    },
  },

  hi: {
    riceguard: {
      title: "RiceGuard",
      description:
        "PyTorch CNN और ML का उपयोग करके रीयल-टाइम चावल पत्ती रोग पहचान और कीटनाशक सलाह ऐप। छवि विश्लेषण, रोग पहचान और फसल सुरक्षा सिफारिशों के लिए Android Studio में बना नेटिव Android मोबाइल ऐप और Django Python बैकएंड।",
      features: [
        "डिवाइस पर पत्ती छवि कैप्चर और रोग वर्गीकरण",
        "उच्च-सटीकता पहचान के लिए प्रशिक्षित PyTorch CNN मॉडल",
        "अनुकूलित कीटनाशक और फसल-सुरक्षा सिफारिशें",
        "नेटिव Android ऐप के लिए Django REST बैकएंड",
      ],
    },
    "school-erp": {
      title: "स्कूल ERP सिस्टम",
      description:
        "व्यापक स्कूल प्रशासन प्लेटफ़ॉर्म जो नामांकन, उपस्थिति, स्टाफ प्रबंधन, समय-सारणी, शुल्क संग्रह और प्रदर्शन रिपोर्टिंग को डिजिटल बनाता है। एडमिन, शिक्षकों और छात्रों के लिए भूमिका-आधारित एक्सेस और रीयल-टाइम डैशबोर्ड।",
      features: [
        "एडमिन, शिक्षकों और छात्रों के लिए भूमिका-आधारित एक्सेस",
        "उपस्थिति, समय-सारणी और स्टाफ प्रबंधन मॉड्यूल",
        "स्वचालित नामांकन वर्कफ़्लो के साथ शुल्क संग्रह",
        "रीयल-टाइम प्रदर्शन और रिपोर्टिंग डैशबोर्ड",
      ],
    },
    "report-builder": {
      title: "स्कूल रिपोर्ट बिल्डर",
      description:
        "अनुकूलित स्कूल रिपोर्ट बनाने के लिए डायनामिक रिपोर्ट बिल्डर, जिसमें छात्र प्रगति कार्ड, परीक्षा परिणाम पत्रक और शैक्षणिक सारांश शामिल हैं। शिक्षक टेम्पलेट कॉन्फ़िगर कर सकते हैं, ग्रेडिंग लॉजिक लागू कर सकते हैं और प्रिंट करने योग्य रिपोर्ट निर्यात कर सकते हैं।",
      features: [
        "ड्रैग-एंड-कॉन्फ़िगर रिपोर्ट टेम्पलेट बिल्डर",
        "कस्टम ग्रेडिंग लॉजिक और नियम इंजन",
        "प्रगति कार्ड, परिणाम पत्रक और शैक्षणिक सारांश",
        "एक-क्लिक में प्रिंट करने योग्य PDF निर्यात",
      ],
    },
    "bus-tracking": {
      title: "स्टूडेंट बस ट्रैकिंग",
      description:
        "रीयल-टाइम स्कूल बस निगरानी एप्लिकेशन जो पिक-अप/ड्रॉप-ऑफ संचालन, निर्धारित मार्ग, छात्र बोर्डिंग स्थिति और अभिभावकों व प्रशासकों के लिए लाइव लोकेशन अपडेट ट्रैक करता है।",
      features: [
        "अभिभावकों और एडमिन के लिए लाइव GPS बस लोकेशन",
        "पिक-अप / ड्रॉप-ऑफ बोर्डिंग स्थिति ट्रैकिंग",
        "मार्ग आवंटन और प्रबंधन",
        "तत्काल आगमन और बोर्डिंग सूचनाएँ",
      ],
    },
    "finance-system": {
      title: "वित्त प्रबंधन प्रणाली",
      description:
        "Kissflow से प्रेरित स्कूल वित्त प्लेटफ़ॉर्म जो एंड-टू-एंड वर्कफ़्लो को कवर करता है — शुल्क संग्रह, चालान निर्माण, व्यय प्रबंधन और रिपोर्टिंग, कॉन्फ़िगर करने योग्य बहु-चरण अनुमोदन शृंखला और भूमिका-आधारित एक्सेस के साथ।",
      features: [
        "कॉन्फ़िगर करने योग्य बहु-चरण अनुमोदन शृंखला",
        "शुल्क संग्रह और स्वचालित चालान निर्माण",
        "ऑडिट रिपोर्टिंग के साथ व्यय प्रबंधन",
        "भूमिका-आधारित वित्तीय एक्सेस नियंत्रण",
      ],
    },
  },

  fr: {
    riceguard: {
      title: "RiceGuard",
      description:
        "Application de détection en temps réel des maladies des feuilles de riz et de conseil en pesticides utilisant des CNN PyTorch et le ML. Backend Django Python avec une application mobile Android native conçue dans Android Studio pour l'analyse d'images, l'identification des maladies et les recommandations de protection des cultures.",
      features: [
        "Capture d'image de feuille et classification des maladies sur l'appareil",
        "Modèle CNN PyTorch entraîné pour une détection très précise",
        "Recommandations de pesticides et de protection des cultures sur mesure",
        "Backend REST Django alimentant l'app Android native",
      ],
    },
    "school-erp": {
      title: "Système ERP scolaire",
      description:
        "Plateforme complète d'administration scolaire numérisant les inscriptions, la présence, la gestion du personnel, les emplois du temps, la collecte des frais et les rapports de performance. Accès basé sur les rôles pour les administrateurs, enseignants et élèves avec des tableaux de bord en temps réel.",
      features: [
        "Accès basé sur les rôles pour admins, enseignants et élèves",
        "Modules de présence, d'emploi du temps et de gestion du personnel",
        "Collecte des frais avec flux d'inscription automatisés",
        "Tableaux de bord de performance et de reporting en temps réel",
      ],
    },
    "report-builder": {
      title: "Générateur de bulletins scolaires",
      description:
        "Générateur de rapports dynamique pour créer des bulletins scolaires personnalisés : cartes de progression, relevés de notes et synthèses académiques. Les enseignants configurent des modèles, appliquent une logique de notation et exportent des rapports imprimables.",
      features: [
        "Générateur de modèles par glisser-déposer",
        "Logique de notation personnalisée et moteur de règles",
        "Cartes de progression, relevés et synthèses académiques",
        "Export PDF imprimable en un clic",
      ],
    },
    "bus-tracking": {
      title: "Suivi du bus scolaire",
      description:
        "Application de surveillance en temps réel des bus scolaires suivant les opérations de prise en charge/dépose, les itinéraires assignés, le statut d'embarquement des élèves et la localisation en direct pour les parents et administrateurs.",
      features: [
        "Localisation GPS du bus en direct pour parents et admins",
        "Suivi du statut d'embarquement prise en charge / dépose",
        "Attribution et gestion des itinéraires",
        "Notifications instantanées d'arrivée et d'embarquement",
      ],
    },
    "finance-system": {
      title: "Système de gestion financière",
      description:
        "Plateforme financière scolaire inspirée de Kissflow couvrant des flux de bout en bout — collecte des frais, génération de factures, gestion des dépenses et reporting, avec des chaînes d'approbation multi-étapes configurables et un accès basé sur les rôles.",
      features: [
        "Chaînes d'approbation multi-étapes configurables",
        "Collecte des frais et génération automatisée de factures",
        "Gestion des dépenses avec reporting d'audit",
        "Contrôles d'accès financiers basés sur les rôles",
      ],
    },
  },

  de: {
    riceguard: {
      title: "RiceGuard",
      description:
        "Echtzeit-App zur Erkennung von Reisblattkrankheiten und Pestizidberatung mit PyTorch-CNNs und ML. Django-Python-Backend mit einer nativen Android-App, in Android Studio entwickelt, für Bildanalyse, Krankheitserkennung und Empfehlungen zum Pflanzenschutz.",
      features: [
        "Blattbild-Erfassung & Krankheitsklassifizierung auf dem Gerät",
        "PyTorch-CNN-Modell für hochpräzise Erkennung trainiert",
        "Maßgeschneiderte Pestizid- & Pflanzenschutzempfehlungen",
        "Django-REST-Backend für die native Android-App",
      ],
    },
    "school-erp": {
      title: "Schul-ERP-System",
      description:
        "Umfassende Schulverwaltungsplattform, die Einschreibung, Anwesenheit, Personalverwaltung, Stundenplanung, Gebühreneinzug und Leistungsberichte digitalisiert. Rollenbasierter Zugriff für Admins, Lehrkräfte und Schüler mit Echtzeit-Dashboards.",
      features: [
        "Rollenbasierter Zugriff für Admins, Lehrkräfte & Schüler",
        "Module für Anwesenheit, Stundenplan & Personalverwaltung",
        "Gebühreneinzug mit automatisierten Einschreibungsabläufen",
        "Echtzeit-Dashboards für Leistung & Berichte",
      ],
    },
    "report-builder": {
      title: "Schul-Berichtsgenerator",
      description:
        "Dynamischer Berichtsgenerator zur Erstellung individueller Schulberichte: Fortschrittskarten, Prüfungsergebnislisten und akademische Zusammenfassungen. Lehrkräfte konfigurieren Vorlagen, wenden Bewertungslogik an und exportieren druckbare Berichte.",
      features: [
        "Berichtsvorlagen per Drag-and-drop konfigurieren",
        "Individuelle Bewertungslogik & Regel-Engine",
        "Fortschrittskarten, Ergebnislisten & Zusammenfassungen",
        "Druckbarer PDF-Export mit einem Klick",
      ],
    },
    "bus-tracking": {
      title: "Schulbus-Tracking",
      description:
        "Echtzeit-Anwendung zur Überwachung von Schulbussen, die Abhol-/Bringvorgänge, zugewiesene Routen, den Einstiegsstatus der Schüler und Live-Standortaktualisierungen für Eltern und Verwaltung verfolgt.",
      features: [
        "Live-GPS-Busstandort für Eltern & Admins",
        "Verfolgung des Einstiegsstatus beim Abholen / Bringen",
        "Routenzuweisung & -verwaltung",
        "Sofortige Ankunfts- & Einstiegsbenachrichtigungen",
      ],
    },
    "finance-system": {
      title: "Finanzverwaltungssystem",
      description:
        "Von Kissflow inspirierte Schulfinanzplattform mit durchgängigen Abläufen — Gebühreneinzug, Rechnungserstellung, Ausgabenverwaltung und Reporting, mit konfigurierbaren mehrstufigen Genehmigungsketten und rollenbasiertem Zugriff.",
      features: [
        "Konfigurierbare mehrstufige Genehmigungsketten",
        "Gebühreneinzug & automatisierte Rechnungserstellung",
        "Ausgabenverwaltung mit Audit-Reporting",
        "Rollenbasierte Finanz-Zugriffskontrollen",
      ],
    },
  },
};

export function getProjects(lang: Lang): Project[] {
  return projectBase.map((b) => ({ ...b, ...projectText[lang][b.id] }));
}

/* ---------------- Experience ---------------- */

const expBase = {
  company: "Mograsys Technology Pvt. Ltd.",
  period: "Oct 2025 – May 2026",
};

const expText: Record<
  Lang,
  { role: string; location: string; description: string[] }
> = {
  en: {
    role: "Full Stack Developer",
    location: "Goa, India",
    description: [
      "Developed and maintained dynamic, responsive web applications using Angular and React, building reusable component libraries and implementing state management for scalable frontend architectures.",
      "Designed Tailwind CSS-based UI components ensuring consistent, mobile-first design across all application modules, improving UX and page load performance.",
      "Built and optimized RESTful APIs using Node.js and Express.js, handling authentication, middleware, and seamless front-to-back communication.",
      "Wrote complex SQL queries for data retrieval and reporting; collaborated with the team to design efficient relational database schemas.",
      "Participated in Agile sprints, code reviews, and daily stand-ups, contributing to on-time feature delivery.",
    ],
  },
  hi: {
    role: "फुल स्टैक डेवलपर",
    location: "गोवा, भारत",
    description: [
      "Angular और React का उपयोग करके डायनामिक, रिस्पॉन्सिव वेब एप्लिकेशन विकसित और बनाए रखे, पुन: प्रयोज्य कंपोनेंट लाइब्रेरी बनाई और स्केलेबल फ्रंटएंड आर्किटेक्चर के लिए स्टेट मैनेजमेंट लागू किया।",
      "सभी मॉड्यूल में सुसंगत, मोबाइल-फर्स्ट डिज़ाइन सुनिश्चित करते हुए Tailwind CSS-आधारित UI कंपोनेंट डिज़ाइन किए, जिससे UX और पेज लोड प्रदर्शन बेहतर हुआ।",
      "Node.js और Express.js का उपयोग करके RESTful API बनाए और अनुकूलित किए, प्रमाणीकरण, मिडलवेयर और निर्बाध फ्रंट-टू-बैक संचार संभाला।",
      "डेटा पुनर्प्राप्ति और रिपोर्टिंग के लिए जटिल SQL क्वेरी लिखीं; कुशल रिलेशनल डेटाबेस स्कीमा डिज़ाइन करने के लिए टीम के साथ सहयोग किया।",
      "Agile स्प्रिंट, कोड समीक्षा और दैनिक स्टैंड-अप में भाग लिया, समय पर फ़ीचर डिलीवरी में योगदान दिया।",
    ],
  },
  fr: {
    role: "Développeur Full Stack",
    location: "Goa, Inde",
    description: [
      "Développement et maintenance d'applications web dynamiques et réactives avec Angular et React, création de bibliothèques de composants réutilisables et mise en place de la gestion d'état pour des architectures frontend évolutives.",
      "Conception de composants UI basés sur Tailwind CSS garantissant un design cohérent et mobile-first sur tous les modules, améliorant l'UX et les performances de chargement.",
      "Création et optimisation d'API RESTful avec Node.js et Express.js, gestion de l'authentification, des middlewares et d'une communication fluide front-back.",
      "Rédaction de requêtes SQL complexes pour l'extraction de données et le reporting ; collaboration avec l'équipe pour concevoir des schémas de base de données relationnels efficaces.",
      "Participation aux sprints Agile, revues de code et stand-ups quotidiens, contribuant à une livraison de fonctionnalités dans les délais.",
    ],
  },
  de: {
    role: "Full-Stack-Entwickler",
    location: "Goa, Indien",
    description: [
      "Entwicklung und Wartung dynamischer, responsiver Webanwendungen mit Angular und React, Aufbau wiederverwendbarer Komponentenbibliotheken und Implementierung von State-Management für skalierbare Frontend-Architekturen.",
      "Gestaltung Tailwind-CSS-basierter UI-Komponenten mit konsistentem, Mobile-First-Design über alle Module hinweg, was UX und Ladeleistung verbesserte.",
      "Aufbau und Optimierung von RESTful-APIs mit Node.js und Express.js, inklusive Authentifizierung, Middleware und nahtloser Front-to-Back-Kommunikation.",
      "Erstellung komplexer SQL-Abfragen für Datenabruf und Reporting; Zusammenarbeit im Team zur Gestaltung effizienter relationaler Datenbankschemata.",
      "Teilnahme an Agile-Sprints, Code-Reviews und täglichen Stand-ups, mit Beitrag zur termingerechten Feature-Auslieferung.",
    ],
  },
};

export function getExperience(lang: Lang): Experience[] {
  return [{ ...expBase, ...expText[lang] }];
}

/* ---------------- Education ---------------- */

const eduBase = [
  { institution: "Canara Engineering College", period: "Dec 2021 – July 2025" },
  { institution: "M.E.S Pre-University College", period: "Jun 2019 – May 2021" },
  { institution: "Don Bosco High School", period: "May 2016 – May 2019" },
];

type EText = { degree: string; location: string; score: string };

const eduText: Record<Lang, EText[]> = {
  en: [
    {
      degree: "B.E in Computer Science and Business Systems",
      location: "Bantwal, Mangalore, India",
      score:
        "CGPA: 9.13 | 9th State Rank (VTU) | Semester Topper (4th, 5th, 6th Sem)",
    },
    {
      degree: "Pre-University (Karnataka Board)",
      location: "Sirsi, India",
      score: "85.33%",
    },
    {
      degree: "Secondary Education (KSEEB)",
      location: "Sirsi, India",
      score: "92.48%",
    },
  ],
  hi: [
    {
      degree: "बी.ई. कंप्यूटर साइंस एंड बिज़नेस सिस्टम्स",
      location: "बंटवाल, मंगलुरु, भारत",
      score:
        "CGPA: 9.13 | 9वीं राज्य रैंक (VTU) | सेमेस्टर टॉपर (चौथा, पाँचवाँ, छठा सेम)",
    },
    {
      degree: "प्री-यूनिवर्सिटी (कर्नाटक बोर्ड)",
      location: "सिरसी, भारत",
      score: "85.33%",
    },
    {
      degree: "माध्यमिक शिक्षा (KSEEB)",
      location: "सिरसी, भारत",
      score: "92.48%",
    },
  ],
  fr: [
    {
      degree: "Licence en informatique et systèmes d'entreprise",
      location: "Bantwal, Mangalore, Inde",
      score:
        "CGPA : 9,13 | 9e rang d'État (VTU) | Major de promotion (4e, 5e, 6e sem.)",
    },
    {
      degree: "Classe préparatoire (Karnataka Board)",
      location: "Sirsi, Inde",
      score: "85,33 %",
    },
    {
      degree: "Enseignement secondaire (KSEEB)",
      location: "Sirsi, Inde",
      score: "92,48 %",
    },
  ],
  de: [
    {
      degree: "B.E. in Informatik und Business Systems",
      location: "Bantwal, Mangalore, Indien",
      score:
        "Notendurchschnitt: 9,13 | 9. Landesrang (VTU) | Jahrgangsbester (4., 5., 6. Sem.)",
    },
    {
      degree: "Vorstudium (Karnataka Board)",
      location: "Sirsi, Indien",
      score: "85,33 %",
    },
    {
      degree: "Sekundarstufe (KSEEB)",
      location: "Sirsi, Indien",
      score: "92,48 %",
    },
  ],
};

export function getEducation(lang: Lang): Education[] {
  return eduBase.map((b, i) => ({ ...b, ...eduText[lang][i] }));
}

/* ---------------- About-preview stats ---------------- */

const statValues = ["9.13", "9th", "5+", "1+"];

const statLabels: Record<Lang, string[]> = {
  en: ["CGPA", "VTU State Rank", "Projects Shipped", "Years Experience"],
  hi: ["CGPA", "VTU राज्य रैंक", "प्रोजेक्ट्स पूर्ण", "वर्षों का अनुभव"],
  fr: ["CGPA", "Rang d'État VTU", "Projets livrés", "Ans d'expérience"],
  de: ["Notenschnitt", "VTU-Landesrang", "Projekte geliefert", "Jahre Erfahrung"],
};

export function getStats(lang: Lang): { value: string; label: string }[] {
  return statValues.map((value, i) => ({
    value,
    label: statLabels[lang][i],
  }));
}
