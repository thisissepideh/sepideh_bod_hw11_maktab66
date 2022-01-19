document.addEventListener("DOMContentLoaded", main);

function switchTheme() {
  document.querySelector("body").classList.toggle("light");
  const themeImg = this.children[0];
  themeImg.setAttribute(
    "src",
    themeImg.getAttribute("src") === "./assets/images/icon-sun.svg"
      ? "./assets/images/icon-moon.svg"
      : "./assets/images/icon-sun.svg"
  );
}

function main() {
  document
    .getElementById("theme-switcher")
    .addEventListener("click", switchTheme);

  addTodo();

  const add = document.getElementById("add-btn");
  const txtInput = document.querySelector(".txt-input");
  add.addEventListener("click", function () {
    const item = txtInput.value.trim();
    if (item) {
      txtInput.value = "";
      const todos = !localStorage.getItem("todos")
        ? []
        : JSON.parse(localStorage.getItem("todos"));
      const currentTodo = {
        item,
        isCompleted: false,
      };
      addTodo([currentTodo]);
      todos.push(currentTodo);
      localStorage.setItem("todos", JSON.stringify(todos));
    }
    txtInput.focus();
  });

  document.querySelector(".filter").addEventListener("click", function (e) {
    const id = e.target.id;
    if (id) {
      document.querySelector(".on").classList.remove("on");
      document.getElementById(id).classList.add("on");
      document.querySelector(".todos").className = `todos ${id}`;
    }
  });

  document
    .getElementById("clear-completed")
    .addEventListener("click", function () {
      deleteIndexes = [];
      document.querySelectorAll(".card.checked").forEach(function (card) {
        deleteIndexes.push(
          [...document.querySelectorAll(".todos .card")].indexOf(card)
        );
        card.classList.add("fall");

        setTimeout(function () {
          card.remove();
        }, 100);
      });

      removeManyTodo(deleteIndexes);
    });
}

