import { useState } from 'react';
import { Volume2, BookOpen, ArrowLeft } from 'lucide-react';

interface PronunciationExample {
  letter: string;
  sound: string;
  example: string;
}

interface PracticeWord {
  word: string;
  translation: string;
  phonetic: string;
}

const PRONUNCIATION_GUIDE: PronunciationExample[] = [
  {
    letter: 'x',
    sound: 'Like German "ch" in "Bach" or Scottish "loch"',
    example: 'xáat (fish) - khaht',
  },
  {
    letter: "x'",
    sound: 'Uvular fricative, further back in throat than "x"',
    example: "x'wán (egg) - KHWAN",
  },
  {
    letter: "k'",
    sound: 'Ejective k, made with a popping sound',
    example: "k'wát' (egg) - kwat",
  },
  {
    letter: 'tl',
    sound: 'Lateral affricate, like "tl" in "atlas" but as one sound',
    example: 'tléil (no) - tlale',
  },
  {
    letter: 'dl',
    sound: 'Voiced lateral affricate',
    example: 'dleey (salmon eggs) - dlay',
  },
  {
    letter: "t'",
    sound: 'Ejective t, made with a popping sound',
    example: "t'aaw (whale) - taw",
  },
  {
    letter: 'á é í ó ú',
    sound: 'Accented vowels are higher in pitch and longer',
    example: 'yéil (raven) - yayl',
  },
  {
    letter: 'aa ee oo',
    sound: 'Long vowels held for extra duration',
    example: 'séek (black bear) - sayk',
  },
];

const PRACTICE_WORDS: PracticeWord[] = [
  { word: "Yak'éi", translation: 'Hello / It is good', phonetic: 'yah-KAY' },
  { word: 'Gunalchéesh', translation: 'Thank you', phonetic: 'goo-nahl-CHEESH' },
  { word: "Haw'aa", translation: 'Yes', phonetic: 'how-AH' },
  { word: 'Tléil', translation: 'No', phonetic: 'tlale' },
  { word: 'xáat', translation: 'fish', phonetic: 'khaht' },
  { word: 'yéil', translation: 'raven', phonetic: 'yayl' },
  { word: 'gooch', translation: 'wolf', phonetic: 'gootch' },
  { word: 'séek', translation: 'black bear', phonetic: 'sayk' },
  { word: 'éesh', translation: 'father', phonetic: 'aysh' },
  { word: 'tláa', translation: 'mother', phonetic: 'tlah' },
];

interface PronunciationGuideProps {
  onBack: () => void;
}

export function PronunciationGuide({ onBack }: PronunciationGuideProps) {
  const [activeTab, setActiveTab] = useState<'guide' | 'practice'>('guide');

  return (
    <div className="min-h-screen bg-[#2D2D2D] py-8">
      <div className="max-w-6xl mx-auto px-4">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 px-4 py-2 bg-[#3D3D3D] rounded-xl hover:bg-gray-700 transition font-medium text-white shadow"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        <div className="bg-[#3D3D3D] rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#E07856] to-[#D4B896] p-8 text-white">
            <div className="flex items-center gap-3 mb-2">
              <Volume2 size={32} />
              <h1 className="text-3xl font-bold">Tlingit Pronunciation Guide</h1>
            </div>
            <p className="text-white text-opacity-90">
              Master the unique sounds of the Tlingit language
            </p>
          </div>

          <div className="border-b border-gray-700">
            <div className="flex">
              <button
                onClick={() => setActiveTab('guide')}
                className={`flex-1 px-6 py-4 font-semibold transition ${
                  activeTab === 'guide'
                    ? 'text-[#E07856] border-b-2 border-[#E07856]'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <BookOpen size={20} />
                  Pronunciation Guide
                </div>
              </button>
              <button
                onClick={() => setActiveTab('practice')}
                className={`flex-1 px-6 py-4 font-semibold transition ${
                  activeTab === 'practice'
                    ? 'text-[#E07856] border-b-2 border-[#E07856]'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Volume2 size={20} />
                  Practice Words
                </div>
              </button>
            </div>
          </div>

          <div className="p-8">
            {activeTab === 'guide' ? (
              <div>
                <div className="mb-6 p-6 bg-[#D4B896] bg-opacity-20 rounded-2xl border-l-4 border-[#D4B896]">
                  <h3 className="font-bold text-white mb-2">Important Notes</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-[#E07856] font-bold">•</span>
                      <span>
                        Tlingit uses sounds not found in English. Take time to practice each sound.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#E07856] font-bold">•</span>
                      <span>
                        The apostrophe (') indicates an ejective consonant with a popping sound.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#E07856] font-bold">•</span>
                      <span>
                        Accented vowels (á, é) are spoken at a higher pitch and held longer.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  {PRONUNCIATION_GUIDE.map((item, index) => (
                    <div
                      key={index}
                      className="p-6 bg-gray-800 rounded-2xl hover:shadow-md transition"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#E07856] to-[#D4B896] rounded-xl flex items-center justify-center flex-shrink-0">
                          <span className="text-2xl font-bold text-white">{item.letter}</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-semibold mb-2">{item.sound}</p>
                          <div className="flex items-center gap-2 text-gray-300">
                            <span className="font-medium">Example:</span>
                            <span className="italic">{item.example}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">Common Words & Phrases</h3>
                  <p className="text-gray-300">
                    Practice these essential Tlingit words and their pronunciations
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {PRACTICE_WORDS.map((word, index) => (
                    <div
                      key={index}
                      className="p-6 bg-gray-800 border-2 border-gray-700 rounded-2xl hover:border-[#E07856] hover:shadow-md transition"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="text-2xl font-bold text-white mb-1">{word.word}</p>
                          <p className="text-gray-400 italic">{word.phonetic}</p>
                        </div>
                        <button className="w-10 h-10 bg-gradient-to-br from-[#E07856] to-[#D4B896] rounded-full flex items-center justify-center hover:scale-110 transition">
                          <Volume2 className="text-white" size={20} />
                        </button>
                      </div>
                      <p className="text-gray-300 font-medium">{word.translation}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-[#7BA4B5] bg-opacity-20 rounded-2xl border-l-4 border-[#7BA4B5]">
                  <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                    <Volume2 size={20} className="text-[#7BA4B5]" />
                    Pro Tip
                  </h4>
                  <p className="text-gray-300">
                    Listen to native speakers whenever possible. The best way to learn pronunciation
                    is through repeated listening and practice. Record yourself and compare with
                    native pronunciations.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
