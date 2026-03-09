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
        title: 'Medical oaths echo sacred Latin',
        description: "The phrase 'Primum non nocēre' (First, do no harm) blends sacred and medical Latin. Medical oaths historically used the same reverent language as prayers.",
        rootRefs: []
      }
    ]
  },
  {
    lessonId: 18,
    links: [
      {
        title: '"Sānāre" and healing vocabulary',
        description: "Sānāre (to heal) gives us 'sanitary,' 'sanitation,' and 'insane' (not sound/healthy). Salūs (health/salvation) gives 'salubrious' — medical and sacred overlap.",
        rootRefs: []
      }
    ]
  },
  {
    lessonId: 19,
    links: [
      {
        title: 'Build your own medical terms',
        description: "Just like building prayers, you can build medical terms: gastr- + -itis = gastritis (stomach inflammation). Combine root + suffix to decode or create terms.",
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
  { lessonId: 20, question: "Pronounce 'myocardial': which syllable gets stress?", options: ["MY-oh-cardial", "my-oh-CAR-dee-al", "my-OH-cardial", "myocar-DI-al"], correctIndex: 1, explanation: "my-oh-CAR-dee-al. The stress falls on CAR (from cardi-/cor, heart). Myo- = muscle." },
  { lessonId: 20, question: "What does 'arthr-' mean?", options: ["Artery", "Joint", "Arm", "Arch"], correctIndex: 1, explanation: "Arthr- = joint. Arthritis = joint inflammation, arthroscopy = joint viewing procedure." }
];
