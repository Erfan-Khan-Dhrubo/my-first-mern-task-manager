import React, { useState, useEffect } from "react";
import socket from "../../socket";

const Receive = () => {
  const room = "56";
  const [messageReceived, setMessageReceived] = useState("");
  const [connectionRequest, setConnectionRequest] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [isLocationSharing, setIsLocationSharing] = useState(false);

  useEffect(() => {
    socket.emit("join_room", room);

    socket.on("request_connection", () => {
      setConnectionRequest(true);
    });

    socket.on("send_message", (data) => {
      setMessageReceived(data.message);
    });

    // Location sharing events
    socket.on("receive_location", (location) => {
      setCurrentLocation(location);
      setIsLocationSharing(true);
    });

    socket.on("location_sharing_stopped", () => {
      setIsLocationSharing(false);
      setCurrentLocation(null);
      setShowMap(false);
    });

    return () => {
      socket.off("request_connection");
      socket.off("send_message");
      socket.off("receive_location");
      socket.off("location_sharing_stopped");
    };
  }, []);

  const accept = () => {
    socket.emit("accept_connection", { room });
    // console.log("ho");
    setConnectionRequest(false);
  };

  const reject = () => {
    socket.emit("reject_connection", { room });
    setConnectionRequest(false);
  };

  return (
    <div>
      {connectionRequest && (
        <div>
          <p>Do you want to connect?</p>
          <button onClick={accept} className="btn bg-green-500 text-white">
            Accept
          </button>
          <button onClick={reject} className="btn bg-red-500 text-white">
            Reject
          </button>
        </div>
      )}

      <div className="mt-4">
        <h2>Received Message:</h2>
        {messageReceived}
      </div>

      {isLocationSharing && currentLocation && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50">
          <h3 className="text-lg font-semibold mb-3">
            📍 Live Location Sharing
          </h3>

          <div className="mb-3">
            <p className="text-sm text-gray-600">
              <strong>Latitude:</strong> {currentLocation.latitude.toFixed(6)}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Longitude:</strong> {currentLocation.longitude.toFixed(6)}
            </p>
            <p className="text-sm text-gray-500">
              Last updated:{" "}
              {new Date(currentLocation.timestamp).toLocaleTimeString()}
            </p>
          </div>

          <div className="flex gap-2">
            {!showMap ? (
              <button
                onClick={() => setShowMap(true)}
                className="btn bg-blue-500 text-white"
              >
                View Map
              </button>
            ) : (
              <button
                onClick={() => setShowMap(false)}
                className="btn bg-gray-500 text-white"
              >
                Hide Map
              </button>
            )}
          </div>

          {showMap && (
            <div className="mt-4">
              <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-600 mb-2">Map View</p>
                  <p className="text-sm text-gray-500">
                    Coordinates: {currentLocation.latitude.toFixed(6)},{" "}
                    {currentLocation.longitude.toFixed(6)}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    (Click coordinates to open in Google Maps)
                  </p>
                  <a
                    href={`https://www.google.com/maps?q=${currentLocation.latitude},${currentLocation.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Receive;
