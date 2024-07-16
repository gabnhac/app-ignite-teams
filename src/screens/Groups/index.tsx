import { useState, useEffect, useCallback } from 'react';
import { FlatList } from 'react-native';

import { Container } from './styles';
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/Groupcard';
import { Listempty } from '@components/Listempty';
import { Button } from '@components/Button';
import { groupsGetAll } from '@storage/group/groupGetAll';




export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);

  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate('new');
  }

  async function fetchGroups() {
    try {
      const data = await groupsGetAll();
      setGroups(data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleOpenGroup(group: string) {
    navigation.navigate('players', { group })
  }

  useFocusEffect(useCallback(() => {
    fetchGroups();
  }, []))
  return (
    <Container>
      <Header />

      <Highlight
        title='Turmas'
        subtitle='Jogue com sua turma'
      />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupCard
            title={item}
            onPress={() => handleOpenGroup(item)}
          />
        )}
        ListEmptyComponent={() => (<Listempty message='Que tal cadastrar uma turma?' />)}
      />

      <Button
        title='Criar nova turma'
        type='primary'
        onPress={handleNewGroup}
      />
    </Container>
  );
}