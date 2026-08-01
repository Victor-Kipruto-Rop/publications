# Architecting Scalable Data Platforms

Building resilient infrastructure requires treating data as a first-class product. In this technical deep dive, we explore event-driven architecture utilizing Apache Kafka for streaming data ingestion.

## The Streaming Pipeline

Real-time financial processing dictates a zero-tolerance policy for data loss. By decoupling our microservices, we ensure seamless failover and horizontal scalability.

### Idempotent Ingestion

Here is an example of an idempotent producer in Python, designed to handle temporary network partitions without duplicating financial records:

```python
from kafka import KafkaProducer
import json

def get_producer():
    return KafkaProducer(
        bootstrap_servers=['kafka-broker1:9092'],
        value_serializer=lambda v: json.dumps(v).encode('utf-8'),
        acks='all',
        retries=5,
        enable_idempotence=True
    )

def emit_transaction(producer, topic, transaction_data):
    try:
        future = producer.send(topic, transaction_data)
        metadata = future.get(timeout=10)
        print(f"Successfully emitted to {metadata.topic} partition {metadata.partition}")
    except Exception as e:
        print(f"Failed to emit event: {e}")
