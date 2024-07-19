(function() {
    // Function to set a cookie
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    // Function to get a cookie
    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Function to create a unique 8-digit alphanumeric identifier
    function generateUniqueId() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 8; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    // Function to assign unique identifiers to all elements
    function assignUniqueIds() {
        const allElements = document.getElementsByTagName('*');
        for (let i = 0; i < allElements.length; i++) {
            allElements[i].setAttribute('data-aydio-id', generateUniqueId());
        }
    }

    // Function to create the popup
    function createPopup() {
        // Create overlay
        const overlay = document.createElement("div");
        overlay.id = "overlay";
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.background = "rgba(0, 0, 0, 0.5)";
        overlay.style.display = "flex";
        overlay.style.justifyContent = "center";
        overlay.style.alignItems = "center";
        overlay.style.zIndex = "1000";

        // Create popup
        const popup = document.createElement("div");
        popup.id = "popup";
        popup.style.background = "white";
        popup.style.padding = "20px";
        popup.style.borderRadius = "5px";
        popup.style.textAlign = "center";
        popup.style.width = "300px";

        // Create title
        const title = document.createElement("h2");
        title.innerText = "Choose Your Experience";
        popup.appendChild(title);

        // Create message
        const message = document.createElement("p");
        message.innerText = "We offer an ad-supported version and a no-ads version of our site. Please choose your preference:";
        popup.appendChild(message);

        // Create buttons
        const adsButton = document.createElement("button");
        adsButton.id = "ads-button";
        adsButton.className = "popup-button";
        adsButton.innerText = "Ad-Supported";
        adsButton.style.margin = "10px";
        adsButton.style.padding = "10px 20px";
        adsButton.style.border = "none";
        adsButton.style.cursor = "pointer";
        adsButton.style.borderRadius = "5px";
        adsButton.style.backgroundColor = "#4CAF50";
        adsButton.style.color = "white";

        const noAdsButton = document.createElement("button");
        noAdsButton.id = "no-ads-button";
        noAdsButton.className = "popup-button";
        noAdsButton.innerText = "No Ads";
        noAdsButton.style.margin = "10px";
        noAdsButton.style.padding = "10px 20px";
        noAdsButton.style.border = "none";
        noAdsButton.style.cursor = "pointer";
        noAdsButton.style.borderRadius = "5px";
        noAdsButton.style.backgroundColor = "#f44336";
        noAdsButton.style.color = "white";

        // Append buttons to popup
        popup.appendChild(adsButton);
        popup.appendChild(noAdsButton);

        // Append popup to overlay
        overlay.appendChild(popup);

        // Append overlay to body
        document.body.appendChild(overlay);

        // Event listeners for buttons
        adsButton.addEventListener("click", function() {
            setCookie("userPreference", "ads", 30);
            document.body.removeChild(overlay);
        });

        noAdsButton.addEventListener("click", function() {
            setCookie("userPreference", "no-ads", 30);
            document.body.removeChild(overlay);
        });
    }

    // Function to check if the user has already made a choice
    function checkCookie() {
        const userPreference = getCookie("userPreference");
        if (!userPreference) {
            createPopup();
        }
    }

    // Check cookie and assign unique IDs on page load
    window.onload = function() {
        assignUniqueIds();
        checkCookie();
    };
})();
