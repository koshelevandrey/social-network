import { useRouter } from "next/router";

const ProfilePage = () => {
  const router = useRouter();

  return (
    <div className="flex w-[100%] flex-col px-4 py-3">
      Profile ID: {router.query?.id}
    </div>
  );
};

export default ProfilePage;
