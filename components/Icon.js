import Image from "next/image";
import * as React from "react";

const icons = Object.freeze({
  twitter: { icon: "/twitter.png" },
  linkedin: { icon: "/linkedin.png" },
  instagram: { icon: "/instagram.png" },
  github: { icon: "/github.png" },
  soundcloud: { icon: "/soundcloud.png" },
  email: { icon: "/email.png" }
});

const Icon = ({ name, size = 18, ...others }) => (
  <div {...others}>
    <Image
      src={icons[name].icon}
      alt={name}
      width={size}
      height={size}
    />
  </div>
);
export default Icon;
