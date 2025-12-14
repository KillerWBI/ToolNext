import styles from "./ToolsGrid.module.css";
import ToolCard from "@/components/tools/ToolCard/ToolCard";
import type { Tool } from "@/types/tool";

type Props = {
  tools: Tool[];
};

export default function ToolsGrid({ tools }: Props) {
  return (
    <div className={styles.grid}>
      {tools.map((tool, idx) => (
        <ToolCard
          key={(tool as any)._id ?? `${tool.name}-${idx}`}
          tool={tool as any}
        />
      ))}
    </div>
  );
}
