contextAdaptive
===============

Creating re-usable UI components that are self-aware of their context within a page is difficult. For example, creating a navigation component that will automatically change layout as its container gets smaller or changes ratio (regardless of media queries) is almost impossible.

The goal of this library is to make it easy to write simple context-relevant css selectors that help define the appearance of individual ui components.

## Examples

```css
ul.nav li {
  display: block;
}

// float each navigation item left if we have a large width and small height
section[min-width~="40em"][min-height~="5em"] ul.nav li {
  float: left;
}

// alternatively you can use the layout shortcuts provided
section[layout~="text-row-long"] ul.nav li {
  float: left;
}

// show in rows as long as the container is under 40em wide and at least 20em tall
section[max-width~="40em"][min-height~="20em"] ul.nav li {
  float: none;
}
```


## Layout Shortcuts

```css
section[layout~="option"] {
  
}
```

* `landscape` — section is wider than it is long
* `portrait` — section is taller than it is wide
* `picture` — section has a ratio no greater than `1.85:1` or `1:1.85` (common wide-screen)
* `row` — section is at least 4x wider than it is high
* `column` — section is taller than it is wide
* `text-row` — section is in the height range of `1rem` to `4rem`
* `text-row-long` — section is in the height range of `1rem` to `4rem` and at least `30rem` wide.



## Size Queries

Available measurements (in `em`):
```json
[1,2,3,4,5,10,20,30,40,50,60,70,80,90,100]
```

* `[min-width~="10em"]` — section is at least `10em` wide
* `[max-width~="60em"]` — section is no more than `60em` wide
* `[min-height~="1em"]` — section is at least `1em` high
* `[max-height~="10em"]` — section is no more than `10em` high


## Usage

```js
$(function(){
  $("section").contextAdaptive();
  $(window).on('resize',function(){
    $("section").contextAdaptive();
  })
})
```

