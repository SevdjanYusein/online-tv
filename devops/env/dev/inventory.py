#!/usr/bin/env python
# -*- coding:utf-8 -*-
from __future__ import (absolute_import, division, print_function,
                        unicode_literals)

import json
import os
import yaml

#
# example for dynamic inventory (https://adamj.eu/tech/2016/12/04/writing-a-custom-ansible-dynamic-inventory-script/)
#

def main():
    print(json.dumps(inventory(), sort_keys=True, indent=2))

# example for JSON here -> https://gist.github.com/sivel/3c0745243787b9899486

def inventory():
    host = get_host()
    return {
        '_meta': {
            'hostvars':{
                'web_server': {
                    'ansible_host': host,
                    'ansible_port': 22,
                    'ansible_python_interpreter': '/usr/bin/python3'
                },
                'build_server': {
                    'ansible_host': get_build_host(),
                    'ansible_port': 22,
                    'ansible_python_interpreter': '/usr/bin/python3'
                },
                'home_server': {
                    'ansible_host': '192.168.1.220',
                    'ansible_port': 22,
                    'ansible_python_interpreter': '/usr/bin/python3'
                },
                'project_server': {
                },
            }
        },
        'webservers': {
            'hosts': [
                'web_server'
            ],
            'vars': {}
        },
        'buildservers': {
            'hosts': [
                'build_server'
            ],
            'vars': {}
        },
        'homeservers': {
            'hosts': [
                'home_server'
            ],
            'vars': {}
        },
        'ungrouped': {
            'hosts': [
                'project_server'
            ],
            'vars': {}
        },
        'all': {
            'children': [
                'webservers',
            ]
        }
    }

def get_host():
    settings = get_settings()
    projectHost = get_user() + '-' + settings['project_name'].replace('.', '-') + '.upnetix.tech'
    return projectHost

def get_build_host():
    settings = get_settings()
    projectHost = get_user() + '-' + settings['project_name'].replace('.', '-') + '-build.upnetix.tech'
    return projectHost

def get_project_host(project):
    projectHost =  get_user() + '-' + project + '.upnetix.tech'
    return projectHost

def get_user():
    return os.environ['USER'].replace('.', '-')

def get_settings():
    scriptDir = os.path.dirname(__file__)
    settings = yaml.load(open(os.path.join(scriptDir, '../shared-vars.yml')))
    return settings

if __name__ == '__main__':
    main()
