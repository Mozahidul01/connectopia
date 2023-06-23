"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { FC } from "react";

const Output = dynamic(
  async () => (await import("editorjs-react-renderer")).default,
  {
    ssr: false,
  }
);

interface EditorOutputProps {
  content: any;
}

const renderers = {
  image: CustomImageRenderer,
  code: CustomCodeRenderer,
};

const EditorOutput: FC<EditorOutputProps> = ({ content }) => {
  return (
    <Output
      data={content}
      style={style}
      className="text-sm text-gray-900 dark:text-gray-500"
      renderers={renderers}
    />
  );
};

function CustomImageRenderer({ data }: any) {
  const src = data.file.url;

  return (
    <div className="relative w-full min-h-[15rem]">
      <Image
        alt="content-image"
        className="object-contain"
        fill
        src={src}
      />
    </div>
  );
}

function CustomCodeRenderer({ data }: any) {
  return (
    <pre className="bg-gray-800 rounded-md p-4">
      <code className="text-gray-100 text-sm">{data.code}</code>
    </pre>
  );
}

const style = {
  paragraph: {
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    paddingTop: "0.725rem",
  },
  header: {
    h1: {
      fontSize: "1.5rem",
      fontWeight: "700",
    },

    h2: {
      fontSize: "1.25rem",
      fontWeight: "600",
    },
  },

  list: {
    container: {
      listStyleType: "disc",
      padding: "0.25rem 0.25rem",
      margin: "0 0.5rem",
    },
    listItem: {
      paddingTop: "0.5rem",
      marginLeft: "0.725rem",
    },
  },
  table: {
    table: {},
    tr: {},
    th: {},
    td: {},
  },
  quote: {
    container: {},
    content: {},
    author: {},
    message: {},
  },
  warning: {
    icon: {
      width: "1.5rem",
    },
    title: {
      marginRight: "0.625rem",
    },
    message: {
      textAlign: "left",
    },
  },
};

export default EditorOutput;
