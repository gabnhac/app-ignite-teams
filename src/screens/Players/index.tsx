import { Alert, FlatList, TextInput } from "react-native";
import { useEffect, useState, useRef } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playersGetByGroupAndTeam } from "@storage/player/playersGetByGroupAndTeam";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { Listempty } from "@components/Listempty";
import { Button } from "@components/Button";

import { AppError } from "@utils/AppError";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";

type RouteParams = {
    group: string;
}

export function Players() {
    const [team, setTeam] = useState('time a');
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
    const [newPlayerName, setNewPlayerName] = useState('');

    const navigation = useNavigation();
    const route = useRoute();
    const {group} = route.params as RouteParams;

    const newPlayerNameInputRef = useRef<TextInput>(null);

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

            newPlayerNameInputRef.current?.blur();

            setNewPlayerName('');
            fetchPlayersByTeam();
            
        } catch (error) {
            if(error instanceof AppError){
                Alert.alert('Nova Pessoa',error.message);
            }else{
                console.error(error);
            }
            
        }
    }

    async function fetchPlayersByTeam() {
        try {
            const playersByTeam = await playersGetByGroupAndTeam(group,team);
            setPlayers(playersByTeam);    
            
        } catch (error) {
            console.error(error);
        }
    }

    async function handlePlayerRemove(playerName: string) {
        try {
            await playerRemoveByGroup(playerName,group);
            fetchPlayersByTeam();
        } catch (error) {
            console.error(error);   
            Alert.alert('Remover Pessoa', 'Não foi possível remover essa pessoa.')
        }
    }

    async function groupRemove(){
        try {
            await groupRemoveByName(group);

            navigation.navigate('groups');
        } catch (error) { 
            console.error(error);
            Alert.alert('Remover Grupo', 'Não foi possível remover o grupo.')
        }
    }

    async function handleGroupRemove() {
        Alert.alert(
            'Remover', 
            'Tem certeza disso?',
            [
                {text: 'Não', style: 'cancel'},
                {text: 'sim', onPress: () => groupRemove()}
            ]
        )
    }

    useEffect(() => {
        fetchPlayersByTeam();
    }, [team])

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
                    value={newPlayerName}
                    inputRef={newPlayerNameInputRef}
                    onSubmitEditing={handleAddPlayer}
                    returnKeyType="done"
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
                keyExtractor={item => item.name}
                renderItem={({item}) => (
                    <PlayerCard 
                        name={item.name}
                        onRemove={() => handlePlayerRemove(item.name)}    
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
                onPress={handleGroupRemove}
            />                   
        </Container>
    )
}