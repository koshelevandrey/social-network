import React from "react";
import userDefaultImage from "../images/userDefault.png";

interface ProfileImageProps {
  imageSrc?: string | null;
}

export const ProfileImage = ({ imageSrc }: ProfileImageProps) => {
  const userImage = imageSrc || userDefaultImage.src;

  return (
    <img
      src={userImage}
      className="block aspect-square max-w-full rounded-[50%] bg-white"
      alt=""
    />
  );
};
