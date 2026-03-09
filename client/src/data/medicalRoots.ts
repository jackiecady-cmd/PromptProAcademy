export interface MedicalRoot {
  root: string;
  meaning: string;
  examples: string[];
  relatedLatin?: string;
}

export const medicalRoots: MedicalRoot[] = [
  { root: "cardi-", meaning: "Heart", examples: ["cardiology", "cardiac", "myocardial", "tachycardia", "bradycardia"], relatedLatin: "cor" },
  { root: "pulmon-", meaning: "Lungs", examples: ["pulmonary", "pulmonologist", "pulmonary embolism"], relatedLatin: "pulmo" },
  { root: "crani-", meaning: "Skull / Brain case", examples: ["cranium", "craniotomy", "intracranial"], relatedLatin: "cranium" },
  { root: "derm- / cut-", meaning: "Skin", examples: ["dermatitis", "subcutaneous", "dermatology", "epidermis"], relatedLatin: "cutis" },
  { root: "oste-", meaning: "Bone", examples: ["osteoporosis", "osteology", "osteocyte", "osteoarthritis"], relatedLatin: "os" },
  { root: "arthr-", meaning: "Joint", examples: ["arthritis", "arthroscopy", "arthroplasty"], relatedLatin: "artus" },
  { root: "cephal-", meaning: "Head", examples: ["hydrocephalus", "cephalic", "encephalitis"], relatedLatin: "caput" },
  { root: "bronch-", meaning: "Airway / Windpipe", examples: ["bronchitis", "bronchoscopy", "bronchodilator"], relatedLatin: "bronchus" },
  { root: "hepat-", meaning: "Liver", examples: ["hepatitis", "hepatology", "hepatomegaly"], relatedLatin: "iecur" },
  { root: "nephr-", meaning: "Kidney", examples: ["nephrology", "nephrectomy", "nephritis"], relatedLatin: "ren" },
  { root: "gastr-", meaning: "Stomach", examples: ["gastric", "gastroenterology", "gastritis"], relatedLatin: "stomachus" },
  { root: "myo-", meaning: "Muscle", examples: ["myocardium", "myalgia", "myositis"], relatedLatin: "musculus" },
  { root: "ophthalm-", meaning: "Eye", examples: ["ophthalmology", "ophthalmoscope", "exophthalmos"], relatedLatin: "oculus" },
  { root: "neur-", meaning: "Nerve", examples: ["neurology", "neuropathy", "neuritis"], relatedLatin: "nervus" },
  { root: "hem- / sangui-", meaning: "Blood", examples: ["hemorrhage", "hematology", "sanguine"], relatedLatin: "sanguis" },
  { root: "pneum-", meaning: "Lung / Air", examples: ["pneumonia", "pneumothorax", "pneumonitis"], relatedLatin: "pulmo" },
  { root: "vas-", meaning: "Vessel", examples: ["vascular", "vasodilator", "cardiovascular"], relatedLatin: "vas" },
  { root: "ren-", meaning: "Kidney", examples: ["renal", "adrenal", "renal failure"], relatedLatin: "ren" }
];

export interface MedicalLessonLink {
  lessonId: number;
  links: {
    title: string;
    description: string;
    rootRefs: string[];
  }[];
}

