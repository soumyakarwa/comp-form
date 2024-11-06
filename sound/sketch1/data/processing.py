import xml.etree.ElementTree as ET
import json

# Load and parse the TTML file
tree = ET.parse('Be_More.ttml')
root = tree.getroot()

# Extract namespace 2(usually needed for TTML files)
namespace = "{http://www.w3.org/ns/ttml}"

# Prepare a list to store extracted data
timestamps = []

# Iterate over each <p> tag and extract the timing and text
for p in root.findall(f".//{namespace}body/{namespace}div/{namespace}p"):
    start = p.get("begin")
    end = p.get("end")
    span = p.find(f"{namespace}span")
    text = span.text.strip() if span is not None and span.text else ""
    timestamps.append({"start": start, "end": end, "text": text})

# Save as JSON
with open("timestamps.json", "w") as outfile:
    json.dump(timestamps, outfile, indent=2)

print("Timestamps saved to timestamps.json!")
