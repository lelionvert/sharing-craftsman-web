import json
import sys

default_file = 'Dockerfile'

def update_file(args):
  if len(args) == 2:
    parse_file(args[1])


def parse_file(file):
  data = json.load(open(file))
  root_key = ''
  for key in data.keys():
    root_key = key
  read_infos(data[root_key])


def read_infos(infos):
  for file in infos:
    file_name = default_file
    is_config = False
    for key, node in file.items():
      if is_config == True:
        read_config_infos(node)
      else:
        if key == 'name':
          file_name = node
        else:
          read_node({key: node}, file_name)

      if key == 'name' and node == 'config':
        is_config = True
      else:
        is_config = False


def read_config_infos(infos):
  path = ''
  for file in infos:
    if file == 'file':
      path = infos[file]
    else:
      write_in_file(path, infos[file]['key'], infos[file]['value'])


def read_node(node, file_name='Dockerfile'):
  for propertyName, property in node.items():
    if 'key' in property:
      write_in_file(file_name, property['key'], property['value'])
    else:
      read_node(property, file_name)


def write_in_file(file, key, value):
  s = open(file).read()
  s = s.replace(key, value)
  f = open(file, 'w')
  f.write(s)


# TO LAUNC SCRIPT, CALL py update_docker_files.py <info_file.json>
update_file(sys.argv)