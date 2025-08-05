if (window.contentScriptInjected !== true) {
    window.contentScriptInjected = true;

    var watchFrame;

    function onAppLoad() {
        watchFrame = document.getElementsByTagName("ytd-watch-flexy");
        // wait until ytd-watch-flexy is loaded
        const observer = new MutationObserver(mutations => {
            if (watchFrame.length > 0) {
                console.log("Watch frame loaded");
                observeFrame();
                observer.disconnect();
            }
        })
        observer.observe(document.body,{childList:true,subtree:true});

        const iconLink = document.createElement("link");
        iconLink.rel = "stylesheet";
        iconLink.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,200,0,0&icon_names=download";
        document.head.append(iconLink);
    }

    function observeFrame() {
        if (!watchFrame[0].hidden) {
            addButton(watchFrame[0].querySelector("#top-level-buttons-computed"));
        }
        const observer = new MutationObserver(mutations => {
            const currButton = watchFrame[0].querySelector("#dl-ext");
            if (!currButton) {
                console.log("Adding new button");
                addButton(watchFrame[0].querySelector("#top-level-buttons-computed"));
            } else if (currButton.hidden) {
                currButton.hidden = false;
            }
        })
        observer.observe(watchFrame[0],{attributes:true,childList:true});
    }

    function addButton(menuFrame) {
        if (menuFrame != null) {
            console.log(menuFrame);
            console.log('adding button....');
            const outerButton = document.createElement("yt-button-shape");
            outerButton.className = "style-scope ytd-menu-renderer";

            const newButton = document.createElement("button");
            outerButton.id = "dl-ext";
            newButton.className = "yt-spec-button-shape-next yt-spec-button-shape-next--tonal yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m yt-spec-button-shape-next--icon-button yt-spec-button-shape-next--enable-backdrop-filter-experiment";

            const innerButtonDiv = document.createElement("div");
            innerButtonDiv.className = "yt-spec-button-shape-next__icon";
            innerButtonDiv.ariaHidden = true;

            const icon = document.createElement("span");
            icon.className = "material-symbols-outlined";
            icon.innerText = "download";
            innerButtonDiv.appendChild(icon);

            newButton.appendChild(innerButtonDiv);
            console.log("appending this thing???");
            outerButton.appendChild(newButton);
            menuFrame.appendChild(outerButton);
        }
    }

    if (document.readyState=='complete') { 
        onAppLoad();
    } else {
        window.addEventListener("load",onAppLoad);
    }
}