export const MOOD_OPTIONS = [
  {
    id: 'sunny',
    emoji: '☀️',
    mood: '맑고 화창한 여름',
    description: '상쾌하고 활기찬',
    value: 1,
    color: 'from-yellow-400 to-orange-500',
  },
  {
    id: 'autumn',
    emoji: '🍂',
    mood: '선선한 가을',
    description: '차분하고 여유로운',
    value: 2,
    color: 'from-orange-400 to-red-500',
  },
  {
    id: 'rainy',
    emoji: '🌧',
    mood: '장마철 비 오는 날',
    description: '조금 축 처지고 무거운',
    value: 3,
    color: 'from-gray-400 to-blue-500',
  },
  {
    id: 'winter',
    emoji: '❄️',
    mood: '겨울밤 눈 내리는 날',
    description: '고요하고 외로운',
    value: 4,
    color: 'from-blue-300 to-blue-600',
  },
  {
    id: 'spring',
    emoji: '🌸🌦',
    mood: '변덕스러운 봄날',
    description: '들떴지만 불안정한',
    value: 5,
    color: 'from-pink-300 to-purple-400',
  },
] as const;

export type MoodType = (typeof MOOD_OPTIONS)[number]['id'];

/**
 * 기분 타입에 따른 그라데이션 배경색을 반환합니다.
 * @param moodType - 기분 타입
 * @returns CSS linear-gradient 문자열
 */
export const getMoodGradient = (moodType: MoodType): string => {
  const gradients = {
    sunny: 'linear-gradient(to right, #fbbf24, #f97316)', // 노란색 → 주황색
    autumn: 'linear-gradient(to right, #fb923c, #ef4444)', // 주황색 → 빨간색
    rainy: 'linear-gradient(to right, #9ca3af, #3b82f6)', // 회색 → 파란색
    winter: 'linear-gradient(to right, #93c5fd, #2563eb)', // 하늘색 → 파란색
    spring: 'linear-gradient(to right, #f9a8d4, #a855f7)', // 핑크색 → 보라색
  };

  return gradients[moodType] || gradients.sunny;
};

export const moodMapper = new Map([
  ['sunny', 1],
  ['autumn', 2],
  ['rainy', 3],
  ['winter', 4],
  ['spring', 5],
]);
