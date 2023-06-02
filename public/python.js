async function main() {
  let pyodide = await loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.20.0/full/",
  });

  await pyodide.loadPackage("micropip");
  await pyodide.runPythonAsync(`import micropip
print('Hello, world from the browser!')
async def init():
  await micropip.install('strictyaml')
  package_list = micropip.list()
  print(package_list)
init()
`);

  await pyodide.runPythonAsync(`from strictyaml import Map, Str, YAMLValidationError, load
def find(yaml, path):
  yamlObj = load(yaml)
  currentNode = yamlObj
  try:
    for key in path:
      if currentNode[key] is None:
        return None
      currentNode = currentNode[key]
    return currentNode
  except KeyError:
    print('key error')
    return None
  except IndexError:
    print('index error')
    return None
  except Exception as e:
    print(e)
    return None
      `);
  const find = pyodide.globals.get("find");
  if (!("python" in window)) {
    window.python = {};
  }
  window.python.find = find;
}

main();
