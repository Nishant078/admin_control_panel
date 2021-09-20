import os
import json


class data_manager:
    def __init__(self, verbose):
        self.verbose = verbose
        self.current_dir = os.path.dirname(os.path.abspath(__file__))

        if not os.path.exists(self.current_dir + "/data"):
            os.mkdir(self.current_dir + "/data")

        self.data_dir = self.current_dir + "/data"

        config_file_path = self.current_dir + "/config.json"
        with open(config_file_path) as config_file:
            self.config = json.load(config_file)

        self.list_of_lists_path = self.data_dir + "/list_of_lists.json"
        if not os.path.exists(self.list_of_lists_path):
            self.list_of_lists = {}
            self.dump_list_of_lists()
        else:
            with open(self.list_of_lists_path, "r") as file:
                self.list_of_lists = json.load(file)

    def dump_list_of_lists(self):
        with open(self.list_of_lists_path, "w") as file:
            json.dump(self.list_of_lists, file)

    def add_list(self, list_name):
        self.list_of_lists[list_name] = {}
        self.dump_list_of_lists()

    def get_list_of_lists(self):
        return [lst for lst in self.list_of_lists]

    def log(self, str):
        if self.verbose:
            print(str)
