"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import toast from "react-hot-toast";
import * as yup from "yup";
import css from "./resetPassword.module.css";

const newPasswordSchema = yup.object({
  password: yup
    .string()
    .min(8, "Пароль має містити не менше 8 символів")
    .required("Пароль обов'язковий"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Паролі не співпадають")
    .required("Підтвердження пароля обов'язкове"),
});

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!token) {
    return (
      <div className="container">
        <section className={css.resetPassword}>
          <h1 className={css.title}>Невірне посилання</h1>
          <p className={css.description}>
            Посилання для зміни пароля недійсне або застаріле
          </p>
        </section>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    try {
      await newPasswordSchema.validate(
        { password, confirmPassword },
        { abortEarly: false }
      );

      setIsLoading(true);

      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const errorMessage = errorData?.message || "Помилка зміни пароля";
        throw new Error(errorMessage);
      }

      toast.success("Пароль успішно змінено!");

      setTimeout(() => {
        router.replace("/auth/login");
      }, 1500);
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setError(err.errors[0]);
        return;
      }

      const errorMessage =
        err instanceof Error ? err.message : "Не вдалося змінити пароль";
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <section className={css.resetPassword}>
        <h1 className={css.title}>Новий пароль</h1>
        <p className={css.description}>
          Введіть новий пароль для вашого акаунту
        </p>

        <form onSubmit={handleSubmit} className={css.form}>
          <div className={css.field}>
            <label htmlFor="password" className={css.label}>
              Новий пароль
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={css.input}
              placeholder="Мінімум 8 символів"
              disabled={isLoading}
              required
            />
          </div>

          <div className={css.field}>
            <label htmlFor="confirmPassword" className={css.label}>
              Підтвердіть пароль
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className={css.input}
              placeholder="Повторіть пароль"
              disabled={isLoading}
              required
            />
          </div>

          {error && <p className={css.error}>{error}</p>}

          <button type="submit" className={css.button} disabled={isLoading}>
            {isLoading ? "Зміна пароля..." : "Змінити пароль"}
          </button>

          <button
            type="button"
            className={css.backButton}
            onClick={() => router.push("/auth/login")}
            disabled={isLoading}
          >
            Повернутися до входу
          </button>
        </form>
      </section>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Завантаження...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
