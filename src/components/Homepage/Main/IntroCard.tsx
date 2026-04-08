import AvatarMeIcon from "@/components/icons/AvatarMeIcon";

const IntroCard = () => {
  return (
    <article className="flex flex-col p-10 space-y-5">
      <div className="flex items-center space-x-5">
        <AvatarMeIcon></AvatarMeIcon>
        <h1 className="text-2xl font-medium text-dark dark:text-white">
          Hey, I&apos;m Ely — Senior React Engineer
        </h1>
      </div>
      <p className="text-gray-500 dark:text-white">
        Building and optimizing frontend experiences at scale: React SPAs,
        Next.js apps, Core Web Vitals, bundle analysis, production TypeScript,
        design system implementation, performance profiling, and modern
        component architecture.
      </p>
    </article>
  );
};

export default IntroCard;
