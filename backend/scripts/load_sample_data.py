import json
import subprocess
from pathlib import Path

import requests

ROOT = Path(__file__).resolve().parents[2]
SAMPLE_DIR = ROOT / "sample_data"
API_URL = "http://localhost:8000"


def ensure_data() -> None:
    if not (SAMPLE_DIR / "rfq_1001.json").exists():
        subprocess.run(["python", str(Path(__file__).with_name("generate_sample_data.py"))], check=True)


def main() -> None:
    ensure_data()
    rfq_payload = json.loads((SAMPLE_DIR / "rfq_1001.json").read_text())
    response = requests.post(f"{API_URL}/rfq/upload", json=rfq_payload, timeout=30)
    response.raise_for_status()
    for quote_file in sorted(SAMPLE_DIR.glob("*_quote.csv")):
        with quote_file.open("rb") as handle:
            response = requests.post(f"{API_URL}/supplier/upload", files={"file": (quote_file.name, handle, "text/csv")}, timeout=30)
            response.raise_for_status()
    response = requests.post(f"{API_URL}/agents/run/RFQ-1001", timeout=60)
    response.raise_for_status()
    print(json.dumps(response.json(), indent=2))


if __name__ == "__main__":
    main()
