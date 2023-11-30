import hljs from "highlight.js/lib/core";
import "highlight.js/styles/github-dark-dimmed.css";
import javascript from "highlight.js/lib/languages/javascript";
hljs.registerLanguage("javascript", javascript);

const highlightedCode = hljs.highlight(
  `
import express from "express";

const app = express();

app.get("/", (_, res) => res.send({ message: "Hello, this is get response" }));
app.post("/", (_, res) => res.json({ message: "Hello, this is post response" }));
app.put("/", (_, res) => res.send({ message: "Hello, this is put response" }));
app.delete("/", (_, res) => res.send({ message: "Hello, this is delete response" }));
app.patch("/", (_, res) => res.send({ message: "Hello, this is patch response" }));

app.listen(5000);
  `,
  { language: "javascript" }
).value;

const Express = () => {
  return (
    <div className="flex flex-col">
      <div className="p-8 flex flex-col gap-4">
        <div className="bg-base-200 rounded-2xl p-8">
          <pre>npm install express</pre>
          <pre>npm install nodemon --save-dev</pre>
        </div>
        <div className="bg-base-200 rounded-2xl p-8">
          <pre className="overflow-auto" dangerouslySetInnerHTML={{ __html: highlightedCode }} />
        </div>
        <div className="bg-base-200 rounded-2xl p-8">
          <pre>npm run dev</pre>
        </div>
      </div>
    </div>
  );
};

export default Express;
