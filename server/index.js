const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');

const { Server } = require('socket.io'); 
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET','POST'],
        allowedHeaders: 'Content-Type, Authorization, X-Requested-With, X-Socket-ID',
        credentials: true,
        maxAge: '86400'
    }
});

io.on('connection', (socket) => {
    console.log('socket id', socket.id);
    
    socket.on('current_location', (data) => {
        console.log('current_location', data);
        checkCloseLights(data);
    });
    

    socket.on('disconnect', () => {
        console.log('socket disconnected', socket.id);
    });
})

const checkCloseLights = (data) => {
    console.log('checkCloseLights', data);
    const lightsArr = [
        { id: 'hs-6lp0eqG7aT3hzAAAH', lat: 50.4501, lng: 30.5234 },
        { id: 'hs-6lp0eqG7aT3hzAAAH', lat: 21.258661, lng: -99.759626 },
        { id: 'hs-6lp0eqG7aT3hzAAAH', lat: 51.4501, lng: 33.5234 },
    ];
    const distance = (lat1, lng1, lat2, lng2) => {
        const R = 6371; // Radius of the earth in km
        const dLat = deg2rad(lat2 - lat1);  // deg2rad below
        const dLon = deg2rad(lng2 - lng1); 
        const a = 
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in km
        return d;
    }
    const deg2rad = (deg) => {
        return deg * (Math.PI / 180)
    }
    const isClose = (lat1, lng1, lat2, lng2) => {
        return distance(lat1, lng1, lat2, lng2) < 0.5;
    }
    const isCloseLight = (light) => {
        return isClose(data.lat, data.lng, light.lat, light.lng);
    }
    const closeLights = lightsArr.filter(isCloseLight);
    console.log('closeLights', closeLights);
    if (closeLights.length > 0) {
        io.emit('switch_light', { closeLights });
    } else { 
        io.emit('no_close_lights', { closeLights: [] });
    }
}


server.listen(3001, () => {
    console.log('Server running on port 3000');
    }
);