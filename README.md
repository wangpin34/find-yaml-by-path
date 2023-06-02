# find-yaml-by-path

This repo show case how to find line number of element in `YAML` file.

这个项目展示了如何在 `YAML` 中查找 `path` 对应的行号。

## 为什么会有这个项目？

<blockquote class="twitter-tweet"><p lang="zh" dir="ltr">2. <a href="https://t.co/LMMnHK4eBx">https://t.co/LMMnHK4eBx</a>， 它为每个 yaml element 保存了start_line, end_line，完美符合我的需求。唯一的问题是，它可能不支持所有的 yaml 规范。比如已经测出的，不支持 <a href="https://t.co/schWx98QiI">https://t.co/schWx98QiI</a>。另外，它是 python，那就势必要 wasm。<br>当然，也可以花时间用 js copy 一份（AI？？）。 <a href="https://t.co/OlcmmlSt3D">pic.twitter.com/OlcmmlSt3D</a></p>&mdash; 王师傅 penn (@dapengwg) <a href="https://twitter.com/dapengwg/status/1661298817428516865?ref_src=twsrc%5Etfw">May 24, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## 使用了那些技术？

- https://pypi.org/project/strictyaml/ python pkg，用于 查找 line number
- https://pyodide.org/en/stable/ python runtime，用于在浏览器里运行 python
- https://codemirror.net/5/ 代码编辑器，这样就可以在浏览器里编辑 yaml，测试 find line number
- UI & UX [preact](https://preactjs.com/), [tailwindcss](https://tailwindcss.com/), [daisyui](https://daisyui.com/)

## LICENSE

MIT
