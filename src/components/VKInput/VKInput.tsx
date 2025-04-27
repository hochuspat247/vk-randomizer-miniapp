import { FormItem, Input, Textarea } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

// Интерфейс пропсов для компонента VKInput
interface VKInputProps {
    title?: string;           // Текст заголовка над полем
    placeholder: string;      // Плейсхолдер внутри поля
    withTitle?: "yes" | "no";  // Показывать заголовок или нет ("yes" по умолчанию)
    type: "input" | "textarea"; // Тип поля: обычный Input или многострочный Textarea
}

// Функциональный компонент VKInput
const VKInput: React.FC<VKInputProps> = ({
    title,
    placeholder,
    withTitle, // Если не передан, то по умолчанию показываем заголовок
    type
}) => {
    return (
        <FormItem
            top={withTitle === "yes" ? title : undefined} // Если withTitle = "no", заголовок не показывается
            style={{ padding: 0 }} // Убираем внутренние паддинги у FormItem
        >
            {type === "input" ? (
                // Если передан тип "input" — отображаем обычное однострочное поле
                <Input placeholder={placeholder} />
            ) : (
                // Если передан тип "textarea" — отображаем многострочное поле ввода
                <Textarea rows={2} placeholder={placeholder} />
            )}
        </FormItem>
    );
};

export default VKInput;
