"use client";

import Link from "next/link";
import styles from "./MobileMenu.module.css";

interface MobileMenuProps {
  isOpen: boolean;
  isAuth: boolean;
  onClose: () => void;
}

export default function MobileMenu({
  isOpen,
  isAuth,
  onClose,
}: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.mobileMenu}>
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
          <button
            className={styles.burger}
            onClick={onClose}
            aria-label="Закрити меню"
          >
            <svg className={styles.icon}>
              <use href="/svg/sprite.svg#close" />
            </svg>
          </button>
        </div>

        {/* Навигация мобильного меню */}
        <nav className={styles.navMobile}>
          <Link
            href="/"
            onClick={onClose}
          >
            Головна
          </Link>
          <Link
            href="/tools"
            onClick={onClose}
          >
            Інструменти
          </Link>
          {isAuth ? (
            <>
              <Link
                href="/profile"
                onClick={onClose}
              >
                Мій профіль
              </Link>
              <Link
                href="/create"
                onClick={onClose}
              >
                Опублікувати оголошення
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                onClick={onClose}
              >
                Увійти
              </Link>
              <Link
                href="/auth/register"
                onClick={onClose}
                className={styles.registerButton}
              >
                Зареєструватися
              </Link>
            </>
          )}
        </nav>
      </div>
    </div>
  );
}
