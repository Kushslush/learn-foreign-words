import clsx from 'clsx';
import styles from './WordCard.module.scss';

interface IWordCard {
    text: string;
    translate: string;
    pronunciation: string;
    isFlippedProp: boolean;
    isChanged: boolean;
    toggleFlipped?: () => void;
}
export const WordCard = ({
    text,
    translate,
    pronunciation,
    isFlippedProp,
    isChanged,
    toggleFlipped,
}: IWordCard) => {
    const style = !isFlippedProp
        ? isChanged
            ? styles.card_wrapper_animated
            : styles.card_wrapper
        : isChanged
        ? clsx(styles.card_wrapper_animated, styles.card_wrapper_animated_flipped)
        : clsx(styles.card_wrapper, styles.card_wrapper_flipped);

    return (
        <div className={style} onClick={toggleFlipped}>
            <div className={styles.card}>
                <div className={styles.front}>{translate}</div>

                <div className={styles.back}>
                    {text} <br /> {pronunciation.length !== 0 && `[${pronunciation}]`}
                </div>
            </div>
        </div>
    );
};
