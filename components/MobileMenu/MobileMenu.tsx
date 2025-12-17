"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/auth.store";
import styles from "./MobileMenu.module.css";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { user, isAuthenticated, logout } = useAuthStore();

  if (!isOpen) return null;

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <div className={styles.mobileMenu}>
      <div className="container">
        <div className={styles.headerNavigation}>
          <Link
            href="/"
            onClick={onClose}
          >
            <svg
              width={162}
              height={26}
              aria-label="Company logo"
            >
              <use href="/svg/sprite.svg#icon-custom-logo" />
            </svg>
          </Link>

          <button
            className={styles.burger}
            onClick={onClose}
            aria-label="Закрити меню"
          >
            <svg
              width={24}
              height={24}
            >
              <use href="/svg/sprite.svg#close" />
            </svg>
          </button>
        </div>

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

          {isAuthenticated ? (
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

              <div className={styles.userBlock}>
                <div className={styles.userAvatar}>
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <span className={styles.userName}>{user?.name}</span>
                <button
                  className={styles.logoutBtn}
                  onClick={handleLogout}
                >
                  Вийти
                </button>
              </div>
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
