# text2sqlapp/views/data_loading.py
from datasets import load_dataset

def load_data():
    train_data = load_dataset('wikisql', split='train', trust_remote_code=True)
    validation_data = load_dataset('wikisql', split='validation', trust_remote_code=True)
    test_data = load_dataset('wikisql', split='test', trust_remote_code=True)
    return train_data, validation_data, test_data
