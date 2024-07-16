import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { Listempty } from "@components/Listempty";
import { Button } from "@components/Button";

import { Alert, FlatList } from "react-native";
import { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { AppError } from "@utils/AppError";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playersGetByGroup } from "@storage/player/playersGetByGroup";

type RouteParams = {
    group: string;
}

export function Players() {
    const [team, setTeam] = useState('time a');
    const [players, setPlayers] = useState(['Gabriel', 'Vini']);
    const [newPlayerName, setNewPlayerName] = useState('');

    const route = useRoute();
    const {group} = route.params as RouteParams;

    async function handleAddPlayer() {
        if (newPlayerName.trim().length === 0) {
            return Alert.alert('Nova Pessoa', 'Informe o nome da pessoa para adicionar.');
        }
        
        const newPlayer = {
            name: newPlayerName,
            team: team
        }

        try {
            await playerAddByGroup(newPlayer, group);
            const players = await playersGetByGroup(group);
            console.log(players);
            
        } catch (error) {
            if(error instanceof AppError){
                Alert.alert('Nova Pessoa',error.message);
            }else{
                console.error(error);
            }
            
        }
    }

    return(
        <Container>
            <Header showBackButton/>

            <Highlight
                title={group}
                subtitle="Adicione a galera e separe os times"
            />

            <Form>
                <Input
                    placeholder="Nome da pessoa"
                    autoCorrect={false}
                    onChangeText={setNewPlayerName}
                />
                <ButtonIcon
                    icon="add"
                    onPress={handleAddPlayer}
                />
            </Form>

            <HeaderList>
                <FlatList
                    data={['time a', 'time b']}
                    keyExtractor={item => item}
                    renderItem={({item}) => (
                        <Filter
                            title={item}
                            isActive={item === team}
                            onPress={() => setTeam(item)}
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