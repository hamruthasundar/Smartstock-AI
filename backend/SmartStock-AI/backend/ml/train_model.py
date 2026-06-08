import os
import joblib
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.metrics import (
    mean_absolute_error,
    mean_squared_error,
    r2_score
)

from sklearn.ensemble import (
    RandomForestRegressor,
    GradientBoostingRegressor
)

from sklearn.linear_model import LinearRegression

from preprocess import preprocess_dataset


DATASET_PATH = "../../dataset/Retail-Supply-Chain-Sales-Dataset.xlsx"

MODEL_SAVE_PATH = "../models/smartstock_model.pkl"

FEATURE_SAVE_PATH = "../models/feature_columns.pkl"


def evaluate_model(name, model, X_test, y_test):

    predictions = model.predict(X_test)

    mae = mean_absolute_error(
        y_test,
        predictions
    )

    mse = mean_squared_error(
        y_test,
        predictions
    )

    rmse = mse ** 0.5

    r2 = r2_score(
        y_test,
        predictions
    )

    print("\n")
    print("=" * 50)
    print(f"{name}")
    print("=" * 50)

    print(f"MAE  : {mae:.2f}")
    print(f"RMSE : {rmse:.2f}")
    print(f"R2   : {r2:.4f}")

    return r2


def train():

    print("Starting preprocessing...")

    X, y = preprocess_dataset(
        DATASET_PATH
    )

    feature_columns = X.columns.tolist()

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42
    )

    models = {

        "Random Forest":
            RandomForestRegressor(
                n_estimators=200,
                random_state=42
            ),

        "Gradient Boosting":
            GradientBoostingRegressor(
                random_state=42
            ),

        "Linear Regression":
            LinearRegression()
    }

    best_score = -999
    best_model = None
    best_name = ""

    for name, model in models.items():

        print(f"\nTraining {name}...")

        model.fit(
            X_train,
            y_train
        )

        score = evaluate_model(
            name,
            model,
            X_test,
            y_test
        )

        if score > best_score:

            best_score = score
            best_model = model
            best_name = name

    print("\n")
    print("=" * 50)
    print("BEST MODEL")
    print("=" * 50)
    print(best_name)

    os.makedirs(
        "../models",
        exist_ok=True
    )

    joblib.dump(
        best_model,
        MODEL_SAVE_PATH
    )

    joblib.dump(
        feature_columns,
        FEATURE_SAVE_PATH
    )

    print("\nModel Saved Successfully")


if __name__ == "__main__":
    train()