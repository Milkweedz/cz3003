import * as React from "react";
import Dice from "react-dice-roll";

export default function DiceApp({ handlerKey }: { handlerKey: string }) {
  return (
    <div className="DiceApp">
      <Dice size={100} onRoll={(value) => console.log(value)} />
    </div>
  );
}