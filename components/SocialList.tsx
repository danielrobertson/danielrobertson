import React from "react";
import Link from "next/link";

import Twitter from "../components/icons/twitter.svg";
import Linkedin from "../components/icons/linkedin.svg";
import Instagram from "../components/icons/instagram.svg";
import Github from "../components/icons/github.svg";
import Soundcloud from "../components/icons/soundcloud.svg";
import { User } from "../types/User";

const SOCIAL_ICONS = [
  {
    name: "twitter",
    icon: <Twitter aria-hidden="true" height="30" width="30" />
  },
  {
    name: "linkedin",
    icon: <Linkedin aria-hidden="true" height="30" width="30" />
  },
  {
    name: "instagram",
    icon: <Instagram aria-hidden="true" height="30" width="30" />
  },
  {
    name: "github",
    icon: <Github aria-hidden="true" height="30" width="30" />
  },
  {
    name: "soundcloud",
    icon: <Soundcloud aria-hidden="true" height="30" width="30" />
  }
];

type Props = {
  user: User;
};

function SocialList({ user }: Props) {
  return (
    <div className="flex justify-center pt-3">
      {SOCIAL_ICONS.map((social) => (
        <Link key={social.name} href={user[social.name]}>
          <a
            className="mx-3 fill-gray-lightest hover:fill-gray-300"
            href={user[social.name]}
          >
            {social.icon}
            <span className="sr-only">{social.name}</span>
          </a>
        </Link>
      ))}
    </div>
  );
}

export default SocialList;
