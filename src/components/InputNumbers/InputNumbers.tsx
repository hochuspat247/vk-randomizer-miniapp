import { FormItem, Input as VKInput, Textarea, ConfigProvider } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import styles from './InputNumbers.module.css';

interface VKInputProps {
    title?: string;
    placeholder?: string;
    withTitle?: boolean;
    type: "input" | "textarea";
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const InputNumber: React.FC<VKInputProps> = ({
    title,
    placeholder = "Введите текст",
    withTitle = true,
    type,
    value,
    onChange,
}) => {


    return (
        <ConfigProvider colorScheme="dark">
            <FormItem
                top={withTitle ? title : undefined}
                className={styles.formItem}
            >
                {type === "input" ? (
                        <VKInput 
                        placeholder={placeholder} 
                        value={value}
                        onChange={onChange}
                        type='number'
                        inputMode='numeric'
                    />
                ) : (
                    <Textarea 
                        rows={2} 
                        placeholder={placeholder} 
                        value={value}
                        onChange={onChange}
                    />
                )}
            </FormItem>
        </ConfigProvider>
    );
};

export default InputNumber;
