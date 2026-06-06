import csv
import json
import random
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SAMPLE_DIR = ROOT / "sample_data"
SEED_DIR = ROOT / "dbt" / "procureos" / "seeds"
SAMPLE_DIR.mkdir(exist_ok=True)
SEED_DIR.mkdir(parents=True, exist_ok=True)

random.seed(42)
CATEGORIES = {
    "Concrete": ["Ready Mix Concrete", "Concrete Mix", "Concrete", "Portland Cement", "Cement Blend"],
    "Steel": ["Structural Steel Beam", "Steel Rebar", "Rebar Grade 60", "Steel Plate", "I Beam Steel"],
    "HVAC": ["HVAC Air Handler", "Ductwork", "HVAC Compressor", "Air Diffuser", "VAV Box"],
    "Plumbing": ["Copper Pipe", "PVC Plumbing Pipe", "Ball Valve", "Plumbing Fixture", "Pipe Fittings"],
    "Electrical": ["Electrical Wire", "Conduit", "Breaker Panel", "Junction Box", "LED Fixture"],
    "Paint": ["Interior Paint", "Primer", "Exterior Coating", "Paint Supplies", "Latex Paint"],
    "Drywall": ["Drywall Sheet", "Gypsum Board", "Sheetrock", "Joint Compound", "Drywall Screws"],
}
SUPPLIERS = [
    ("buildtech", "BuildTech Supply", "Midwest", 94),
    ("constructpro", "ConstructPro Materials", "Northeast", 88),
    ("urban", "UrbanBuild Wholesale", "West", 82),
    ("apex", "Apex Industrial Supply", "South", 90),
    ("metro", "Metro Contractor Depot", "National", 86),
]
UNITS = ["yd3", "ton", "ea", "linear_ft", "sq_ft"]


def write_csv(path: Path, rows: list[dict]) -> None:
    with path.open("w", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=list(rows[0].keys()))
        writer.writeheader()
        writer.writerows(rows)


def generate() -> None:
    rfqs = []
    rfq_items = []
    suppliers = [
        {"supplier_id": sid, "supplier_name": name, "region": region, "reliability_score": score}
        for sid, name, region, score in SUPPLIERS
    ]
    quotes = []
    materials = []
    material_id = 1
    for rfq_idx in range(1, 51):
        rfq_id = f"RFQ-{1000 + rfq_idx}"
        project_name = random.choice(["School Renovation", "Library Expansion", "Clinic Retrofit", "Municipal Center", "Housing Upgrade"])
        budget = random.randint(750_000, 2_500_000)
        rfqs.append({"rfq_id": rfq_id, "project_name": project_name, "budget": budget})
        chosen_items = []
        for line in range(1, 11):
            category = random.choice(list(CATEGORIES.keys()))
            material_name = random.choice(CATEGORIES[category])
            quantity = random.randint(25, 500)
            unit = random.choice(UNITS)
            required_delivery_days = random.randint(7, 35)
            item = {
                "rfq_id": rfq_id,
                "line_number": line,
                "material_name": material_name,
                "category": category,
                "quantity": quantity,
                "unit": unit,
                "required_delivery_days": required_delivery_days,
            }
            rfq_items.append(item)
            chosen_items.append(item)
            materials.append({"material_id": material_id, "material_name": material_name, "category": category, "unit": unit})
            material_id += 1
        for supplier_id, supplier_name, region, reliability in SUPPLIERS:
            for item in chosen_items:
                if random.random() < 0.04:
                    continue
                base = {
                    "Concrete": 145,
                    "Steel": 920,
                    "HVAC": 680,
                    "Plumbing": 85,
                    "Electrical": 55,
                    "Paint": 34,
                    "Drywall": 18,
                }[item["category"]]
                supplier_factor = {"buildtech": 0.97, "constructpro": 1.03, "urban": 0.95, "apex": 1.0, "metro": 1.06}[supplier_id]
                unit_price = round(base * supplier_factor * random.uniform(0.86, 1.18), 2)
                quotes.append(
                    {
                        "quote_id": f"Q-{rfq_id}-{supplier_id}-{item['line_number']}",
                        "rfq_id": rfq_id,
                        "supplier_id": supplier_id,
                        "supplier_name": supplier_name,
                        "region": region,
                        "reliability_score": reliability,
                        "material_name": random.choice(CATEGORIES[item["category"]]),
                        "category": item["category"],
                        "quantity": item["quantity"],
                        "unit": item["unit"],
                        "unit_price": unit_price,
                        "currency": "USD",
                        "lead_time_days": max(3, item["required_delivery_days"] + random.randint(-5, 9)),
                    }
                )
    # Force exactly 2,500 quote rows by filling any skipped rows with valid alternates.
    idx = 0
    while len(quotes) < 2500:
        item = rfq_items[idx % len(rfq_items)]
        supplier_id, supplier_name, region, reliability = SUPPLIERS[idx % len(SUPPLIERS)]
        quotes.append(
            {
                "quote_id": f"Q-FILL-{len(quotes)+1}",
                "rfq_id": item["rfq_id"],
                "supplier_id": supplier_id,
                "supplier_name": supplier_name,
                "region": region,
                "reliability_score": reliability,
                "material_name": item["material_name"],
                "category": item["category"],
                "quantity": item["quantity"],
                "unit": item["unit"],
                "unit_price": round(random.uniform(15, 950), 2),
                "currency": "USD",
                "lead_time_days": item["required_delivery_days"],
            }
        )
        idx += 1
    quotes = quotes[:2500]
    materials = materials[:500]

    write_csv(SEED_DIR / "raw_rfqs.csv", rfqs)
    write_csv(SEED_DIR / "raw_rfq_items.csv", rfq_items[:500])
    write_csv(SEED_DIR / "raw_suppliers.csv", suppliers)
    write_csv(SEED_DIR / "raw_quotes.csv", quotes)
    write_csv(SEED_DIR / "raw_materials.csv", materials)

    first_rfq_id = "RFQ-1001"
    first_payload = {
        **next(r for r in rfqs if r["rfq_id"] == first_rfq_id),
        "items": [item for item in rfq_items if item["rfq_id"] == first_rfq_id],
    }
    (SAMPLE_DIR / "rfq_1001.json").write_text(json.dumps(first_payload, indent=2))
    for supplier_id, supplier_name, _, _ in SUPPLIERS:
        supplier_rows = [row for row in quotes if row["rfq_id"] == first_rfq_id and row["supplier_id"] == supplier_id]
        write_csv(SAMPLE_DIR / f"{supplier_id}_quote.csv", supplier_rows)


if __name__ == "__main__":
    generate()
    print("Generated ProcureOS sample data")
