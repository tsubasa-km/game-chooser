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

function lottery(list) {
    let all_events = [];
    list.forEach(item => {
        for (i = 0; i < Number(item.weight); i++) {
            all_events.push(item.name);
        }
    });
    return all_events[Math.floor(Math.random() * all_events.length)];
}

function result_disp(result){
    document.querySelector("#result div").innerHTML = result;
}

async function roulette(list, n = 20, play = true) {
    return await new Promise(function (resolve) {
        t = 2.5*1000;//秒
        if (!play){
            result_disp(lottery(list));
        }else{
            let dram_role = new Audio("./resource/SE/ドラムロール.mp3");
            let decid = new Audio("./resource/SE/ロールの閉め.mp3");
            dram_role.volume *= 0.2;
            decid.volume *= 0.2;
            dram_role.play();

            for(i=0;i<n;i++){
                // setTimeout(function () { result_disp(lottery(list)) }, (t/n)*i);
            }
            setTimeout(function(){dram_role.pause()},t);
            setTimeout(function(){decid.play();resolve(0)},t);

        }
    })
}

var result_btn = document.getElementById("result_btn")
result_btn.addEventListener("click", async (e) => {
    result_btn.disabled = true;
    const tbody = document.querySelector('#items tbody');
    let item_names = [...tbody.querySelectorAll('.item_name')];
    let item_weights = [...tbody.querySelectorAll('.item_weight')];
    let items = item_names.map((item_name, idx) => ({
        name: [item_name.innerHTML],
        weight: item_weights[idx].innerHTML,
    }));
    await roulette(items);
    result_btn.disabled = false;
});