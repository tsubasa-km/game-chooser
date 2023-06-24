
let item_n = 3;

document.getElementById("append_form").addEventListener("submit", e => {
    e.preventDefault();
    const form = document.forms[0];
    const item = {
        name: form.name.value,
        weight: form.weight.value
    };
    const items = document.querySelector("#items tbody");
    let new_elm = `
        <tr id="item_${item_n}">
            <td class="item_name">${item.name}</td>
            <td class="item_weight">${item.weight}</td>
            <td><button type="button" class="button del" value="${item_n}">削除</button></td>
        </tr>`
    items.insertAdjacentHTML("beforeend", new_elm);
    item_n += 1;
    document.querySelector("form #name").value = "";
    document.querySelector("form #weight").value = "1";
    del_btns = document.querySelectorAll("button.button.del");
    del_btns.forEach(btn => {
        btn.addEventListener("click", e => {
            document.querySelector("#result div").innerHTML = "";
            if (btn.value == "-1") {
                document.querySelectorAll(`[id^="item_"]`).forEach(i => {
                    i.remove();
                });
                return;
            }
            document.getElementById(`item_${btn.value}`).remove();
        });
    });
});

document.getElementById("result_btn").addEventListener("click", e => {
    const tbody = document.querySelector('#items tbody');
    let item_names = [...tbody.querySelectorAll('.item_name')];
    let item_weights = [...tbody.querySelectorAll('.item_weight')];
    let items = [];
    item_names.map((item_name, idx) => {
        items.push({ name: [item_name.innerHTML], weight: item_weights[idx].innerHTML })
    });
    let all_events = [];
    items.forEach(item => {
        console.log(item.name)
        for (i = 0; i < Number(item.weight); i++) {
            all_events.push(item.name);
            console.log(item.name)
        }
    });

    let result = all_events[Math.floor(Math.random() * all_events.length)];
    document.querySelector("#result div").innerHTML = result;
});