export const medicalLessonLinks: MedicalLessonLink[] = [
  {
    lessonId: 1,
    links: [
      {
        title: '"Cor" powers cardiology — study of the heart',
        description: "The Latin word for heart (cor, cordis) gives us cardi- roots throughout medicine. Cardiac arrest, myocardial infarction, tachycardia — all trace back to this one Latin noun.",
        rootRefs: ["cardi-"]
      },
      {
        title: '"Oculus" lives on in ophthalmology',
        description: "Oculus (eye) connects to ophthalm- roots. An ophthalmoscope literally means 'eye-viewing tool.' Latin oculus also gives us 'ocular' and 'binocular.'",
        rootRefs: ["ophthalm-"]
      }
    ]
  },
  {
    lessonId: 2,
    links: [
      {
        title: 'Vowel length matters in medical terms too',
        description: "In medical Latin, proper vowel pronunciation distinguishes terms: 'ūterus' (womb) vs. similar-sounding words. Getting vowel length right prevents miscommunication in clinical settings.",
        rootRefs: []
      }
    ]
  },
  {
    lessonId: 3,
    links: [
      {
        title: 'Diphthongs appear everywhere in medical terminology',
        description: "The AE diphthong shows up in anaemia/anemia, haematology/hematology, and caecum/cecum. Knowing classical pronunciation helps you decode unfamiliar medical terms.",
        rootRefs: []
      }
    ]
  },
  {
    lessonId: 4,
    links: [
      {
        title: '1st declension nouns dominate anatomy',
        description: "Most anatomical structures ending in -a are 1st declension: scapula (shoulder blade), tibia (shinbone), fibula, vertebra, patella. Understanding -a/-ae endings helps with plural forms in anatomy.",
        rootRefs: ["oste-"]
      }
    ]
  },
  {
    lessonId: 5,
    links: [
      {
        title: '2nd declension -us/-um nouns fill medical charts',
        description: "Musculus (muscle), humerus (upper arm bone), cranium (skull), bronchus (airway) — 2nd declension endings are everywhere in anatomy. Plural: -us→-ī, -um→-a (bronchī, crania).",
        rootRefs: ["crani-", "bronch-", "myo-"]
      }
    ]
  },
  {
    lessonId: 6,
    links: [
      {
        title: '3rd declension: the biggest group in medical Latin',
        description: "Cor/cordis (heart), ren/renis (kidney), pulmo/pulmonis (lung) — the genitive stem reveals the medical root. Cordis→cardi-, renis→ren-, pulmonis→pulmon-.",
        rootRefs: ["cardi-", "nephr-", "pulmon-"]
      }
    ]
  },
  {
    lessonId: 7,
    links: [
      {
        title: 'Why "port-" matters: roots like portāre appear in medicine',
        description: "Portāre (to carry) gives us 'transport' (blood transport through vessels), 'portal vein' (liver entry point), and 'portable' (equipment). Latin verbs power medical vocabulary.",
        rootRefs: ["hepat-", "vas-"]
      }
    ]
  },
  {
    lessonId: 8,
    links: [
      {
        title: '"Dūcere" and "scrībere" in medical contexts',
        description: "Dūcere (to lead) gives us 'duct' (bile duct, tear duct), 'abduction/adduction' (moving limbs). Scrībere (to write) gives 'prescription' (pre-writing an order).",
        rootRefs: []
      }
    ]
  },
  {
    lessonId: 9,
    links: [
      {
        title: '"Esse" in diagnoses: present tense matters',
        description: "Medical charting uses forms of 'to be' constantly: 'Patient est febrilis' (patient is feverish). Status descriptions in clinical Latin rely on est/sunt forms.",
        rootRefs: []
      }
    ]
  },
  {
    lessonId: 10,
    links: [
      {
        title: 'Adjective agreement in anatomical descriptions',
        description: "Musculus magnus (large muscle), arteria coronaria (coronary artery), nervus vagus (wandering nerve) — adjectives must match gender/case. Getting this right is key for anatomy.",
        rootRefs: ["myo-", "neur-", "vas-"]
      }
    ]
  },
  {
    lessonId: 11,
    links: [
      {
        title: 'Pronouns in patient-centered medical Latin',
        description: "Understanding 'meus/tuus' (my/your) helps decode prescription abbreviations and historical medical texts where the physician addresses the patient directly.",
        rootRefs: []
      }
    ]
  },
  {
    lessonId: 12,
    links: [
      {
        title: 'Prepositions build medical prefixes',
        description: "Sub- (under): subcutaneous. Inter- (between): intercostal. Intra- (within): intracranial. Per- (through): percutaneous. These Latin prepositions are medical building blocks.",
        rootRefs: ["derm- / cut-", "crani-"]
      }
    ]
  },
  {
    lessonId: 13,
    links: [
      {
        title: 'Commands in clinical Latin',
        description: "Prescription Latin uses imperatives: 'Misce' (mix), 'Signa' (label/write), 'Recipe' (take — origin of Rx). Understanding imperative forms decodes historical pharmacy.",
        rootRefs: []
      }
    ]
  },
  {
    lessonId: 14,
    links: [
      {
        title: 'Past tense in medical case histories',
        description: "Case presentations use perfect tense: 'Patiens fractūram fēmoris passus est' (patient suffered a femur fracture). Past tense narrates the clinical history.",
        rootRefs: ["oste-"]
      }
    ]
  },
  {
    lessonId: 15,
    links: [
      {
        title: 'Subjunctive in prescriptions and orders',
        description: "Historical prescriptions use subjunctive: 'Fīat mistura' (let the mixture be made), 'Dētur' (let it be given). The subjunctive mood drives pharmaceutical Latin.",
        rootRefs: []
      }
    ]
  },
  {
    lessonId: 16,
    links: [
      {
        title: 'Numbers in dosing and anatomy',
        description: "Ūnus/bī/trī appear in: unilateral (one side), bilateral (two sides), tricuspid (three cusps). Numbering systems in anatomy and pharmacology rely on Latin roots.",
        rootRefs: ["cardi-"]
      }
    ]
  },
  {
    lessonId: 17,
    links: [
      {
        title: 'Medical oaths in Latin',
        description: "The phrase 'Primum non nocēre' (First, do no harm) is the foundational principle of medical ethics. Medical oaths historically used formal Latin for precision and authority.",
        rootRefs: []
      }
    ]
  },
  {
    lessonId: 18,
    links: [
      {
        title: '"Sānāre" and healing vocabulary',
        description: "Sānāre (to heal) gives us 'sanitary,' 'sanitation,' and 'insane' (not sound/healthy). Salūs (health/salvation) gives 'salubrious' — Latin roots underpin modern medical vocabulary.",
        rootRefs: []
      }
    ]
  },
  {
    lessonId: 19,
    links: [
      {
        title: 'Build your own medical terms',
        description: "Just like building Latin sentences, you can build medical terms: gastr- + -itis = gastritis (stomach inflammation). Combine root + suffix to decode or create terms.",
        rootRefs: ["gastr-", "arthr-", "hepat-"]
      },
      {
        title: 'Cor & Cardi- — The Heart Muscle',
        description: "Left failure: fluid backs into lungs (pulmonary edema). Right: legs swell (edema). Arrhythmia? Heart skips — think 'a-' (no) + 'rhythmus'. Cor (heart) is the root behind every cardiac diagnosis you'll encounter.",
        rootRefs: ["cardi-", "pulmon-"]
      }
    ]
  },
  {
    lessonId: 20,
    links: [
      {
        title: 'Full medical term pronunciation practice',
        description: "Apply your Latin pronunciation skills to medical terms: 'myocardial infarction' (myo-KAR-dee-al), 'hepatomegaly' (heh-PAH-toh-MEG-ah-lee). Proper Latin sounds = proper medical pronunciation.",
        rootRefs: ["myo-", "cardi-", "hepat-"]
      },
      {
        title: 'Ven- & Arteri- — Blood Highways',
        description: "Veins: low pressure, easy IV access, carry blood toward the heart. Arteries: high pressure, pulse strong — check radial (wrist), brachial (arm), carotid (neck). Vēna (vein) and artēria (artery) are Latin staples of vascular anatomy.",
        rootRefs: ["vas-"]
      }
    ]
  },
  {
    lessonId: 21,
    links: [
      {
        title: 'Arteria & Shock — When Vessels Clamp Down',
        description: "Arteria — because in hypovolemic shock, arteries clamp down, pulse goes thready (pulsus fīliformis). Vasoconstriction is the body's last-ditch effort to keep blood pressure up. Check radial pulse — if absent, systolic BP is likely below 80.",
        rootRefs: ["cardi-", "vas-"]
      },
      {
        title: 'Hemorrhage Roots: Sanguis & Haem-',
        description: "Sanguis (Latin) and haem- (Greek) both mean blood. Hemorrhage = haem- (blood) + -rrhagia (bursting). Exsanguination = ex- (out) + sanguis (blood). When arteries bleed, blood is bright red and spurts with each heartbeat — a critical distinction from venous (dark, steady) bleeding.",
        rootRefs: ["cardi-"]
      }
    ]
  }
];

