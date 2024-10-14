# text2sqlapp/views.py

from django.shortcuts import render
from django.http import HttpResponse
from .viewdir.data_loading import load_data
from .viewdir.data_formatting import format_dataset, convert_to_features
from .viewdir.training import setup_model_and_training_args, train_model
from .viewdir.evaluation import compute_metrics
from .viewdir.translation import load_model_and_tokenizer, translate_to_sql
from .viewdir.huggingface_api import create_repo, upload_model_to_hub
from transformers import (
    T5ForConditionalGeneration,
    T5Tokenizer,
    Seq2SeqTrainer, 
    Seq2SeqTrainingArguments,
    pipeline
)

# Declare global variables
train_data = None
validation_data = None
test_data = None
formatted_train_data = None
formatted_validation_data = None
formatted_test_data = None
train_features = None
validation_features = None
test_features = None
training_args = None
model = None
metrics = None
tokenizer = None
sql_query = None
repo_id = None
MODEL_NAME = None #'dsivakumar/text2sql'
MAX_LENGTH = None
BATCH_SIZE = None
NUM_EPOCHS = None

def index(request):
    global train_data, validation_data, test_data
    global formatted_train_data, formatted_validation_data, formatted_test_data, MODEL_NAME, MAX_LENGTH, BATCH_SIZE, NUM_EPOCHS
    global train_features, validation_features, test_features
    global training_args, model, metrics
    global tokenizer, sql_query, repo_id
    MODEL_NAME = 't5-base' #'dsivakumar/text2sql'
    MAX_LENGTH = 64
    BATCH_SIZE = 64
    NUM_EPOCHS = 1
    tokenizer = T5Tokenizer.from_pretrained(MODEL_NAME, model_max_length=MAX_LENGTH)

    # Step 1: Load Data
    try:
        train_data, validation_data, test_data = load_data()  # Ensure this returns train, validation, and test data
        print("Data loaded successfully.", train_data, validation_data, test_data)
    except Exception as e:
        return HttpResponse(f"Error loading data: {str(e)}")

    # Step 2: Format Dataset
    try:
        formatted_train_data = format_dataset(train_data)
        formatted_validation_data = format_dataset(validation_data)
        formatted_test_data = format_dataset(test_data)
        # print("Data formatted successfully.", formatted_train_data, formatted_validation_data, formatted_test_data)
    except Exception as e:
        return HttpResponse(f"Error formatting data: {str(e)}")

    # Step 3: Convert to Features
    try:
        train_features = convert_to_features(formatted_train_data, tokenizer, MAX_LENGTH)
        validation_features = convert_to_features(formatted_validation_data, tokenizer, MAX_LENGTH)
        # test_features = convert_to_features(formatted_test_data, tokenizer, MAX_LENGTH)
        # print("Features converted successfully.", test_features)
    except Exception as e:
        return HttpResponse(f"Error converting features: {str(e)}")

    # Step 4: Set Up Model and Training Arguments
    try:
        training_args = setup_model_and_training_args(MODEL_NAME, BATCH_SIZE, NUM_EPOCHS)  # Adjust as needed
        print("Training arguments set up successfully.", training_args)
    except Exception as e:
        return HttpResponse(f"Error setting up training arguments: {str(e)}")

    # Step 5: Compute Metrics
    try:
        metrics = compute_metrics(model, tokenizer)  # Pass the appropriate parameters
        print("Metrics computed successfully:", metrics)
    except Exception as e:
        return HttpResponse(f"Error computing metrics: {str(e)}")

    # Step 6: Train the Model
    try:
        model = train_model(train_features, validation_features, training_args)  # Adjust according to your train_model function
        print("Model trained successfully.", model)
    except Exception as e:
        return HttpResponse(f"Error training model: {str(e)}")



    # Step 7: Load Model and Tokenizer
    try:
        tokenizer, model = load_model_and_tokenizer()  # Ensure this returns both the tokenizer and model
        print("Model and tokenizer loaded successfully.", tokenizer, model)
    except Exception as e:
        return HttpResponse(f"Error loading model and tokenizer: {str(e)}")

    # Step 8: Translate Natural Language to SQL
    try:
        natural_language_query = "What is the Branding for Group Owner Qantam of Cape Cod, LLC?"  # Example input
        sql_query = translate_to_sql(tokenizer, model, natural_language_query)  # Ensure this function uses both tokenizer and model
        print("Translation completed successfully:", sql_query)
    except Exception as e:
        return HttpResponse(f"Error translating to SQL: {str(e)}")

    # Step 9: Create Repository and Upload Model to Hub
    try:
        repo_id = create_repo(model)  # Adjust as needed
        upload_model_to_hub(model, repo_id)  # Ensure model is uploaded to the correct repo
        print(f"Model uploaded to repository: {repo_id}")
    except Exception as e:
        return HttpResponse(f"Error uploading model to hub: {str(e)}")

    return HttpResponse("All processing completed successfully!")

# Don't forget to add your URLs to `urls.py`
