import AvatarMeIcon from "../../icons/AvatarMeIcon";

const IntroCard = () => {
  return (
    <article className="flex flex-col p-10 space-y-5">
      <div className="flex items-center space-x-5">
        <AvatarMeIcon></AvatarMeIcon>
        <h1 className="text-2xl font-medium text-dark dark:text-white">
          Hey, I&apos;m Ely and I&apos;m a full-stack developer.
        </h1>
      </div>
      <p className="text-gray-500 dark:text-white">
        Super passionate about building products that make people&apos;s lives
        better. Here I&apos;m hoping to share useful things I&apos;ve learned
        along the way.
      </p>
      <p className="text-gray-500 dark:text-white">
        Currently building my first mobile app with React Native and Expo
        outside of my day job.
      </p>
      <p className="text-gray-500 dark:text-white">
        If lifting weights and writing code excites you as much as it does me,
        then feel free to stick around and explore. Cheers!
      </p>
    </article>
  );
};

export default IntroCard;
