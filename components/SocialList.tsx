import React from "react";
import Link from "next/link";
import classnames from "classnames";

import Twitter from "../components/icons/twitter.svg";
import Linkedin from "../components/icons/linkedin.svg";
import Instagram from "../components/icons/instagram.svg";
import Github from "../components/icons/github.svg";
import Soundcloud from "../components/icons/soundcloud.svg";
import { User } from "../types/User";

const SOCIAL_ICONS = [
  {
    name: "twitter",
    icon: <Twitter aria-hidden="true" height="25" width="25" />
  },
  {
    name: "linkedin",
    icon: <Linkedin aria-hidden="true" height="25" width="25" />
  },
  {
    name: "instagram",
    icon: <Instagram aria-hidden="true" height="25" width="25" />
  },
  {
    name: "github",
    icon: <Github aria-hidden="true" height="25" width="25" />
  },
  {
    name: "soundcloud",
    icon: <Soundcloud aria-hidden="true" height="25" width="25" />
  }
];

type Props = {
  user: User;
  className?: string;
};

function SocialList({ user, className }: Props) {
  return (
    <div className={classnames("flex", className)}>
      {SOCIAL_ICONS.map((social) => (
        <Link
          className="mx-3 first:ml-0 last:mr-0 fill-gray-lightest hover:fill-gray-400"
          key={social.name}
          href={user[social.name]}
          target="_blank"
          rel="noopener noreferrer"
        >
          {social.icon}
          <span className="sr-only">{social.name}</span>
        </Link>
      ))}
    </div>
  );
}

export default SocialList;
