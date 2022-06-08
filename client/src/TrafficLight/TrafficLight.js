import React, { useEffect, useState } from 'react';
import './TrafficLight.css';
const TrafficLight = (props) => {
    const arr = [
        {
            id: 1,
            color: 'red',
            status: 'on',
        },
        {
            id: 2,
            color: 'yellow',
            status: 'off',
        },
        {
            id: 3,
            color: 'green',
            status: 'off',
        },
    ];

    const [trafficLights, setTrafficLights] = useState(arr);


    useEffect(() => {
        props.socket.on('switch_light', (data) => {
            handleSwitchLight(data.closeLights);
        });
    }
    , [ ]);

    const handleSwitchLight = (data) => {
        console.log('handleSwitchLight', data);
        const newTrafficLights = trafficLights.map(light => {
            if (light.id === 1) {
                light.status = 'off';
            }
            if (light.id === 2) {
                light.status = 'off';
            }
            if (light.id === 3) {
                light.status = 'on';
            }
            return light;
        }
        );

        setTrafficLights(newTrafficLights);
    }


    return (
        <div className="traffic-light">
            { trafficLights.map((light, index) => {
                return (
                    <div key={index} className={`traffic-light-item ${light.color} ${light.status}`}>
                        <div className="traffic-light-item-light"></div>
                    </div>
                )
            }
            )}
        </div>
    );
}

export default TrafficLight;