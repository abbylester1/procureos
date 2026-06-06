import csv
import io
import json
from typing import Any

import pandas as pd
from fastapi import UploadFile


def parse_upload(file: UploadFile) -> list[dict[str, Any]] | dict[str, Any]:
    contents = file.file.read()
    filename = (file.filename or "").lower()
    if filename.endswith(".json"):
        return json.loads(contents.decode("utf-8"))
    if filename.endswith(".xlsx"):
        frame = pd.read_excel(io.BytesIO(contents))
        return frame.fillna("").to_dict(orient="records")
    if filename.endswith(".csv"):
        text = contents.decode("utf-8-sig")
        return list(csv.DictReader(io.StringIO(text)))
    raise ValueError("Unsupported file type. Use CSV, XLSX, or JSON.")


def normalize_currency(value: str | None) -> str:
    currency = (value or "USD").upper().strip()
    if currency not in {"USD", "EUR", "GBP", "CAD", "MXN"}:
        raise ValueError(f"Unsupported currency: {currency}")
    return currency
