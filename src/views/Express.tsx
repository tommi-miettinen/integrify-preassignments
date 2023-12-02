import hljs from "highlight.js/lib/core";
import "highlight.js/styles/github-dark-dimmed.css";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
hljs.registerLanguage("json", json);
hljs.registerLanguage("javascript", javascript);

const highlightedCode = hljs.highlight(
  `import express from "express";

const app = express();

app.get("/", (_, res) => res.send({ message: "Hello, this is get response" }));
app.post("/", (_, res) => res.send({ message: "Hello, this is post response" }));
app.put("/", (_, res) => res.send({ message: "Hello, this is put response" }));
app.delete("/", (_, res) => res.send({ message: "Hello, this is delete response" }));
app.patch("/", (_, res) => res.send({ message: "Hello, this is patch response" }));

app.listen(5000);`,
  { language: "javascript" }
).value;

const jsonString = hljs.highlight(
  `"scripts": {
  "start": "node app.js",
  "dev": "nodemon app.js"
}`,
  { language: "javascript" }
).value;

const Express = () => {
  return (
    <div className="flex flex-col overflow-auto">
      <div className="p-8 pt-4 flex flex-col gap-4">
        <span className="p-4">Install the required dependencies.</span>
        <div className="bg-base-200 rounded-2xl p-8">
          <pre>npm install express</pre>
          <pre>npm install nodemon --save-dev</pre>
        </div>
        <span className="p-4">Create an app.js file to your project root and add the code.</span>
        <div className="bg-base-200 rounded-2xl p-8">
          <pre className="overflow-auto" dangerouslySetInnerHTML={{ __html: highlightedCode }} />
        </div>
        <span className="p-4">Add the scripts section to your package.json.</span>
        <div className="bg-base-200 rounded-2xl p-8">
          <pre className="overflow-auto" dangerouslySetInnerHTML={{ __html: jsonString }} />
        </div>
        <span className="p-4">Run the script.</span>
        <div className="bg-base-200 rounded-2xl p-8">
          <pre>npm run dev</pre>
        </div>
      </div>
    </div>
  );
};

export default Express;
