// @deno-types=npm:@types/react
import {
  FC,
  isValidElement,
  JSXElementConstructor,
  PropsWithChildren,
  ReactElement,
  ReactNode,
} from "npm:react";
import type { TGHTMLTag } from "./types.d.ts";

export const render = (node: ReactNode) => {
  if (node === undefined || node === null) {
    return "";
  }
  switch (typeof node) {
    case "string":
      return node;
    case "number":
      return node.toString() || "0";
    case "boolean":
      return node ? "true" : "false";
    default:
      return isValidElement(node) ? renderElement(node as any) : "";
  }
};

const renderElement = (
  o: ReactElement<PropsWithChildren, TGHTMLTag | JSXElementConstructor<PropsWithChildren<{href?:string}>>>,
) => {
  const { type, props } = o;
  if (typeof type === "string") {
    return renderHTMLTag(type, props);
  }
  return renderComponent(type, props);
};

function renderHTMLTag(type: TGHTMLTag, props: PropsWithChildren<{href?:string}>): string {


  switch (type) {
    case "div":
      return `\n${renderChildren(props.children)}\n`;
    case "a":
      return `<a href="${props.href}">${renderChildren(props.children)}</a>`;
    case "br":
        return `\n`
    case "address":
      return `<tg-spoiler>${renderChildren(props.children)}</tg-spoiler>`
    default:
      return  `<${type}>${renderChildren(props.children)}</${type}>`;
  }
}

function renderChildren(children: ReactNode): string {
  if (Array.isArray(children)) {
    return children.map(render).join("");
  }
  return render(children);
}
function renderComponent(
  node: JSXElementConstructor<PropsWithChildren<{href?:string}>>,
  props: unknown,
): string {
  const o = (node as FC)(props as PropsWithChildren<{href?:string}>);
  return render(o);
}