export interface HealthcareOverride {
  lessonId: number;
  title?: string;
  subtitle?: string;
  content?: string;
  phrases?: Array<{
    latin: string;
    meaning: string;
    syllables: Array<{ text: string; stress: "high" | "medium" | "low" }>;
    phonetic: string;
  }>;
  vocabReplacements?: Array<{ index: number; latin: string; english: string; type: "noun" | "verb" | "adjective" | "adverb" | "pronoun" | "preposition" | "conjunction"; gender?: "masculine" | "feminine" | "neuter"; declension?: string; conjugation?: string; phonetic: string }>;
  quizReplacements?: Array<{ index: number; question: string; options: string[]; correctIndex: number; explanation: string }>;
}

export const healthcareOverrides: HealthcareOverride[] = [
  {
    lessonId: 1,
    phrases: [
      {
        latin: "Medīcīna ars est",
        meaning: "Medicine is an art",
        syllables: [
          { text: "me", stress: "low" },
          { text: "DĪ", stress: "high" },
          { text: "kī", stress: "medium" },
          { text: "na", stress: "low" },
          { text: " ARS", stress: "high" },
          { text: " est", stress: "medium" }
        ],
        phonetic: "meh-DEE-kee-nah ARS est"
      },
      {
        latin: "Salve",
        meaning: "Hello / Greetings",
        syllables: [
          { text: "SAL", stress: "high" },
          { text: "ve", stress: "medium" }
        ],
        phonetic: "SAHL-veh"
      }
    ]
  },
  {
    lessonId: 2,
    content: "Latin vowels can be long or short, which changes meaning and affects the rhythm of speech. Long vowels are held about twice as long as short vowels. A macron (ā, ē, ī, ō, ū) marks long vowels. In medical terminology, getting vowel length right ensures proper pronunciation of anatomical and clinical terms.",
    phrases: [
      {
        latin: "Medīcus cūrat aegrōs",
        meaning: "The physician cures the sick",
        syllables: [
          { text: "me", stress: "low" },
          { text: "DĪ", stress: "high" },
          { text: "kus", stress: "medium" },
          { text: " KŪ", stress: "high" },
          { text: "rat", stress: "medium" },
          { text: " AI", stress: "high" },
          { text: "grohs", stress: "medium" }
        ],
        phonetic: "meh-DEE-koos KOO-raht AI-grohs"
      },
      {
        latin: "Vīta brevis, ars longa",
        meaning: "Life is short, the art is long",
        syllables: [
          { text: "WĪ", stress: "high" },
          { text: "ta", stress: "medium" },
          { text: " BRE", stress: "high" },
          { text: "wis", stress: "medium" },
          { text: " ARS", stress: "high" },
          { text: " LON", stress: "high" },
          { text: "ga", stress: "medium" }
        ],
        phonetic: "WEE-tah BREH-wis ARS LON-gah"
      }
    ]
  },
  {
    lessonId: 3,
    content: "Latin consonants are mostly straightforward, but some differ from English. C is always hard (like K), G is always hard (like in 'go'). Diphthongs are two vowels pronounced as one sound: AE (like 'eye'), OE (like 'oy'), AU (like 'ow' in 'how'). In medical Latin, AE and OE are often simplified to 'eh' (e.g., anaemia → anemia).",
    phrases: [
      {
        latin: "Haemorrhagia ex arteriā",
        meaning: "Hemorrhage from the artery",
        syllables: [
          { text: "hai", stress: "medium" },
          { text: "mor", stress: "medium" },
          { text: "RHA", stress: "high" },
          { text: "gi", stress: "medium" },
          { text: "a", stress: "low" },
          { text: " eks", stress: "medium" },
          { text: " ar", stress: "low" },
          { text: "TE", stress: "high" },
          { text: "ri", stress: "medium" },
          { text: "ā", stress: "low" }
        ],
        phonetic: "hai-mor-RAH-gee-ah eks ar-TEH-ree-ah"
      }
    ]
  },
  {
    lessonId: 5,
    phrases: [
      {
        latin: "Humerus est os bracchiī",
        meaning: "The humerus is the bone of the arm",
        syllables: [
          { text: "HU", stress: "high" },
          { text: "me", stress: "medium" },
          { text: "rus", stress: "low" },
          { text: " est", stress: "medium" },
          { text: " os", stress: "high" },
          { text: " BRAK", stress: "high" },
          { text: "ki", stress: "medium" },
          { text: "ī", stress: "low" }
        ],
        phonetic: "HOO-meh-roos est os BRAHK-kee-ee"
      }
    ],
    vocabReplacements: [
      { index: 0, latin: "humerus", english: "upper arm bone", type: "noun", gender: "masculine", declension: "2nd", phonetic: "HOO-meh-roos" },
      { index: 1, latin: "morbus", english: "disease", type: "noun", gender: "masculine", declension: "2nd", phonetic: "MOR-boos" }
    ]
  },
  {
    lessonId: 6,
    phrases: [
      {
        latin: "Cor corporis vīvit",
        meaning: "The heart of the body lives",
        syllables: [
          { text: "KOR", stress: "high" },
          { text: " KOR", stress: "high" },
          { text: "po", stress: "medium" },
          { text: "ris", stress: "low" },
          { text: " WĪ", stress: "high" },
          { text: "wit", stress: "medium" }
        ],
        phonetic: "KOR KOR-poh-ris WEE-wit"
      }
    ]
  },
  {
    lessonId: 7,
    phrases: [
      {
        latin: "Medīcus cūrat patientem",
        meaning: "The physician cures the patient",
        syllables: [
          { text: "me", stress: "low" },
          { text: "DĪ", stress: "high" },
          { text: "kus", stress: "medium" },
          { text: " KŪ", stress: "high" },
          { text: "rat", stress: "medium" },
          { text: " pa", stress: "low" },
          { text: "ti", stress: "medium" },
          { text: "EN", stress: "high" },
          { text: "tem", stress: "medium" }
        ],
        phonetic: "meh-DEE-koos KOO-raht pah-tee-EN-tem"
      },
      {
        latin: "Vidēmus lūcem",
        meaning: "We see the light",
        syllables: [
          { text: "wi", stress: "low" },
          { text: "DĒ", stress: "high" },
          { text: "mus", stress: "medium" },
          { text: " LŪ", stress: "high" },
          { text: "kem", stress: "medium" }
        ],
        phonetic: "wee-DEH-moos LOO-kem"
      }
    ],
    vocabReplacements: [
      { index: 1, latin: "cūrāre", english: "to cure / to care for", type: "verb", conjugation: "1st", phonetic: "koo-RAH-reh" }
    ],
    quizReplacements: [
      { index: 1, question: "What does 'cūrāre' mean?", options: ["To cut", "To cure / care for", "To run", "To call"], correctIndex: 1, explanation: "Cūrāre means to cure or care for. Think of 'cure' and 'curative' in English." }
    ]
  },
  {
    lessonId: 8,
    phrases: [
      {
        latin: "Audī pulsūs patientis",
        meaning: "Listen to the patient's pulse",
        syllables: [
          { text: "OW", stress: "high" },
          { text: "dee", stress: "medium" },
          { text: " pool", stress: "medium" },
          { text: "SOOS", stress: "high" },
          { text: " pa", stress: "low" },
          { text: "ti", stress: "medium" },
          { text: "EN", stress: "high" },
          { text: "tis", stress: "medium" }
        ],
        phonetic: "OW-dee pool-SOOS pah-tee-EN-tis"
      }
    ]
  },
  {
    lessonId: 9,
    content: "Esse (to be) is the most common Latin verb and is irregular. Present tense: sum (I am), es (you are), est (he/she/it is), sumus (we are), estis (you all are), sunt (they are). This verb is essential for clinical descriptions — 'The patient is feverish' = Patiens febrīlis est.",
    phrases: [
      {
        latin: "Patiens febrīlis est",
        meaning: "The patient is feverish",
        syllables: [
          { text: "PA", stress: "high" },
          { text: "ti", stress: "medium" },
          { text: "ens", stress: "low" },
          { text: " fe", stress: "medium" },
          { text: "BRĪ", stress: "high" },
          { text: "lis", stress: "medium" },
          { text: " est", stress: "medium" }
        ],
        phonetic: "PAH-tee-ens feh-BREE-lis est"
      },
      {
        latin: "Ossa fortia sunt",
        meaning: "The bones are strong",
        syllables: [
          { text: "OS", stress: "high" },
          { text: "sa", stress: "medium" },
          { text: " FOR", stress: "high" },
          { text: "ti", stress: "medium" },
          { text: "a", stress: "low" },
          { text: " soont", stress: "high" }
        ],
        phonetic: "OS-sah FOR-tee-ah soont"
      }
    ],
    quizReplacements: [
      { index: 3, question: "Translate: 'Patiens febrīlis est'", options: ["The patient had a fever", "The patient is feverish", "The patient is healing", "The patient is here"], correctIndex: 1, explanation: "Patiens = patient, febrīlis = feverish, est = is." }
    ]
  },
  {
    lessonId: 10,
    phrases: [
      {
        latin: "Nervus vagus longus est",
        meaning: "The vagus nerve is long",
        syllables: [
          { text: "NER", stress: "high" },
          { text: "wus", stress: "medium" },
          { text: " VA", stress: "high" },
          { text: "gus", stress: "medium" },
          { text: " LON", stress: "high" },
          { text: "gus", stress: "medium" },
          { text: " est", stress: "medium" }
        ],
        phonetic: "NER-woos WAH-goos LON-goos est"
      }
    ],
    vocabReplacements: [
      { index: 2, latin: "sānus", english: "healthy / sound", type: "adjective", phonetic: "SAH-noos" },
      { index: 4, latin: "validus", english: "strong / vigorous", type: "adjective", phonetic: "WAH-lee-doos" }
    ],
    quizReplacements: [
      { index: 1, question: "What is the feminine form of 'bonus' (good)?", options: ["Bona", "Bone", "Bonum", "Bonus"], correctIndex: 0, explanation: "Bonus (m), bona (f), bonum (n). Adjectives match the gender of their noun." },
      { index: 3, question: "What does 'sānus' mean?", options: ["Sandy", "Healthy / Sound", "Saintly", "Sad"], correctIndex: 1, explanation: "Sānus means healthy or sound. Think of 'sane', 'sanitary', 'insane' (not healthy)." }
    ]
  },
  {
    lessonId: 11,
    content: "Latin pronouns decline like nouns. Ego (I/me), tū (you), nōs (we/us), vōs (you all). The vocative case is used for direct address — calling upon a person or colleague. Most nouns use the nominative for vocative, except 2nd declension -us which becomes -e (Medice from Medicus).",
    phrases: [
      {
        latin: "Tē rogō, Medice",
        meaning: "I ask you, Doctor",
        syllables: [
          { text: "TĒ", stress: "high" },
          { text: " RO", stress: "high" },
          { text: "gō", stress: "medium" },
          { text: " ME", stress: "high" },
          { text: "di", stress: "medium" },
          { text: "ke", stress: "low" }
        ],
        phonetic: "TEH ROH-goh MEH-dee-keh"
      },
      {
        latin: "Cūrā nōs, Medice",
        meaning: "Heal us, Doctor",
        syllables: [
          { text: "KŪ", stress: "high" },
          { text: "rā", stress: "medium" },
          { text: " nōs", stress: "high" },
          { text: " ME", stress: "high" },
          { text: "di", stress: "medium" },
          { text: "ke", stress: "low" }
        ],
        phonetic: "KOO-rah nohs MEH-dee-keh"
      }
    ],
    quizReplacements: [
      { index: 0, question: "What is the vocative of 'Medicus'?", options: ["Medicus", "Medice", "Medicō", "Medicī"], correctIndex: 1, explanation: "Second declension -us nouns change to -e in vocative: Medice (O Doctor)." },
      { index: 2, question: "What does 'cūrā' (imperative) mean?", options: ["Be curious", "Heal / Care for", "Be careful", "Run"], correctIndex: 1, explanation: "Cūrā is the imperative of cūrāre — heal or care for." }
    ]
  },
  {
    lessonId: 12,
    title: "Prepositions & Medical Phrases",
    subtitle: "Connecting words in clinical language",
    content: "Prepositions govern specific cases. With accusative: in (into), ad (toward), per (through), prō (for/on behalf of). With ablative: in (in/on), cum (with), ab/ā (from), ex/ē (out of), sine (without). Many medical phrases use prepositions: per ōs (by mouth), in vitrō (in glass), ex vīvō (from the living).",
    phrases: [
      {
        latin: "Per ōs bis in diē",
        meaning: "By mouth twice a day",
        syllables: [
          { text: "pehr", stress: "medium" },
          { text: " ōs", stress: "high" },
          { text: " bis", stress: "high" },
          { text: " in", stress: "low" },
          { text: " DI", stress: "high" },
          { text: "ē", stress: "medium" }
        ],
        phonetic: "pehr ohs bis in DEE-eh"
      }
    ]
  },
  {
    lessonId: 13,
    subtitle: "Commands in clinical and professional Latin",
    content: "The imperative mood gives commands — essential for clinical directions and instructions. Singular imperative is usually the verb stem: amā! (love!), audī! (hear!). Plural adds -te: amāte! audīte! Negative commands use nōlī/nōlīte + infinitive. Many medical directives are imperatives: 'Mix!' (Misce!), 'Label!' (Signa!), 'Give!' (Dā!).",
    phrases: [
      {
        latin: "Misce et signa",
        meaning: "Mix and label (pharmacy directive)",
        syllables: [
          { text: "MIS", stress: "high" },
          { text: "ke", stress: "medium" },
          { text: " et", stress: "low" },
          { text: " SIG", stress: "high" },
          { text: "na", stress: "medium" }
        ],
        phonetic: "MIS-keh et SIG-nah"
      },
      {
        latin: "Prōtege nōs",
        meaning: "Protect us",
        syllables: [
          { text: "PRŌ", stress: "high" },
          { text: "te", stress: "medium" },
          { text: "ge", stress: "low" },
          { text: " nōs", stress: "high" }
        ],
        phonetic: "PROH-teh-geh nohs"
      }
    ]
  },
  {
    lessonId: 14,
    phrases: [
      {
        latin: "Medīcus dīxit",
        meaning: "The physician said / spoke",
        syllables: [
          { text: "me", stress: "low" },
          { text: "DĪ", stress: "high" },
          { text: "kus", stress: "medium" },
          { text: " DĪK", stress: "high" },
          { text: "sit", stress: "medium" }
        ],
        phonetic: "meh-DEE-koos DEEK-sit"
      },
      {
        latin: "Vīdī, vīcī",
        meaning: "I saw, I conquered",
        syllables: [
          { text: "WĪ", stress: "high" },
          { text: "dī", stress: "medium" },
          { text: " WĪ", stress: "high" },
          { text: "kī", stress: "medium" }
        ],
        phonetic: "WEE-dee WEE-kee"
      }
    ]
  },
  {
    lessonId: 15,
    subtitle: "Wishes, directives, and possibilities",
    content: "The subjunctive mood expresses wishes, possibilities, and exhortations — extremely important in prescriptions and clinical directives. 'Let it be made' (Fīat), 'Let it be given' (Dētur), 'May the patient recover' (Patiens convalēscat). The subjunctive changes the vowel: 1st conj ā→ē, 2nd ē→eā, 3rd/4th use -ā-.",
    phrases: [
      {
        latin: "Fīat mistura",
        meaning: "Let the mixture be made",
        syllables: [
          { text: "FĪ", stress: "high" },
          { text: "at", stress: "medium" },
          { text: " mis", stress: "medium" },
          { text: "TŪ", stress: "high" },
          { text: "ra", stress: "low" }
        ],
        phonetic: "FEE-aht mis-TOO-rah"
      },
      {
        latin: "Dētur medicāmentum",
        meaning: "Let the medication be given",
        syllables: [
          { text: "DĒ", stress: "high" },
          { text: "tur", stress: "medium" },
          { text: " me", stress: "low" },
          { text: "di", stress: "medium" },
          { text: "kā", stress: "medium" },
          { text: "MEN", stress: "high" },
          { text: "tum", stress: "medium" }
        ],
        phonetic: "DEH-toor meh-dee-kah-MEN-toom"
      },
      {
        latin: "Requiescat in pāce",
        meaning: "May he/she rest in peace",
        syllables: [
          { text: "re", stress: "low" },
          { text: "kwi", stress: "medium" },
          { text: "ES", stress: "high" },
          { text: "kat", stress: "medium" },
          { text: " in", stress: "low" },
          { text: " PĀ", stress: "high" },
          { text: "ke", stress: "medium" }
        ],
        phonetic: "reh-kwee-ES-kaht in PAH-keh"
      }
    ],
    vocabReplacements: [
      { index: 1, latin: "dētur", english: "let it be given", type: "verb", phonetic: "DEH-toor" },
      { index: 2, latin: "convalēscat", english: "may he/she recover", type: "verb", phonetic: "kon-wah-LEHS-kaht" }
    ],
    quizReplacements: [
      { index: 1, question: "What mood is 'Fīat mistura'?", options: ["Indicative", "Imperative", "Subjunctive", "Infinitive"], correctIndex: 2, explanation: "Fīat is subjunctive — 'let it be made' is a directive, not a statement of fact." },
      { index: 2, question: "What does 'Requiescat in pāce' mean?", options: ["He rested in peace", "May he/she rest in peace", "Rest in peace (command)", "They rested peacefully"], correctIndex: 1, explanation: "Requiescat is subjunctive expressing a wish: May he/she rest in peace." }
    ]
  },
  {
    lessonId: 16,
    title: "Numbers & Clinical Counting",
    subtitle: "Latin numbers in medicine",
    content: "Numbers appear frequently in medical contexts. Cardinal numbers: ūnus (1), duo (2), trēs (3), quattuor (4), quīnque (5), sex (6), septem (7), octō (8), novem (9), decem (10). Numbers 1-3 decline like adjectives. Prescriptions use Latin numbers: bis (twice), ter (three times), quater (four times).",
    phrases: [
      {
        latin: "Ūna tabletta ter in diē",
        meaning: "One tablet three times a day",
        syllables: [
          { text: "Ū", stress: "high" },
          { text: "na", stress: "medium" },
          { text: " ta", stress: "low" },
          { text: "BLET", stress: "high" },
          { text: "ta", stress: "medium" },
          { text: " ter", stress: "high" },
          { text: " in", stress: "low" },
          { text: " DI", stress: "high" },
          { text: "ē", stress: "medium" }
        ],
        phonetic: "OO-nah tah-BLET-tah ter in DEE-eh"
      }
    ]
  },
  {
    lessonId: 4,
    vocabReplacements: [
      { index: 3, latin: "scapula", english: "shoulder blade", type: "noun", gender: "feminine", declension: "1st", phonetic: "SKAH-poo-lah" }
    ],
    quizReplacements: [
      { index: 2, question: "What does 'scapula' mean?", options: ["Skull", "Spine", "Shoulder blade", "Shin"], correctIndex: 2, explanation: "Scapula means shoulder blade. It's a 1st declension feminine noun." }
    ]
  },
  {
    lessonId: 19,
    title: "Crafting Clinical Latin Phrases",
    subtitle: "Building original medical terminology",
    content: "Now you have the tools to build your own Latin medical phrases. Key patterns: Start with the subject (medīcus, patiens, morbus), add a verb in the appropriate tense or mood (cūrat, dētur, fīat), include the object (medicāmentum, remedium), and add modifiers (per ōs, bis in diē). This mirrors how prescriptions and clinical notes are structured.",
    phrases: [
      {
        latin: "Medīcus prōtegit familiam ab morbō",
        meaning: "The physician protects the family from disease",
        syllables: [
          { text: "me", stress: "low" },
          { text: "DĪ", stress: "high" },
          { text: "kus", stress: "medium" },
          { text: " PRŌ", stress: "high" },
          { text: "te", stress: "medium" },
          { text: "git", stress: "low" },
          { text: " fa", stress: "low" },
          { text: "MI", stress: "high" },
          { text: "li", stress: "medium" },
          { text: "am", stress: "low" },
          { text: " ab", stress: "low" },
          { text: " MOR", stress: "high" },
          { text: "bō", stress: "medium" }
        ],
        phonetic: "meh-DEE-koos PROH-teh-git fah-MEE-lee-ahm ab MOR-boh"
      },
      {
        latin: "Dā mihi fortitūdinem et sapientiam",
        meaning: "Give me strength and wisdom",
        syllables: [
          { text: "DĀ", stress: "high" },
          { text: " MI", stress: "high" },
          { text: "hi", stress: "low" },
          { text: " for", stress: "low" },
          { text: "ti", stress: "medium" },
          { text: "TŪ", stress: "high" },
          { text: "di", stress: "medium" },
          { text: "nem", stress: "low" },
          { text: " et", stress: "low" },
          { text: " sa", stress: "low" },
          { text: "pi", stress: "medium" },
          { text: "EN", stress: "high" },
          { text: "ti", stress: "medium" },
          { text: "am", stress: "low" }
        ],
        phonetic: "DAH MEE-hee for-tee-TOO-dee-nem et sah-pee-EN-tee-ahm"
      }
    ],
    quizReplacements: [
      { index: 0, question: "How do you address a physician directly in Latin?", options: ["Medīcus (nominative)", "Medīcum (accusative)", "Medice (vocative)", "Medīcī (genitive)"], correctIndex: 2, explanation: "Use the vocative case for direct address. 2nd declension -us becomes -e: Medice." }
    ]
  },
  {
    lessonId: 20,
    title: "Full Clinical Pronunciation Practice",
    subtitle: "Putting it all together",
    content: "This final lesson brings everything together with extended clinical and anatomical texts for practice. Focus on smooth pronunciation, proper vowel lengths, correct stress patterns, and clear delivery. Read each text slowly first, then build speed while maintaining clarity. Record yourself and compare with the phonetic guides.",
    phrases: [
      {
        latin: "Primum non nocēre",
        meaning: "First, do no harm",
        syllables: [
          { text: "PRĪ", stress: "high" },
          { text: "mum", stress: "medium" },
          { text: " non", stress: "medium" },
          { text: " no", stress: "medium" },
          { text: "KĒ", stress: "high" },
          { text: "re", stress: "low" }
        ],
        phonetic: "PREE-moom non noh-KEH-reh"
      },
      {
        latin: "Corpus sānum in mente sānā",
        meaning: "A healthy body in a healthy mind",
        syllables: [
          { text: "KOR", stress: "high" },
          { text: "pus", stress: "medium" },
          { text: " SĀ", stress: "high" },
          { text: "num", stress: "medium" },
          { text: " in", stress: "low" },
          { text: " MEN", stress: "high" },
          { text: "te", stress: "medium" },
          { text: " SĀ", stress: "high" },
          { text: "nā", stress: "medium" }
        ],
        phonetic: "KOR-poos SAH-noom in MEN-teh SAH-nah"
      },
      {
        latin: "Sīcut erat in prīncipiō, et nunc, et semper",
        meaning: "As it was in the beginning, and now, and always",
        syllables: [
          { text: "SĪ", stress: "high" },
          { text: "kut", stress: "medium" },
          { text: " EH", stress: "high" },
          { text: "rat", stress: "medium" },
          { text: " in", stress: "low" },
          { text: " prīn", stress: "medium" },
          { text: "KI", stress: "high" },
          { text: "pi", stress: "medium" },
          { text: "ō", stress: "low" },
          { text: " et", stress: "low" },
          { text: " NUNK", stress: "high" },
          { text: " et", stress: "low" },
          { text: " SEM", stress: "high" },
          { text: "per", stress: "medium" }
        ],
        phonetic: "SEE-koot EH-raht in preen-KI-pee-oh et NOONK et SEM-pehr"
      }
    ],
    quizReplacements: [
      { index: 3, question: "What does 'saecula saeculōrum' literally mean?", options: ["Ancient secrets", "Ages of ages (forever)", "Century of centuries", "Secular world"], correctIndex: 1, explanation: "Saecula saeculōrum = ages of ages, meaning forever and ever. Used in formal Latin closings." }
    ]
  }
];

