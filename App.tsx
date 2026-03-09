import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Clock,
  Info,
  ArrowRight,
  LayoutGrid
} from 'lucide-react';

// --- Types ---

interface TheoryExample {
  spanish: string;
  armenian: string;
  image: string;
  extra?: string;
}

interface TheoryCard {
  id: number;
  titleArm: string;
  ruleArm: string;
  examples: TheoryExample[];
}

interface Topic {
  id: string;
  nameArm: string;
  icon: React.ReactNode;
  cards: TheoryCard[];
}

// --- Data ---

const GENDER_CARDS: TheoryCard[] = [
  {
    id: 1,
    titleArm: "Իսպաներենի գոյականների սեռերը",
    ruleArm: "Իսպաներենում բոլոր գոյականները լինում են կամ արական (Masculino), կամ իգական (Femenino): Չկա չեզոք սեռ:",
    examples: [
      { 
        spanish: "El género", 
        armenian: "Սեռը", 
        image: "https://picsum.photos/seed/gender/400/300"
      }
    ]
  },
  {
    id: 2,
    titleArm: "Արական սեռ (Masculino) - վերջավորություն «-o»",
    ruleArm: "Բառերի մեծ մասը, որոնք վերջանում են «-o» տառով, արական սեռի են և օգտագործում են «El» հոդը:",
    examples: [
      { 
        spanish: "El libro", 
        armenian: "Գիրքը", 
        image: "https://picsum.photos/seed/book/400/300"
      },
      { 
        spanish: "El perro", 
        armenian: "Շունը", 
        image: "https://picsum.photos/seed/dog/400/300"
      },
      { 
        spanish: "El niño", 
        armenian: "Տղան", 
        image: "https://picsum.photos/seed/boy/400/300"
      }
    ]
  },
  {
    id: 3,
    titleArm: "Իգական սեռ (Femenino) - վերջավորություն «-a»",
    ruleArm: "Բառերի մեծ մասը, որոնք վերջանում են «-a» տառով, իգական սեռի են և օգտագործում են «La» հոդը:",
    examples: [
      { 
        spanish: "La casa", 
        armenian: "Տունը", 
        image: "https://picsum.photos/seed/house/400/300"
      },
      { 
        spanish: "La mesa", 
        armenian: "Սեղանը", 
        image: "https://picsum.photos/seed/table/400/300"
      },
      { 
        spanish: "La niña", 
        armenian: "Աղջիկը", 
        image: "https://picsum.photos/seed/girl/400/300"
      }
    ]
  },
  {
    id: 4,
    titleArm: "Արական սեռ - վերջավորություն «-or»",
    ruleArm: "«-or»-ով վերջացող բառերը սովորաբար արական սեռի են:",
    examples: [
      { 
        spanish: "El profesor", 
        armenian: "Ուսուցիչը", 
        image: "https://picsum.photos/seed/teacher/400/300"
      },
      { 
        spanish: "El amor", 
        armenian: "Սերը", 
        image: "https://picsum.photos/seed/love/400/300"
      }
    ]
  },
  {
    id: 5,
    titleArm: "Իգական սեռ - վերջավորություն «-ción» և «-sión»",
    ruleArm: "Այս վերջավորություններով բառերը միշտ իգական սեռի են:",
    examples: [
      { 
        spanish: "La canción", 
        armenian: "Երգը", 
        image: "https://picsum.photos/seed/song/400/300"
      },
      { 
        spanish: "La televisión", 
        armenian: "Հեռուստատեսությունը", 
        image: "https://picsum.photos/seed/tv/400/300"
      }
    ]
  },
  {
    id: 6,
    titleArm: "Բացառություններ (Excepciones)",
    ruleArm: "Որոշ բառեր չեն հետևում ընդհանուր կանոններին:",
    examples: [
      { 
        spanish: "El mapa", 
        armenian: "Քարտեզը (արական է)", 
        image: "https://picsum.photos/seed/map/400/300"
      },
      { 
        spanish: "La mano", 
        armenian: "Ձեռքը (իգական է)", 
        image: "https://picsum.photos/seed/hand/400/300"
      }
    ]
  }
];

