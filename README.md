# musala-service
This sample project is managing gateways - master devices that control multiple peripheral devices.

## Clone the repository code

```bash
git clone https://github.com/lcespinosa/musala-service.git
```
## Setup the environment.
You need configure the environment vars for the project, please copy the .env.example file to .env and configure those variables values.

```bash
PORT=3300
MONGO_DATABASE_PORT=27017
MONGO_DB_PATH=<path to db data>
MONGO_DB=<mongo connection url>
```

## Install NodeJs dependencies
You need move to the project directory and install all project dependencies using `npm` or `yarn` like this:

```bash
npm install

or

yarn install
```

## Running locally
For run local project you need execute this npm script:

```bash
npm run dev
```

## Running for production
For build and run the project for production you need execute those npm scripts:

```bash
npm run build
npm run start
```

## Documentation

**API Endpoints**

| Method | URI                                            | Action                                 |
|--------|------------------------------------------------|----------------------------------------|
| GET    | /api/gateways                                  | Get all gateways                       |
| GET    | /api/gateways/{id}                             | View a single gateway                  |
| POST   | /api/gateways                                  | Store a gateways with multiple devices |
| POST   | /api/gateways/{id}/devices                     | Add devices to a gateway               |
| DELETE | /api/gateways/{gateway_id}/devices/{device_id} | Remove a device from a gateway         |

**Entity Relationship Model**

| Gateway                 |                      | Device                     |
|:------------------------|----------------------|----------------------------|
| - serial_number: string |                      | - uid: number              |
| - name: string          | 0 --------------- 10 | - vendor: string           |
| - ipv4: string          |                      | - created_at: Date         |
|                         |                      | - status: [online/offline] |