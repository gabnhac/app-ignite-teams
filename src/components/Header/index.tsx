import { Container, Logo, BackIcon, BackButton } from "./styles";
import logoTmg from '@assets/logo.png';
import { useNavigation } from "@react-navigation/native";
import { CaretLeft } from "phosphor-react-native";

type Props = {
    showBackButton?: boolean;

}

export function Header({ showBackButton = false }: Props) {
    const navigation = useNavigation();

    function handleGoBack(){
        navigation.navigate('groups'); 
    };
    return (
        <Container>
            {   
                showBackButton &&
                <BackButton
                    onPress={handleGoBack}
                >
                    <BackIcon />
                </BackButton>
            }
            < Logo source={logoTmg} />
        </Container>
    )
}