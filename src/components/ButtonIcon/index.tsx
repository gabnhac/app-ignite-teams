import { TouchableOpacityProps } from "react-native";
import { Container, Icon } from "./styles";
import { ButtonIconStyleProps } from "./styles";
import {MaterialIcons} from '@expo/vector-icons'

type Props = TouchableOpacityProps & {
    icon: keyof typeof MaterialIcons.glyphMap;
    type?: ButtonIconStyleProps;
}

export function ButtonIcon({ icon, type = 'primary', ...rest}: Props) {
    return(
        <Container {...rest}>
            <Icon
                name={icon}
                type={type}
            />
        </Container>
    )
}