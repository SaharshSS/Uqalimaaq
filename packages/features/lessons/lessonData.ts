export interface Phrase {
  en: string;
  native: string;
  audio: string;
}

export interface Lesson {
  id: number;
  title: string;
  completed: boolean;
}

export interface LessonContent {
  [key: number]: {
    title: string;
    phrases: Record<string, Phrase[]>;
  };
}

export const lessonContents: LessonContent = {
  1: {
    title: 'Express an action',
    phrases: {
      'Lushootseed': [
        { en: 'I run.', native: 'čəɬ ʔuʔəɬ čəd', audio: '' },
        { en: 'I eat.', native: 'čəɬ ʔuʔəɬ čəd', audio: '' },
        { en: 'I walk.', native: 'čəɬ ʔuʔəɬ čəd', audio: '' },
        { en: 'I sing.', native: 'čəɬ ʔuʔəɬ čəd', audio: '' },
        { en: 'I jump.', native: 'čəɬ ʔuʔəɬ čəd', audio: '' },
        { en: 'I swim.', native: 'čəɬ ʔuʔəɬ čəd', audio: '' },
        { en: 'I dance.', native: 'čəɬ ʔuʔəɬ čəd', audio: '' },
        { en: 'I sleep.', native: 'čəɬ ʔuʔəɬ čəd', audio: '' },
        { en: 'I speak.', native: 'čəɬ ʔuʔəɬ čəd', audio: '' },
        { en: 'I listen.', native: 'čəɬ ʔuʔəɬ čəd', audio: '' },
      ],
      'Chinuk Wawa': [
        { en: 'I run.', native: 'nayka run', audio: '' },
        { en: 'I eat.', native: 'nayka muckamuck', audio: '' },
        { en: 'I walk.', native: 'nayka walk', audio: '' },
        { en: 'I sing.', native: 'nayka sing', audio: '' },
        { en: 'I jump.', native: 'nayka jump', audio: '' },
        { en: 'I swim.', native: 'nayka swim', audio: '' },
        { en: 'I dance.', native: 'nayka dance', audio: '' },
        { en: 'I sleep.', native: 'nayka sleep', audio: '' },
        { en: 'I speak.', native: 'nayka wawa', audio: '' },
        { en: 'I listen.', native: 'nayka nanich', audio: '' },
      ],
      'Inuktitut': [
        { en: 'I run.', native: 'ᓇᒡᓕᒋᔭᖅᑎᑦ', audio: '' },
        { en: 'I eat.', native: 'ᖃᓄᖅᑐᖅ', audio: '' },
        { en: 'I walk.', native: 'ᓇᒡᓕᒋᔭᖅᑎᑦ', audio: '' },
        { en: 'I sing.', native: 'ᐊᓂᔭᖅᑎᑦ', audio: '' },
        { en: 'I jump.', native: 'ᓇᒡᓕᒋᔭᖅᑎᑦ', audio: '' },
        { en: 'I swim.', native: 'ᐊᓂᔭᖅᑎᑦ', audio: '' },
        { en: 'I dance.', native: 'ᐊᓂᔭᖅᑎᑦ', audio: '' },
        { en: 'I sleep.', native: 'ᐊᓂᔭᖅᑎᑦ', audio: '' },
        { en: 'I speak.', native: 'ᐊᓂᔭᖅᑎᑦ', audio: '' },
        { en: 'I listen.', native: 'ᐊᓂᔭᖅᑎᑦ', audio: '' },
      ],
      'Tlingit': [
        { en: 'I run.', native: 'x̱at sh kalneek', audio: '' },
        { en: 'I eat.', native: 'x̱at sh kát', audio: '' },
        { en: 'I walk.', native: 'x̱at sh kát', audio: '' },
        { en: 'I sing.', native: 'x̱at sh kát', audio: '' },
        { en: 'I jump.', native: 'x̱at sh kát', audio: '' },
        { en: 'I swim.', native: 'x̱at sh kát', audio: '' },
        { en: 'I dance.', native: 'x̱at sh kát', audio: '' },
        { en: 'I sleep.', native: 'x̱at sh kát', audio: '' },
        { en: 'I speak.', native: 'x̱at sh kát', audio: '' },
        { en: 'I listen.', native: 'x̱at sh kát', audio: '' },
      ]
    }
  },
  2: {
    title: 'Name objects',
    phrases: {
      'Lushootseed': [
        { en: 'This is a canoe.', native: 'ʔuʔəɬ čəd canoe', audio: '' },
        { en: 'This is a paddle.', native: 'ʔuʔəɬ čəd paddle', audio: '' },
        { en: 'This is a fish.', native: 'ʔuʔəɬ čəd fish', audio: '' },
        { en: 'This is a house.', native: 'ʔuʔəɬ čəd house', audio: '' },
        { en: 'This is a tree.', native: 'ʔuʔəɬ čəd tree', audio: '' },
        { en: 'This is a drum.', native: 'ʔuʔəɬ čəd drum', audio: '' },
        { en: 'This is a river.', native: 'ʔuʔəɬ čəd river', audio: '' },
        { en: 'This is a mountain.', native: 'ʔuʔəɬ čəd mountain', audio: '' },
        { en: 'This is a sun.', native: 'ʔuʔəɬ čəd sun', audio: '' },
        { en: 'This is a moon.', native: 'ʔuʔəɬ čəd moon', audio: '' },
      ],
      'Chinuk Wawa': [
        { en: 'This is a canoe.', native: 'ika canoe', audio: '' },
        { en: 'This is a paddle.', native: 'ika paddle', audio: '' },
        { en: 'This is a fish.', native: 'ika pish', audio: '' },
        { en: 'This is a house.', native: 'ika house', audio: '' },
        { en: 'This is a tree.', native: 'ika stick', audio: '' },
        { en: 'This is a drum.', native: 'ika drum', audio: '' },
        { en: 'This is a river.', native: 'ika chuck', audio: '' },
        { en: 'This is a mountain.', native: 'ika mountain', audio: '' },
        { en: 'This is a sun.', native: 'ika sun', audio: '' },
        { en: 'This is a moon.', native: 'ika moon', audio: '' },
      ],
      'Inuktitut': [
        { en: 'This is a canoe.', native: 'ᐊᖏᕐᕋᖅ', audio: '' },
        { en: 'This is a paddle.', native: 'ᐊᖏᕐᕋᖅ', audio: '' },
        { en: 'This is a fish.', native: 'ᐊᐳᑦ', audio: '' },
        { en: 'This is a house.', native: 'ᐃᒡᓗ', audio: '' },
        { en: 'This is a tree.', native: 'ᐊᖏᕐᕋᖅ', audio: '' },
        { en: 'This is a drum.', native: 'ᐊᖏᕐᕋᖅ', audio: '' },
        { en: 'This is a river.', native: 'ᐊᖏᕐᕋᖅ', audio: '' },
        { en: 'This is a mountain.', native: 'ᐊᖏᕐᕋᖅ', audio: '' },
        { en: 'This is a sun.', native: 'ᐊᖏᕐᕋᖅ', audio: '' },
        { en: 'This is a moon.', native: 'ᐊᖏᕐᕋᖅ', audio: '' },
      ],
      'Tlingit': [
        { en: 'This is a canoe.', native: 'x̱at canoe', audio: '' },
        { en: 'This is a paddle.', native: 'x̱at paddle', audio: '' },
        { en: 'This is a fish.', native: 'x̱at fish', audio: '' },
        { en: 'This is a house.', native: 'x̱at house', audio: '' },
        { en: 'This is a tree.', native: 'x̱at tree', audio: '' },
        { en: 'This is a drum.', native: 'x̱at drum', audio: '' },
        { en: 'This is a river.', native: 'x̱at river', audio: '' },
        { en: 'This is a mountain.', native: 'x̱at mountain', audio: '' },
        { en: 'This is a sun.', native: 'x̱at sun', audio: '' },
        { en: 'This is a moon.', native: 'x̱at moon', audio: '' },
      ]
    }
  },
  3: {
    title: 'Discuss the weather',
    phrases: {
      'Lushootseed': [
        { en: 'It is raining.', native: 'ʔuʔəɬ rain', audio: '' },
        { en: 'It is sunny.', native: 'ʔuʔəɬ sun', audio: '' },
        { en: 'It is cold.', native: 'ʔuʔəɬ cold', audio: '' },
        { en: 'It is windy.', native: 'ʔuʔəɬ windy', audio: '' },
        { en: 'It is snowing.', native: 'ʔuʔəɬ snow', audio: '' },
        { en: 'It is warm.', native: 'ʔuʔəɬ warm', audio: '' },
        { en: 'It is cloudy.', native: 'ʔuʔəɬ cloudy', audio: '' },
        { en: 'It is foggy.', native: 'ʔuʔəɬ foggy', audio: '' },
        { en: 'It is stormy.', native: 'ʔuʔəɬ stormy', audio: '' },
        { en: 'It is nice weather.', native: 'ʔuʔəɬ nice weather', audio: '' },
      ],
      'Chinuk Wawa': [
        { en: 'It is raining.', native: 'mitlite rain', audio: '' },
        { en: 'It is sunny.', native: 'mitlite sun', audio: '' },
        { en: 'It is cold.', native: 'kalt', audio: '' },
        { en: 'It is windy.', native: 'mitlite wind', audio: '' },
        { en: 'It is snowing.', native: 'mitlite snow', audio: '' },
        { en: 'It is warm.', native: 'mitlite warm', audio: '' },
        { en: 'It is cloudy.', native: 'mitlite cloud', audio: '' },
        { en: 'It is foggy.', native: 'mitlite fog', audio: '' },
        { en: 'It is stormy.', native: 'mitlite storm', audio: '' },
        { en: 'It is nice weather.', native: 'mitlite nice weather', audio: '' },
      ],
      'Inuktitut': [
        { en: 'It is raining.', native: 'ᐊᐳᑦᑐᖅ', audio: '' },
        { en: 'It is sunny.', native: 'ᐊᐳᑦᑐᖅ', audio: '' },
        { en: 'It is cold.', native: 'ᐊᐳᑦᑐᖅ', audio: '' },
        { en: 'It is windy.', native: 'ᐊᐳᑦᑐᖅ', audio: '' },
        { en: 'It is snowing.', native: 'ᐊᐳᑦᑐᖅ', audio: '' },
        { en: 'It is warm.', native: 'ᐊᐳᑦᑐᖅ', audio: '' },
        { en: 'It is cloudy.', native: 'ᐊᐳᑦᑐᖅ', audio: '' },
        { en: 'It is foggy.', native: 'ᐊᐳᑦᑐᖅ', audio: '' },
        { en: 'It is stormy.', native: 'ᐊᐳᑦᑐᖅ', audio: '' },
        { en: 'It is nice weather.', native: 'ᐊᐳᑦᑐᖅ', audio: '' },
      ],
      'Tlingit': [
        { en: 'It is raining.', native: 'x̱at rain', audio: '' },
        { en: 'It is sunny.', native: 'x̱at sun', audio: '' },
        { en: 'It is cold.', native: 'x̱at cold', audio: '' },
        { en: 'It is windy.', native: 'x̱at wind', audio: '' },
        { en: 'It is snowing.', native: 'x̱at snow', audio: '' },
        { en: 'It is warm.', native: 'x̱at warm', audio: '' },
        { en: 'It is cloudy.', native: 'x̱at cloud', audio: '' },
        { en: 'It is foggy.', native: 'x̱at fog', audio: '' },
        { en: 'It is stormy.', native: 'x̱at storm', audio: '' },
        { en: 'It is nice weather.', native: 'x̱at nice weather', audio: '' },
      ]
    }
  },
  4: {
    title: 'Describe feelings',
    phrases: {
      'Lushootseed': [
        { en: 'I am happy.', native: 'čəɬ ʔuʔəɬ čəd happy', audio: '' },
        { en: 'I am tired.', native: 'čəɬ ʔuʔəɬ čəd tired', audio: '' },
        { en: 'I am excited.', native: 'čəɬ ʔuʔəɬ čəd excited', audio: '' },
        { en: 'I am calm.', native: 'čəɬ ʔuʔəɬ čəd calm', audio: '' },
        { en: 'I am sad.', native: 'čəɬ ʔuʔəɬ čəd sad', audio: '' },
        { en: 'I am angry.', native: 'čəɬ ʔuʔəɬ čəd angry', audio: '' },
        { en: 'I am scared.', native: 'čəɬ ʔuʔəɬ čəd scared', audio: '' },
        { en: 'I am proud.', native: 'čəɬ ʔuʔəɬ čəd proud', audio: '' },
        { en: 'I am worried.', native: 'čəɬ ʔuʔəɬ čəd worried', audio: '' },
        { en: 'I am grateful.', native: 'čəɬ ʔuʔəɬ čəd grateful', audio: '' },
      ],
      'Chinuk Wawa': [
        { en: 'I am happy.', native: 'nayka happy', audio: '' },
        { en: 'I am tired.', native: 'nayka tired', audio: '' },
        { en: 'I am excited.', native: 'nayka excited', audio: '' },
        { en: 'I am calm.', native: 'nayka calm', audio: '' },
        { en: 'I am sad.', native: 'nayka sad', audio: '' },
        { en: 'I am angry.', native: 'nayka angry', audio: '' },
        { en: 'I am scared.', native: 'nayka scared', audio: '' },
        { en: 'I am proud.', native: 'nayka proud', audio: '' },
        { en: 'I am worried.', native: 'nayka worried', audio: '' },
        { en: 'I am grateful.', native: 'nayka grateful', audio: '' },
      ],
      'Inuktitut': [
        { en: 'I am happy.', native: 'ᐊᓂᔭᖅᑎᑦ', audio: '' },
        { en: 'I am tired.', native: 'ᐊᓂᔭᖅᑎᑦ', audio: '' },
        { en: 'I am excited.', native: 'ᐊᓂᔭᖅᑎᑦ', audio: '' },
        { en: 'I am calm.', native: 'ᐊᓂᔭᖅᑎᑦ', audio: '' },
        { en: 'I am sad.', native: 'ᐊᓂᔭᖅᑎᑦ', audio: '' },
        { en: 'I am angry.', native: 'ᐊᓂᔭᖅᑎᑦ', audio: '' },
        { en: 'I am scared.', native: 'ᐊᓂᔭᖅᑎᑦ', audio: '' },
        { en: 'I am proud.', native: 'ᐊᓂᔭᖅᑎᑦ', audio: '' },
        { en: 'I am worried.', native: 'ᐊᓂᔭᖅᑎᑦ', audio: '' },
        { en: 'I am grateful.', native: 'ᐊᓂᔭᖅᑎᑦ', audio: '' },
      ],
      'Tlingit': [
        { en: 'I am happy.', native: 'x̱at happy', audio: '' },
        { en: 'I am tired.', native: 'x̱at tired', audio: '' },
        { en: 'I am excited.', native: 'x̱at excited', audio: '' },
        { en: 'I am calm.', native: 'x̱at calm', audio: '' },
        { en: 'I am sad.', native: 'x̱at sad', audio: '' },
        { en: 'I am angry.', native: 'x̱at angry', audio: '' },
        { en: 'I am scared.', native: 'x̱at scared', audio: '' },
        { en: 'I am proud.', native: 'x̱at proud', audio: '' },
        { en: 'I am worried.', native: 'x̱at worried', audio: '' },
        { en: 'I am grateful.', native: 'x̱at grateful', audio: '' },
      ]
    }
  },
  5: {
    title: 'Travel conversations',
    phrases: {
      'Lushootseed': [
        { en: 'Where is the village?', native: 'ʔuʔəɬ village', audio: '' },
        { en: 'Where is the river?', native: 'ʔuʔəɬ river', audio: '' },
        { en: 'Where is the school?', native: 'ʔuʔəɬ school', audio: '' },
        { en: 'Where is the store?', native: 'ʔuʔəɬ store', audio: '' },
        { en: 'Where is the canoe?', native: 'ʔuʔəɬ canoe', audio: '' },
        { en: 'Where is the house?', native: 'ʔuʔəɬ house', audio: '' },
        { en: 'Where is the mountain?', native: 'ʔuʔəɬ mountain', audio: '' },
        { en: 'Where is the sun?', native: 'ʔuʔəɬ sun', audio: '' },
        { en: 'Where is the moon?', native: 'ʔuʔəɬ moon', audio: '' },
        { en: 'Where is the drum?', native: 'ʔuʔəɬ drum', audio: '' },
      ],
      'Chinuk Wawa': [
        { en: 'Where is the village?', native: 'kah village?', audio: '' },
        { en: 'Where is the river?', native: 'kah chuck?', audio: '' },
        { en: 'Where is the school?', native: 'kah school?', audio: '' },
        { en: 'Where is the store?', native: 'kah store?', audio: '' },
        { en: 'Where is the canoe?', native: 'kah canoe?', audio: '' },
        { en: 'Where is the house?', native: 'kah house?', audio: '' },
        { en: 'Where is the mountain?', native: 'kah mountain?', audio: '' },
        { en: 'Where is the sun?', native: 'kah sun?', audio: '' },
        { en: 'Where is the moon?', native: 'kah moon?', audio: '' },
        { en: 'Where is the drum?', native: 'kah drum?', audio: '' },
      ],
      'Inuktitut': [
        { en: 'Where is the village?', native: 'ᐊᖏᕐᕋᖅ ᐊᑐᖅ?', audio: '' },
        { en: 'Where is the river?', native: 'ᐊᖏᕐᕋᖅ ᐊᑐᖅ?', audio: '' },
        { en: 'Where is the school?', native: 'ᐊᖏᕐᕋᖅ ᐊᑐᖅ?', audio: '' },
        { en: 'Where is the store?', native: 'ᐊᖏᕐᕋᖅ ᐊᑐᖅ?', audio: '' },
        { en: 'Where is the canoe?', native: 'ᐊᖏᕐᕋᖅ ᐊᑐᖅ?', audio: '' },
        { en: 'Where is the house?', native: 'ᐊᖏᕐᕋᖅ ᐊᑐᖅ?', audio: '' },
        { en: 'Where is the mountain?', native: 'ᐊᖏᕐᕋᖅ ᐊᑐᖅ?', audio: '' },
        { en: 'Where is the sun?', native: 'ᐊᖏᕐᕋᖅ ᐊᑐᖅ?', audio: '' },
        { en: 'Where is the moon?', native: 'ᐊᖏᕐᕋᖅ ᐊᑐᖅ?', audio: '' },
        { en: 'Where is the drum?', native: 'ᐊᖏᕐᕋᖅ ᐊᑐᖅ?', audio: '' },
      ],
      'Tlingit': [
        { en: 'Where is the village?', native: 'x̱at village?', audio: '' },
        { en: 'Where is the river?', native: 'x̱at river?', audio: '' },
        { en: 'Where is the school?', native: 'x̱at school?', audio: '' },
        { en: 'Where is the store?', native: 'x̱at store?', audio: '' },
        { en: 'Where is the canoe?', native: 'x̱at canoe?', audio: '' },
        { en: 'Where is the house?', native: 'x̱at house?', audio: '' },
        { en: 'Where is the mountain?', native: 'x̱at mountain?', audio: '' },
        { en: 'Where is the sun?', native: 'x̱at sun?', audio: '' },
        { en: 'Where is the moon?', native: 'x̱at moon?', audio: '' },
        { en: 'Where is the drum?', native: 'x̱at drum?', audio: '' },
      ]
    }
  }
};

export const lessons: Lesson[] = [
  { id: 1, title: 'Express an action', completed: true },
  { id: 2, title: 'Name objects', completed: false },
  { id: 3, title: 'Discuss the weather', completed: false },
  { id: 4, title: 'Describe feelings', completed: false },
  { id: 5, title: 'Travel conversations', completed: false }
];

export const rotatingLanguages = ['Lushootseed', 'Chinuk Wawa', 'Inuktitut', 'Tlingit'];

export const languageFlags = {
  'Lushootseed': '/lushootseed_flag.png',
  'Chinuk Wawa': '/chinook_flag.png',
  'Inuktitut': '/inuktitut_flag.png',
  'Tlingit': '/tlingit_flag.png',
};
