import { Container, Logo, BackIcon, BackButton } from "./styles";
import logoTmg from '@assets/logo.png';
import { CaretLeft } from "phosphor-react-native";

type Props = {
    showBackButton?: boolean;

}

export function Header({ showBackButton = false }: Props) {
    return (
        <Container>
            {   
                showBackButton &&
                <BackButton>
                    <BackIcon />
                </BackButton>
            }
            < Logo source={logoTmg} />
        </Container>
    )
}