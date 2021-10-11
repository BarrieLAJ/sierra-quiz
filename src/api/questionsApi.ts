import { appApi } from "./appApi";

export const questionApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    getQuestions: build.query<TransRestype[], unknown>({
      query: ({ cat, limit }) => ({
        url: `questions?categories=${cat?.join(",")}&limit=${limit || 10}`,
      }),
      transformResponse: (response: ResTypes[]) => {
        const data: TransRestype[] = response.map((res) => {
          const { question, correctAnswer, incorrectAnswers } = res;
          let inCorrect = shuffle<string>(incorrectAnswers).slice(0, 3);
          const time = Math.round(Math.random() * 100);
          const points = Math.round(time / (Math.random() * 10));
          const options = shuffle<string>([...inCorrect, correctAnswer]);
          return {
            question,
            time,
            points,
            options,
            answer: correctAnswer,
          } as TransRestype;
        });
        return data;
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetQuestionsQuery } = questionApi;

// interface ArgsType {
//   cat?: string[];
//   limit?: number;
// }

interface ResTypes {
  category: string;
  question: string;
  type: string;
  correctAnswer: string;
  incorrectAnswers: Array<string>;
}

export interface TransRestype {
  question: string;
  options: Array<string>;
  answer: string;
  points: number;
  time: number;
}

export function shuffle<T>(array: Array<T>): Array<T> {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
