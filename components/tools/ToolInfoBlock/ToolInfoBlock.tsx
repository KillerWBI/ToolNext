import css from "./ToolInfoBlock.module.css";

export const ToolInfoBlock = () => {
  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Дриль алмазного свердління</h2>
      <p className={css.price}>900 грн/день</p>
      <div className={css.userProfile}></div>
    </div>
  );
};
