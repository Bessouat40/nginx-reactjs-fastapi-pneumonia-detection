import re
import numpy as np

def recognize_data(datas) :
    """Recognize data from Form Data send by frontend

    Args:
        datas (str): string corresponding to bytes decoding

    Returns:
        match: regex matches from datas
    """
    match = re.findall(r'\[([^\]]*)\]*', datas)
    return match

def split_data(datas) :
    """Split data before storing them into Postgres database

    Args:
        datas (List[str]): List containing regex matches

    Returns:
        final_data: data to store into Postgres database
    """
    final_data = []
    for data in datas :
        split_data = data.replace('"', '').split(',')
        final_data.append(split_data)
    return final_data

def to_list(datas) :
    final_list = []
    for data in datas :
        final_list.append([data[0], data[1]])
    return final_list