const Footer = () => {
  return (
    <footer>
      <p className="text-sm text-gray-600 text-center p-12 dark:text-white">
        Made with{" "}
        <a
          className="underline"
          href="https://nextjs.org/"
          rel="noreferrer"
          target="_blank"
        >
          Next.js
        </a>
        , deployed on{" "}
        <a
          className="underline"
          href="https://vercel.com/mailbrew"
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
