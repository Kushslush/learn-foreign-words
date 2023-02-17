import styles from './MainLayout.module.scss';
import { Header } from '../Header/Header';
import { LearnPage } from '../LearnPage/LearnPage';

export const MainLayout = () => (
    <div className={styles.mainLayout}>
        <Header />
        <main className={styles.mainLayoutContent}>
            <LearnPage />
        </main>
    </div>
);
