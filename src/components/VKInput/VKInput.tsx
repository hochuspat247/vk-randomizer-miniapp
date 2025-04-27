import { FormItem, Input, Textarea } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

interface VKInputProps {
    title?: string;
    placeholder: string;
    withTitle?: "yes" | "no";
    type: "input" | "textarea"; 
}

const VKInput: React.FC<VKInputProps> = ({ title, placeholder, withTitle = "yes", type }) => {
    return (
        <FormItem top={withTitle === "yes" ? title : undefined} style={{ padding: 0 }}>
        {type === "input" ? (
            <Input placeholder={placeholder} />
        ) : (
            <Textarea rows={2} placeholder={placeholder} />
        )}
        </FormItem>
    );
};

export default VKInput;
