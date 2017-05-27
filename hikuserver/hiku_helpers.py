from hiku.graph import Field
from hiku.types import String


def just_str(str):
    def wrap(_, ids):
        return [[str]] * len(ids)
    return wrap


def type_field(typename):
    return Field('__typename', String, just_str(typename))