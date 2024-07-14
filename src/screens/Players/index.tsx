import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { Listempty } from "@components/Listempty";
import { Button } from "@components/Button";

import { FlatList } from "react-native";
import { useState } from "react";

export function Players() {
    const [teamSelect, setTeamSelect] = useState('time a');
    const [players, setPlayers] = useState(['Gabriel', 'Vini']);
    return(
        <Container>
            <Header showBackButton/>

            <Highlight
                title="Nome da turma"
                subtitle="adicione a galera e separe os times"
            />

            <Form>
                <Input
                    placeholder="Nome da pessoa"
                    autoCorrect={false}
                />
                <ButtonIcon
                    icon="add"
                />
            </Form>

            <HeaderList>
                <FlatList
                    data={['time a', 'time b']}
                    keyExtractor={item => item}
                    renderItem={({item}) => (
                        <Filter
                            title={item}
                            isActive={item === teamSelect}
                            onPress={() => setTeamSelect(item)}
                        />
                    )}
                    horizontal
                />

                <NumberOfPlayers>
                    {players.length}
                </NumberOfPlayers>
            </HeaderList>

            <FlatList
                data={players}
                keyExtractor={item => item}
                renderItem={({item}) => (
                    <PlayerCard 
                        name={item}
                        onRemove={() => {}}    
                    />
                )}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <Listempty
                        message="Não há pessoas nesse time"
                    />
                }
                contentContainerStyle={[
                    {paddingBottom: 100},
                    players.length === 0 && {flex: 1}
                ]}
            />

            <Button
                title="Remover turma"
                type="secondary"
            />                   
        </Container>
    )
}