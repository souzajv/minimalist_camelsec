"use client";

import { useState } from "react";
import Loading from "./loading";
import BlobCursor from "./componets/blobcursor/blobcursor";
import Squares from "./componets/squares/squares";
import Header from "./componets/header/header";
import Title from "./componets/title/title";
import Globe from "./componets/globe/globe";

export default function Home() {
  const [loading, setLoading] = useState(true); 

  return (
    <>
      {loading ? ( 
        <Loading onComplete={() => setLoading(false)} />
      ) : (
        <main>
          <Squares />
          <Header />
          <section>
            <Title />
          </section>
          <Globe />
          <BlobCursor />
        </main>
      )}
    </>
  );
}
