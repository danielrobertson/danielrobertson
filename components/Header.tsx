import React from "react";
import Image from "next/image";

type Props = {
  headshot: string;
  title: string;
  name: string;
};

export default function Header({ headshot, title, name }: Props) {
  return (
    <header className="bg-blue-dark pb-8">
      <div className="container relative mx-auto flex flex-col items-center text-gray-lightest">
        <div className="my-8 h-20 w-20 lg:h-52 lg:w-52 relative">
          <Image
            className="rounded-full"
            src={`https:${headshot}`}
            alt="daniel"
            layout="fill"
            objectFit="cover"
            loading="eager"
          />
        </div>
        <h1 className="text-4xl lg:text-5xl">{name}</h1>
        <div className="mt-3 text-lg font-light text-center lg:text-2xl px-2 lg:py-2">
          {title}
        </div>
      </div>
    </header>
  );
}
