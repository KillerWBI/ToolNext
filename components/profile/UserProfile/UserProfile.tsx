import styles from "./UserProfile.module.css";

type Props = {
  name: string;
};

function getInitial(name: string) {
  const trimmed = (name || "").trim();
  if (!trimmed) return "?";
  return trimmed[0].toUpperCase();
}

export default function UserProfile({ name }: Props) {
  return (
    <section className={styles.root} aria-label="User profile">
      <div className={styles.avatar} aria-hidden="true">
        {getInitial(name)}
      </div>

      <p className={styles.name}>{name}</p>
    </section>
  );
}
