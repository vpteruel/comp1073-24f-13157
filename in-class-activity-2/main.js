// Initialize and add the map
function initMap() {

    // Location for Georgian College, Barrie
    const georgianCollegeBarrie = { lat: 44.4027, lng: -79.6944 };

    // Map centered at Georgian College, Barrie
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 44.0592, lng: -79.4613 },
        zoom: 9
    });

    const marker = new google.maps.Marker({
        position: georgianCollegeBarrie,
        map: map,
        title: "Georgian College, Barrie"
    });

    // Geolocation to get the user's current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                // Add a marker for the user's location
                const marker = new google.maps.Marker({
                    position: userLocation,
                    map: map,
                    title: "Your Location"
                });

                // Center the map on the user's location
                map.setCenter(userLocation);
            },
            (error) => {
                console.error("Error getting location:", error);
            }
        );
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
}
