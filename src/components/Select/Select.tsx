import { useEffect, useState } from 'react';
import styles from './Select.module.scss';

import arrowIcon from '../../assets/arrow_icon.svg';
import { Lesson } from '../../types/lesson';

export interface ISelect {
    lessons: Lesson[];
    clickOption?: (lesson: Lesson) => void;
}

export interface ISelectOption {
    lesson: Lesson;
    clickOption?: (lesson: Lesson) => void;
}

const SelectOption = ({ lesson, clickOption }: ISelectOption) => (
    <li>
        <label className={styles.selectBox_option} onClick={() => clickOption?.(lesson)}>
            {lesson.date}
        </label>
    </li>
);
export const Select = ({ lessons, clickOption }: ISelect) => {
    const [currentLesson, setCurrentLesson] = useState<Lesson>({ id: -1, date: '' });

    const selectValue = (lesson: Lesson) => {
        setCurrentLesson(lesson);
        if (clickOption) {
            clickOption(lesson);
        }
    };

    useEffect(() => {
        if (lessons.length === 0) {
            return;
        }
        setCurrentLesson(lessons[0]);
        if (clickOption) {
            clickOption(lessons[0]);
        }
    }, [lessons]);

    return (
        <div className={styles.selectBox}>
            <div className={styles.selectBox_current} tabIndex={1}>
                <div>
                    <input className={styles.selectBox_input} type="submit" defaultChecked />
                    <p className={styles.selectBox_inputText}>{currentLesson.date}</p>
                </div>
                <img className={styles.selectBox_icon} src={arrowIcon} alt="Arrow Icon" />
            </div>
            <ul className={styles.selectBox_list}>
                {lessons.map((lesson) => (
                    <SelectOption key={lesson.id} lesson={lesson} clickOption={selectValue} />
                ))}
            </ul>
        </div>
    );
};
