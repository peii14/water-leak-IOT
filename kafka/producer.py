from kafka import KafkaProducer
import json
from csv import DictReader
import time
from confluent_kafka.admin import AdminClient, NewTopic, KafkaException

# Kafka configuration
bootstrap_servers = 'localhost:9092'
topic_name = 'hai-security'
processed_topic_name = 'classification'
num_partitions = 1
replication_factor = 1

# Create AdminClient
admin_client = AdminClient({'bootstrap.servers': bootstrap_servers})

topic_config = {
    'cleanup.policy': 'delete',
}

# Create NewTopic instances
new_topic = NewTopic(topic_name, num_partitions=num_partitions,
                     replication_factor=replication_factor, config=topic_config)
processed_topic = NewTopic(processed_topic_name, num_partitions=num_partitions,
                           replication_factor=replication_factor, config=topic_config)

# Create the topics
try:
    admin_client.create_topics([new_topic, processed_topic])
    print(f"Topics '{topic_name}' and '{processed_topic_name}' created successfully")
except KafkaException as e:
    # Handle exceptions during topic creation
    if e.args[0].code() == KafkaException.TOPIC_ALREADY_EXISTS:
        print(f"Topics '{topic_name}' and '{processed_topic_name}' already exist")
    else:
        print(f"Failed to create topics: {e}")
except Exception as e:
    print(f"Failed to create topics: {e}")

# Initialize KafkaProducer with explicit API version
try:
    producer = KafkaProducer(bootstrap_servers=bootstrap_servers, api_version=(0, 10))
    print("Kafka producer initialized successfully")
except Exception as e:
    print(f"Failed to initialize Kafka producer: {e}")

def on_send_success(record_metadata):
    print("Message sent to topic:", record_metadata.topic)
    print("Partition:", record_metadata.partition)
    print("Offset:", record_metadata.offset)

def on_send_error(excp):
    print('Error:', excp)

try:
    with open('./dataset/hai-test1.csv', 'r') as new_obj:
        csv_dict_reader = DictReader(new_obj)
        index = 0
        for row in csv_dict_reader:
            print('Trying to send:', row)
            future = producer.send(topic_name, json.dumps(row).encode('utf-8'))
            future.add_callback(on_send_success)
            future.add_errback(on_send_error)

            index += 1
            if (index % 20) == 0:
                time.sleep(10)

    producer.flush()
except Exception as e:
    print(f"Error while sending messages: {e}")
finally:
    producer.close()
