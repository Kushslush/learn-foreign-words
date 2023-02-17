import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Select } from '../Select/Select';
import styles from './LearnPage.module.scss';
import { Lesson } from '../../types/lesson';
import { Button } from '../Button/Button';
import { WordCard } from '../WordCard/WordCard';

export const LearnPage = () => {
    const currentLocation = window.location;
    const { pathname } = currentLocation;
    // const [isStarted, setIsStarted] = useState(false);
    //
    // console.log(pathname);
    // const toggleIsStarted = () => {
    //     setIsStarted(!isStarted);
    // };

    // return !isStarted ? (
    //     <ChooseLessons clickStart={toggleIsStarted} />
    // ) : (
    //     <LearnWords clickBack={toggleIsStarted} />
    // );

    return pathname === '/' ? (
        <div className={styles.learnPage}>
            <a href="/memory-cards">Memory cards</a>
            <a href="/test">Test</a>
        </div>
    ) : (
        <Outlet />
    );
};
