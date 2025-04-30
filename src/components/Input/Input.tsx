import { FormItem, Input as VKInput, Textarea } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import styles from './Input.module.css'; // Импортируем стили как объект

// Интерфейс пропсов для компонента VKInput
interface VKInputProps {
    title?: string;           // Текст заголовка над полем
    placeholder?: string;      // Плейсхолдер внутри поля
    withTitle?: boolean;  // Показывать заголовок или нет ("yes" по умолчанию)
    type: "input" | "textarea"; // Тип поля: обычный Input или многострочный Textarea
}

// Функциональный компонент VKInput
const Input: React.FC<VKInputProps> = ({
    title,
    placeholder = "Введите текст",
    withTitle = true, // Если не передан, то по умолчанию показываем заголовок
    type
}) => {
    return (
        <FormItem
            top={withTitle ? title : undefined} // Если withTitle = "no", заголовок не показывается
            className={styles.formItem} // Убираем внутренние паддинги у FormItem
        >
            {type === "input" ? (
                // Если передан тип "input" — отображаем обычное однострочное поле
                <VKInput placeholder={placeholder} />
            ) : (
                // Если передан тип "textarea" — отображаем многострочное поле ввода
                <Textarea rows={2} placeholder={placeholder} />
            )}
        </FormItem>
    );
};

export default Input;
