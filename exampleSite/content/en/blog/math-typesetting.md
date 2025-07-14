---
author: Hugo Authors
title: Math Typesetting
date: 2025-05-07
description: A brief guide to authoring math equations
thumbnail: https://picsum.photos/id/1015/400/250
---

The theme now supports server side rendering of math equations via hugo's built-in KaTeX rendering engine.
No manual activation is needed, you can start using LaTeX math expressions in your Markdown content right away.

### Prerequisites

Please enable and configure the [passthrough extension](https://gohugo.io/configuration/markup/#passthrough) in the Hugo configuration file:

```yaml {filename="hugo.yaml"}
markup:
  goldmark:
    extensions:
      passthrough:
        delimiters:
          block: [['\[', '\]'], ['$$', '$$']]
          inline: [['\(', '\)']]
        enable: true
```

### Examples

Both inline and separate paragraph LaTeX math expressions are supported in the Markdown content.

### Inline math

```markdown {filename="page.md"}
Inline math: \(\varphi = \dfrac{1+\sqrt5}{2}= 1.6180339887…\)
```
will be rendered as:

Inline math: \(\varphi = \dfrac{1+\sqrt5}{2}= 1.6180339887…\)

### Block math

```markdown {filename="page.md"}
$$\varphi = 1+\frac{1} {1+\frac{1} {1+\frac{1} {1+\cdots} } }$$
```

will be rendered as:

$$\varphi = 1+\frac{1} {1+\frac{1} {1+\frac{1} {1+\cdots} } }$$


### Supported functions

**Note:** Use the online reference of [Supported TeX Functions](https://katex.org/docs/supported.html) and the [support table](https://katex.org/docs/support_table.html) for reference.
