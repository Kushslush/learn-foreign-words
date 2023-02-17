import clsx from 'clsx';
import styles from './Header.module.scss';
import logo from '../../assets/logo.gif';

export const Header = () => (
    <div className={styles.header}>
        <nav className={styles.headerNavigation}>
            <ul>
                <li>
                    <a href="/">Main</a>
                </li>
                {/* <li> */}
                {/*    <a href="/learn">Learn</a> */}
                {/* </li> */}
                <li>
                    <a href="/folders">Folder</a>
                </li>
            </ul>
        </nav>
    </div>
);
