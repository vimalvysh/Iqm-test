'use client';
import styles from './page.module.css';
// Pages.
import MoodletStatus from '../components/MoodletStatus';

export default function Home() {
  return (
    <div className={styles.page}>
      <MoodletStatus />
    </div>
  );
}
