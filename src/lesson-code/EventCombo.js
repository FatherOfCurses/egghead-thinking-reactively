import {map, take, takeUntil, takeWhile, filter, skip, exhaustMap} from "rxjs/operators";
import {fromEvent, timer} from "rxjs";

/*
  whenever somebody starts a combo
    keep taking(listening) for the rest of the combo keys
      until the timer has run out
      while the combo is being followed correctly
      and until we got (comboLength - 1) keys back
*/

const anyKeyPresses = fromEvent(document, "keypress").pipe(
    map(event => event.key)
);

function keyPressed(key) {
    return anyKeyPresses.pipe(filter(pressedKey => pressedKey === key));
}

export function keyCombo(keyCombo) {
    const comboInitiator = keyCombo[0];
    return keyPressed(comboInitiator).pipe(
        exhaustMap(() => {
            return anyKeyPresses.pipe(
                takeUntil(timer(3000)),
                takeWhile((keyPressed, index) => keyCombo[index + 1] === keyPressed),
                skip(keyCombo.length - 2),
                take(1)
            );
        })
    );
}


