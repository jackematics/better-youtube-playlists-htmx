import { closeModal } from "./modal.js";

async function createPlaylistItem(itemNumber, playlistItemData) {
  const playlistItem = document.createElement("li");
  playlistItem.id = playlistItemData.id;
  playlistItem.setAttribute("key", playlistItemData.id);
  playlistItem.className =
    "playlist-items h-[3.2rem] pt-1 pb-1 pr-3 mr-2 ml-3 flex flex-row text-[1.75rem] text-left cursor-pointer text-white hover:bg-warm-orange-hover";

  const indexContainer = document.createElement("div");
  indexContainer.className = "w-[4.5rem] flex justify-center";

  const index = document.createElement("p");
  index.textContent = itemNumber;

  indexContainer.appendChild(index);

  const thumbnail = document.createElement("img");
  thumbnail.src = playlistItemData.thumbnailUrl;
  thumbnail.alt = playlistItemData.title;
  thumbnail.width = 70;
  thumbnail.height = 36;
  thumbnail.className = "ml-6 mr-2";

  const title = document.createElement("p");
  title.className = "pl-7 w-[67rem] truncate";
  title.textContent = playlistItemData.title;

  playlistItem.appendChild(indexContainer);
  playlistItem.appendChild(thumbnail);
  playlistItem.appendChild(title);

  playlistItem.addEventListener("click", function () {
    // highlight selected
    document.querySelectorAll(".playlist-items").forEach((item) => {
      item.classList.remove("bg-warm-orange");
    });
    playlistItem.classList.add("bg-warm-orange");

    // scroll to centre of container
    const playlistItemsContainer = document.getElementById(
      "playlist-items-container"
    );

    // item.scrollTop = playlistItemsContainer.offsetTop;
    playlistItemsContainer.scrollTo({
      top:
        playlistItem.offsetTop -
        (playlistItemsContainer.clientHeight / 2 - 51.2),
      behavior: "smooth",
    });
  });

  return playlistItem;
}

function createPlaylistListItem(item) {
  const playlistListItem = document.createElement("li");
  playlistListItem.id = `li-${item.playlistId}`;
  playlistListItem.setAttribute("key", item.playlistId);
  playlistListItem.className = "mb-2";

  const option = document.createElement("option");
  option.className =
    "playlist mr-3 pl-2 pr-2 pb-1 pt-1 text-2xl text-left rounded-2xl cursor-pointer truncate font-medium text-white hover:bg-warm-orange-hover";
  option.title = item.playlistTitle;
  option.textContent = item.playlistTitle;

  option.addEventListener("click", async function () {
    const playlistTitle = document.getElementById("playlist-title");
    playlistTitle.textContent = item.playlistTitle;

    document.querySelectorAll(".playlist").forEach((playlist) => {
      playlist.classList.remove("bg-warm-orange");
    });
    option.classList.add("bg-warm-orange");

    try {
      const response = await fetch(`/playlist-items/${item.playlistId}`);

      if ([500, 424].includes(response.status)) {
        validationMessage.textContent = "Internal server error";
        return;
      }

      if (response.status === 400) {
        validationMessage.textContent = "Invalid playlist ID";
        return;
      }

      const playlist = await response.json();

      // populate playlist description

      document.getElementById(
        "total-videos"
      ).textContent = `Videos: ${playlist.totalVideos}`;

      const channelOwner = JSON.parse(
        localStorage.getItem("playlistListItems")
      ).find(
        (storedItem) => storedItem.playlistId === item.playlistId
      ).channelOwner;

      if (channelOwner) {
        document.getElementById("channel-owner").textContent = channelOwner;
      }

      // show operations

      document
        .getElementById("playlist-operations")
        .classList.remove("invisible");

      // create list items
      const playlistItems = document.getElementById("playlist-items");
      playlistItems.innerHTML = "";

      for (let i = 0; i < playlist.items.length; i++) {
        playlistItems.appendChild(
          await createPlaylistItem(i + 1, playlist.items[i])
        );
      }
    } catch (err) {
      console.log("cheese", err);

      // handle error getting playlist items? toast?
    }
  });

  playlistListItem.appendChild(option);

  return playlistListItem;
}

function renderList() {
  const playlistList = document.getElementById("playlist-list-items");
  playlistList.innerHTML = "";

  const playlistListItems =
    JSON.parse(localStorage.getItem("playlistListItems")) || [];

  playlistListItems.forEach((item) => {
    playlistList.appendChild(createPlaylistListItem(item));
  });
}

document.addEventListener("DOMContentLoaded", renderList());

document
  .getElementById("submit-playlist-button")
  .addEventListener("click", async function () {
    const playlistId = document.getElementById("playlist-id-input").value;
    const validationMessage = document.getElementById("validation-message");

    if (!playlistId) {
      validationMessage.textContent = "Invalid playlist id";
      return;
    }

    try {
      const response = await fetch(`/playlist-metadata/${playlistId}`);

      if ([500, 424].includes(response.status)) {
        validationMessage.textContent = "Internal server error";
        return;
      }

      if (response.status === 400) {
        validationMessage.textContent = "Invalid playlist ID";
        return;
      }

      const newPlaylistListItem = await response.json();

      const playlistListItems =
        JSON.parse(localStorage.getItem("playlistListItems")) || [];

      if (
        playlistListItems
          .map((data) => data.playlistId)
          .includes(newPlaylistListItem.playlistId)
      ) {
        validationMessage.textContent = "Duplicate playlists forbidden";
        return;
      }

      localStorage.setItem(
        "playlistListItems",
        JSON.stringify([...playlistListItems, newPlaylistListItem])
      );

      closeModal();
    } catch (err) {
      console.log(err);
      if ([500, 424].includes(err.statusCode)) {
        validationMessage.textContent = `Error fetching playlist data`;
        return;
      }

      if (err.statusCode === 400) {
        validationMessage.textContent = `No playlist items returned for playlist`;
        return;
      }
    }

    renderList();
  });
