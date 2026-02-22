import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

export function CodeBlock({
  value,
  lang = "text",
}: {
  value: string;
  lang?: string;
}) {
  return (
    <div className="relative group my-4 overflow-x-auto rounded-lg">
      <SyntaxHighlighter
        language={lang}
        style={oneDark}
        customStyle={{ margin: 0, borderRadius: "0.5rem" }}
        showLineNumbers={value.split("\n").length > 5}
        PreTag="pre"
        codeTagProps={{ className: "text-sm" }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
}
