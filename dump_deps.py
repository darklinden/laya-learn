#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import json


def isDict(obj):
    if isinstance(obj, dict):
        return True
    else:
        return False


def isList(obj):
    if isinstance(obj, list):
        return True
    else:
        return False


def merge_list_into_list(base_list, other_list):
    result = list(base_list).extend(other_list)
    return result


def json_dump_textures(json_obj, uris, path_folder):

    if isDict(json_obj):
        for key in json_obj.keys():
            value = json_obj.get(key, None)

            if isDict(value):
                json_dump_textures(value, uris, path_folder)
            elif isList(value):
                json_dump_textures(value, uris, path_folder)
            else:
                # texture -> Sprite
                # skin -> Image
                # path -> materials[]
                # clipPath -> states[] animations
                # meshPath -> 3DModel
                if key == 'texture' or key == 'skin':
                    # 2d add full path
                    uris.add(value)

                if key == 'path' or key == 'clipPath' or key == 'meshPath':
                    # 3d add path with relative
                    uris.add(os.path.join(path_folder, value))

    elif isList(json_obj):
        for obj in json_obj:
            if (isDict(obj)):
                json_dump_textures(obj, uris, path_folder)


def dump_textures_release(file_path, relative):

    print('deal with: ' + file_path)
    base_path = os.path.splitext(file_path)[0]
    tr_path = base_path + "_deps.json"

    if os.path.isfile(tr_path):
        os.remove(tr_path)

    with open(file_path, "rb") as f:
        json_obj = json.load(f)

    path_folder = os.path.dirname(file_path)[len(relative) + 1:]
    uris = set({})

    json_dump_textures(json_obj, uris, path_folder)

    if len(uris) > 0:
        print('dump tr for: ' + file_path)
        with open(tr_path, "w") as f:
            json.dump(list(uris), f)


def walk_through_folder(folder_path):
    for root, dirs, files in os.walk(folder_path, topdown=True):
        for fn in files:
            lower_name = str(fn).lower()
            if lower_name.endswith('.json') or lower_name.endswith('.lh') or lower_name.endswith('.ls'):
                if lower_name.endswith('_tr.json'):
                    continue

                file_path = root + "/" + fn
                if os.path.isfile(file_path):
                    dump_textures_release(file_path, folder_path)


def __main__():

    cwd = os.getcwd()

    views_folder = os.path.join(cwd, 'bin')

    walk_through_folder(views_folder)

    print('Done')


__main__()
