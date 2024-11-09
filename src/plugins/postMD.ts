import { getEntry } from "astro:content";
import glob from "fast-glob"
import { dirname, sep, basename, extname, relative } from "node:path"

type Tree = {
    [k: string]: {
        children?: Tree,
        slug?: string
    }
};

let treePromise: ReturnType<typeof _getTree> | null = null;
let resultPromise: Record<string, ReturnType<typeof _getPostHierarchy>> = {};

export async function getPostHierarchy(postSlug: string) {
    if (!treePromise || import.meta.env.DEV)
        treePromise = _getTree();
    if (!resultPromise[postSlug] || import.meta.env.DEV)
        resultPromise[postSlug] = _getPostHierarchy(postSlug, await treePromise)
    return resultPromise[postSlug];
}

async function _getTree() {
    const tree: Tree = {};
    const posts = glob.globSync("./src/content/post/**/*.{md,mdx}");
    for (const path of posts) {
        const dir = dirname(relative("./src/content/", path)).split("/").slice(1);
        const base = basename(path, extname(path));
        const parts = [...dir, base];
        const slug = parts.join("/");

        let curr = tree;
        while (parts.length) {
            const part = parts.shift()!;
            if (parts.length) {
                curr[part] ??= {};
                curr = curr[part].children ??= {};
            } else {
                curr[part] ??= { slug };
            }
        }
    }

    return tree;
}

async function _getPostHierarchy(postSlug: string, tree: Tree) {
    const postParts = postSlug.split("/");
    
    let curr = tree;
    const postBread: {
        title: string,
        slug?: string
    }[] = [];
    while (postParts.length) {
        const part = postParts.shift()!;
        const slug = curr[part].slug
        curr = curr[part].children!;
        postBread.push({
            title: slug ? (await getEntry("post", slug))?.data.title : part,
            slug: slug
        });
    }

    const children = Object.values(curr ?? {}).filter(({ slug }) => !!slug).map(({ slug }) => getEntry("post", slug!));

    return {
        postBread: postBread.slice(1),
        children: (await Promise.all(children)).map(p => p!)
    }
}
/*
export function postMDPlugin() {
    return function (tree, file) {
        //console.log(file, file.data.astro.frontmatter, tree);
        const path = relative(file.cwd,file.history[0]);
        const dir = dirname(path);
        const base = basename(path, extname(path));
        //console.log(dir, base);
        const result = glob.globSync(`${dir}${sep}${base}${sep}*.{md,mdx}`,{cwd: file.cwd}).map(f=>{
            return relative(dir,f).slice(0,-(extname(f).length));
        });
        //console.log(result);
        file.data.astro.frontmatter.children = result;
    }
}*/