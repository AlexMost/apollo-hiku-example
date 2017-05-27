import React from 'react';
import CharactersList from './character-list';
import CharactersNames from './characters-names';

const Home = () => (
    <div>
        <h1>Characters List</h1>
        <CharactersList/>
        <h2>Characters names</h2>
        <CharactersNames/>
    </div>
);

export default Home;