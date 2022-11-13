import React, { useState } from "react";

import Head from "next/head";
import { Spinner } from "@chakra-ui/react";
// import ResizeTextarea from "react-textarea-autosize";
import { Textarea } from "@chakra-ui/react";
import styles from "./index.module.css";

export default function Home() {
  const [promptInput, setPromptInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: promptInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setLoading(false);
    // setModelOutput(data.result);
    setPromptInput("");
  }

  const handleChange = (e) => {
    setResult(e.target.value);
  };

  // const AutoResizeTextarea = React.forwardRef((props, ref) => {
  //   return (
  //     <Textarea
  //       id="resultTextArea"
  //       value={result}
  //       onChange={handleChange}
  //       resize="vertical"
  //       placeholder="Welcome :)"
  //       size="md"
  //       as={ResizeTextarea}
  //     />
  //   );
  // });

  // const setModelOutput = (result) => {
  //   document.getElementById("resultTextArea").value = result;
  // };

  return (
    <div>
      <Head>
        <title>USC Essay Writer</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>USC Essay Writer</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Enter an essay prompt"
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
          />
          <input type="submit" value="Generate Essay" />
        </form>
      </main>
      <div className={styles.resultTextArea}>
        {loading ? (
          <div className={styles.spinner}>
            <Spinner />
          </div>
        ) : (
          <Textarea
            id="resultTextArea"
            value={result}
            onChange={handleChange}
            resize="vertical"
            placeholder="Welcome :)"
            size="md"
            minHeight="400px"
          />
        )}
      </div>
    </div>
  );
}
