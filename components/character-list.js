import React from 'react';
import Character from './character';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const CharacterList = ({ characters }) => (
    <ul>
        { characters.map((c) => <Character key={c.id} {...c}/>)}
    </ul>
);

const charactersQuery = gql`{
    characters {
        id
        name
        species
       }
    }
`;

const CharactersListWrapper = ({ data }) => {
    return <CharacterList
        characters={data.characters || []}
    />
};

export default graphql(charactersQuery)(CharactersListWrapper);
