import pandas as pd
import numpy as np


def load_dataset(file_path):
    """
    Load dataset
    """

    df = pd.read_excel(file_path)

    return df


def clean_dataset(df):
    """
    Basic cleaning
    """

    df = df.copy()

    # Remove duplicates
    df.drop_duplicates(inplace=True)

    # Remove missing values
    df.dropna(inplace=True)

    return df


def create_time_features(df):
    """
    Extract useful date features
    """

    df["Order Date"] = pd.to_datetime(df["Order Date"])

    df["Year"] = df["Order Date"].dt.year
    df["Month"] = df["Order Date"].dt.month
    df["Quarter"] = df["Order Date"].dt.quarter
    df["Day"] = df["Order Date"].dt.day

    return df


def select_features(df):

    feature_columns = [
        "Category",
        "Sub-Category",
        "Region",
        "Segment",
        "Ship Mode",
        "Quantity",
        "Discount",
        "Year",
        "Month",
        "Quarter"
    ]

    target_column = "Sales"

    X = df[feature_columns]
    y = df[target_column]

    return X, y


def encode_features(X):

    X = pd.get_dummies(
        X,
        drop_first=True
    )

    return X


def preprocess_dataset(file_path):

    print("Loading dataset...")

    df = load_dataset(file_path)

    print("Cleaning dataset...")

    df = clean_dataset(df)

    print("Creating date features...")

    df = create_time_features(df)

    print("Selecting features...")

    X, y = select_features(df)

    print("Encoding categorical columns...")

    X = encode_features(X)

    return X, y