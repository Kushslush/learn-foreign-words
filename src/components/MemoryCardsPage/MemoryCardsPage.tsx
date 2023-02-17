import axios from 'axios';

import { useEffect, useState } from 'react';
import { Lesson } from '../../types/lesson';
import styles from './MemoryCardsPage.module.scss';
import { Select } from '../Select/Select';
import { Button } from '../Button/Button';
import { WordCard } from '../WordCard/WordCard';
import { Word } from '../../types/word';

// const lessons: Lesson[] = [
//     {
//         id: 1,
//         date: '08.02.2023',
//     },
//     {
//         id: 2,
//         date: '02.02.2023',
//     },
//     {
//         id: 3,
//         date: '25.01.2023',
//     },
//     {
//         id: 4,
//         date: '18.01.2023',
//     },
//     {
//         id: 5,
//         date: '11.01.2023',
//     },
//     {
//         id: 6,
//         date: '05.01.2023',
//     },
// ];

// const wordsList: Word[] = [
//     {
//         text: 'ugly',
//         translate: 'некрасивый',
//         pronunciation: 'агли',
//     },
//     {
//         text: 'draw',
//         translate: 'cыграть в ничью',
//         pronunciation: '',
//     },
//     {
//         text: 'score',
//         translate: 'забивать гол',
//         pronunciation: '',
//     },
//     {
//         text: 'win',
//         translate: 'выигрывать',
//         pronunciation: '',
//     },
//     {
//         text: 'time',
//         translate: 'засекать время',
//         pronunciation: '',
//     },
//     {
//         text: "I've always had a thing for smt ",
//         translate: 'Мне всегда нравились',
//         pronunciation: '',
//     },
// ];

interface IChooseLessons {
    clickStart: (firstLesson: Lesson, secondLesson: Lesson) => void;
}

interface ILearnWords {
    clickBack?: () => void;
    words: Word[];
}

const ChooseLessons = ({ clickStart }: IChooseLessons) => {
    const [firstLesson, setFirstLesson] = useState<Lesson>({ id: -1, date: '' });
    const [secondLesson, setSecondLesson] = useState<Lesson>({ id: -1, date: '' });

    const [lessons, setLessons] = useState<Lesson[]>([]);

    useEffect(() => {
        const baseUrl = 'http://localhost:8080/folders';
        axios.get<Lesson[]>(baseUrl).then((response) => {
            setLessons(response.data);
        });
    }, []);

    const updateFirstLesson = (lesson: Lesson) => {
        setFirstLesson(lesson);
    };

    const updateSecondLesson = (lesson: Lesson) => {
        setSecondLesson(lesson);
    };

    return (
        <div className={styles.memoryCardsPage}>
            <h1>Choose two lessons to learn</h1>
            <div className={styles.memoryCardsPage_selectContainer}>
                <Select
                    lessons={lessons.length !== 0 ? lessons : []}
                    clickOption={updateFirstLesson}
                />
                <Select
                    lessons={lessons.length !== 0 ? lessons : []}
                    clickOption={updateSecondLesson}
                />
            </div>
            <div className={styles.memoryCardsPage_middleButtonContainer}>
                <Button text="start" onClick={() => clickStart(firstLesson, secondLesson)} />
            </div>
        </div>
    );
};

const LearnWords = ({ clickBack, words }: ILearnWords) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isChanged, setIsChanged] = useState(false);

    const prevWord = () => {
        if (currentIndex !== 0) {
            setCurrentIndex(currentIndex - 1);
            setIsFlipped(false);
            setIsChanged(false);
        }
    };
    const nextWord = () => {
        if (currentIndex < words.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setIsFlipped(false);
            setIsChanged(false);
        }
    };
    const toggleIsFlipped = () => {
        setIsFlipped(!isFlipped);
        setIsChanged(true);
    };

    return (
        <div className={styles.memoryCardsPage}>
            <div className={styles.memoryCardsPage_middleButtonContainer}>
                <Button text="back" onClick={clickBack} />
            </div>
            <h1>
                {currentIndex + 1}/{words.length}
            </h1>
            <div>
                <WordCard
                    {...words[currentIndex]}
                    isFlippedProp={isFlipped}
                    isChanged={isChanged}
                    toggleFlipped={toggleIsFlipped}
                />
            </div>
            <div className={styles.memoryCardsPage_buttonContainer}>
                <Button text="prev" onClick={prevWord} />
                <Button text="next" onClick={nextWord} />
            </div>
        </div>
    );
};

export const MemoryCardsPage = () => {
    const [isStarted, setIsStarted] = useState(false);
    const [words, setWords] = useState<Word[]>([]);

    const toggleIsStarted = () => {
        setIsStarted(!isStarted);
    };

    const startLearn = (firstLesson: Lesson, secondLesson: Lesson) => {
        const baseUrl = 'http://localhost:8080/words';
        axios
            .get<Word[]>(baseUrl, { params: { first: firstLesson.id, second: secondLesson.id } })
            .then((response) => {
                setWords(response.data);
                setIsStarted(true);
            });
    };

    return !isStarted ? (
        <ChooseLessons clickStart={startLearn} />
    ) : (
        <LearnWords clickBack={toggleIsStarted} words={words} />
    );
};
