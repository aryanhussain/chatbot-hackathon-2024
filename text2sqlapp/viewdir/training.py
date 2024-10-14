# text2sqlapp/views/training.py
from transformers import (
    T5ForConditionalGeneration,
    Seq2SeqTrainer,
    Seq2SeqTrainingArguments
)

def setup_model_and_training_args(model_name, batch_size, num_epochs):
    try:
        model = T5ForConditionalGeneration.from_pretrained(model_name)

        training_args = Seq2SeqTrainingArguments(
            output_dir='../../results',
            logging_dir='../../logs',
            per_device_train_batch_size=batch_size,
            num_train_epochs=num_epochs,
            per_device_eval_batch_size=batch_size,
            predict_with_generate=True,
            evaluation_strategy="epoch",
            do_train=True,
            do_eval=True,
            logging_steps=5,
            save_strategy="epoch",
            overwrite_output_dir=True,
            save_total_limit=3,
            load_best_model_at_end=True,
            push_to_hub=False,
            report_to="mlflow",  # log to mlflow
        )
        return model, training_args
    except Exception as e:
        print("Error setup_model_and_training_args", e)

def train_model(trainer):
    trainer.train()
    trainer.save_model()
