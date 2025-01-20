import React, { useRef, useEffect, useContext } from "react";
import { CSSTransition as ReactCSSTransition } from "react-transition-group";

// Context for managing parent transitions
const TransitionContext = React.createContext({
  parent: {},
});

// Hook to check if it's the initial render
function useIsInitialRender() {
  const isInitialRender = useRef(true);
  useEffect(() => {
    isInitialRender.current = false;
  }, []);
  return isInitialRender.current;
}

// CSSTransition wrapper for adding/removing classes during transitions
function CSSTransition({
  show,
  enter = "",
  enterStart = "",
  enterEnd = "",
  leave = "",
  leaveStart = "",
  leaveEnd = "",
  appear,
  unmountOnExit = false,
  tag = "div",
  children,
  ...rest
}) {
  const enterClasses = enter.split(" ").filter(Boolean);
  const enterStartClasses = enterStart.split(" ").filter(Boolean);
  const enterEndClasses = enterEnd.split(" ").filter(Boolean);
  const leaveClasses = leave.split(" ").filter(Boolean);
  const leaveStartClasses = leaveStart.split(" ").filter(Boolean);
  const leaveEndClasses = leaveEnd.split(" ").filter(Boolean);
  const nodeRef = useRef(null);
  const Component = tag;

  const addClasses = (node, classes) => {
    if (classes.length) node.classList.add(...classes);
  };

  const removeClasses = (node, classes) => {
    if (classes.length) node.classList.remove(...classes);
  };

  return (
    <ReactCSSTransition
      in={show}
      appear={appear}
      unmountOnExit={unmountOnExit}
      nodeRef={nodeRef}
      addEndListener={(done) => {
        nodeRef.current?.addEventListener("transitionend", done, false);
      }}
      onEnter={() => {
        addClasses(nodeRef.current, [...enterClasses, ...enterStartClasses]);
      }}
      onEntering={() => {
        removeClasses(nodeRef.current, enterStartClasses);
        addClasses(nodeRef.current, enterEndClasses);
      }}
      onEntered={() => {
        removeClasses(nodeRef.current, [...enterEndClasses, ...enterClasses]);
      }}
      onExit={() => {
        addClasses(nodeRef.current, [...leaveClasses, ...leaveStartClasses]);
      }}
      onExiting={() => {
        removeClasses(nodeRef.current, leaveStartClasses);
        addClasses(nodeRef.current, leaveEndClasses);
      }}
      onExited={() => {
        removeClasses(nodeRef.current, [...leaveEndClasses, ...leaveClasses]);
        if (unmountOnExit) nodeRef.current.style.display = "none";
      }}
    >
      <Component ref={nodeRef} {...rest}>
        {children}
      </Component>
    </ReactCSSTransition>
  );
}

// Main Transition component
function Transition({ show, appear, ...rest }) {
  const { parent } = useContext(TransitionContext);
  const isInitialRender = useIsInitialRender();
  const isChild = show === undefined;

  if (isChild) {
    return (
      <CSSTransition
        appear={parent.appear || !parent.isInitialRender}
        show={parent.show}
        {...rest}
      />
    );
  }

  return (
    <TransitionContext.Provider
      value={{
        parent: {
          show,
          isInitialRender,
          appear,
        },
      }}
    >
      <CSSTransition appear={appear} show={show} {...rest} />
    </TransitionContext.Provider>
  );
}

export default Transition;
