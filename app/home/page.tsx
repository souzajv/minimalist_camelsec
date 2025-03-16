"use client";

import BlobCursor from "./componets/blobcursor/blobcursor";
import Squares from "./componets/squares/squares";
import Title from "./componets/title/title";

export default function Home() {
  
  return (
    <main>
      <Squares />
      <Title />
      <BlobCursor />
    </main>
  );
}
