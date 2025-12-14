"use client";

import Link from "next/link";
import styles from "./ProfilePlaceholder.module.css";
import useAuth from "@/hooks/useAuth";

export default function ProfilePlaceholder() {
  const { isAuthenticated } = useAuth();

  return (
    <div className={styles.root}>
      <p className={styles.title}>
        У цього користувача ще не опубліковано жодного інструменту
      </p>

      <p className={styles.desc}>
        Усі інструменти можна переглянути в каталозі.
      </p>

      {isAuthenticated ? (
        <Link className={styles.button} href="/create">
          Опублікувати інструмент
        </Link>
      ) : (
        <Link className={styles.button} href="/tools">
          Всі інструменти
        </Link>
      )}
    </div>
  );
}
