const campoDdd = document.querySelector("#campo-ddd");
const btnContainer = document.querySelector(".btn-container");
const btn = document.querySelector("#login-btn");
const form = document.querySelector("form");
const msg = document.querySelector(".msg");
const resultado = document.querySelector("#resultado");

form.addEventListener("submit", async function (evento) {
    evento.preventDefault();

    const ddd = campoDdd.value.trim();

    msg.textContent = "";
    resultado.innerHTML = "";
    campoDdd.style.border = "";

    if (ddd === "") {
        campoDdd.style.border = "2px solid red";
        msg.style.color = "red";
        msg.textContent = "Nao pode ser enviado assim. Coloque o DDD.";
        return;
    }

    try {
        btn.disabled = true;
        btn.textContent = "Consultando...";

        const resposta = await fetch(`https://brasilapi.com.br/api/ddd/v1/${ddd}`);

        if (!resposta.ok) {
            campoDdd.style.border = "2px solid red";
            msg.style.color = "red";
            msg.textContent = "DDD nao encontrado.";
            return;
        }

        const dados = await resposta.json();

        resultado.innerHTML = `
            <h3>Resultado</h3>
            <p>Estado: ${dados.state}</p>
            <h4>Cidades:</h4>
            <div id="lista-cidades"></div>
        `;

        const listaCidades = document.querySelector("#lista-cidades");

        dados.cities.forEach(function (cidade) {
            const botaoCidade = document.createElement("button");

            botaoCidade.type = "button";
            botaoCidade.textContent = cidade;

            botaoCidade.addEventListener("click", function () {
                consultarTempo(cidade);
            });

            listaCidades.appendChild(botaoCidade);
        });

    } catch (erro) {
        campoDdd.style.border = "2px solid red";
        msg.style.color = "red";
        msg.textContent = "Nao foi possivel consultar a API.";
    } finally {
        btn.disabled = false;
        btn.textContent = "Enviar";
    }
});