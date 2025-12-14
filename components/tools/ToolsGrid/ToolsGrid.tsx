// components/tools/ToolsGrid/ToolsGrid.tsx
import styles from "./ToolsGrid.module.css";
import ToolCard from "@/components/tools/ToolCard/ToolCard";
import type { Tool } from "@/types/tool";

type Props = {
  tools: Tool[];
};

export default function ToolsGrid({ tools }: Props) {
  return (
    <div className={styles.grid}>
      {tools.map((tool) => (
        <ToolCard key={tool._id ?? tool._id} tool={tool as any} />
      ))}
    </div>
  );
}
