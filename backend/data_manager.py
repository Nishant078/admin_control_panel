import os
import sqlite3


class data_manager:
    def __init__(self, verbose):
        self.verbose = verbose
        self.current_dir = os.path.dirname(os.path.abspath(__file__))
        self.data_dir = self.current_dir + "/data"

        self.db_connection = sqlite3.connect(
            self.current_dir + "/db.sqlite3", check_same_thread=False
        )
        self.cursor = self.db_connection.cursor()
        query = """
            CREATE TABLE IF NOT EXISTS list_of_lists
            (
                id        INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                list_name TEXT NOT NULL UNIQUE CHECK(list_name<>0),
                structure TEXT NOT NULL
            )
        """
        self.cursor.execute(query)
        self.db_connection.commit()

    def get_list_of_lists(self):
        query = """
            SELECT list_name FROM list_of_lists ORDER BY id
        """
        self.cursor.execute(query)
        list_of_lists = self.cursor.fetchall()
        list_of_lists = [l for (l,) in list_of_lists]
        return list_of_lists

    def add_list(self, list_name):
        query = f"""
        INSERT INTO list_of_lists (list_name,structure) VALUES ("{list_name}","{str({})}")
        """
        # print(query)
        self.cursor.execute(query)
        self.db_connection.commit()

    def delete_list(self, list_name):
        self.cursor.execute(f'DELETE FROM list_of_lists WHERE list_name="{list_name}"')
        self.db_connection.commit()