const TIME_CARDS: TheoryCard[] = [
  {
    id: 1,
    titleArm: "Ինչպե՞ս հարցնել ժամը",
    ruleArm: "Իսպաներենում ժամը հարցնելու ամենատարածված ձևն է «¿Qué hora es?»: Եթե ցանկանում եք ավելի քաղաքավարի լինել, կարող եք ասել «¿Tiene hora?»:",
    examples: [
      { 
        spanish: "¿Qué hora es?", 
        armenian: "Ժամը քանի՞սն է:", 
        image: "https://picsum.photos/seed/clock_q/400/300"
      },
      { 
        spanish: "¿Tiene hora?", 
        armenian: "Ժամ ունե՞ք (քանի՞սն է):", 
        image: "https://picsum.photos/seed/watch_q/400/300"
      }
    ]
  },
  {
    id: 2,
    titleArm: "Հիմնական պատասխանը (Es la... / Son las...)",
    ruleArm: "Ժամը 1-ի համար օգտագործում ենք եզակի թիվը՝ «Es la una»: Մնացած բոլոր ժամերի համար (2-12) օգտագործում ենք հոգնակի թիվը՝ «Son las...»:",
    examples: [
      { 
        spanish: "Es la una", 
        armenian: "Ժամը մեկն է:", 
        image: "https://picsum.photos/seed/clock_1/400/300"
      },
      { 
        spanish: "Son las dos", 
        armenian: "Ժամը երկուսն է:", 
        image: "https://picsum.photos/seed/clock_2/400/300"
      },
      { 
        spanish: "Son las diez", 
        armenian: "Ժամը տասն է:", 
        image: "https://picsum.photos/seed/clock_10/400/300"
      }
    ]
  },
  {
    id: 3,
    titleArm: "Ճիշտ ժամը (En punto)",
    ruleArm: "Երբ ժամը լրիվ է (առանց րոպեների), ավելացնում ենք «en punto» (ուղիղ):",
    examples: [
      { 
        spanish: "Son las tres en punto", 
        armenian: "Ուղիղ ժամը երեքն է:", 
        image: "https://picsum.photos/seed/clock_3_exact/400/300"
      },
      { 
        spanish: "Es la una en punto", 
        armenian: "Ուղիղ ժամը մեկն է:", 
        image: "https://picsum.photos/seed/clock_1_exact/400/300"
      }
    ]
  },
  {
    id: 4,
    titleArm: "Րոպեների ավելացումը (y...)",
    ruleArm: "1-ից 30 րոպեների համար օգտագործում ենք «y» (և) բառը ժամից հետո:",
    examples: [
      { 
        spanish: "Son las cuatro y cinco", 
        armenian: "Չորսն անց հինգ (4:05):", 
        image: "https://picsum.photos/seed/clock_405/400/300"
      },
      { 
        spanish: "Son las ocho y veinte", 
        armenian: "Ութն անց քսան (8:20):", 
        image: "https://picsum.photos/seed/clock_820/400/300"
      }
    ]
  },
  {
    id: 5,
    titleArm: "Քառորդ և Կես (Cuarto y Media)",
    ruleArm: "15 րոպեի համար ասում ենք «y cuarto» (և քառորդ), իսկ 30 րոպեի համար՝ «y media» (և կես):",
    examples: [
      { 
        spanish: "Son las seis y cuarto", 
        armenian: "Վեցն անց քառորդ (6:15):", 
        image: "https://picsum.photos/seed/clock_615/400/300"
      },
      { 
        spanish: "Son las nueve y media", 
        armenian: "Իննն անց կես (9:30):", 
        image: "https://picsum.photos/seed/clock_930/400/300"
      }
    ]
  },
  {
    id: 6,
    titleArm: "Պակաս րոպեներ (Menos...)",
    ruleArm: "31-ից 59 րոպեների համար ասում ենք հաջորդ ժամը և հանում րոպեները՝ օգտագործելով «menos» (պակաս):",
    examples: [
      { 
        spanish: "Son las siete menos diez", 
        armenian: "Յոթից տաս է պակաս (6:50):", 
        image: "https://picsum.photos/seed/clock_650/400/300"
      },
      { 
        spanish: "Son las once menos cuarto", 
        armenian: "Տասնմեկից քառորդ է պակաս (10:45):", 
        image: "https://picsum.photos/seed/clock_1045/400/300"
      }
    ]
  },
  {
    id: 7,
    titleArm: "Կեսօր և Կեսգիշեր",
    ruleArm: "Կեսօրվա և կեսգիշերվա համար կան հատուկ բառեր:",
    examples: [
      { 
        spanish: "Es mediodía", 
        armenian: "Կեսօր է (12:00 PM):", 
        image: "https://picsum.photos/seed/noon/400/300"
      },
      { 
        spanish: "Es medianoche", 
        armenian: "Կեսգիշեր է (12:00 AM):", 
        image: "https://picsum.photos/seed/midnight/400/300"
      }
    ]
  },
  {
    id: 8,
    titleArm: "Օրվա ժամանակահատվածները",
    ruleArm: "Հստակեցնելու համար, թե օրվա որ ժամն է, օգտագործում ենք հետևյալ արտահայտությունները:",
    examples: [
      { 
        spanish: "de la mañana", 
        armenian: "առավոտյան (մինչև 12:00):", 
        image: "https://picsum.photos/seed/morning_sun/400/300"
      },
      { 
        spanish: "de la tarde", 
        armenian: "ցերեկը (12:00-ից մինչև մայրամուտ):", 
        image: "https://picsum.photos/seed/afternoon_sun/400/300"
      },
      { 
        spanish: "de la noche", 
        armenian: "երեկոյան/գիշերը (մայրամուտից հետո):", 
        image: "https://picsum.photos/seed/night_stars/400/300"
      }
    ]
  }
];

