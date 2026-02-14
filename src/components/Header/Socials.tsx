import { MailIcon } from "@heroicons/react/outline";
import LinkedInIcon from "@/components/icons/LinkedInIcon";
import GitHubIcon from "@/components/icons/GitHubIcon";

const Socials = () => {
  return (
    <div className="flex items-center space-x-3">
      <a
        href="https://github.com/ely-saakian"
        rel="noreferrer"
        target="_blank"
        title="My Github"
      >
        <div className="icon-btn">
          <GitHubIcon></GitHubIcon>
        </div>
      </a>
      <a
        href="https://www.linkedin.com/in/ely-saakian/"
        rel="noreferrer"
        target="_blank"
        title="My LinkedIn"
      >
        <div className="icon-btn">
          <LinkedInIcon></LinkedInIcon>
        </div>
      </a>
      <a
        href="mailto:ely@elysaakian.com"
        rel="noreferrer"
        target="_blank"
        title="Shoot an Email"
      >
        <div className="icon-btn">
          <MailIcon className="h-6 w-6 text-black dark:text-white"></MailIcon>
        </div>
      </a>
    </div>
  );
};

export default Socials;
