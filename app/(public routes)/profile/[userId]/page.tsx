import UserProfile from "@/components/profile/UserProfile/UserProfile";
import ProfilePlaceholder from "@/components/profile/ProfilePlaceholder/ProfilePlaceholder";
import { getPublicUserById } from "@/lib/api/users";

type PageProps = {
  params: Promise<{ userId: string }>;
};

export default async function ProfilePage({ params }: PageProps) {
  const { userId } = await params;

  const user = await getPublicUserById(userId);

  return (
    <main>
      <UserProfile name={user.name} />
      <ProfilePlaceholder />
    </main>
  );
}
