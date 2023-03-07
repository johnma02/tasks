import { urlToHttpOptions } from "url";
import { Answer } from "./interfaces/answer";
import { Question, QuestionType } from "./interfaces/question";
import { makeBlankQuestion, duplicateQuestion } from "./objects";

/**
 * Consumes an array of questions and returns a new array with only the questions
 * that are `published`.
 */
export function getPublishedQuestions(questions: Question[]): Question[] {
    return questions.filter((x) => x.published);
}

/**
 * Consumes an array of questions and returns a new array of only the questions that are
 * considered "non-empty". An empty question has an empty string for its `body` and
 * `expected`, and an empty array for its `options`.
 */
export function getNonEmptyQuestions(questions: Question[]): Question[] {
    return questions.filter(
        (x) =>
            x.body.length > 0 || x.expected.length > 0 || x.options.length > 0
    );
}

/***
 * Consumes an array of questions and returns the question with the given `id`. If the
 * question is not found, return `null` instead.
 */
export function findQuestion(
    questions: Question[],
    id: number
): Question | null {
    const search: Question | null = questions.reduce(
        (query: Question | null, x) =>
            (query = x.id === id && query === null ? { ...x } : query),
        null
    );
    return search;
}

/**
 * Consumes an array of questions and returns a new array that does not contain the question
 * with the given `id`.
 */
export function removeQuestion(questions: Question[], id: number): Question[] {
    return questions.filter((x) => x.id !== id);
}

/***
 * Consumes an array of questions and returns a new array containing just the names of the
 * questions, as an array.
 */
export function getNames(questions: Question[]): string[] {
    return questions.reduce(
        (names: string[], x) => (names = [...names, x.name]),
        []
    );
}

/***
 * Consumes an array of questions and returns the sum total of all their points added together.
 */
export function sumPoints(questions: Question[]): number {
    return questions.reduce((sum: number, x) => (sum += x.points), 0);
}

/***
 * Consumes an array of questions and returns the sum total of the PUBLISHED questions.
 */
export function sumPublishedPoints(questions: Question[]): number {
    return questions.reduce(
        (sum: number, x) => (sum += x.published ? x.points : 0),
        0
    );
}

/***
 * Consumes an array of questions, and produces a Comma-Separated Value (CSV) string representation.
 * A CSV is a type of file frequently used to share tabular data; we will use a single string
 * to represent the entire file. The first line of the file is the headers "id", "name", "options",
 * "points", and "published". The following line contains the value for each question, separated by
 * commas. For the `options` field, use the NUMBER of options.
 *
 * Here is an example of what this will look like (do not include the border).
 *`
id,name,options,points,published
1,Addition,0,1,true
2,Letters,0,1,false
5,Colors,3,1,true
9,Shapes,3,2,false
` *
 * Check the unit tests for more examples!
 */
export function toCSV(questions: Question[]): string {
    return questions
        .reduce(
            (csv: string, x) =>
                (csv +=
                    String(x.id) +
                    "," +
                    String(x.name) +
                    "," +
                    String(x.options.length) +
                    "," +
                    String(x.points) +
                    "," +
                    String(x.published) +
                    "\n"),
            "id,name,options,points,published\n"
        )
        .trim();
}

/**
 * Consumes an array of Questions and produces a corresponding array of
 * Answers. Each Question gets its own Answer, copying over the `id` as the `questionId`,
 * making the `text` an empty string, and using false for both `submitted` and `correct`.
 */
export function makeAnswers(questions: Question[]): Answer[] {
    return questions.reduce(
        (ret: Answer[], x) =>
            (ret = [
                ...ret,
                { questionId: x.id, text: "", submitted: false, correct: false }
            ]),
        []
    );
}

/***
 * Consumes an array of Questions and produces a new array of questions, where
 * each question is now published, regardless of its previous published status.
 */
export function publishAll(questions: Question[]): Question[] {
    return questions.map((x) => (x = { ...x, published: true }));
}

/***
 * Consumes an array of Questions and produces whether or not all the questions
 * are the same type. They can be any type, as long as they are all the SAME type.
 */
export function sameType(questions: Question[]): boolean {
    return questions.reduce(
        (same: boolean, x) =>
            (same = x.type === questions[0].type && same ? true : false),
        true
    );
}

/***
 * Consumes an array of Questions and produces a new array of the same Questions,
 * except that a blank question has been added onto the end. Reuse the `makeBlankQuestion`
 * you defined in the `objects.ts` file.
 */
export function addNewQuestion(
    questions: Question[],
    id: number,
    name: string,
    type: QuestionType
): Question[] {
    return [...questions, { ...makeBlankQuestion(id, name, type) }];
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its name should now be `newName`.
 */
export function renameQuestionById(
    questions: Question[],
    targetId: number,
    newName: string
): Question[] {
    return questions.map(
        (x) => (x = x.id === targetId ? { ...x, name: newName } : x)
    );
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `type` should now be the `newQuestionType`
 * AND if the `newQuestionType` is no longer "multiple_choice_question" than the `options`
 * must be set to an empty list.
 */
export function changeQuestionTypeById(
    questions: Question[],
    targetId: number,
    newQuestionType: QuestionType
): Question[] {
    const replace: Question[] = questions.map(
        (x) => (x = x.id === targetId ? { ...x, type: newQuestionType } : x)
    );
    return replace.map(
        (x) =>
            (x =
                x.id === targetId && x.type !== "multiple_choice_question"
                    ? { ...x, options: [] }
                    : x)
    );
}

/**
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `option` array should have a new element.
 * If the `targetOptionIndex` is -1, the `newOption` should be added to the end of the list.
 * Otherwise, it should *replace* the existing element at the `targetOptionIndex`.
 *
 * Remember, if a function starts getting too complicated, think about how a helper function
 * can make it simpler! Break down complicated tasks into little pieces.
 */
export function modify_list(
    target: string[],
    targetIndex: number,
    newOption: string
): string[] {
    let i = 0;
    const iota: { index: number; option: string }[] = target.reduce(
        (
            ret: {
                index: number;
                option: string;
            }[],
            x
        ) => (ret = [...ret, { index: i++, option: x }]),
        []
    );
    return targetIndex === -1
        ? [...target, newOption]
        : iota.reduce(
            (ret: string[], x) =>
                (ret =
                      x.index === targetIndex
                          ? [...ret, newOption]
                          : [...ret, x.option]),
            []
        );
}
export function editOption(
    questions: Question[],
    targetId: number,
    targetOptionIndex: number,
    newOption: string
): Question[] {
    return questions.map(
        (x) =>
            (x =
                x.id === targetId
                    ? {
                        ...x,
                        options: modify_list(
                            x.options,
                            targetOptionIndex,
                            newOption
                        )
                    }
                    : { ...x })
    );
}

/***
 * Consumes an array of questions, and produces a new array based on the original array.
 * The only difference is that the question with id `targetId` should now be duplicated, with
 * the duplicate inserted directly after the original question. Use the `duplicateQuestion`
 * function you defined previously; the `newId` is the parameter to use for the duplicate's ID.
 */
export function duplicateQuestionInArray(
    questions: Question[],
    targetId: number,
    newId: number
): Question[] {
    return questions.reduce(
        (ret: Question[], x) =>
            (ret =
                x.id === targetId
                    ? [...ret, x, duplicateQuestion(newId, x)]
                    : [...ret, x]),
        []
    );
}
