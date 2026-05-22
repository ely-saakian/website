import AvatarMeIcon from "@/components/icons/AvatarMeIcon";

const IntroCard = () => {
  return (
    <article className="flex flex-col p-10 space-y-5 lg:max-w-[600px]">
      <div className="flex items-center space-x-5">
        <AvatarMeIcon></AvatarMeIcon>
        <h1 className="text-2xl font-medium text-dark dark:text-white">
          Hey, I&apos;m Ely — Frontend Engineer
        </h1>
      </div>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
        What do I do? I build and optimize frontend experiences at scale: React
        SPAs, Next.js apps, Core Web Vitals, bundle analysis, production
        TypeScript, design system implementation, performance profiling, and
        modern component architecture.
      </p>
    </article>
  );
};

export default IntroCard;
