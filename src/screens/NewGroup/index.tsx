import { Highlight } from "@components/Highlight";
import { Container, Content, Icon } from "./styles";
import { Header } from "@components/Header";
import { Button } from "@components/Button";
import { Input } from "@components/Input";


export function NewGroup() {
    return(
        <Container>
            <Header showBackButton/>

            <Content>
                <Icon/>
                <Highlight
                    title="Nova turma"
                    subtitle="crie a turma para adicionar as pessoas"
                />

                <Input
                    placeholder="ola"
                />

                <Button
                    title="Criar"
                    style={{marginTop: 20}}
                />
            </Content>
        </Container>
    )
}