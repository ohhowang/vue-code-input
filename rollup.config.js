import typescript from "rollup-plugin-typescript2";
import babel from "@rollup/plugin-babel";
import scss from "rollup-plugin-scss";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import vueJsx from "rollup-plugin-vue-jsx-compat";
import esbuild from "rollup-plugin-esbuild";
import { terser } from "rollup-plugin-terser";

const extensions = [".ts", ".js", ".tsx"];

export default {
  input: "src/components/index.ts",
  output: {
    globals: {
      vue: "Vue",
    },
    file: "dist/lib/index.js",
    format: "esm",
    name: "CodeInput",
  },
  plugins: [
    // typescript(),
    scss({ output: "dist/lib/style.css" }),
    vueJsx(),
    esbuild({
      jsxFactory: "vueJsxCompat",
    }),
    resolve({ mainFields: ["module", "main", "browser"] }),
    commonjs({ extensions, sourceMap: true }),
    babel({
      babelHelpers: "bundled",
      extensions,
      presets: ["@vue/babel-preset-jsx"],
    }),
    terser(),
  ],
};
