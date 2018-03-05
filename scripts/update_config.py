import json
import sys

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
  path = ''
  for file in infos:
    if file == 'file':
      path = infos[file]
    else:
      read_node(infos[file]['key'], infos[file]['value'], path)


def read_node(key, value, path):
  write_in_file(path, key, value)


def write_in_file(file, key, value):
  s = open(file).read()
  s = s.replace(key, value)
  f = open(file, 'w')
  f.write(s)


# TO LAUNC SCRIPT, CALL py update_docker_files.py <info_file.json>
update_file(sys.argv)