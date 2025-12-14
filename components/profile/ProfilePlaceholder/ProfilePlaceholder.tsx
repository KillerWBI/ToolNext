// components/profile/ProfilePlaceholder/ProfilePlaceholder.tsx
import Link from "next/link";
import styles from "./ProfilePlaceholder.module.css";

export default function ProfilePlaceholder() {
  return (
    <div className={styles.root}>
      <p className={styles.text}>
        У цього користувача ще не опубліковано жодного інструменту.
      </p>
      <p className={styles.subtext}>
        Усі інструменти можна переглянути в каталозі.
      </p>

      <Link className={styles.button} href="/tools">
        Всі інструменти
      </Link>
    </div>
  );
}
