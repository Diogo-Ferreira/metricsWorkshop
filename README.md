# metricsWorkshop

Start graphite and grafana

```
docker-compose up -d graphite grafana
```

Check on your browser: http://localhost:3010 .

user: admin
pwd: admin

Start your server and temperature sensor:

```
docker-compose up -d sensor server
```

If you change the code you can reload by doing:

```
docker-compose stop sensor server && docker-compose up -d sensor server
```

# First step

Create a simple temperateur graph.

# Goal

Create all the graphs present on the screenshot
![goal](./goal.png)

You can always cheat and visual the whole board with the file `grafana-final.json`.

