from datetime import datetime
from hiku.engine import Engine
from hiku.result import denormalize
from hiku.executors.sync import SyncExecutor
from hiku.graph import Graph, Root, Field, Node, Link
from hiku.types import TypeRef, Sequence
from hiku.readers.graphql import read
from .hiku_helpers import type_field


def character_data(fields, ids):
    result = []
    for id_ in ids:
        character = data['character'][id_]
        result.append([character[field.name] for field in fields])
    return result


def to_characters_link():
    return [1, 2, 3]

data = {
    'character': {
        1: dict(id=1, name='James T. Kirk', species='Human'),
        2: dict(id=2, name='Spock', species='Vulcan/Human'),
        3: dict(id=3, name='Leonard McCoy', species='Human'),
    },
    'actor': {
        1: dict(id=1, name='James T. Kirk Actor', species='Human'),
        2: dict(id=2, name='Spock Actor', species='Vulcan/Human'),
        3: dict(id=3, name='Leonard McCoy Actor', species='Human'),
    }
}

GRAPH = Graph([
    Node('character', [
        type_field('character'),
        Field('id', None, character_data),
        Field('name', None, character_data),
        Field('species', None, character_data),
    ]),
    Node('actor', [
        type_field('actor'),
        Field('id', None, character_data),
        Field('name', None, character_data),
        Field('species', None, character_data),
    ]),

    Root([
        Link('characters', Sequence[TypeRef['character']],
             to_characters_link, requires=None),
        Link('actors', Sequence[TypeRef['actor']],
             to_characters_link, requires=None),
    ]),
])


hiku_engine = Engine(SyncExecutor())


def execute(graph, query_string):
    query = read(query_string)
    result = hiku_engine.execute(graph, query)
    return denormalize(graph, result, query)
