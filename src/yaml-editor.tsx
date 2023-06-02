import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/yaml/yaml.js";
import "codemirror/theme/material.css";
import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import "./yaml-editor.css";

export default function YamlEditor({
  initialYaml,
  onChange,
}: {
  initialYaml: string;
  onChange: (next: string) => void;
}) {
  const [editor, setEditor] = useState<CodeMirror.Editor>();
  const ref = useRef<HTMLDivElement>(null);
  const handleChange = useCallback(
    (instance: any) => {
      onChange(instance.getValue());
    },
    [onChange]
  );

  useEffect(() => {
    if (ref.current) {
      const editor = CodeMirror(ref.current!, {
        mode: {
          name: "yaml",
        },
        lineNumbers: true,
        theme: "material",
        value: initialYaml,
      });
      editor.on("change", handleChange);
      setEditor(editor);
      return () => {
        editor.off("change", handleChange);
      };
    }
  }, [handleChange]);

  useEffect(() => {
    if (!editor) return;
    editor?.getDoc().setValue(initialYaml);
  }, [initialYaml]);

  return <div className={`h-full yaml-editor`} ref={ref}></div>;
}