export default function App() {
  const [activeTopic, setActiveTopic] = useState<'gender' | 'time'>('time');
  const [currentIdx, setCurrentIdx] = useState(0);

  const topics: Topic[] = [
    { 
      id: 'time', 
      nameArm: 'Ժամանակ', 
      icon: <Clock className="w-5 h-5" />, 
      cards: TIME_CARDS 
    },
    { 
      id: 'gender', 
      nameArm: 'Սեռեր', 
      icon: <BookOpen className="w-5 h-5" />, 
      cards: GENDER_CARDS 
    }
  ];

  const currentTopic = topics.find(t => t.id === activeTopic)!;

  const nextCard = () => {
    if (currentIdx < currentTopic.cards.length - 1) {
      setCurrentIdx(prev => prev + 1);
    }
  };

  const prevCard = () => {
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
    }
  };

  const handleTopicChange = (topicId: 'gender' | 'time') => {
    setActiveTopic(topicId);
    setCurrentIdx(0);
  };

  const currentCard = currentTopic.cards[currentIdx];
  const progress = ((currentIdx + 1) / currentTopic.cards.length) * 100;

  return (
    <div className="min-h-screen bg-[#1e40af] bg-gradient-to-b from-[#1e40af] to-[#3b82f6] flex flex-col font-sans text-white overflow-hidden">
      {/* Header & Topic Selector */}
      <header className="p-6 flex flex-col gap-6 max-w-4xl mx-auto w-full z-10">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <LayoutGrid className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-black tracking-tighter uppercase">Spanish Theory</h1>
          </div>
          
          <div className="flex gap-2 bg-black/20 p-1 rounded-2xl backdrop-blur-md border border-white/10">
            {topics.map(topic => (
              <button
                key={topic.id}
                onClick={() => handleTopicChange(topic.id as 'gender' | 'time')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all duration-300 ${
                  activeTopic === topic.id 
                    ? 'bg-white text-[#1e40af] shadow-xl scale-105' 
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {topic.icon}
                <span className="hidden sm:inline">{topic.nameArm}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-200 to-white shadow-[0_0_15px_rgba(255,255,255,0.6)]"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-4 max-w-4xl mx-auto w-full overflow-y-auto custom-scrollbar relative">
        {/* Decorative background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-400/20 blur-[120px] rounded-full -z-10" />

        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTopic}-${currentIdx}`}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
            className="w-full"
          >
            {/* Rule Header */}
            <div className="bg-white/10 backdrop-blur-xl rounded-[40px] p-8 mb-8 border border-white/20 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                {currentTopic.icon}
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-white text-[#1e40af] rounded-2xl shadow-lg">
                  {currentTopic.icon}
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-1">
                    Քարտ {currentIdx + 1} / {currentTopic.cards.length}
                  </div>
                  <h2 className="text-3xl font-black tracking-tight leading-none">{currentCard.titleArm}</h2>
                </div>
              </div>
              
              <p className="text-xl opacity-90 leading-relaxed font-medium border-l-4 border-white/30 pl-6 py-2">
                {currentCard.ruleArm}
              </p>
            </div>

            {/* Examples Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
              {currentCard.examples.map((ex, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  className="bg-white rounded-[32px] overflow-hidden shadow-2xl group hover:scale-[1.03] transition-all duration-500 border border-white/10"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img 
                      src={ex.image} 
                      alt={ex.spanish}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-7 text-gray-900">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-2xl font-black text-[#1e40af] tracking-tight">{ex.spanish}</h3>
                      <div className="p-2 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                        <Info className="w-5 h-5 text-blue-400" />
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 p-1 bg-blue-500 rounded-full">
                        <ArrowRight className="w-3 h-3 text-white" />
                      </div>
                      <p className="text-gray-600 font-bold text-lg leading-tight">
                        {ex.armenian}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation Footer */}
      <footer className="p-8 max-w-4xl mx-auto w-full flex items-center justify-between gap-6 z-10">
        <button
          onClick={prevCard}
          disabled={currentIdx === 0}
          className={`group flex items-center gap-3 px-8 py-5 rounded-[24px] font-black transition-all duration-300 ${
            currentIdx === 0 
              ? 'bg-white/5 text-white/20 cursor-not-allowed' 
              : 'bg-white/10 hover:bg-white/20 text-white active:scale-95 border border-white/10'
          }`}
        >
          <ChevronLeft className={`w-6 h-6 transition-transform ${currentIdx !== 0 && 'group-hover:-translate-x-1'}`} />
          <span className="hidden sm:inline">Նախորդը</span>
        </button>

        <div className="flex gap-3">
          {currentTopic.cards.map((_, i) => (
            <button 
              key={i}
              onClick={() => setCurrentIdx(i)}
              className={`h-3 rounded-full transition-all duration-500 ${
                i === currentIdx ? 'w-12 bg-white shadow-[0_0_10px_white]' : 'w-3 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextCard}
          disabled={currentIdx === currentTopic.cards.length - 1}
          className={`group flex items-center gap-3 px-8 py-5 rounded-[24px] font-black transition-all duration-300 ${
            currentIdx === currentTopic.cards.length - 1
              ? 'bg-white/5 text-white/20 cursor-not-allowed' 
              : 'bg-white text-[#1e40af] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] active:scale-95 shadow-xl'
          }`}
        >
          <span className="hidden sm:inline">Հաջորդը</span>
          <ChevronRight className={`w-6 h-6 transition-transform ${currentIdx !== currentTopic.cards.length - 1 && 'group-hover:translate-x-1'}`} />
        </button>
      </footer>
    </div>
  );
}
