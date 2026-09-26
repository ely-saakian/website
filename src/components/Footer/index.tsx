const Footer = () => {
  return (
    <footer>
      <p className="text-sm text-muted text-center p-12">
        Made with{" "}
        <a
          className="text-text underline underline-offset-3 hover:text-accent"
          href="https://nextjs.org/"
          rel="noreferrer"
          target="_blank"
        >
          Next.js
        </a>
        , deployed on{" "}
        <a
          className="text-text underline underline-offset-3 hover:text-accent"
          href="https://vercel.com/"
          rel="noreferrer"
          target="_blank"
        >
          Vercel
        </a>
        .
      </p>
    </footer>
  );
};

export default Footer;
