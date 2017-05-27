import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const CharacterNames = ({ characters }) => (
    <ul>{ characters.map(({ name }) => <li key={`name_${name}`}>{ name }</li>) }</ul>
);

const query = gql`{
    characters { id name }
}`;

const CharacterNamesWrapper = ({ data }) => {
    return <CharacterNames characters={ data.characters || []}/>
};

export default graphql(query)(CharacterNamesWrapper);
