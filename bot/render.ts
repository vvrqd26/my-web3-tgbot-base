// @deno-types=npm:@types/node-telegram-bot-api
import Bot, { Message } from "npm:node-telegram-bot-api";
// @deno-types=npm:@types/react
import {
  FC,
  isValidElement,
  JSXElementConstructor,
  PropsWithChildren,
  ReactElement,
  ReactNode,
} from "npm:react";

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
  o: ReactElement<PropsWithChildren, string | JSXElementConstructor<any>>,
) => {
  const { type, props } = o;
  if (typeof type === "string") {
    return renderHTMLTag(type, props);
  }
  return renderComponent(type, props);
};

// deno-lint-ignore no-explicit-any
function renderHTMLTag(type: string, props: PropsWithChildren<any>): string {
  type TGHTMLTag =
    | "div"
    | "a"
    | "b"
    | "strong"
    | "i"
    | "em"
    | "u"
    | "ins"
    | "s"
    | "strike"
    | "del"
    | "span"
    | "tg-emoji"
    | "tg-spoiler"
    | "code"
    | "pre";

  switch (type) {
    case "div":
      return `${renderChildren(props.children)}\n`;
    case "a":
      return `<a href="${props.href}">${renderChildren(props.children)}</a>`;
    default:
      return  `<${type}>${renderChildren(props.children)}<${type}/>`;
  }
}

function renderChildren(children: ReactNode): string {
  if (Array.isArray(children)) {
    return children.map(render).join("");
  }
  return render(children);
}
function renderComponent(
  node: JSXElementConstructor<any>,
  props: unknown,
): string {
  const o = (node as FC)(props as any);
  return render(o);
}
