import React from "react";
import Image from "next/image";
import SocialList from "./SocialList";
import { User } from "../types/User";

type Props = {
  headshot: string;
  user: User;
};

const Header = ({ headshot, user }: Props) => (
  <header className="bg-blue-dark py-16 px-8 md:p-32">
    <div className="container mx-auto flex flex-col md:flex-row justify-center text-gray-lightest">
      <div className="h-40 w-40 mx-auto md:mx-0 md:h-56 md:w-56 mb-10 md:mb-0 lg:h-72 lg:w-72 relative flex-shrink-0">
        <Image
          className="rounded-full"
          src={`https:${headshot}`}
          alt="daniel"
          layout="fill"
          objectFit="cover"
          loading="eager"
        />
      </div>
      <div className="flex flex-col justify-center text-center md:text-left md:ml-10">
        <h1 className="text-4xl lg:text-6xl font-bold">
          {user.name}
        </h1>
        <div className="text-xl lg:text-3xl font-light">
          {user.title}
        </div>
        <SocialList user={user} className="mt-4 mx-auto md:mx-0" />
      </div>
    </div>
  </header>
);

export default Header;
