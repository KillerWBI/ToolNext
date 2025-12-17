"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuthStore } from "../../store/auth.store";
import MobileMenu from "../MobileMenu/MobileMenu";
import styles from "./Header.module.css";

// Временно

export default function Header() {
  const { user, isAuthenticated, loading } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) return null;

  console.log("Header state:", { user, isAuthenticated, loading });

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerNavigation}>
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

          {/* Десктопная навигация */}
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
          {isAuthenticated && user?.name && (
            <div className={styles.userBlock}>
              {/* Аватар с первой буквой имени */}
              <div className={styles.userAvatar}>
                {user.name.charAt(0).toUpperCase()}
              </div>

              {/* Имя пользователя */}
              <span className={styles.userName}>{user.name}</span>
              <span className={styles.separator}></span>

              {/* Кнопка выхода */}
              <button
                className={styles.logoutBtn}
                onClick={() => setIsModalOpen(true)} // открываем ConfirmationModal
              >
                <svg
                  className={styles.logoutIcon}
                  width={18}
                  height={18}
                  aria-hidden="true"
                >
                  <use href="/svg/sprite.svg#logout" />
                </svg>
                Вихід
              </button>
            </div>
          )}

          {/* Бургер-кнопка */}
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
            isAuth={isAuthenticated}
            onClose={() => setIsOpen(false)}
          />
        </div>
      </div>
    </header>
  );
}
