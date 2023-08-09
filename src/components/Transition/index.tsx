import { CSSProperties } from "react";
import {
  TransitionGroup,
  Transition as ReactTransition,
} from "react-transition-group";
const TIMEOUT = 200;

const getTransitionStyles = {
  entering: {
    position: `absolute`,
    opacity: 0,
    transform: `translateY(-50px)`,
  },
  entered: {
    transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    opacity: 1,
    transform: `translateY(0px)`,
  },
  exiting: {
    transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    opacity: 0,
    transform: `translateY(50px)`,
  },
  exited: {},
  unmounted: {},
};

const Transition = ({
  children,
  location,
}: {
  children: React.ReactNode;
  location: string;
}) => {
  return (
    <TransitionGroup className="relative">
      <ReactTransition
        key={location}
        timeout={{
          enter: TIMEOUT,
          exit: TIMEOUT,
        }}
      >
        {(status) => (
          <div
            style={{
              ...(getTransitionStyles[status] as CSSProperties),
            }}
          >
            {children}
          </div>
        )}
      </ReactTransition>
    </TransitionGroup>
  );
};

export default Transition;
