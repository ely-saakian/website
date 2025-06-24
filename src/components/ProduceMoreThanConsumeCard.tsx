import { useEffect, useRef } from "react";

const ProduceMoreThanConsumeCard: React.FC = () => {
  return (
    <article className="relative rounded-xl overflow-hidden">
      {/* Animated border */}
      <div className="absolute inset-0 rounded-xl p-[2px]">
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            background: `conic-gradient(from var(--angle), #a855f7 0deg, transparent 60deg, transparent 300deg, #a855f7 360deg)`,
            animation: "rotate 3s linear infinite",
          }}
        />
      </div>

      {/* Content container */}
      <div className="relative z-10 p-10 flex items-center justify-center m-[2px] rounded-xl bg-white dark:bg-gray-900">
        <h2
          className="text-2xl font-bold animate-gradient-text"
          style={{
            backgroundImage:
              "linear-gradient(to right, #a855f7, #9333ea, #7c3aed, #6d28d9, #7c3aed, #9333ea, #a855f7)",
            backgroundSize: "200% auto",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "gradient 3s ease infinite",
          }}
        >
          produce &gt; consume
        </h2>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes rotate {
          from {
            --angle: 0deg;
          }
          to {
            --angle: 360deg;
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @property --angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }
      `}</style>
    </article>
  );
};

export default ProduceMoreThanConsumeCard;
