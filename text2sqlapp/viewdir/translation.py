# text2sqlapp/views/translation.py
from transformers import AutoTokenizer, T5ForConditionalGeneration

def load_model_and_tokenizer():
    tokenizer = AutoTokenizer.from_pretrained("./results")
    model = T5ForConditionalGeneration.from_pretrained("./results")
    return tokenizer, model

def translate_to_sql(text, tokenizer, model, max_length):
    inputs = tokenizer(text, padding='longest', max_length=max_length, return_tensors='pt')
    input_ids = inputs.input_ids
    attention_mask = inputs.attention_mask
    output = model.generate(input_ids, attention_mask=attention_mask, max_length=max_length)

    return tokenizer.decode(output[0], skip_special_tokens=True)
