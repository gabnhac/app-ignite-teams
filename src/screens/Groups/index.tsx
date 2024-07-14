import { Container } from './styles';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/Groupcard';
import { useState } from 'react';
import { FlatList } from 'react-native';
import { Listempty } from '@components/Listempty';
import { Button } from '@components/Button';

export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);

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
        renderItem={({item}) => (
          <GroupCard
            title={item}          
          />
        )}
        ListEmptyComponent={() => (<Listempty message='Que tal cadastrar uma turma?'/>)}
      />

        

      <Button
        title='Criar nova turma'
        type='secondary'
      />
    </Container>
  );
}