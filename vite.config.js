export default {
  root: "./",
  build: {
    outDir: "./dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: "index.html",
        watch: "mywatchlist.html",
        main: "main.js",
        mywatchlist: "mywatchlist.js",
      },
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
      },
    },
  },
};
