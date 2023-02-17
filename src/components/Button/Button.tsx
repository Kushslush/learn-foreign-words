import styles from './Button.module.scss';

export interface IButton {
    text: string;
    onClick?: () => void;
}
export const Button = ({ text, onClick }: IButton) => {
    const a = 5;

    return (
        <button className={styles.button} onClick={onClick}>
            {text}
        </button>
    );
};
