export interface Syllable {
  text: string;
  stress: "high" | "medium" | "low";
}

export interface LatinPhrase {
  latin: string;
  meaning: string;
  syllables: Syllable[];
  phonetic: string;
  notes?: string;
}

export interface VocabWord {
  latin: string;
  english: string;
  type: "noun" | "verb" | "adjective" | "adverb" | "pronoun" | "preposition" | "conjunction";
  gender?: "masculine" | "feminine" | "neuter";
  declension?: string;
  conjugation?: string;
  phonetic: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: number;
  title: string;
  subtitle: string;
  category: "fundamentals" | "nouns" | "verbs" | "pronunciation" | "prayers" | "advanced";
  content: string;
  phrases: LatinPhrase[];
  vocabulary: VocabWord[];
  quiz: QuizQuestion[];
}

export const lessons: Lesson[] = [
  {
    id: 1,
    title: "The Latin Alphabet & Basic Sounds",
    subtitle: "Foundation of pronunciation",
    category: "fundamentals",
    content: "Latin uses the same alphabet as English but with consistent pronunciation rules. Every letter is always pronounced the same way. There are no silent letters in Latin. The vowels A, E, I, O, U each have a clear, pure sound unlike English where vowels shift.",
    phrases: [
      {
        latin: "Ave Maria",
        meaning: "Hail Mary",
        syllables: [
          { text: "A", stress: "high" },
          { text: "ve", stress: "medium" },
          { text: " ", stress: "low" },
          { text: "Ma", stress: "high" },
          { text: "rí", stress: "medium" },
          { text: "a", stress: "low" }
        ],
        phonetic: "AH-veh mah-REE-ah"
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
    ],
    vocabulary: [
      { latin: "aqua", english: "water", type: "noun", gender: "feminine", phonetic: "AH-kwah" },
      { latin: "terra", english: "earth / land", type: "noun", gender: "feminine", phonetic: "TEH-rah" },
      { latin: "caelum", english: "sky / heaven", type: "noun", gender: "neuter", phonetic: "KAI-loom" },
      { latin: "ignis", english: "fire", type: "noun", gender: "masculine", phonetic: "IG-nis" },
      { latin: "lux", english: "light", type: "noun", gender: "feminine", phonetic: "LOOKS" }
    ],
    quiz: [
      { question: "How is the Latin 'V' pronounced?", options: ["Like English 'V'", "Like English 'W'", "Like English 'F'", "Silent"], correctIndex: 1, explanation: "In classical Latin, V is pronounced like the English W. 'Ave' sounds like 'AH-weh'." },
      { question: "Are there silent letters in Latin?", options: ["Yes, many", "Only H is sometimes silent", "No, every letter is pronounced", "Only at the end of words"], correctIndex: 2, explanation: "Every letter in Latin is pronounced. There are no silent letters." },
      { question: "What does 'terra' mean?", options: ["Star", "Water", "Earth / Land", "Fire"], correctIndex: 2, explanation: "Terra means earth or land. Think of 'terrain' in English." },
      { question: "What gender is 'ignis' (fire)?", options: ["Feminine", "Masculine", "Neuter", "No gender"], correctIndex: 1, explanation: "Ignis is masculine. Latin nouns have grammatical gender." }
    ]
  },
  {
    id: 2,
    title: "Vowels: Long & Short",
    subtitle: "The foundation of Latin rhythm",
    category: "pronunciation",
    content: "Latin vowels can be long or short, which changes meaning and affects the rhythm of speech. Long vowels are held about twice as long as short vowels. A macron (ā, ē, ī, ō, ū) marks long vowels. In sacred and ritual contexts, getting vowel length right creates the proper cadence for prayers and invocations.",
    phrases: [
      {
        latin: "Dōmine Deus Meus",
        meaning: "Lord my God",
        syllables: [
          { text: "DŌ", stress: "high" },
          { text: "mi", stress: "medium" },
          { text: "ne", stress: "low" },
          { text: " ", stress: "low" },
          { text: "DE", stress: "high" },
          { text: "us", stress: "medium" },
          { text: " ", stress: "low" },
          { text: "ME", stress: "high" },
          { text: "us", stress: "low" }
        ],
        phonetic: "DOH-mee-neh DEH-oos MEH-oos"
      },
      {
        latin: "Pāx vōbīscum",
        meaning: "Peace be with you",
        syllables: [
          { text: "PĀKS", stress: "high" },
          { text: " ", stress: "low" },
          { text: "vō", stress: "high" },
          { text: "BĪS", stress: "medium" },
          { text: "koom", stress: "low" }
        ],
        phonetic: "PAHKS woh-BEES-koom"
      }
    ],
    vocabulary: [
      { latin: "māter", english: "mother", type: "noun", gender: "feminine", phonetic: "MAH-tehr" },
      { latin: "pāter", english: "father", type: "noun", gender: "masculine", phonetic: "PAH-tehr" },
      { latin: "fīlius", english: "son", type: "noun", gender: "masculine", phonetic: "FEE-lee-oos" },
      { latin: "fīlia", english: "daughter", type: "noun", gender: "feminine", phonetic: "FEE-lee-ah" },
      { latin: "vīta", english: "life", type: "noun", gender: "feminine", phonetic: "WEE-tah" }
    ],
    quiz: [
      { question: "What does a macron (ā) indicate?", options: ["A stressed syllable", "A long vowel", "A silent vowel", "A nasal sound"], correctIndex: 1, explanation: "A macron marks a long vowel, held about twice as long as a short vowel." },
      { question: "How do you pronounce 'Pāx'?", options: ["PAKS", "PAHKS", "PEES", "PASH"], correctIndex: 1, explanation: "The long ā gives it the sound PAHKS." },
      { question: "What does 'māter' mean?", options: ["Matter", "Master", "Mother", "Material"], correctIndex: 2, explanation: "Māter means mother. English 'maternal' comes from this word." },
      { question: "What is the gender of 'fīlius'?", options: ["Feminine", "Masculine", "Neuter", "Common"], correctIndex: 1, explanation: "Fīlius (son) is masculine. Its feminine form fīlia means daughter." }
    ]
  },
  {
    id: 3,
    title: "Consonants & Diphthongs",
    subtitle: "Mastering combined sounds",
    category: "pronunciation",
    content: "Latin consonants are mostly straightforward, but some differ from English. C is always hard (like K), G is always hard (like in 'go'). Diphthongs are two vowels pronounced as one sound: AE (like 'eye'), OE (like 'oy'), AU (like 'ow' in 'how'). In Church Latin, AE and OE are often simplified to 'eh'.",
    phrases: [
      {
        latin: "Caelī enarrant glōriam Deī",
        meaning: "The heavens declare the glory of God",
        syllables: [
          { text: "KAI", stress: "high" },
          { text: "lee", stress: "medium" },
          { text: " eh", stress: "low" },
          { text: "NAR", stress: "high" },
          { text: "rant", stress: "medium" },
          { text: " glō", stress: "high" },
          { text: "ri", stress: "medium" },
          { text: "am", stress: "low" },
          { text: " De", stress: "high" },
          { text: "ī", stress: "low" }
        ],
        phonetic: "KAI-lee eh-NAR-rahnt GLOH-ree-ahm DEH-ee"
      }
    ],
    vocabulary: [
      { latin: "caelum", english: "sky / heaven", type: "noun", gender: "neuter", phonetic: "KAI-loom" },
      { latin: "aurum", english: "gold", type: "noun", gender: "neuter", phonetic: "OW-room" },
      { latin: "laetus", english: "happy / joyful", type: "adjective", phonetic: "LAI-toos" },
      { latin: "poena", english: "punishment / penalty", type: "noun", gender: "feminine", phonetic: "POY-nah" },
      { latin: "causa", english: "cause / reason", type: "noun", gender: "feminine", phonetic: "KOW-sah" }
    ],
    quiz: [
      { question: "How is the Latin C always pronounced?", options: ["Like S before E/I", "Always hard, like K", "Like CH", "It varies"], correctIndex: 1, explanation: "In classical Latin, C is always hard like K. 'Caesar' is KAI-sar, not SEE-zer." },
      { question: "How is the diphthong AE pronounced?", options: ["Like 'ay'", "Like 'ah-eh'", "Like 'eye'", "Like 'ee'"], correctIndex: 2, explanation: "AE is pronounced like 'eye' in classical Latin." },
      { question: "What does 'aurum' mean?", options: ["Gold", "Air", "Ear", "Hour"], correctIndex: 0, explanation: "Aurum means gold. The chemical symbol Au comes from this word." },
      { question: "How is the diphthong AU pronounced?", options: ["Like 'aw'", "Like 'ow' in 'how'", "Like 'oo'", "Like 'oh'"], correctIndex: 1, explanation: "AU sounds like 'ow' in 'how'. Aurum is OW-room." }
    ]
  },
  {
    id: 4,
    title: "First Declension Nouns",
    subtitle: "Feminine nouns ending in -a",
    category: "nouns",
    content: "Latin nouns change their endings based on their role in a sentence — this is called declension. First declension nouns are mostly feminine and end in -a in the nominative (subject) form. The endings change: -a (subject), -ae (possessive), -ae (indirect object), -am (direct object), -ā (by/with/from).",
    phrases: [
      {
        latin: "Stēlla in caelō lūcet",
        meaning: "The star shines in the sky",
        syllables: [
          { text: "STĒL", stress: "high" },
          { text: "la", stress: "medium" },
          { text: " in", stress: "low" },
          { text: " KAI", stress: "high" },
          { text: "lō", stress: "medium" },
          { text: " LŪ", stress: "high" },
          { text: "ket", stress: "medium" }
        ],
        phonetic: "STEHL-lah in KAI-loh LOO-ket"
      }
    ],
    vocabulary: [
      { latin: "stēlla", english: "star", type: "noun", gender: "feminine", declension: "1st", phonetic: "STEHL-lah" },
      { latin: "rosa", english: "rose", type: "noun", gender: "feminine", declension: "1st", phonetic: "ROH-sah" },
      { latin: "fēmina", english: "woman", type: "noun", gender: "feminine", declension: "1st", phonetic: "FEH-mee-nah" },
      { latin: "dea", english: "goddess", type: "noun", gender: "feminine", declension: "1st", phonetic: "DEH-ah" },
      { latin: "flamma", english: "flame", type: "noun", gender: "feminine", declension: "1st", phonetic: "FLAHM-mah" },
      { latin: "lūna", english: "moon", type: "noun", gender: "feminine", declension: "1st", phonetic: "LOO-nah" }
    ],
    quiz: [
      { question: "What ending do most 1st declension nouns have?", options: ["-us", "-a", "-um", "-is"], correctIndex: 1, explanation: "First declension nouns typically end in -a and are feminine." },
      { question: "What is the accusative (direct object) ending for 1st declension?", options: ["-a", "-ae", "-am", "-ā"], correctIndex: 2, explanation: "The accusative singular ending is -am. 'I see the star' = Stēllam videō." },
      { question: "What does 'dea' mean?", options: ["Day", "God", "Goddess", "Death"], correctIndex: 2, explanation: "Dea means goddess. The masculine form is deus (god)." },
      { question: "What gender are most 1st declension nouns?", options: ["Masculine", "Feminine", "Neuter", "Any gender"], correctIndex: 1, explanation: "First declension nouns are predominantly feminine." }
    ]
  },
  {
    id: 5,
    title: "Second Declension Nouns",
    subtitle: "Masculine (-us) and neuter (-um) nouns",
    category: "nouns",
    content: "Second declension has two main types: masculine nouns ending in -us and neuter nouns ending in -um. Masculine: -us (subject), -ī (possessive), -ō (indirect), -um (direct), -ō (by/with). Neuter nouns follow similar patterns but the nominative and accusative are always the same form.",
    phrases: [
      {
        latin: "Dominus vōbīscum",
        meaning: "The Lord be with you",
        syllables: [
          { text: "DO", stress: "high" },
          { text: "mi", stress: "medium" },
          { text: "nus", stress: "low" },
          { text: " vō", stress: "high" },
          { text: "BĪS", stress: "medium" },
          { text: "koom", stress: "low" }
        ],
        phonetic: "DOH-mee-noos woh-BEES-koom"
      }
    ],
    vocabulary: [
      { latin: "dominus", english: "lord / master", type: "noun", gender: "masculine", declension: "2nd", phonetic: "DOH-mee-noos" },
      { latin: "deus", english: "god", type: "noun", gender: "masculine", declension: "2nd", phonetic: "DEH-oos" },
      { latin: "fīlius", english: "son", type: "noun", gender: "masculine", declension: "2nd", phonetic: "FEE-lee-oos" },
      { latin: "templum", english: "temple", type: "noun", gender: "neuter", declension: "2nd", phonetic: "TEM-ploom" },
      { latin: "verbum", english: "word", type: "noun", gender: "neuter", declension: "2nd", phonetic: "WEHR-boom" },
      { latin: "bellum", english: "war", type: "noun", gender: "neuter", declension: "2nd", phonetic: "BEL-loom" }
    ],
    quiz: [
      { question: "What ending do masculine 2nd declension nouns have?", options: ["-a", "-us", "-um", "-is"], correctIndex: 1, explanation: "Second declension masculine nouns end in -us (dominus, deus)." },
      { question: "What ending do neuter 2nd declension nouns have?", options: ["-a", "-us", "-um", "-is"], correctIndex: 2, explanation: "Neuter nouns end in -um (templum, verbum, bellum)." },
      { question: "What does 'verbum' mean?", options: ["Verb", "Word", "Truth", "Road"], correctIndex: 1, explanation: "Verbum means word. English 'verbal' comes from this root." },
      { question: "In neuter nouns, what's special about nominative and accusative?", options: ["They're different", "They're always the same", "There is no accusative", "They swap places"], correctIndex: 1, explanation: "In all neuter nouns (not just 2nd declension), nominative and accusative forms are identical." }
    ]
  },
  {
    id: 6,
    title: "Third Declension Nouns",
    subtitle: "The largest and most varied group",
    category: "nouns",
    content: "Third declension is the largest group with masculine, feminine, and neuter nouns. They have various nominative endings but share the genitive ending -is. The stem is found by dropping -is from the genitive. Key endings: nom. (varies), gen. -is, dat. -ī, acc. -em (m/f) or same as nom (n), abl. -e.",
    phrases: [
      {
        latin: "Rēx rēgum et Dominus dominōrum",
        meaning: "King of kings and Lord of lords",
        syllables: [
          { text: "RĒKS", stress: "high" },
          { text: " RĒ", stress: "high" },
          { text: "goom", stress: "medium" },
          { text: " et", stress: "low" },
          { text: " DO", stress: "high" },
          { text: "mi", stress: "medium" },
          { text: "nus", stress: "low" },
          { text: " do", stress: "low" },
          { text: "mi", stress: "medium" },
          { text: "NŌ", stress: "high" },
          { text: "room", stress: "medium" }
        ],
        phonetic: "REHKS REH-goom et DOH-mee-noos doh-mee-NOH-room"
      }
    ],
    vocabulary: [
      { latin: "rēx", english: "king", type: "noun", gender: "masculine", declension: "3rd", phonetic: "REHKS" },
      { latin: "vōx", english: "voice", type: "noun", gender: "feminine", declension: "3rd", phonetic: "WOHKS" },
      { latin: "nōmen", english: "name", type: "noun", gender: "neuter", declension: "3rd", phonetic: "NOH-men" },
      { latin: "corpus", english: "body", type: "noun", gender: "neuter", declension: "3rd", phonetic: "KOR-poos" },
      { latin: "homō", english: "human / person", type: "noun", gender: "masculine", declension: "3rd", phonetic: "HOH-moh" },
      { latin: "virtūs", english: "virtue / courage", type: "noun", gender: "feminine", declension: "3rd", phonetic: "WEER-toos" }
    ],
    quiz: [
      { question: "How do you find the stem of a 3rd declension noun?", options: ["Drop -us", "Drop -a", "Drop -is from the genitive", "It's the same as nominative"], correctIndex: 2, explanation: "The stem is found by removing -is from the genitive form." },
      { question: "What does 'nōmen' mean?", options: ["Number", "Name", "Noble", "None"], correctIndex: 1, explanation: "Nōmen means name. English 'nomenclature' comes from this word." },
      { question: "What does 'corpus' mean?", options: ["Crown", "Court", "Body", "Heart"], correctIndex: 2, explanation: "Corpus means body. Think of 'corpse' or 'corporeal' in English." },
      { question: "What's the accusative ending for masculine/feminine 3rd declension?", options: ["-am", "-um", "-em", "-im"], correctIndex: 2, explanation: "The accusative singular for m/f 3rd declension nouns is -em." }
    ]
  },
  {
    id: 7,
    title: "Present Tense Verbs (1st & 2nd Conjugation)",
    subtitle: "Expressing current actions",
    category: "verbs",
    content: "Latin verbs are organized into four conjugations based on their stem vowel. First conjugation verbs have stems ending in -ā (amāre — to love). Second conjugation verbs have stems in -ē (vidēre — to see). Present tense endings: -ō, -s, -t, -mus, -tis, -nt (I, you, he/she, we, you all, they).",
    phrases: [
      {
        latin: "Amō tē, Domine",
        meaning: "I love you, Lord",
        syllables: [
          { text: "A", stress: "high" },
          { text: "mō", stress: "medium" },
          { text: " tē", stress: "high" },
          { text: " DO", stress: "high" },
          { text: "mi", stress: "medium" },
          { text: "ne", stress: "low" }
        ],
        phonetic: "AH-moh teh DOH-mee-neh"
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
    vocabulary: [
      { latin: "amāre", english: "to love", type: "verb", conjugation: "1st", phonetic: "ah-MAH-reh" },
      { latin: "ōrāre", english: "to pray", type: "verb", conjugation: "1st", phonetic: "oh-RAH-reh" },
      { latin: "vocāre", english: "to call", type: "verb", conjugation: "1st", phonetic: "woh-KAH-reh" },
      { latin: "vidēre", english: "to see", type: "verb", conjugation: "2nd", phonetic: "wee-DEH-reh" },
      { latin: "habēre", english: "to have", type: "verb", conjugation: "2nd", phonetic: "hah-BEH-reh" },
      { latin: "tenēre", english: "to hold", type: "verb", conjugation: "2nd", phonetic: "teh-NEH-reh" }
    ],
    quiz: [
      { question: "What is the 'I' ending for present tense verbs?", options: ["-s", "-t", "-ō", "-mus"], correctIndex: 2, explanation: "The first person singular ending is -ō. Amō = I love." },
      { question: "What does 'ōrāre' mean?", options: ["To speak", "To pray", "To order", "To sing"], correctIndex: 1, explanation: "Ōrāre means to pray. Think of 'oration' — originally a prayer or formal speech." },
      { question: "Which conjugation does 'amāre' belong to?", options: ["1st", "2nd", "3rd", "4th"], correctIndex: 0, explanation: "Amāre is 1st conjugation — the stem vowel is ā." },
      { question: "What ending means 'we'?", options: ["-tis", "-nt", "-mus", "-s"], correctIndex: 2, explanation: "The 'we' ending is -mus. Vidēmus = we see." }
    ]
  },
  {
    id: 8,
    title: "Present Tense Verbs (3rd & 4th Conjugation)",
    subtitle: "More verb patterns",
    category: "verbs",
    content: "Third conjugation verbs have stems ending in a consonant or short -i (dūcere — to lead, capere — to take). Fourth conjugation verbs have stems in -ī (audīre — to hear). The same personal endings apply (-ō, -s, -t, -mus, -tis, -nt) but the connecting vowels differ slightly.",
    phrases: [
      {
        latin: "Audī nōs, Domine",
        meaning: "Hear us, Lord",
        syllables: [
          { text: "OW", stress: "high" },
          { text: "dee", stress: "medium" },
          { text: " nōs", stress: "high" },
          { text: " DO", stress: "high" },
          { text: "mi", stress: "medium" },
          { text: "ne", stress: "low" }
        ],
        phonetic: "OW-dee nohs DOH-mee-neh"
      }
    ],
    vocabulary: [
      { latin: "dūcere", english: "to lead", type: "verb", conjugation: "3rd", phonetic: "DOO-keh-reh" },
      { latin: "dīcere", english: "to say / speak", type: "verb", conjugation: "3rd", phonetic: "DEE-keh-reh" },
      { latin: "scrībere", english: "to write", type: "verb", conjugation: "3rd", phonetic: "SKREE-beh-reh" },
      { latin: "audīre", english: "to hear / listen", type: "verb", conjugation: "4th", phonetic: "ow-DEE-reh" },
      { latin: "venīre", english: "to come", type: "verb", conjugation: "4th", phonetic: "weh-NEE-reh" },
      { latin: "scīre", english: "to know", type: "verb", conjugation: "4th", phonetic: "SKEE-reh" }
    ],
    quiz: [
      { question: "What conjugation is 'audīre'?", options: ["1st", "2nd", "3rd", "4th"], correctIndex: 3, explanation: "Audīre is 4th conjugation — the stem vowel is ī." },
      { question: "What does 'scrībere' mean?", options: ["To describe", "To write", "To scratch", "To scream"], correctIndex: 1, explanation: "Scrībere means to write. English 'scribe' and 'scripture' come from this." },
      { question: "What does 'dīcere' mean?", options: ["To die", "To dig", "To say / speak", "To direct"], correctIndex: 2, explanation: "Dīcere means to say or speak. Think of 'dictate' or 'dictionary'." },
      { question: "What does 'venīre' mean?", options: ["To win", "To sell", "To come", "To hunt"], correctIndex: 2, explanation: "Venīre means to come. English 'advent' (ad + venīre) means 'a coming toward'." }
    ]
  },
  {
    id: 9,
    title: "The Verb 'To Be' (Esse)",
    subtitle: "The most important irregular verb",
    category: "verbs",
    content: "Esse (to be) is the most common Latin verb and is irregular. Present tense: sum (I am), es (you are), est (he/she/it is), sumus (we are), estis (you all are), sunt (they are). This verb is essential for prayers and invocations — 'God is great' = Deus magnus est.",
    phrases: [
      {
        latin: "Deus magnus est",
        meaning: "God is great",
        syllables: [
          { text: "DE", stress: "high" },
          { text: "us", stress: "medium" },
          { text: " MAG", stress: "high" },
          { text: "nus", stress: "medium" },
          { text: " est", stress: "medium" }
        ],
        phonetic: "DEH-oos MAHG-noos est"
      },
      {
        latin: "Ego sum via, vēritās et vīta",
        meaning: "I am the way, the truth and the life",
        syllables: [
          { text: "EH", stress: "high" },
          { text: "go", stress: "low" },
          { text: " sum", stress: "high" },
          { text: " WI", stress: "high" },
          { text: "ah", stress: "low" },
          { text: " WĒ", stress: "high" },
          { text: "ri", stress: "medium" },
          { text: "tās", stress: "low" },
          { text: " et", stress: "low" },
          { text: " WĪ", stress: "high" },
          { text: "ta", stress: "low" }
        ],
        phonetic: "EH-go soom WEE-ah WEH-ree-tahs et WEE-tah"
      }
    ],
    vocabulary: [
      { latin: "sum", english: "I am", type: "verb", phonetic: "soom" },
      { latin: "es", english: "you are", type: "verb", phonetic: "es" },
      { latin: "est", english: "he/she/it is", type: "verb", phonetic: "est" },
      { latin: "sumus", english: "we are", type: "verb", phonetic: "SOO-moos" },
      { latin: "vēritās", english: "truth", type: "noun", gender: "feminine", phonetic: "WEH-ree-tahs" },
      { latin: "via", english: "way / road", type: "noun", gender: "feminine", phonetic: "WEE-ah" }
    ],
    quiz: [
      { question: "How do you say 'I am' in Latin?", options: ["Es", "Est", "Sum", "Sumus"], correctIndex: 2, explanation: "Sum = I am. It's an irregular verb." },
      { question: "How do you say 'they are'?", options: ["Sunt", "Estis", "Sumus", "Est"], correctIndex: 0, explanation: "Sunt = they are." },
      { question: "What does 'vēritās' mean?", options: ["Virtue", "Truth", "Variety", "Verse"], correctIndex: 1, explanation: "Vēritās means truth. English 'verify' and 'verity' come from this root." },
      { question: "Translate: 'Deus magnus est'", options: ["God is here", "God is great", "God is coming", "God is near"], correctIndex: 1, explanation: "Deus = God, magnus = great, est = is." }
    ]
  },
  {
    id: 10,
    title: "Adjectives & Agreement",
    subtitle: "Describing nouns with matching forms",
    category: "nouns",
    content: "Latin adjectives must agree with their nouns in gender, number, and case. First/second declension adjectives follow -us/-a/-um patterns (bonus, bona, bonum = good). Third declension adjectives use -is/-e patterns. Word order is flexible in Latin — the endings tell you which adjective goes with which noun.",
    phrases: [
      {
        latin: "Sancta Maria, Māter Deī",
        meaning: "Holy Mary, Mother of God",
        syllables: [
          { text: "SANK", stress: "high" },
          { text: "ta", stress: "medium" },
          { text: " Ma", stress: "high" },
          { text: "RĪ", stress: "medium" },
          { text: "a", stress: "low" },
          { text: " MĀ", stress: "high" },
          { text: "ter", stress: "medium" },
          { text: " De", stress: "high" },
          { text: "ī", stress: "low" }
        ],
        phonetic: "SAHNK-tah mah-REE-ah MAH-tehr DEH-ee"
      }
    ],
    vocabulary: [
      { latin: "bonus", english: "good", type: "adjective", phonetic: "BOH-noos" },
      { latin: "magnus", english: "great / large", type: "adjective", phonetic: "MAHG-noos" },
      { latin: "sanctus", english: "holy / sacred", type: "adjective", phonetic: "SAHNK-toos" },
      { latin: "aeternus", english: "eternal", type: "adjective", phonetic: "ai-TEHR-noos" },
      { latin: "omnipotēns", english: "all-powerful / almighty", type: "adjective", phonetic: "ohm-NI-poh-tehns" },
      { latin: "fortis", english: "strong / brave", type: "adjective", phonetic: "FOR-tis" }
    ],
    quiz: [
      { question: "What must adjectives agree with?", options: ["Only gender", "Gender, number, and case", "Only case", "Nothing — they don't change"], correctIndex: 1, explanation: "Adjectives must match their noun in gender, number, and case." },
      { question: "What is the feminine form of 'bonus' (good)?", options: ["Bona", "Bone", "Bonum", "Bonus"], correctIndex: 0, explanation: "Bonus (m), bona (f), bonum (n). Sancta Maria uses the feminine form." },
      { question: "What does 'aeternus' mean?", options: ["Aerial", "Eternal", "External", "Ethical"], correctIndex: 1, explanation: "Aeternus means eternal. Think of 'eternity'." },
      { question: "What does 'sanctus' mean?", options: ["Sanctuary", "Holy / Sacred", "Saintly", "Sand"], correctIndex: 1, explanation: "Sanctus means holy or sacred. Sancta is the feminine form." }
    ]
  },
  {
    id: 11,
    title: "Pronouns & Forms of Address",
    subtitle: "I, you, we — speaking directly",
    category: "fundamentals",
    content: "Latin pronouns decline like nouns. Ego (I/me), tū (you), nōs (we/us), vōs (you all). In prayers and invocations, the vocative case is used for direct address — calling upon a deity or person. Most nouns use the nominative for vocative, except 2nd declension -us which becomes -e (Domine from Dominus).",
    phrases: [
      {
        latin: "Tē rogō, Domine",
        meaning: "I ask you, Lord",
        syllables: [
          { text: "TĒ", stress: "high" },
          { text: " RO", stress: "high" },
          { text: "gō", stress: "medium" },
          { text: " DO", stress: "high" },
          { text: "mi", stress: "medium" },
          { text: "ne", stress: "low" }
        ],
        phonetic: "TEH ROH-goh DOH-mee-neh"
      },
      {
        latin: "Miserēre nostrī",
        meaning: "Have mercy on us",
        syllables: [
          { text: "mi", stress: "low" },
          { text: "se", stress: "medium" },
          { text: "RĒ", stress: "high" },
          { text: "re", stress: "low" },
          { text: " NOS", stress: "high" },
          { text: "trī", stress: "medium" }
        ],
        phonetic: "mee-seh-REH-reh NOS-tree"
      }
    ],
    vocabulary: [
      { latin: "ego", english: "I", type: "pronoun", phonetic: "EH-go" },
      { latin: "tū", english: "you (singular)", type: "pronoun", phonetic: "too" },
      { latin: "nōs", english: "we / us", type: "pronoun", phonetic: "nohs" },
      { latin: "vōs", english: "you all", type: "pronoun", phonetic: "wohs" },
      { latin: "meus", english: "my / mine", type: "adjective", phonetic: "MEH-oos" },
      { latin: "tuus", english: "your / yours", type: "adjective", phonetic: "TOO-oos" }
    ],
    quiz: [
      { question: "What is the vocative of 'Dominus'?", options: ["Dominus", "Domine", "Dominō", "Dominī"], correctIndex: 1, explanation: "Second declension -us nouns change to -e in vocative: Domine." },
      { question: "What does 'ego' mean?", options: ["You", "He", "I", "We"], correctIndex: 2, explanation: "Ego means I. English borrowed this word directly." },
      { question: "What does 'miserēre' mean?", options: ["Be miserable", "Have mercy", "Be patient", "Remember"], correctIndex: 1, explanation: "Miserēre means have mercy — an imperative form." },
      { question: "How do you say 'your' (singular possessive)?", options: ["Meus", "Noster", "Tuus", "Vester"], correctIndex: 2, explanation: "Tuus/tua/tuum = your (singular). From tū (you)." }
    ]
  },
  {
    id: 12,
    title: "Prepositions & Sacred Phrases",
    subtitle: "Connecting words in ritual language",
    category: "fundamentals",
    content: "Prepositions govern specific cases. With accusative: in (into), ad (toward), per (through), prō (for/on behalf of). With ablative: in (in/on), cum (with), ab/ā (from), ex/ē (out of), sine (without). Many sacred phrases use prepositions: In nōmine Patris (In the name of the Father).",
    phrases: [
      {
        latin: "In nōmine Patris et Fīliī et Spīritūs Sanctī",
        meaning: "In the name of the Father, and of the Son, and of the Holy Spirit",
        syllables: [
          { text: "In", stress: "medium" },
          { text: " NŌ", stress: "high" },
          { text: "mi", stress: "medium" },
          { text: "ne", stress: "low" },
          { text: " PA", stress: "high" },
          { text: "tris", stress: "medium" },
          { text: " et", stress: "low" },
          { text: " FĪ", stress: "high" },
          { text: "li", stress: "medium" },
          { text: "ī", stress: "low" },
          { text: " et", stress: "low" },
          { text: " spī", stress: "medium" },
          { text: "RI", stress: "high" },
          { text: "tūs", stress: "medium" },
          { text: " SANK", stress: "high" },
          { text: "tī", stress: "medium" }
        ],
        phonetic: "In NOH-mee-neh PAH-trees et FEE-lee-ee et spee-REE-toos SAHNK-tee"
      }
    ],
    vocabulary: [
      { latin: "in", english: "in / into", type: "preposition", phonetic: "in" },
      { latin: "cum", english: "with", type: "preposition", phonetic: "koom" },
      { latin: "per", english: "through", type: "preposition", phonetic: "pehr" },
      { latin: "sine", english: "without", type: "preposition", phonetic: "SEE-neh" },
      { latin: "ad", english: "to / toward", type: "preposition", phonetic: "ahd" },
      { latin: "ex", english: "out of / from", type: "preposition", phonetic: "eks" }
    ],
    quiz: [
      { question: "Which case does 'cum' (with) take?", options: ["Accusative", "Genitive", "Ablative", "Dative"], correctIndex: 2, explanation: "Cum takes the ablative case." },
      { question: "What does 'per' mean?", options: ["For", "Through", "Around", "Near"], correctIndex: 1, explanation: "Per means through. Think of 'permeate' or 'persist'." },
      { question: "What does 'sine' mean?", options: ["Since", "Sign", "Without", "If"], correctIndex: 2, explanation: "Sine means without. It takes the ablative case." },
      { question: "When 'in' means 'into', which case does it use?", options: ["Ablative", "Genitive", "Dative", "Accusative"], correctIndex: 3, explanation: "'In' + accusative = 'into' (motion). 'In' + ablative = 'in/on' (location)." }
    ]
  },
  {
    id: 13,
    title: "Imperative Mood",
    subtitle: "Commands in ritual and prayer",
    category: "verbs",
    content: "The imperative mood gives commands — essential for invocations and ritual directions. Singular imperative is usually the verb stem: amā! (love!), audī! (hear!). Plural adds -te: amāte! audīte! Negative commands use nōlī/nōlīte + infinitive. Many prayers are imperatives: 'Hear us!' 'Protect us!' 'Come!'",
    phrases: [
      {
        latin: "Venī, Sancte Spīritus",
        meaning: "Come, Holy Spirit",
        syllables: [
          { text: "WE", stress: "high" },
          { text: "nī", stress: "medium" },
          { text: " SANK", stress: "high" },
          { text: "te", stress: "medium" },
          { text: " SPĪ", stress: "high" },
          { text: "ri", stress: "medium" },
          { text: "tus", stress: "low" }
        ],
        phonetic: "WEH-nee SAHNK-teh SPEE-ree-toos"
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
    ],
    vocabulary: [
      { latin: "venī", english: "come! (singular)", type: "verb", phonetic: "WEH-nee" },
      { latin: "audī", english: "hear! / listen!", type: "verb", phonetic: "OW-dee" },
      { latin: "dā", english: "give!", type: "verb", phonetic: "dah" },
      { latin: "dīc", english: "say! / speak!", type: "verb", phonetic: "deek" },
      { latin: "prōtege", english: "protect!", type: "verb", phonetic: "PROH-teh-geh" },
      { latin: "exaudī", english: "hear favorably!", type: "verb", phonetic: "eks-OW-dee" }
    ],
    quiz: [
      { question: "What is the imperative form of 'venīre' (to come)?", options: ["Venīre", "Venī", "Venīs", "Veniō"], correctIndex: 1, explanation: "The singular imperative of 4th conjugation is the stem: venī!" },
      { question: "How do you make a plural imperative?", options: ["Add -mus", "Add -te", "Add -nt", "Add -s"], correctIndex: 1, explanation: "Add -te for plural: venīte! = come (all of you)!" },
      { question: "What does 'exaudī' mean?", options: ["Exit", "Examine", "Hear favorably", "Exceed"], correctIndex: 2, explanation: "Exaudī = hear favorably, a strengthened form of audī (hear)." },
      { question: "How do you form a negative command?", options: ["Just add 'nōn'", "Use nōlī + infinitive", "Add 'nē' before the verb", "It's impossible in Latin"], correctIndex: 1, explanation: "Negative commands use nōlī (sg) or nōlīte (pl) + infinitive." }
    ]
  },
  {
    id: 14,
    title: "Past Tense (Perfect)",
    subtitle: "Completed actions",
    category: "verbs",
    content: "The perfect tense describes completed past actions: 'I loved' (amāvī), 'I saw' (vīdī), 'I heard' (audīvī). Perfect endings: -ī, -istī, -it, -imus, -istis, -ērunt. The perfect stem is often different from the present stem and must be memorized for each verb.",
    phrases: [
      {
        latin: "Dīxit Dominus",
        meaning: "The Lord said / spoke",
        syllables: [
          { text: "DĪK", stress: "high" },
          { text: "sit", stress: "medium" },
          { text: " DO", stress: "high" },
          { text: "mi", stress: "medium" },
          { text: "nus", stress: "low" }
        ],
        phonetic: "DEEK-sit DOH-mee-noos"
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
    ],
    vocabulary: [
      { latin: "amāvī", english: "I loved / have loved", type: "verb", phonetic: "ah-MAH-wee" },
      { latin: "vīdī", english: "I saw / have seen", type: "verb", phonetic: "WEE-dee" },
      { latin: "dīxit", english: "he/she said", type: "verb", phonetic: "DEEK-sit" },
      { latin: "fēcit", english: "he/she made / did", type: "verb", phonetic: "FEH-kit" },
      { latin: "vēnit", english: "he/she came", type: "verb", phonetic: "WEH-nit" },
      { latin: "dedit", english: "he/she gave", type: "verb", phonetic: "DEH-dit" }
    ],
    quiz: [
      { question: "What is the 'I' ending for perfect tense?", options: ["-ō", "-ī", "-um", "-am"], correctIndex: 1, explanation: "Perfect first person ends in -ī: amāvī (I loved), vīdī (I saw)." },
      { question: "What does 'dīxit' mean?", options: ["He died", "He dictated", "He said/spoke", "He directed"], correctIndex: 2, explanation: "Dīxit is the perfect of dīcere (to say). He/she said." },
      { question: "Complete: 'Vēnī, vīdī, ...'", options: ["vīcī", "vīxī", "vōcāvī", "vertī"], correctIndex: 0, explanation: "Vēnī, vīdī, vīcī — I came, I saw, I conquered (Julius Caesar)." },
      { question: "What does 'fēcit' mean?", options: ["He felt", "He fought", "He fell", "He made/did"], correctIndex: 3, explanation: "Fēcit is the perfect of facere (to make/do). He/she made or did." }
    ]
  },
  {
    id: 15,
    title: "Subjunctive Mood",
    subtitle: "Wishes, prayers, and possibilities",
    category: "verbs",
    content: "The subjunctive mood expresses wishes, possibilities, and exhortations — extremely important in prayer and ritual. 'May it be so' (Fīat), 'Let us pray' (Ōrēmus), 'May God bless' (Deus benedīcat). The subjunctive changes the vowel: 1st conj ā→ē, 2nd ē→eā, 3rd/4th use -ā-.",
    phrases: [
      {
        latin: "Fīat lūx",
        meaning: "Let there be light",
        syllables: [
          { text: "FĪ", stress: "high" },
          { text: "at", stress: "medium" },
          { text: " LŪKS", stress: "high" }
        ],
        phonetic: "FEE-aht LOOKS"
      },
      {
        latin: "Ōrēmus",
        meaning: "Let us pray",
        syllables: [
          { text: "ō", stress: "medium" },
          { text: "RĒ", stress: "high" },
          { text: "mus", stress: "medium" }
        ],
        phonetic: "oh-REH-moos"
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
    vocabulary: [
      { latin: "fīat", english: "let it be / may it happen", type: "verb", phonetic: "FEE-aht" },
      { latin: "ōrēmus", english: "let us pray", type: "verb", phonetic: "oh-REH-moos" },
      { latin: "benedīcat", english: "may he/she bless", type: "verb", phonetic: "beh-neh-DEE-kaht" },
      { latin: "requiescat", english: "may he/she rest", type: "verb", phonetic: "reh-kwee-ES-kaht" },
      { latin: "pāx", english: "peace", type: "noun", gender: "feminine", phonetic: "pahks" },
      { latin: "āmēn", english: "truly / so be it", type: "adverb", phonetic: "AH-mehn" }
    ],
    quiz: [
      { question: "What does 'Fīat lūx' mean?", options: ["The light shines", "Light is here", "Let there be light", "Find the light"], correctIndex: 2, explanation: "Fīat is subjunctive of fierī (to become/happen). Let there be light." },
      { question: "What mood is 'Ōrēmus'?", options: ["Indicative", "Imperative", "Subjunctive", "Infinitive"], correctIndex: 2, explanation: "Ōrēmus is subjunctive — 'let us pray' is an exhortation, not a command." },
      { question: "What does 'Requiescat in pāce' mean?", options: ["He rested in peace", "May he/she rest in peace", "Rest in peace (command)", "They rested peacefully"], correctIndex: 1, explanation: "Requiescat is a wish/prayer: May he/she rest in peace." },
      { question: "What does 'āmēn' literally mean?", options: ["Pray", "End", "Truly / So be it", "Forever"], correctIndex: 2, explanation: "Āmēn means 'truly' or 'so be it' — adopted from Hebrew into Latin." }
    ]
  },
  {
    id: 16,
    title: "Numbers & Ritual Counting",
    subtitle: "Sacred numbers in Latin",
    category: "fundamentals",
    content: "Numbers appear frequently in ritual contexts. Cardinal numbers: ūnus (1), duo (2), trēs (3), quattuor (4), quīnque (5), sex (6), septem (7), octō (8), novem (9), decem (10). Numbers 1-3 decline like adjectives. Seven (septem) and three (trēs) are especially significant in many traditions.",
    phrases: [
      {
        latin: "In nōmine ūnīus Deī",
        meaning: "In the name of the one God",
        syllables: [
          { text: "In", stress: "medium" },
          { text: " NŌ", stress: "high" },
          { text: "mi", stress: "medium" },
          { text: "ne", stress: "low" },
          { text: " ū", stress: "medium" },
          { text: "NĪ", stress: "high" },
          { text: "us", stress: "low" },
          { text: " DE", stress: "high" },
          { text: "ī", stress: "low" }
        ],
        phonetic: "In NOH-mee-neh oo-NEE-oos DEH-ee"
      }
    ],
    vocabulary: [
      { latin: "ūnus", english: "one", type: "adjective", phonetic: "OO-noos" },
      { latin: "duo", english: "two", type: "adjective", phonetic: "DOO-oh" },
      { latin: "trēs", english: "three", type: "adjective", phonetic: "trehs" },
      { latin: "septem", english: "seven", type: "adjective", phonetic: "SEP-tem" },
      { latin: "decem", english: "ten", type: "adjective", phonetic: "DEH-kem" },
      { latin: "centum", english: "one hundred", type: "adjective", phonetic: "KEN-toom" }
    ],
    quiz: [
      { question: "How do you say 'seven' in Latin?", options: ["Sex", "Septem", "Saeptem", "Septimus"], correctIndex: 1, explanation: "Septem = seven. Think of September (originally the 7th month)." },
      { question: "How do you say 'one' in Latin?", options: ["Prīmus", "Ūnus", "Sōlus", "Singulāris"], correctIndex: 1, explanation: "Ūnus = one. It declines like an adjective (ūnus, ūna, ūnum)." },
      { question: "What does 'centum' mean?", options: ["Center", "Cent", "One hundred", "Century"], correctIndex: 2, explanation: "Centum = 100. English 'century' and 'percent' come from this." },
      { question: "Do Latin numbers 1-3 decline?", options: ["No, they're fixed", "Yes, like adjectives", "Only in plural", "Only in genitive"], correctIndex: 1, explanation: "Numbers 1-3 decline to match gender, number, and case of their noun." }
    ]
  },
  {
    id: 17,
    title: "Common Prayers & Invocations",
    subtitle: "Sacred texts word by word",
    category: "prayers",
    content: "This lesson breaks down the most commonly used Latin prayers and invocations word by word. Understanding each word transforms recitation from memorized sounds into meaningful communication. We'll examine the Pater Noster (Our Father), Gloria Patri, and other key sacred texts.",
    phrases: [
      {
        latin: "Pater noster, quī es in caelīs",
        meaning: "Our Father, who art in heaven",
        syllables: [
          { text: "PA", stress: "high" },
          { text: "ter", stress: "medium" },
          { text: " NOS", stress: "high" },
          { text: "ter", stress: "medium" },
          { text: " kwī", stress: "medium" },
          { text: " es", stress: "low" },
          { text: " in", stress: "low" },
          { text: " kai", stress: "high" },
          { text: "LĪS", stress: "medium" }
        ],
        phonetic: "PAH-tehr NOS-tehr kwee es in kai-LEES"
      },
      {
        latin: "Glōria Patrī et Fīliō et Spīrituī Sanctō",
        meaning: "Glory to the Father and to the Son and to the Holy Spirit",
        syllables: [
          { text: "GLŌ", stress: "high" },
          { text: "ri", stress: "medium" },
          { text: "a", stress: "low" },
          { text: " PA", stress: "high" },
          { text: "trī", stress: "medium" },
          { text: " et", stress: "low" },
          { text: " FĪ", stress: "high" },
          { text: "li", stress: "medium" },
          { text: "ō", stress: "low" },
          { text: " et", stress: "low" },
          { text: " spī", stress: "medium" },
          { text: "ri", stress: "low" },
          { text: "TU", stress: "high" },
          { text: "ī", stress: "medium" },
          { text: " SANK", stress: "high" },
          { text: "tō", stress: "medium" }
        ],
        phonetic: "GLOH-ree-ah PAH-tree et FEE-lee-oh et spee-ree-TOO-ee SAHNK-toh"
      }
    ],
    vocabulary: [
      { latin: "pater", english: "father", type: "noun", gender: "masculine", phonetic: "PAH-tehr" },
      { latin: "noster", english: "our", type: "adjective", phonetic: "NOS-tehr" },
      { latin: "glōria", english: "glory", type: "noun", gender: "feminine", phonetic: "GLOH-ree-ah" },
      { latin: "spīritus", english: "spirit / breath", type: "noun", gender: "masculine", phonetic: "SPEE-ree-toos" },
      { latin: "rēgnum", english: "kingdom / realm", type: "noun", gender: "neuter", phonetic: "REHG-noom" },
      { latin: "voluntās", english: "will / desire", type: "noun", gender: "feminine", phonetic: "woh-LOON-tahs" }
    ],
    quiz: [
      { question: "What does 'Pater noster' literally mean?", options: ["Our prayer", "Our father", "Holy father", "Great father"], correctIndex: 1, explanation: "Pater = father, noster = our. Our Father." },
      { question: "What does 'glōria' mean?", options: ["Glorious", "Glory", "Glow", "Globe"], correctIndex: 1, explanation: "Glōria means glory — a 1st declension feminine noun." },
      { question: "What does 'rēgnum' mean?", options: ["Region", "Rule", "Kingdom / Realm", "Reign"], correctIndex: 2, explanation: "Rēgnum means kingdom or realm." },
      { question: "What case is 'Patrī' in 'Glōria Patrī'?", options: ["Nominative", "Genitive", "Dative", "Ablative"], correctIndex: 2, explanation: "Patrī is dative = to/for the Father. Glory TO the Father." }
    ]
  },
  {
    id: 18,
    title: "Blessings & Protective Phrases",
    subtitle: "Words of power and protection",
    category: "prayers",
    content: "Latin blessings and protective phrases are used across many spiritual traditions. They often use the subjunctive mood (for wishes) or imperative (for commands). Key patterns: 'Benedictus/a' (blessed), 'Protege' (protect), 'Libera nos' (free/deliver us). Understanding the grammar helps you craft your own blessings.",
    phrases: [
      {
        latin: "Benedictus quī venit in nōmine Dominī",
        meaning: "Blessed is he who comes in the name of the Lord",
        syllables: [
          { text: "be", stress: "low" },
          { text: "ne", stress: "medium" },
          { text: "DIK", stress: "high" },
          { text: "tus", stress: "medium" },
          { text: " kwī", stress: "medium" },
          { text: " WE", stress: "high" },
          { text: "nit", stress: "medium" },
          { text: " in", stress: "low" },
          { text: " NŌ", stress: "high" },
          { text: "mi", stress: "medium" },
          { text: "ne", stress: "low" },
          { text: " DO", stress: "high" },
          { text: "mi", stress: "medium" },
          { text: "nī", stress: "low" }
        ],
        phonetic: "beh-neh-DIK-toos kwee WEH-nit in NOH-mee-neh DOH-mee-nee"
      },
      {
        latin: "Lībera nōs ā malō",
        meaning: "Deliver us from evil",
        syllables: [
          { text: "LĪ", stress: "high" },
          { text: "be", stress: "medium" },
          { text: "ra", stress: "low" },
          { text: " nōs", stress: "high" },
          { text: " ā", stress: "low" },
          { text: " MA", stress: "high" },
          { text: "lō", stress: "medium" }
        ],
        phonetic: "LEE-beh-rah nohs ah MAH-loh"
      }
    ],
    vocabulary: [
      { latin: "benedictus", english: "blessed", type: "adjective", phonetic: "beh-neh-DIK-toos" },
      { latin: "lībera", english: "free / deliver (command)", type: "verb", phonetic: "LEE-beh-rah" },
      { latin: "malum", english: "evil / bad thing", type: "noun", gender: "neuter", phonetic: "MAH-loom" },
      { latin: "salūs", english: "salvation / health", type: "noun", gender: "feminine", phonetic: "sah-LOOS" },
      { latin: "grātia", english: "grace / favor", type: "noun", gender: "feminine", phonetic: "GRAH-tee-ah" },
      { latin: "misericordia", english: "mercy / compassion", type: "noun", gender: "feminine", phonetic: "mee-seh-ree-KOR-dee-ah" }
    ],
    quiz: [
      { question: "What does 'benedictus' literally mean?", options: ["Good speaker", "Well spoken of / Blessed", "Benedict", "Beneficial"], correctIndex: 1, explanation: "Bene (well) + dictus (spoken) = well spoken of, i.e., blessed." },
      { question: "What does 'Lībera nōs' mean?", options: ["Free us", "Deliver us", "Both A and B", "Leave us"], correctIndex: 2, explanation: "Lībera means both free and deliver. Lībera nōs = Free/Deliver us." },
      { question: "What does 'grātia' mean?", options: ["Gratitude", "Grace / Favor", "Gravity", "Great"], correctIndex: 1, explanation: "Grātia means grace or favor. 'Grātia plēna' = full of grace." },
      { question: "What does 'misericordia' mean?", options: ["Misery", "Mercy / Compassion", "Missing", "Miracle"], correctIndex: 1, explanation: "Misericordia = mercy/compassion. From miser (pitiful) + cor (heart)." }
    ]
  },
  {
    id: 19,
    title: "Crafting Your Own Latin Prayers",
    subtitle: "Building original sacred texts",
    category: "advanced",
    content: "Now you have the tools to build your own Latin prayers. Key patterns: Start with a vocative address (Domine, Dea, Māter), add a request in imperative or subjunctive (Prōtege, Dā, Benedīc; or Fīat, Sit), include the object (nōs, mē, familiam meam), and close with a purpose (ad glōriam tuam — for your glory).",
    phrases: [
      {
        latin: "Dea Magna, prōtege familiam meam",
        meaning: "Great Goddess, protect my family",
        syllables: [
          { text: "DE", stress: "high" },
          { text: "a", stress: "low" },
          { text: " MAG", stress: "high" },
          { text: "na", stress: "medium" },
          { text: " PRŌ", stress: "high" },
          { text: "te", stress: "medium" },
          { text: "ge", stress: "low" },
          { text: " fa", stress: "low" },
          { text: "MI", stress: "high" },
          { text: "li", stress: "medium" },
          { text: "am", stress: "low" },
          { text: " ME", stress: "high" },
          { text: "am", stress: "low" }
        ],
        phonetic: "DEH-ah MAHG-nah PROH-teh-geh fah-MEE-lee-ahm MEH-ahm"
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
    vocabulary: [
      { latin: "familia", english: "family / household", type: "noun", gender: "feminine", phonetic: "fah-MEE-lee-ah" },
      { latin: "fortitūdō", english: "strength / bravery", type: "noun", gender: "feminine", phonetic: "for-tee-TOO-doh" },
      { latin: "sapientia", english: "wisdom", type: "noun", gender: "feminine", phonetic: "sah-pee-EN-tee-ah" },
      { latin: "dā", english: "give! (command)", type: "verb", phonetic: "dah" },
      { latin: "mihi", english: "to me", type: "pronoun", phonetic: "MEE-hee" },
      { latin: "tuus", english: "your / yours", type: "adjective", phonetic: "TOO-oos" }
    ],
    quiz: [
      { question: "In a prayer, how do you address a goddess?", options: ["Dea (nominative)", "Deam (accusative)", "Dea (vocative)", "Deae (genitive)"], correctIndex: 2, explanation: "Use the vocative case for direct address. 1st declension vocative = nominative." },
      { question: "How do you say 'give me' in Latin?", options: ["Dā mihi", "Dat mē", "Dō mē", "Dedit mihi"], correctIndex: 0, explanation: "Dā (imperative: give!) + mihi (to me) = Give me." },
      { question: "What does 'sapientia' mean?", options: ["Sapience", "Wisdom", "Science", "Patience"], correctIndex: 1, explanation: "Sapientia = wisdom. From sapere (to be wise, to taste/know)." },
      { question: "What case should 'familiam' be in for 'protect my family'?", options: ["Nominative", "Genitive", "Dative", "Accusative"], correctIndex: 3, explanation: "Protect takes a direct object = accusative. Familia → familiam." }
    ]
  },
  {
    id: 20,
    title: "Full Ritual Pronunciation Practice",
    subtitle: "Putting it all together",
    category: "advanced",
    content: "This final lesson brings everything together with extended ritual texts for practice. Focus on smooth pronunciation, proper vowel lengths, correct stress patterns, and reverent delivery. Read each text slowly first, then build speed while maintaining clarity. Record yourself and compare with the phonetic guides.",
    phrases: [
      {
        latin: "Venī, venī, veniās, nē mē morī faciās",
        meaning: "Come, come, may you come, do not cause me to die",
        syllables: [
          { text: "WE", stress: "high" },
          { text: "nī", stress: "medium" },
          { text: " WE", stress: "high" },
          { text: "nī", stress: "medium" },
          { text: " we", stress: "low" },
          { text: "NĪ", stress: "high" },
          { text: "ās", stress: "medium" },
          { text: " nē", stress: "medium" },
          { text: " mē", stress: "high" },
          { text: " MO", stress: "high" },
          { text: "rī", stress: "medium" },
          { text: " FA", stress: "high" },
          { text: "ki", stress: "medium" },
          { text: "ās", stress: "low" }
        ],
        phonetic: "WEH-nee WEH-nee weh-NEE-ahs neh meh MOH-ree FAH-kee-ahs"
      },
      {
        latin: "Lūx aetērna lūceat eīs",
        meaning: "May eternal light shine upon them",
        syllables: [
          { text: "LŪKS", stress: "high" },
          { text: " ai", stress: "medium" },
          { text: "TĒR", stress: "high" },
          { text: "na", stress: "medium" },
          { text: " LŪ", stress: "high" },
          { text: "ke", stress: "medium" },
          { text: "at", stress: "low" },
          { text: " EH", stress: "high" },
          { text: "ees", stress: "medium" }
        ],
        phonetic: "LOOKS ai-TEHR-nah LOO-keh-aht EH-ees"
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
    vocabulary: [
      { latin: "lūx", english: "light", type: "noun", gender: "feminine", phonetic: "looks" },
      { latin: "aetērnus", english: "eternal", type: "adjective", phonetic: "ai-TEHR-noos" },
      { latin: "semper", english: "always / forever", type: "adverb", phonetic: "SEM-pehr" },
      { latin: "nunc", english: "now", type: "adverb", phonetic: "noonk" },
      { latin: "prīncipium", english: "beginning / origin", type: "noun", gender: "neuter", phonetic: "preen-KI-pee-oom" },
      { latin: "saecula saeculōrum", english: "forever and ever (ages of ages)", type: "noun", phonetic: "SAI-koo-lah sai-koo-LOH-room" }
    ],
    quiz: [
      { question: "What does 'semper' mean?", options: ["Simple", "Always / Forever", "Sometimes", "Similar"], correctIndex: 1, explanation: "Semper = always/forever. Semper Fidelis (always faithful) is the Marine Corps motto." },
      { question: "What does 'lūx aetērna' mean?", options: ["Ancient light", "Last light", "Eternal light", "Great light"], correctIndex: 2, explanation: "Lūx = light, aetērna = eternal. Eternal light." },
      { question: "What does 'nunc' mean?", options: ["None", "Nun", "Now", "Night"], correctIndex: 2, explanation: "Nunc means now." },
      { question: "What does 'saecula saeculōrum' literally mean?", options: ["Sacred secrets", "Ages of ages (forever)", "Century of centuries", "Secular world"], correctIndex: 1, explanation: "Saecula saeculōrum = ages of ages, meaning forever and ever. A common doxology ending." }
    ]
  },
  {
    id: 21,
    title: "Arteria — The Artery in Crisis",
    subtitle: "What's the Latin for 'artery'? Why does it matter in shock?",
    category: "advanced",
    content: "Arteria (artery) comes from the Greek artēría, originally meaning 'windpipe' because early anatomists thought arteries carried air. In Latin medical usage, arteria refers to the muscular vessels carrying oxygenated blood from the heart. In hypovolemic shock — when blood volume drops dangerously — arteries clamp down (vasoconstriction) to maintain pressure. The pulse becomes thready: weak, rapid, barely palpable. Recognizing 'thready pulse' (pulsus fīliformis) is a critical clinical sign.",
    phrases: [
      {
        latin: "Arteria sanguinem portat",
        meaning: "The artery carries blood",
        syllables: [
          { text: "ar", stress: "low" },
          { text: "TE", stress: "high" },
          { text: "ri", stress: "medium" },
          { text: "a", stress: "low" },
          { text: " SAN", stress: "high" },
          { text: "gui", stress: "medium" },
          { text: "nem", stress: "low" },
          { text: " POR", stress: "high" },
          { text: "tat", stress: "medium" }
        ],
        phonetic: "ar-TEH-ree-ah SAHN-gwee-nem POR-taht"
      },
      {
        latin: "Pulsus fīliformis in vulnere gravī",
        meaning: "Thready pulse in a serious wound",
        syllables: [
          { text: "POOL", stress: "high" },
          { text: "sus", stress: "medium" },
          { text: " fī", stress: "medium" },
          { text: "li", stress: "medium" },
          { text: "FOR", stress: "high" },
          { text: "mis", stress: "medium" },
          { text: " in", stress: "low" },
          { text: " VUL", stress: "high" },
          { text: "ne", stress: "medium" },
          { text: "re", stress: "low" },
          { text: " GRA", stress: "high" },
          { text: "wī", stress: "medium" }
        ],
        phonetic: "POOL-soos fee-lee-FOR-mis in WUUL-neh-reh GRAH-wee"
      },
      {
        latin: "Vāsa contrahuntur in pavōre",
        meaning: "The vessels contract in shock",
        syllables: [
          { text: "VĀ", stress: "high" },
          { text: "sa", stress: "medium" },
          { text: " kon", stress: "low" },
          { text: "tra", stress: "medium" },
          { text: "HUN", stress: "high" },
          { text: "tur", stress: "medium" },
          { text: " in", stress: "low" },
          { text: " pa", stress: "low" },
          { text: "VŌ", stress: "high" },
          { text: "re", stress: "medium" }
        ],
        phonetic: "WAH-sah kon-trah-HOON-tur in pah-WOH-reh"
      }
    ],
    vocabulary: [
      { latin: "arteria", english: "artery", type: "noun", gender: "feminine", declension: "1st", phonetic: "ar-TEH-ree-ah" },
      { latin: "sanguis", english: "blood", type: "noun", gender: "masculine", declension: "3rd", phonetic: "SAHN-gwis" },
      { latin: "pulsus", english: "pulse / beat", type: "noun", gender: "masculine", declension: "4th", phonetic: "POOL-soos" },
      { latin: "vulnus", english: "wound", type: "noun", gender: "neuter", declension: "3rd", phonetic: "WUUL-noos" },
      { latin: "vāsa", english: "vessels (plural)", type: "noun", gender: "neuter", phonetic: "WAH-sah" },
      { latin: "fīliformis", english: "thread-like / thready", type: "adjective", phonetic: "fee-lee-FOR-mis" }
    ],
    quiz: [
      { question: "What does 'arteria' originally mean in Greek?", options: ["Blood tube", "Windpipe / Air carrier", "Heart string", "Nerve channel"], correctIndex: 1, explanation: "Artēría originally meant windpipe — early anatomists thought arteries carried air, not blood." },
      { question: "In hypovolemic shock, what happens to the arteries?", options: ["They dilate widely", "They clamp down (vasoconstriction)", "They stop pulsing", "They fill with air"], correctIndex: 1, explanation: "Arteries vasoconstrict to maintain blood pressure when volume drops, making the pulse weak and thready." },
      { question: "What does 'pulsus fīliformis' mean?", options: ["Strong pulse", "Irregular pulse", "Thready / thread-like pulse", "Absent pulse"], correctIndex: 2, explanation: "Fīliformis = thread-like (fīlum = thread + forma = shape). A thready pulse is weak and rapid — a danger sign." },
      { question: "What does 'sanguis' mean?", options: ["Sand", "Blood", "Health", "Sweat"], correctIndex: 1, explanation: "Sanguis = blood. Gives us 'sanguine' (blood-related, optimistic) and 'exsanguinate' (to bleed out)." }
    ]
  }
];

export const categoryLabels: Record<string, string> = {
  fundamentals: "Fundamentals",
  nouns: "Nouns & Declensions",
  verbs: "Verbs & Conjugations",
  pronunciation: "Pronunciation",
  prayers: "Prayers & Ritual",
  advanced: "Advanced Practice",
};

export const categoryColors: Record<string, string> = {
  fundamentals: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  nouns: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  verbs: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  pronunciation: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  prayers: "bg-rose-500/20 text-rose-300 border-rose-500/30",
  advanced: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
};
