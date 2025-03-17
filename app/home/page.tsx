"use client";

import BlobCursor from "./componets/blobcursor/blobcursor";
import Squares from "./componets/squares/squares";
import Header from "./componets/header/header";
import Title from "./componets/title/title";
import Globe from "./componets/globe/globe";
// import Subtitle from "./componets/subtitle/subtitle";
// 1import Button from "./componets/button/button";

export default function Home() {

  return (
    <main>
      <Squares />
      <Header />
      <section>
        <Title />
      </section>
      <Globe />
      <BlobCursor />
    </main>
  );
}
