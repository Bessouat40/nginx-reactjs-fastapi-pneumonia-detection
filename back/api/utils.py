import re

def recognize_data(datas) :
    match = re.findall(r'\[([^\]]*)\]*', datas)
    return match

def split_data(datas) :
    final_data = []
    for data in datas :
        split_data = data.replace('"', '').split(',')
        final_data.append(split_data)
    return final_data