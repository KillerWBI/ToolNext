import { ToolGallery } from "@/components/tools/ToolGallery/ToolGallery";
import { ToolInfoBlock } from "@/components/tools/ToolInfoBlock/ToolInfoBlock";
import css from "./page.module.css";

interface ToolDetailsProps {
  params: Promise<{ id: string }>;
}

export default async function DetailsPage({ params }: ToolDetailsProps) {
  const { id } = await params;
  console.log(id);
  return (
    <div className="container">
      <div className={css.detailsPage}>
        <ToolGallery />
        <ToolInfoBlock />
      </div>
    </div>
  );
}
