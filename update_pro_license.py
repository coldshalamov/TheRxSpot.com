import sqlite3
import os

databases = [
    r"C:\Users\93rob\AppData\Roaming\Antigravity\User\globalStorage\state.vscdb",
    r"C:\Users\93rob\AppData\Roaming\Cursor\User\globalStorage\state.vscdb"
]

updates = [
    ("auto-accept-userId", "7794c12a-43e5-412d-a189-018b16646ebf"),
    ("auto-accept-isPro", "true")
]

def update_db(db_path):
    if not os.path.exists(db_path):
        print(f"Skipping {db_path} (not found)")
        return
    
    print(f"Updating {db_path}...")
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Check if ItemTable exists
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='ItemTable'")
        if not cursor.fetchone():
            print(f"Error: ItemTable not found in {db_path}")
            conn.close()
            return

        for key, value in updates:
            # Upsert logic
            cursor.execute("SELECT key FROM ItemTable WHERE key=?", (key,))
            if cursor.fetchone():
                print(f"  Updating {key} to {value}")
                cursor.execute("UPDATE ItemTable SET value=? WHERE key=?", (value, key))
            else:
                print(f"  Inserting {key} with {value}")
                cursor.execute("INSERT INTO ItemTable (key, value) VALUES (?, ?)", (key, value))
        
        conn.commit()
        conn.close()
        print("Success.")
    except Exception as e:
        print(f"Error updating {db_path}: {e}")

if __name__ == '__main__':
    for db in databases:
        update_db(db)
