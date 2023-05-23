import { useRouter } from "next/router";

interface ProfilePageProps {
  id: string;
}

const ProfilePage = ({ id }: ProfilePageProps) => {
  const router = useRouter();

  return (
    <div className="flex w-[100%] flex-col px-4 py-3">
      Profile ID: {router.query?.id}
    </div>
  );
};

export default ProfilePage;