function stateTodo(index, completed) {
  const todos = JSON.parse(localStorage.getItem("todos"));
  todos[index].isCompleted = completed;
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeTodo(index) {
  const todos = JSON.parse(localStorage.getItem("todos"));
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeManyTodo(indexes) {
  let todos = JSON.parse(localStorage.getItem("todos"));
  todos = todos.filter(function (todo, index) {
    return !indexes.includes(index);
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo(todos = JSON.parse(localStorage.getItem("todos"))) {
  if (!todos) {
    return null;
  }
  const itemsLeft = document.getElementById("items-left");

  todos.forEach(function (todo) {
    const card = document.createElement("li");
    const cbContainer = document.createElement("div");
    const cbInput = document.createElement("input");
    const check = document.createElement("span");
    const item = document.createElement("p");
    const button = document.createElement("button");
    const img = document.createElement("img");

    card.classList.add("card");
    button.classList.add("clear");
    cbContainer.classList.add("cb-container");
    cbInput.classList.add("cb-input");
    item.classList.add("item");
    check.classList.add("check");
    button.classList.add("clear");

    card.setAttribute("draggable", true);
    img.setAttribute("src", "./assets/images/icon-cross.svg");
    img.setAttribute("alt", "Clear it");
    cbInput.setAttribute("type", "checkbox");

    item.textContent = todo.item;

    if (todo.isCompleted) {
      card.classList.add("checked");
      cbInput.setAttribute("checked", "checked");
    }

    cbInput.addEventListener("click", function () {
      const correspondingCard = this.parentElement.parentElement;
      const checked = this.checked;
      stateTodo(
        [...document.querySelectorAll(".todos .card")].indexOf(
          correspondingCard
        ),
        checked
      );
      checked
        ? correspondingCard.classList.add("checked")
        : correspondingCard.classList.remove("checked");
      itemsLeft.textContent = document.querySelectorAll(
        ".todos .card:not(.checked)"
      ).length;
    });

    button.addEventListener("click", function () {
      const correspondingCard = this.parentElement;

      removeTodo(
        [...document.querySelectorAll(".todos .card")].indexOf(
          correspondingCard
        )
      );

      setTimeout(function () {
        correspondingCard.remove();
        itemsLeft.textContent = document.querySelectorAll(
          ".todos .card:not(.checked)"
        ).length;
      }, 100);
    });

    button.appendChild(img);
    cbContainer.appendChild(cbInput);
    cbContainer.appendChild(check);
    card.appendChild(cbContainer);
    card.appendChild(item);
    card.appendChild(button);
    document.querySelector(".todos").appendChild(card);
  });

  itemsLeft.textContent = document.querySelectorAll(
    ".todos .card:not(.checked)"
  ).length;
}

document.addEventListener("DOMContentLoaded", main);

function main() {
  document
    .getElementById("theme-switcher")
    .addEventListener("click", function () {
      document.querySelector("body").classList.toggle("light");
      const themeImg = this.children[0];
      themeImg.setAttribute(
        "src",
        themeImg.getAttribute("src") === "./assets/images/icon-sun.svg"
          ? "./assets/images/icon-moon.svg"
          : "./assets/images/icon-sun.svg"
      );
    });

  addTodo();

  const add = document.getElementById("add-btn");
  const txtInput = document.querySelector(".txt-input");
  add.addEventListener("click", function () {
    const item = txtInput.value.trim();
    if (item) {
      txtInput.value = "";
      const todos = !localStorage.getItem("todos")
        ? []
        : JSON.parse(localStorage.getItem("todos"));
      const currentTodo = {
        item,
        isCompleted: false,
      };
      addTodo([currentTodo]);
      todos.push(currentTodo);
      localStorage.setItem("todos", JSON.stringify(todos));
    }
    txtInput.focus();
  });

  txtInput.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
      add.click();
    }
  });

  document.querySelector(".filter").addEventListener("click", function (e) {
    const id = e.target.id;
    if (id) {
      document.querySelector(".on").classList.remove("on");
      document.getElementById(id).classList.add("on");
      document.querySelector(".todos").className = `todos ${id}`;
    }
  });

  document
    .getElementById("clear-completed")
    .addEventListener("click", function () {
      deleteIndexes = [];
      document.querySelectorAll(".card.checked").forEach(function (card) {
        deleteIndexes.push(
          [...document.querySelectorAll(".todos .card")].indexOf(card)
        );
        card.classList.add("fall");

        setTimeout(function () {
          card.remove();
        }, 100);
      });
      removeManyTodo(deleteIndexes);
    });
}

function stateTodo(index, completed) {
  const todos = JSON.parse(localStorage.getItem("todos"));
  todos[index].isCompleted = completed;
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeTodo(index) {
  const todos = JSON.parse(localStorage.getItem("todos"));
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeManyTodo(indexes) {
  let todos = JSON.parse(localStorage.getItem("todos"));
  todos = todos.filter(function (todo, index) {
    return !indexes.includes(index);
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo(todos = JSON.parse(localStorage.getItem("todos"))) {
  if (!todos) {
    return null;
  }
  const itemsLeft = document.getElementById("items-left");

  todos.forEach(function (todo) {
    const card = document.createElement("li");
    const cbContainer = document.createElement("div");
    const cbInput = document.createElement("input");
    const check = document.createElement("span");
    const item = document.createElement("p");
    const button = document.createElement("button");
    const img = document.createElement("img");

    card.classList.add("card");
    button.classList.add("clear");
    cbContainer.classList.add("cb-container");
    cbInput.classList.add("cb-input");
    item.classList.add("item");
    check.classList.add("check");
    button.classList.add("clear");

    card.setAttribute("draggable", true);
    img.setAttribute("src", "./assets/images/icon-cross.svg");
    img.setAttribute("alt", "Clear it");
    cbInput.setAttribute("type", "checkbox");

    item.textContent = todo.item;

    if (todo.isCompleted) {
      card.classList.add("checked");
      cbInput.setAttribute("checked", "checked");
    }

    cbInput.addEventListener("click", function () {
      const correspondingCard = this.parentElement.parentElement;
      const checked = this.checked;
      stateTodo(
        [...document.querySelectorAll(".todos .card")].indexOf(
          correspondingCard
        ),
        checked
      );
      checked
        ? correspondingCard.classList.add("checked")
        : correspondingCard.classList.remove("checked");
      itemsLeft.textContent = document.querySelectorAll(
        ".todos .card:not(.checked)"
      ).length;
    });

    button.addEventListener("click", function () {
      const correspondingCard = this.parentElement;
      correspondingCard.classList.add("fall");
      removeTodo(
        [...document.querySelectorAll(".todos .card")].indexOf(
          correspondingCard
        )
      );

      setTimeout(function () {
        correspondingCard.remove();
        itemsLeft.textContent = document.querySelectorAll(
          ".todos .card:not(.checked)"
        ).length;
      }, 100);
    });

    button.appendChild(img);
    cbContainer.appendChild(cbInput);
    cbContainer.appendChild(check);
    card.appendChild(cbContainer);
    card.appendChild(item);
    card.appendChild(button);
    document.querySelector(".todos").appendChild(card);
  });

  itemsLeft.textContent = document.querySelectorAll(
    ".todos .card:not(.checked)"
  ).length;
}
