declare module "next" {
  export type Metadata = {
    title?: string;
    description?: string;
    [key: string]: unknown;
  };
}

declare module "next/dist/lib/metadata/types/metadata-interface.js" {
  export type ResolvingMetadata = unknown;
  export type ResolvingViewport = unknown;
}

declare module "next/link" {
  import type { AnchorHTMLAttributes, ReactNode } from "react";
  export default function Link(props: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children?: ReactNode }): ReactNode;
}

declare module "next/image" {
  import type { ImgHTMLAttributes, ReactNode } from "react";
  export default function Image(props: ImgHTMLAttributes<HTMLImageElement> & { src: string; alt: string; fill?: boolean; priority?: boolean }): ReactNode;
}

declare module "next/navigation" {
  export function notFound(): never;
}
