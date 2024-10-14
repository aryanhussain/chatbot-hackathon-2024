# text2sqlapp/views/huggingface_api.py
from huggingface_hub import HfApi

def create_repo(repo_id):
    api = HfApi()
    try:
        api.create_repo(repo_id)
        print(f"Repo {repo_id} created")
    except:
        print(f"Repo {repo_id} already exists")

def upload_model_to_hub(repo_id, folder_path):
    api = HfApi()
    api.upload_folder(
        folder_path=folder_path,
        path_in_repo=".",
        repo_id=repo_id,
        repo_type="model",
        revision="main"
    )
