# RabbitMQ Guide

## Installation

### Windows
1. Install [Erlang](https://www.erlang.org/downloads) (required for RabbitMQ).
2. Download and install [RabbitMQ](https://www.rabbitmq.com/download.html).
3. Enable the management plugin:
   ```sh
   rabbitmq-plugins enable rabbitmq_management
   ```
4. Start RabbitMQ service:
   ```sh
   rabbitmq-server start
   ```

### Linux (Ubuntu/Debian)
```sh
sudo apt update
sudo apt install rabbitmq-server -y
sudo systemctl enable rabbitmq-server
sudo systemctl start rabbitmq-server
```

### macOS (Homebrew)
```sh
brew install rabbitmq
brew services start rabbitmq
```

Access the **RabbitMQ Management UI** at: [http://localhost:15672](http://localhost:15672)  
(Default username: `guest`, password: `guest`)

---

## Integration with Node.js

### Install Required Package
```sh
npm install amqplib
```

### Producer (Sending Messages)
```javascript
const amqp = require('amqplib');

async function sendMessage() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queue = 'task_queue';

    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from('Hello, RabbitMQ!'));

    console.log(" [x] Sent 'Hello, RabbitMQ!'");
    setTimeout(() => connection.close(), 500);
}

sendMessage();
```

### Consumer (Receiving Messages)
```javascript
const amqp = require('amqplib');

async function receiveMessage() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queue = 'task_queue';

    await channel.assertQueue(queue, { durable: true });
    console.log(" [*] Waiting for messages in %s", queue);

    channel.consume(queue, (msg) => {
        console.log(" [x] Received: %s", msg.content.toString());
    }, { noAck: true });
}

receiveMessage();
```

---

## Key Concepts
- **Exchange:** Routes messages to queues based on routing keys.
- **Queue:** Stores messages until they are consumed.
- **Binding:** Connects an exchange to a queue.
- **Producer:** Sends messages to an exchange.
- **Consumer:** Retrieves and processes messages from a queue.
- **Acknowledgment:** Ensures messages are processed reliably.

---

## Exchange Types
- **Direct:** Routes messages with an exact match routing key.
- **Fanout:** Broadcasts messages to all bound queues.
- **Topic:** Uses patterns (`*` and `#`) to match routing keys.
- **Headers:** Uses message headers instead of routing keys.

---

## Advanced Features
- **Durable Queues:** Survive RabbitMQ restarts.
- **Message Acknowledgment:** Prevents message loss.
- **Prefetching:** Limits message load per consumer.
- **Dead Letter Exchange (DLX):** Handles failed messages.
- **Priority Queues:** Gives importance to certain messages.

---

## License
MIT
