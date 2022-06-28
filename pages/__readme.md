### Note on modifying page extensions

- next.config change

```js
pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js", , "api.ts", "api.js"];
```

the .page and .api extensions added to files in the Pages directory so I could co-locate my test files inside the pages folder (without Next treating the test files like pages themselves). I know this goes against the general style convention, and I'm not sure if I'm keen on it, but I'll try it out for now.
