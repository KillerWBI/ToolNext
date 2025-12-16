import { Tool } from "@/types/tool";
import css from "./ToolInfoBlock.module.css";
import { PublicUser } from "@/types/user";

type ToolInfoBlockProps = {
  tool: Tool;
  owner: PublicUser;
};

export const ToolInfoBlock = async ({ tool, owner }: ToolInfoBlockProps) => {
  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>{tool.name}</h2>
      <p className={css.price}>{tool.pricePerDay} грн/день</p>
      <div className={css.userProfile}>
        <div className={css.userIcon}>
          <img src={owner.avatarUrl} alt="owner.name" />
        </div>
        <div className={css.userInfo}>
          <p className={css.userName}>{owner.name}</p>
          <button className={css.profileBtn} type="button">
            Переглянути профіль
          </button>
        </div>
      </div>
    </div>
  );
};
