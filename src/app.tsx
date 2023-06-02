import "highlight.js/styles/base16/materia.css";
import { ChangeEvent } from "preact/compat";
import { useCallback, useState } from "preact/hooks";
import AlertMgmt, { alert } from "./alert-mgmt";
import "./app.css";
import YamlEditor from "./yaml-editor";

const YAML_FOR_GUIDE = `# Yaml for Guide
first_name: penn
last_name: wang
email: guyusay@gmail.com
experiences:
  - name: one peace
    description: 10 year
  - genshen impact: 2.5 year
    description: the first phone game I like the most
location: Shanghai
social:
  twitter: "@dapengwg"
  github: "@wangpin34"
`;

export function App() {
  //const [initialYaml] = useAsyncData(loadYaml, []);
  const [yaml, setYaml] = useState(YAML_FOR_GUIDE);
  const onYamlChange = useCallback((next: string) => {
    setYaml(next);
  }, []);

  const [path, setPath] = useState("social.twitter");
  const [startLine, setStartLine] = useState(-1);

  const handleFind = useCallback(() => {
    //@ts-ignore
    if (window.python?.find) {
      const pathNode = path.split(".");
      const pathForPath = [];
      for (const n of pathNode) {
        if (/^\d+$/.test(n)) {
          pathForPath.push(parseInt(n));
        } else {
          pathForPath.push(n);
        }
      }
      //@ts-ignore
      const node = window.python?.find(yaml, pathForPath);
      setStartLine(node?.start_line ?? -1);
    } else {
      alert({
        type: "warning",
        id: "find-failed",
        description: "Not ready. Please try later.",
      });
    }
  }, [path, yaml]);

  return (
    <>
      <div className="w-full h-full grid grid-cols-2">
        <YamlEditor
          initialYaml={YAML_FOR_GUIDE ?? ""}
          onChange={onYamlChange}
        />
        <div className="container bg-gray-300 flex justify-center items-center">
          <div className="bg-white p-4 rounded-md flex flex-col">
            <h1 className="text-center">Find the line number</h1>
            <div class="form-control w-full max-w-xs">
              <label class="label">
                <span class="label-text">Path</span>
              </label>
              <input
                type="text"
                placeholder="Input the path of the element you want to find"
                class="input input-bordered w-full max-w-xs"
                value={path}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  //@ts-ignore
                  setPath(e.target?.value)
                }
              />
            </div>
            <button className="btn btn-primary mt-2" onClick={handleFind}>
              Find
            </button>
            <div class="collapse bg-gray-50 mt-4">
              <input type="radio" name="my-accordion-1" checked="checked" />
              <div class="collapse-title text-base font-medium">About Path</div>
              <div class="collapse-content">
                Path sytax: <br />
                object property: `social.twitter` <br />
                array element: `experiences.0`
                <br />
                Since
              </div>
            </div>
            <div class="divider">Results</div>
            <p>{startLine > -1 ? startLine : "N/A"}</p>
          </div>
        </div>
      </div>
      <AlertMgmt />
    </>
  );
}
