"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import MobileMenu from "../MobileMenu/MobileMenu";
import styles from "./Header.module.css";

export default function Header() {
  const { user, isAuthenticated, loading, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  if (loading) return null;

  const handleLogout = () => {
    logout(); // выход из системы
    setIsOpen(false); // закрываем мобильное меню
    router.push("/"); // редирект на главную
  };

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerNavigation}>
          {/* Логотип */}
          <div className={styles.logoWrapper}>
            <Link href="/">
              <svg
                width={162}
                height={26}
                aria-label="Company logo"
              >
                <use href="/svg/sprite.svg#icon-custom-logo" />
              </svg>
            </Link>
          </div>

          {/* Навигация + пользовательский блок */}
          <div className={styles.navUserWrapper}>
            <nav className={styles.navHeader}>
              <Link href="/">Головна</Link>
              <Link href="/tools">Інструменти</Link>

              {isAuthenticated ? (
                <>
                  <Link href="/profile">Мій профіль</Link>
                  <Link href="/create">Опублікувати оголошення</Link>
                </>
              ) : (
                <>
                  <Link href="/auth/login">Увійти</Link>
                  <Link href="/auth/register">Зареєструватися</Link>
                </>
              )}
            </nav>

            {/* Блок пользователя */}
            {isAuthenticated && user && (
              <div className={styles.userBlock}>
                <div className={styles.userAvatar}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className={styles.userName}>{user.name}</span>
                <span className={styles.separator}></span>
                <button
                  className={styles.logoutBtn}
                  onClick={handleLogout}
                >
                  <svg
                    className={styles.logoutIcon}
                    width={18}
                    height={18}
                    aria-hidden="true"
                  >
                    <use href="/svg/sprite.svg#logout" />
                  </svg>
                  Вийти
                </button>
              </div>
            )}
          </div>

          {/* Бургер для мобильного меню */}
          <button
            className={styles.burger}
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Відкрити меню"
          >
            <svg className={styles.icon}>
              <use href="/svg/sprite.svg#menu" />
            </svg>
          </button>

          {/* Мобильное меню */}
          <MobileMenu
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          />
        </div>
      </div>
    </header>
  );
}
