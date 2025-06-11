import AvatarMeIcon from "../../icons/AvatarMeIcon";

const IntroCard = () => {
  return (
    <article className="flex flex-col p-10 space-y-5">
      <div className="flex items-center space-x-5">
        <AvatarMeIcon></AvatarMeIcon>
        <h1 className="text-2xl font-medium text-dark dark:text-white">
          Hey, I’m Ely and I am a full-stack developer.
        </h1>
      </div>
      <p className="text-gray-500 dark:text-white">
        Currently a software engineer at Amazon. With my passion for coding I’m
        here to share the things I learn along my path to being the best at what
        I do. Cheers!
      </p>
    </article>
  );
};

export default IntroCard;
