export function startLoad() {
    var load = document.getElementById("load-screen");
    load.classList.remove("hidden");
}

export function endLoad() {
    var load = document.getElementById("load-screen");
    load.classList.add("hidden");
}
