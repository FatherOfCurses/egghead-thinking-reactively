import React from "react";
import Button from "./presentational/Button";
import { PromiseWithLoadingProgress } from "../lesson-code/Extensions";
import { newTaskStarted, existingTaskCompleted } from "../lesson-code/TaskProgressService";

const doVeryQuickWork = () => {
  newTaskStarted();
  new PromiseWithLoadingProgress(resolve => {
    setTimeout(() => {
      existingTaskCompleted();
      resolve();
    }, 300);
  });
};

const doAlmostQuickWork = () => {
  newTaskStarted();
  new PromiseWithLoadingProgress(resolve => {
    setTimeout(() => {
      existingTaskCompleted();
      resolve();
    }, 2200);
  });
};

const SlowExample = () => {
  return (
    <>
      <Button onClick={doVeryQuickWork}>QUICK task - 300ms</Button>
      <Button onClick={doAlmostQuickWork}>Almost quick task - 2200ms</Button>
    </>
  );
};

export default SlowExample;
