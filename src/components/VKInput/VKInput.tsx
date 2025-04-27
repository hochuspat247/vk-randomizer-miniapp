import { FormItem, Input} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

interface VKInputProps {
    title?: string;
    placeholder: string;
    withTitle?: "yes" | "no";
}

const VKInput: React.FC<VKInputProps> = ({title, placeholder, withTitle}) => {
    return (
        <FormItem top={withTitle === "yes" ? title : undefined} style={{ padding: 0 }}>
            <Input placeholder={placeholder}/>
        </FormItem>
    );
};

export default VKInput