import postcssNesting from "postcss-nesting";
import postcssImport from "postcss-import";
import tailwindCSS from "tailwindcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";

export default {
    plugins: [
        postcssNesting,
        postcssImport,
        tailwindCSS,
        autoprefixer,
        process.env.NODE_ENV === "production" ? cssnano : undefined,
    ],
}