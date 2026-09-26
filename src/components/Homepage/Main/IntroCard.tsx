import AvatarMeIcon from "@/components/icons/AvatarMeIcon";

const IntroCard = () => {
  return (
    <article className="flex flex-col pt-10 pb-5 px-2 sm:px-0 space-y-5 lg:max-w-[600px]">
      <div className="flex items-center space-x-5">
        <AvatarMeIcon></AvatarMeIcon>
        <h1 className="text-2xl font-medium tracking-[-0.01em] text-ink">
          Hey, I&apos;m Ely — Frontend Engineer
        </h1>
      </div>
      <p className="text-muted leading-relaxed">
        What do I do? I build and optimize frontend experiences at scale: React
        SPAs, Next.js apps, Core Web Vitals, bundle analysis, production
        TypeScript, design system implementation, performance profiling, and
        modern component architecture.
      </p>
    </article>
  );
};

export default IntroCard;
