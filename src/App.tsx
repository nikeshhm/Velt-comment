import React from "react";
import {
  VeltProvider,
  VeltComments,
  VeltInlineCommentsSection,
} from "@veltdev/react";

const VELT_API_KEY = "P9qe7gHZyUA9wZ5ZMPNj";

export default function App() {
  return (
    <VeltProvider apiKey={VELT_API_KEY}>
      <VeltComments />
      <section id="container-id">
        <div>Your Article</div>

        <VeltInlineCommentsSection targetInlineCommentElementId="container-id" />
      </section>
    </VeltProvider>
  );
}
