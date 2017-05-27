import React from 'react';

const Character = ({ id, name, species }) => (
    <li>
        <div>id - { id }</div>
        <div>Name - { name }</div>
        <div>Species - { species }</div>
    </li>
);

export default Character;
