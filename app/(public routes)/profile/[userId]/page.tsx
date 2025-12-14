import styles from "./ProfilePage.module.css";

import UserProfile from "@/components/profile/UserProfile/UserProfile";
import ProfilePlaceholder from "@/components/profile/ProfilePlaceholder/ProfilePlaceholder";
import ToolsGrid from "@/components/tools/ToolsGrid/ToolsGrid";
import { getPublicUserById, getUserToolsByUserId } from "@/lib/api/users";

type PageProps = {
  params: Promise<{ userId: string }>;
};

export const dynamic = "force-dynamic";

export default async function ProfilePage({ params }: PageProps) {
  const { userId } = await params;

  const [user, tools] = await Promise.all([
    getPublicUserById(userId),
    getUserToolsByUserId(userId),
  ]);

  return (
    <main className={styles.page}>
      <div className={styles.container}>

        <div className={styles.profileTop}>
          <UserProfile name={user.name} />
        </div>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Інструменти</h2>

          {tools.length > 0 ? (
            <ToolsGrid tools={tools} />
          ) : (
            <ProfilePlaceholder />
          )}
        </section>
      </div>
    </main>
  );
}
