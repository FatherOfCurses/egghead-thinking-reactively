import {
  existingTaskCompleted,
  newTaskStarted
} from "./TaskProgressService";
import {Observable} from "rxjs";


export function showLoadingStatus(source) {
  return (source) => {
    return new Observable((subscriber) => {
      // I'VE BEEN SUBSCRIBED TO
      newTaskStarted();
      const sourceSubscription = source.subscribe(subscriber);
      return () => {
        sourceSubscription.unsubscribe();
        existingTaskCompleted();
      }
    });
  }
}


//
// export function showLoadingStatus() {
//   return source => {
//     return new Observable(subscriber => {
//       newTaskStarted();
//       const sourceSubscription = source.subscribe(subscriber);
//       return () => {
//         sourceSubscription.unsubscribe();
//         existingTaskCompleted();
//       };
//     });
//   };
// }
//
export class PromiseWithLoadingProgress extends Promise {
  constructor(callback) {
    super((originalResolve, originalReject) => {
      const resolveSpy = (...args) => {
        originalResolve(...args);
        existingTaskCompleted();
      };
      const rejectSpy = (...args) => {
        originalReject(...args);
        existingTaskCompleted();
      };
      callback(resolveSpy, rejectSpy);
    });
    newTaskStarted();
  }
}