export interface MedicalQuizQuestion {
  lessonId: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const medicalQuizQuestions: MedicalQuizQuestion[] = [
  { lessonId: 1, question: "The Latin root 'cor' (heart) gives us which medical specialty?", options: ["Neurology", "Cardiology", "Nephrology", "Pulmonology"], correctIndex: 1, explanation: "Cor/cordis (heart) → cardi- → cardiology (study of the heart)." },
  { lessonId: 1, question: "What does the root 'ophthalm-' refer to?", options: ["Ear", "Nose", "Eye", "Throat"], correctIndex: 2, explanation: "Ophthalm- comes from the Greek/Latin for eye. Ophthalmology = study of the eye." },
  { lessonId: 2, question: "Which body system does 'pulmon-' relate to?", options: ["Heart", "Brain", "Lungs", "Liver"], correctIndex: 2, explanation: "Pulmo/pulmonis = lung. Pulmonary = relating to the lungs." },
  { lessonId: 2, question: "What does 'ūterus' mean in medical Latin?", options: ["Outer shell", "Womb", "Stomach", "Bladder"], correctIndex: 1, explanation: "Ūterus means womb — the long ū distinguishes it from similar-sounding terms." },
  { lessonId: 3, question: "The 'ae' diphthong appears in which medical term?", options: ["Hepatitis", "Anaemia", "Bronchitis", "Nephritis"], correctIndex: 1, explanation: "Anaemia (also spelled anemia) contains the AE diphthong from Greek/Latin." },
  { lessonId: 3, question: "What does the root 'hem-' / 'sangui-' mean?", options: ["Bone", "Blood", "Skin", "Nerve"], correctIndex: 1, explanation: "Hem- (Greek) and sangui- (Latin) both mean blood. Hemorrhage = blood flow, sanguine = blood-related." },
  { lessonId: 4, question: "Which anatomical structure is a 1st declension (-a) noun?", options: ["Humerus", "Cranium", "Scapula", "Bronchus"], correctIndex: 2, explanation: "Scapula (shoulder blade) is 1st declension feminine, ending in -a. Plural: scapulae." },
  { lessonId: 4, question: "What is the plural of 'vertebra' in medical Latin?", options: ["Vertebri", "Vertebras", "Vertebrae", "Vertebrum"], correctIndex: 2, explanation: "Vertebra is 1st declension: singular -a, plural -ae → vertebrae." },
  { lessonId: 5, question: "What does 'cranium' mean?", options: ["Spine", "Rib cage", "Skull", "Pelvis"], correctIndex: 2, explanation: "Cranium = skull. It's a 2nd declension neuter noun (-um). Crani- root → craniotomy." },
  { lessonId: 5, question: "The root 'bronch-' refers to what body part?", options: ["Brain", "Bone", "Airway", "Blood vessel"], correctIndex: 2, explanation: "Bronchus (2nd declension) = airway/windpipe. Bronchitis = airway inflammation." },
  { lessonId: 6, question: "Translate 'cor' and name a condition using its root.", options: ["Bone — osteoporosis", "Heart — cardiac arrest", "Lung — pneumonia", "Liver — hepatitis"], correctIndex: 1, explanation: "Cor = heart (3rd declension, gen. cordis). Cardi- → cardiac arrest, cardiology, myocardial infarction." },
  { lessonId: 6, question: "What is the genitive of 'ren' (kidney)?", options: ["Renis", "Rena", "Renum", "Reni"], correctIndex: 0, explanation: "Ren, renis (3rd declension) = kidney. The genitive renis reveals the root ren- → renal." },
  { lessonId: 7, question: "The Latin verb 'portāre' (to carry) appears in which medical term?", options: ["Portable defibrillator", "Portal vein", "Both A and B", "Neither"], correctIndex: 2, explanation: "Portāre (carry) → portable (can be carried) and portal vein (carries blood to the liver)." },
  { lessonId: 7, question: "What does 'vas-' mean in cardiovascular?", options: ["Heart", "Blood", "Vessel", "Flow"], correctIndex: 2, explanation: "Vas = vessel. Cardio + vascular = heart + vessels. Vasodilator = vessel widener." },
  { lessonId: 8, question: "What medical term comes from 'dūcere' (to lead)?", options: ["Duct", "Drug", "Dose", "Drain"], correctIndex: 0, explanation: "Dūcere (to lead) → duct (a channel that leads fluid). Bile duct, tear duct, etc." },
  { lessonId: 8, question: "What does 'abduction' mean in anatomy?", options: ["Bringing toward midline", "Moving away from midline", "Rotating inward", "Bending"], correctIndex: 1, explanation: "Ab- (away) + dūcere (to lead) = abduction: leading/moving a limb away from the body's midline." },
  { lessonId: 9, question: "Translate: 'Patiens febrīlis est'", options: ["Patient has a fever", "Patient is feverish", "Patient was feverish", "Patient will be feverish"], correctIndex: 1, explanation: "Est = is (present tense of esse). The patient IS feverish — present state." },
  { lessonId: 9, question: "What does 'morbidus est' mean?", options: ["He is dead", "He is sick/diseased", "He is recovering", "He is healthy"], correctIndex: 1, explanation: "Morbidus = sick/diseased. Est = is. 'Morbidus est' = He is sick. Root gives us 'morbidity.'" },
  { lessonId: 10, question: "In 'nervus vagus,' what does 'vagus' mean?", options: ["Large", "Small", "Wandering", "Strong"], correctIndex: 2, explanation: "Vagus = wandering (adjective). The vagus nerve 'wanders' from brain to abdomen." },
  { lessonId: 10, question: "What does 'arteria coronaria' mean?", options: ["Large artery", "Crown-like artery", "Main artery", "Arm artery"], correctIndex: 1, explanation: "Coronaria = crown-like (adjective agreeing with arteria). Coronary arteries encircle the heart like a crown." },
  { lessonId: 11, question: "What does 'Rx' on prescriptions stand for?", options: ["Relax", "Recipe (take)", "Read carefully", "Receive"], correctIndex: 1, explanation: "Rx comes from Latin 'Recipe' = 'take' (imperative of recipere). It's a command to the pharmacist." },
  { lessonId: 11, question: "What does 'neur-' mean?", options: ["New", "Nerve", "Neutral", "Night"], correctIndex: 1, explanation: "Neur- = nerve. Neurology = study of nerves, neuropathy = nerve disease." },
  { lessonId: 12, question: "What does 'subcutaneous' literally mean?", options: ["Above the skin", "Under the skin", "Through the skin", "Between the skin"], correctIndex: 1, explanation: "Sub- (under) + cutis (skin) = subcutaneous. A subcutaneous injection goes under the skin." },
  { lessonId: 12, question: "What does 'intracranial' mean?", options: ["Between skulls", "Around the skull", "Within the skull", "Outside the skull"], correctIndex: 2, explanation: "Intra- (within) + cranium (skull) = intracranial. Intracranial pressure = pressure within the skull." },
  { lessonId: 13, question: "What does the pharmacy term 'Misce' mean?", options: ["Measure", "Mix", "Make", "Move"], correctIndex: 1, explanation: "Misce = mix (imperative). A pharmacist instruction to mix ingredients together." },
  { lessonId: 13, question: "What does 'Signa' mean on a prescription?", options: ["Sign your name", "Label/write directions", "Seal the bottle", "Send to patient"], correctIndex: 1, explanation: "Signa = write/label (imperative). It tells the pharmacist to write usage directions on the label." },
  { lessonId: 14, question: "What does 'fractūra fēmoris' mean?", options: ["Broken finger", "Broken femur/thigh bone", "Fractured skull", "Broken rib"], correctIndex: 1, explanation: "Fractūra = fracture/break, fēmoris = of the femur (genitive). A broken thigh bone." },
  { lessonId: 14, question: "What does the root 'oste-' mean?", options: ["Ear", "Bone", "Mouth", "Foot"], correctIndex: 1, explanation: "Oste- = bone. Osteoporosis = porous bones, osteocyte = bone cell." },
  { lessonId: 15, question: "What does 'Fīat mistura' mean on a prescription?", options: ["Find the mixture", "Let the mixture be made", "Fix the mixture", "Filter the mixture"], correctIndex: 1, explanation: "Fīat (subjunctive: let it be made) + mistura (mixture). A pharmacist directive." },
  { lessonId: 15, question: "What does 'Dētur' mean in prescription Latin?", options: ["Delete it", "Describe it", "Let it be given", "Determine it"], correctIndex: 2, explanation: "Dētur = let it be given (passive subjunctive of dare). A dosing instruction." },
  { lessonId: 16, question: "What does 'bilateral' mean in anatomy?", options: ["One side", "Two sides", "Three parts", "All around"], correctIndex: 1, explanation: "Bi- (two, from Latin bis) + lateral (side). Bilateral = affecting both sides." },
  { lessonId: 16, question: "What is a 'tricuspid' valve?", options: ["A valve with one flap", "A valve with two flaps", "A valve with three flaps", "A valve with four flaps"], correctIndex: 2, explanation: "Tri- (three) + cuspid (point/flap). The tricuspid valve has three cusps/flaps." },
  { lessonId: 17, question: "Translate: 'Primum non nocēre'", options: ["First, do good", "First, do no harm", "First, diagnose", "First, listen"], correctIndex: 1, explanation: "Primum = first, non = not, nocēre = to harm. The foundational medical ethical principle." },
  { lessonId: 17, question: "What does 'gastr-' refer to?", options: ["Gallbladder", "Stomach", "Intestine", "Throat"], correctIndex: 1, explanation: "Gastr- = stomach. Gastritis = stomach inflammation, gastroenterology = stomach/intestine specialty." },
  { lessonId: 18, question: "What does 'sānāre' mean?", options: ["To sanitize", "To heal", "To sterilize", "To operate"], correctIndex: 1, explanation: "Sānāre = to heal. Gives us 'sanitary' (healthful), 'insane' (not sound/healthy)." },
  { lessonId: 18, question: "What does 'hepat-' refer to?", options: ["Heart", "Head", "Liver", "Hip"], correctIndex: 2, explanation: "Hepat- = liver. Hepatitis = liver inflammation, hepatomegaly = liver enlargement." },
  { lessonId: 19, question: "Break down 'gastritis' using Latin/Greek roots.", options: ["Gastr- (stomach) + -itis (inflammation)", "Gastr- (gas) + -ritis (pain)", "Gast- (gut) + -ritis (rupture)", "Gastr- (gall) + -itis (infection)"], correctIndex: 0, explanation: "Gastr- (stomach) + -itis (inflammation) = gastritis: inflammation of the stomach." },
  { lessonId: 19, question: "What does 'nephr-' mean?", options: ["Nerve", "Nose", "Kidney", "Neck"], correctIndex: 2, explanation: "Nephr- = kidney. Nephrology = kidney specialty, nephrectomy = kidney removal." },
  { lessonId: 19, question: "In hypovolemic shock, what happens to arterial tone?", options: ["Dilates to save volume", "Constricts to maintain pressure", "Stays neutral — kidneys handle it", "Nothing — the heart compensates alone"], correctIndex: 1, explanation: "'Arteri-' means artery. In shock, arteries constrict (vasoconstriction) to buy time — shunting blood to the brain and heart. Miss this sign? Patient goes cold, clammy, BP bottoms out. Kidneys shut down first, then everything else. Constriction buys time — until you replace fluid." },
  { lessonId: 20, question: "Pronounce 'myocardial': which syllable gets stress?", options: ["MY-oh-cardial", "my-oh-CAR-dee-al", "my-OH-cardial", "myocar-DI-al"], correctIndex: 1, explanation: "my-oh-CAR-dee-al. The stress falls on CAR (from cardi-/cor, heart). Myo- = muscle." },
  { lessonId: 20, question: "What does 'arthr-' mean?", options: ["Artery", "Joint", "Arm", "Arch"], correctIndex: 1, explanation: "Arthr- = joint. Arthritis = joint inflammation, arthroscopy = joint viewing procedure." },
  { lessonId: 21, question: "What does 'vasoconstriction' mean, using Latin roots?", options: ["Vessel widening", "Vessel narrowing/tightening", "Vessel breaking", "Vessel blocking"], correctIndex: 1, explanation: "Vās (vessel) + constrictiō (tightening) = vasoconstriction. Arteries narrow to maintain blood pressure during shock." },
  { lessonId: 21, question: "What does 'exsanguinate' literally mean?", options: ["To lose consciousness", "To drain of blood", "To stop breathing", "To lose pulse"], correctIndex: 1, explanation: "Ex- (out of) + sanguis (blood) = exsanguinate, to bleed out completely. A life-threatening emergency." }
];
