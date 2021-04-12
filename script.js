"use strict";
// Selectors
const addBtn = document.querySelector(".add-btn");
const newNoticeInput = document.querySelector(".new-notice-input");
const noticeContainer = document.querySelector(".notice-container");
// const date = document.querySelector(".date");
const filterButtons = document.querySelector(".filter-buttons");

// Listeners
document.addEventListener("DOMContentLoaded", getNotices);
noticeContainer.addEventListener("click", completedTrash);
filterButtons.addEventListener("click", filterNotices);

// Date - Internationalization API
const now = new Date();
const locale = navigator.language;

const dateIntl = function () {
  const options = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    weekday: "long",
  };

  return new Intl.DateTimeFormat(locale, options).format();
};

// Date in the title
// date.textContent = dateIntl();

addBtn.addEventListener("click", function (event) {
  event.preventDefault;
  if (!newNoticeInput.value) return;

  // Notice
  const notice = document.createElement("div");
  notice.classList.add("notice");

  // Add to local storage
  saveToLocalStorage(newNoticeInput.value);

  // Date
  const dateNotice = document.createElement("p");
  dateNotice.classList.add("notice-date");
  dateNotice.textContent = new Intl.DateTimeFormat(locale).format(now);
  notice.append(dateNotice);

  // Notice Text
  const noticeText = document.createElement("p");
  noticeText.innerText = newNoticeInput.value;
  noticeText.classList.add("notice-text");
  notice.append(noticeText);

  // Completed Button
  const completedBtn = document.createElement("button");
  completedBtn.innerHTML = "<i class='fas fa-check'></i>";
  completedBtn.classList.add("completed-btn");
  notice.append(completedBtn);

  // Trash Button
  const trashBtn = document.createElement("button");
  trashBtn.innerHTML = "<i class='fas fa-trash-alt'></i>";
  trashBtn.classList.add("trash-btn");
  notice.append(trashBtn);

  // Append to the notice container
  noticeContainer.append(notice);

  newNoticeInput.value = "";
  newNoticeInput.focus();
});

// Completed and Trash buttons
function completedTrash(e) {
  const item = e.target;
  // Completed
  if (item.classList[0] === "completed-btn") {
    item.parentElement.classList.toggle("completed");
  }

  // Trash
  if (item.classList[0] === "trash-btn") {
    item.parentElement.classList.add("fall");
    removeLocalNotices(item.parentElement);
    item.parentElement.addEventListener("transitionend", () => {
      item.parentElement.remove();
    });
  }
}

function filterNotices(e) {
  const notices = noticeContainer.childNodes;

  if (e.target.classList[0] === "all-notices") {
    notices.forEach((notice) => {
      notice.style.display = "flex";
    });
  } else if (e.target.classList[0] === "completed-notices") {
    notices.forEach((notice) => {
      if (notice.classList.contains("completed")) {
        notice.style.display = "flex";
      } else {
        notice.style.display = "none";
      }
    });
  } else if (e.target.classList[0] === "uncompleted-notices") {
    notices.forEach((notice) => {
      if (notice.classList.contains("completed")) {
        notice.style.display = "none";
      } else {
        notice.style.display = "flex";
      }
    });
  }
}

function saveToLocalStorage(notice) {
  let notices;
  if (localStorage.getItem("notices") === null) {
    notices = [];
  } else {
    notices = JSON.parse(localStorage.getItem("notices"));
  }
  notices.push(notice);
  localStorage.setItem("notices", JSON.stringify(notices));
}

function getNotices() {
  let notices;
  if (localStorage.getItem("notices") === null) {
    notices = [];
  } else {
    notices = JSON.parse(localStorage.getItem("notices"));
  }
  notices.forEach(function (el) {
    // Notice
    const notice = document.createElement("div");
    notice.classList.add("notice");

    // Date
    const dateNotice = document.createElement("p");
    dateNotice.classList.add("notice-date");
    dateNotice.textContent = new Intl.DateTimeFormat(locale).format(now);
    notice.append(dateNotice);

    // Notice Text
    const noticeText = document.createElement("p");
    noticeText.innerText = el;
    noticeText.classList.add("notice-text");
    notice.append(noticeText);

    // Completed Button
    const completedBtn = document.createElement("button");
    completedBtn.innerHTML = "<i class='fas fa-check'></i>";
    completedBtn.classList.add("completed-btn");
    notice.append(completedBtn);

    // Trash Button
    const trashBtn = document.createElement("button");
    trashBtn.innerHTML = "<i class='fas fa-trash-alt'></i>";
    trashBtn.classList.add("trash-btn");
    notice.append(trashBtn);

    // Append to the notice container
    noticeContainer.append(notice);
  });
}

function removeLocalNotices(notice) {
  let notices;
  if (localStorage.getItem("notices") === null) {
    notices = [];
  } else {
    notices = JSON.parse(localStorage.getItem("notices"));
  }
  const noticeIndex = notice.children[1].innerText;

  notices.splice(notices.indexOf(noticeIndex), 1);
  localStorage.setItem("notices", JSON.stringify(notices));
}
