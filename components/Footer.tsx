import React from "react";

import { User } from "../types/User";
import SocialList from "./SocialList";

type Props = {
  user: User;
};

const Footer = ({ user }: Props) => (
  <footer className="mt-auto text-center py-8 text-gray-lightest w-full bg-gray-darker">
    <SocialList user={user} />
    <div className="mt-10 text-sm">
      Made in Austin <span className="pr-0.5">🌎</span> by
      <a className="underline pl-1" href={user.twitter}>
        danielrobertson
      </a>
    </div>
  </footer>
);

export default Footer;
