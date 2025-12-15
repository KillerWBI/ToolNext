import css from "./BenefitsBlock.module.css";

export default function BenefitsBlock(){
    return (
        <section className={css.benefitsBlock}>
            <div className={css.benefitsDesc}>
        <h2 className={css.benefitsTitle}>ToolNext — платформа для швидкої та зручної оренди інструментів</h2>
        <p className = {css.benefitsText}>ToolNext допомагає знайти потрібний інструмент у декілька кліків.
            Користувачі можуть легко орендувати обладнання для ремонту чи хобі, а власники — зручно керувати своїми оголошеннями.
                    Ми створили сервіс, щоб зробити процес оренди простим, доступним і вигідним для всіх.</p>
                </div>
        <ul className = {css.benefitsLst}>
                <li className = {css.benefitsListItem}>
                    <svg className ={css.benefitsSvg} width="48" height = "48">
                        <use href="../../../public/svg/"/>
                    </svg>
                 <h3>Легкий доступ до інструментів</h3>
                <p className={css.benefitsListText}>Знаходьте потрібний інструмент у своєму районі без зайвих дзвінків і пошуків. Просто введіть назву — і отримайте варіанти поруч із вами.</p>
                </li>
        <li className = {css.benefitsListItem}>
                    <svg className ={css.benefitsSvg} width="48" height = "48">
                        <use href="../../../public/svg/"/>
                    </svg>
                 <h3>Швидке бронювання</h3>
                <p className={css.benefitsListText}>Бронюйте інструменти в кілька кліків. Жодних складних форм чи довгих очікувань — тільки простий та зручний процес.</p>
                </li >
                    <li className = {css.benefitsListItem}>
                    <svg className ={css.benefitsSvg} width="48" height = "48">
                        <use href="../../../public/svg/"/>
                    </svg>
                 <h3>Зручне управління</h3>
                <p className={css.benefitsListText}>Додавайте свої інструменти в каталог, редагуйте оголошення та контролюйте оренду. ToolNext допомагає перетворити зайві інструменти на додатковий дохід.</p>
                </li>
        </ul >
        </section>        
    );
}