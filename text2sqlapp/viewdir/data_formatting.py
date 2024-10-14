# text2sqlapp/views/data_formatting.py
def format_dataset(data):
    # Assuming 'data' is a list of dictionaries with 'question' and 'sql' fields
    formatted_data = []
    for example in data:
        # Make sure that 'example['question']' is a string, and 'example['sql']['human_readable']' is also a string
        if isinstance(example['question'], str) and isinstance(example['sql']['human_readable'], str):
            formatted_example = {
                'input': 'translate to SQL: ' + example['question'],  # Concatenate string with another string
                'target': example['sql']['human_readable']
            }
            formatted_data.append(formatted_example)
        else:
            # If the types are not as expected, print an error message or handle the case
            print(f"Skipping example due to type mismatch: {example}")
    
    return formatted_data


def convert_to_features(example_batch, tokenizer, max_length):
    print("convert_to_features", example_batch[0])
    converted_data = []
    for example in example_batch:
        if isinstance(example['input'], str) and isinstance(example['target'], str):
            input_encodings = tokenizer.batch_encode_plus(example['input'], pad_to_max_length=True, max_length=max_length)
            target_encodings = tokenizer.batch_encode_plus(example['target'], pad_to_max_length=True, max_length=max_length)

            encodings = {
                'input_ids': input_encodings['input_ids'],
                'attention_mask': input_encodings['attention_mask'],
                'labels': target_encodings['input_ids'],
                'decoder_attention_mask': target_encodings['attention_mask']
            }
            converted_data.append(encodings)
        else:
            # If the types are not as expected, print an error message or handle the case
            print(f"Skipping example due to type mismatch: {example}")        
    return converted_data
