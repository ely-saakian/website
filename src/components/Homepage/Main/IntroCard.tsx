import AvatarMeIcon from "@/components/icons/AvatarMeIcon";

const IntroCard = () => {
  return (
    <article className="flex flex-col pt-10 pb-5 px-2 sm:px-0 space-y-5 lg:max-w-[600px]">
      <div className="flex items-center space-x-5">
        <AvatarMeIcon></AvatarMeIcon>
        <h1 className="text-2xl font-medium tracking-[-0.01em] text-ink">
          Hey, I&apos;m Ely — Product Engineer
        </h1>
      </div>
      <p className="text-muted leading-relaxed">
        I build products end to end: product decisions, design, frontend,
        backend, and the release pipeline. Right now that&apos;s Gymento, a
        native iPhone and Apple Watch strength-training app I founded and took
        from a Next.js prototype to the App Store, with a type-safe TypeScript
        and Postgres API behind it.
      </p>
      <p className="text-muted leading-relaxed">
        Before that I spent nearly five years at Amazon as a SDE II, leading the
        frontend for a logistics dashboard. I work AI-natively with Claude Code
        + Cursor, which lets me ship fast.
      </p>
    </article>
  );
};

export default IntroCard;
