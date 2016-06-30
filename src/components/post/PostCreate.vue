<template>
  <div class="container full-height">
    <h2>VueMarkdown Live Demo</h2>
    <div class="form-inline">
      <div class="checkbox">
        <label><input v-model="show" type="checkbox">show</label>
      </div>
      <div class="checkbox">
        <label><input v-model="html" type="checkbox">html</label>
      </div>
      <div class="checkbox">
        <label><input v-model="breaks" type="checkbox">breaks</label>
      </div>
      <div class="checkbox">
        <label><input v-model="linkify" type="checkbox">linkify</label>
      </div>
      <div class="checkbox">
        <label><input v-model="emoji" type="checkbox">emoji</label>
      </div>
      <div class="checkbox">
        <label><input v-model="typographer" type="checkbox">typographer</label>
      </div>
      <div class="checkbox">
        <label><input v-model="toc" type="checkbox">toc</label>
      </div>
    </div>
    <div id="toc"></div>
    <div class="row full-height">
      <div class="col-xs-6 full-height">
        <textarea class="source full-height" v-model="source">
# h1 Heading 8-)
## h2 Heading
### h3 Heading

## Horizontal Rules

___

---

***

## Typographic replacements

Enable typographer option to see result.

(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!....

!!!!!! ???? ,,  -- ---

"Smartypants, double quotes" and 'single quotes'


## Emphasis

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~


## Blockquotes


> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.


## Lists

Unordered

+ Create a list by starting a line with `+`, `-`, or `*`
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa


1. You can use sequential numbers...
1. ...or keep all the numbers as `1.`

Start numbering with offset:

57. foo
1. bar


## Code

Inline `code`

Indented code

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code


Block code "fences"

```
Sample text here...
```
Syntax highlighting

``` javascript
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```

``` go
package main

import "fmt"

func main() {
	fmt.Println("Hello, world!")
}
```

## Tables

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

Right aligned columns

| Option | Description |
| ------:| -----------:|
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

*[HTML]: Hyper Text Markup Language
        </textarea>
      </div>
      <section class="col-xs-6 full-height">
        <vue-markdown class="result-html full-height" :watches="['show','html','breaks','linkify','emoji','typographer','toc']"
          :source="source" :show="show" :html="html" :breaks="breaks" :linkify="linkify"
          :emoji="emoji" :typographer="typographer" :toc="toc" v-on:rendered="allRight"
          v-on:toc-rendered="tocAllRight" toc-id="toc"></vue-markdown>
      </section>
    </div>
  </div>

</template>

<script>
import VueMarkdown from 'vue-markdown';

export default {
  vuex: {
    actions: {
    },
  },
  components: {
    VueMarkdown,
  },
  data() {
    return {
      source: '',
      show: true,
      html: false,
      breaks: true,
      linkify: false,
      emoji: true,
      typographer: true,
      toc: false,
    };
  },
  ready() {
  },
  methods: {
    allRight(htmlStr) {
      console.log(htmlStr);
      console.log('markdown is parsed !');
    },
    tocAllRight(tocHtmlStr) {
      console.log('toc is parsed :', tocHtmlStr);
    },
  },
};
</script>

<style scoped>
html,
body,
.full-height {
  height:100%
}
body {
  overflow-x:hidden;
  padding-bottom:100px;
  background-color:#fbfbfb
}
</style>
