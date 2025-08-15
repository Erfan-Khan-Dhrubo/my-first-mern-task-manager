import React, { useState, useEffect } from "react";
import socket from "../../socket";
const SendMsg = () => {
  const [message, setMessage] = useState("");
  const [connected, setConnected] = useState(false);
  const [isSharingLocation, setIsSharingLocation] = useState(false);
  const [locationInterval, setLocationInterval] = useState(null);
  const room = "56"; // static room for demo

  useEffect(() => {
    // Join the room when component mounts
    socket.emit("join_room", room);
  }, []);

  const requestConnect = () => {
    socket.emit("request_connection", { room });
  };

  const startLocationSharing = () => {
    if ("geolocation" in navigator) {
      setIsSharingLocation(true);

      // Get initial location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            timestamp: Date.now(),
          };
          socket.emit("share_location", { room, location });
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Error getting location. Please check permissions.");
          setIsSharingLocation(false);
        }
      );

      // Set up continuous location tracking
      const interval = setInterval(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const location = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              timestamp: Date.now(),
            };
            socket.emit("share_location", { room, location });
          },
          (error) => {
            console.error("Error getting location:", error);
          }
        );
      }, 5000); // Update every 5 seconds

      setLocationInterval(interval);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const stopLocationSharing = () => {
    setIsSharingLocation(false);
    if (locationInterval) {
      clearInterval(locationInterval);
      setLocationInterval(null);
    }
    socket.emit("stop_location_sharing", { room });
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.on("accept_connection", () => {
      setConnected(true);
    });

    socket.on("reject_connection", () => {
      alert("Receiver rejected connection!");
    });

    return () => {
      socket.off("accept_connection");
      socket.off("reject_connection");
    };
  }, []);

  return (
    <div>
      <button onClick={requestConnect} className="btn bg-blue-500 text-white">
        Connect
      </button>

      {connected && (
        <div className="mt-4 space-y-4">
          <div className="flex gap-2">
            {!isSharingLocation ? (
              <button
                onClick={startLocationSharing}
                className="btn bg-green-500 text-white"
              >
                Start Sharing Location
              </button>
            ) : (
              <button
                onClick={stopLocationSharing}
                className="btn bg-red-500 text-white"
              >
                Stop Sharing Location
              </button>
            )}
          </div>

          {isSharingLocation && (
            <div className="text-sm text-green-600">
              📍 Sharing location every 5 seconds...
            </div>
          )}

          <div className="border-t pt-4">
            <input
              type="text"
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border rounded px-3 py-2 mr-2"
            />
            <button
              onClick={sendMessage}
              className="btn bg-blue-500 text-white"
            >
              Send Message
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SendMsg;
