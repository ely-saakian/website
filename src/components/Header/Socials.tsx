import LinkedInIcon from "@/components/icons/LinkedInIcon";
import GitHubIcon from "@/components/icons/GitHubIcon";
import MailIcon from "@/components/icons/MailIcon";

const Socials = () => {
  return (
    <div className="flex items-center gap-1">
      <a
        href="https://github.com/ely-saakian"
        rel="noreferrer"
        target="_blank"
        title="My Github"
        aria-label="GitHub"
        className="icon-btn"
      >
        <GitHubIcon />
      </a>
      <a
        href="https://www.linkedin.com/in/ely-saakian/"
        rel="noreferrer"
        target="_blank"
        title="My LinkedIn"
        aria-label="LinkedIn"
        className="icon-btn"
      >
        <LinkedInIcon />
      </a>
      <a
        href="mailto:ely@elysaakian.com"
        rel="noreferrer"
        target="_blank"
        title="Shoot an Email"
        aria-label="Email"
        className="icon-btn"
      >
        <MailIcon />
      </a>
    </div>
  );
};

export default Socials;
