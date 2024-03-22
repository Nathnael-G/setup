import { Button } from "./components/ui/button";
import { useState } from "react";

export default function App() {
  return (
    <div className="flex justify-center m-10 flex-row">
      <Button> My first shadcn button</Button>
      <br />
      <div className="m-5">
        <h1>Hello</h1>
      </div>
    </div>
  );
}
