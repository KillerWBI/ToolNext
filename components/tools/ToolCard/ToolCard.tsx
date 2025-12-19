"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";
import { Tool } from "@/types/tool";
import { useAuthStore } from "@/store/auth.store";
import { useToolsStore } from "@/store/tools.store";
import { useToolImages } from "@/hooks/useToolImages";
import { deleteTool } from "@/lib/api/tools";
import { ConfirmationModal } from "@/components/modal/ConfirmationModal/ConfirmationModal";
import styles from "./ToolCard.module.css";

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  // Отримуємо статус авторизації та поточного користувача з Zustand стора
  const { isAuthenticated, user } = useAuthStore();
  // Отримуємо функцію для видалення інструмента зі стану
  const removeTool = useToolsStore((state) => state.removeTool);

  // Перевіряємо, чи є поточний користувач власником інструмента
  const isOwner = isAuthenticated && user && user.id === tool.owner;

  // Використовуємо хук для обробки зображень
  const { firstImage, extractImage } = useToolImages(tool);
  const [mainImage, setMainImage] = useState<string>(firstImage);

  // Якщо зображення не прийшло з першої відповіді — пробуємо підтягнути деталі інструмента (тільки на клієнті)
  useEffect(() => {
    const hasImage = mainImage && !mainImage.includes("Placeholder Image");
    if (hasImage) return;

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return;

    let cancelled = false;

    fetch(`${apiUrl}/api/tools/${tool._id}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled || !data) return;
        const found = extractImage(
          (data as any).images ?? (data as any).image ?? null
        );
        if (found) setMainImage(found);
      })
      .catch(() => {})
      .finally(() => {
        // якщо нічого не знайшли — залишиться плейсхолдер
      });

    return () => {
      cancelled = true;
    };
  }, [mainImage, tool._id]);

  const handleImageError = () => {
    setMainImage("/image/Placeholder Image.png");
  };

  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDeleteError(null);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (isDeleting) return;

    setIsDeleting(true);
    setDeleteError(null);

    try {
      await deleteTool(tool._id);
      // Мгновенно видаляємо інструмент зі стану
      removeTool(tool._id);
      setShowConfirm(false);
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Не вдалося видалити інструмент. Спробуйте ще раз.";

      setDeleteError(message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    if (isDeleting) return;

    setShowConfirm(false);
    setDeleteError(null);
  };

  // Формуємо зірки рейтингу (з підтримкою половини)
  const renderStars = (rating: number) => {
    const safeRating = Math.max(0, Math.min(5, rating ?? 0));
    const roundedHalf = Math.round(safeRating * 2) / 2; // крок 0.5
    const filledCount = Math.floor(roundedHalf);
    const hasHalf = roundedHalf - filledCount === 0.5;
    const emptyCount = 5 - filledCount - (hasHalf ? 1 : 0);

    const stars = [];

    for (let i = 0; i < filledCount; i++) {
      stars.push(
        <svg key={`filled-${i}`} className={styles.starIcon} aria-hidden="true">
          <use href="/svg/sprite.svg#star-filled" />
        </svg>
      );
    }

    if (hasHalf) {
      stars.push(
        <svg key={`half`} className={styles.starIcon} aria-hidden="true">
          <use href="/svg/sprite.svg#star-half" />
        </svg>
      );
    }

    for (let i = 0; i < emptyCount; i++) {
      stars.push(
        <svg key={`empty-${i}`} className={styles.starIcon} aria-hidden="true">
          <use href="/svg/sprite.svg#star" />
        </svg>
      );
    }

    return <div className={styles.rating}>{stars}</div>;
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={mainImage}
          alt={tool.name}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={handleImageError}
          unoptimized={mainImage.startsWith("/image/")}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{tool.name}</h3>
          <p className={styles.price}>{tool.pricePerDay} грн/доба</p>
        </div>

        {renderStars(tool.rating ?? 0)}

        <div className={styles.actions}>
          {isOwner ? (
            // Власник інструмента
            <>
              <Link
                href={`/tools/${tool._id}/edit`}
                className={styles.editButton}
              >
                Редагувати
              </Link>
              <button
                type="button"
                onClick={handleDelete}
                className={styles.deleteButton}
                aria-label="Видалити інструмент"
              >
                <svg className={styles.deleteIcon} aria-hidden="true">
                  <use href="/svg/sprite.svg#delete" />
                </svg>
              </button>
            </>
          ) : (
            // Не власник (або не авторизований)
            <Link href={`/tools/${tool._id}`} className={styles.detailsButton}>
              Детальніше
            </Link>
          )}
        </div>
      </div>

      <ConfirmationModal
        open={showConfirm}
        message="Ви впевнені, що хочете видалити оголошення?"
        isLoading={isDeleting}
        error={deleteError ?? undefined}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}
