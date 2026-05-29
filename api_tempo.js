async function consultarTempo(cidade) {
    const tempo = document.querySelector("#tempo");

    tempo.innerHTML = `<p>Buscando clima de ${cidade}...</p>`;

    const API_KEY = "COLOQUE_SUA_CHAVE_AQUI";

    try {
        const cidadeFormatada = encodeURIComponent(cidade);

        console.log(`Consultando clima para ${cidadeFormatada}...`);
        
        const resposta = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cidadeFormatada}&units=metric&lang=pt_br&appid=2840a64a04cf0b26316124aaeb221815`
        );

        if (!resposta.ok) {
            tempo.innerHTML = `<p>Não foi possível buscar o clima de ${cidade}.</p>`;
            return;
        }

        const dados = await resposta.json();

        const clima = {
            cidade: dados.name,
            temperatura: dados.main.temp,
            sensacaoTermica: dados.main.feels_like,
            descricao: dados.weather[0].description,
            umidade: dados.main.humidity
        };

        tempo.innerHTML = `
            <h3>Clima em ${clima.cidade}</h3>
            <p>Temperatura: ${clima.temperatura}°C</p>
            <p>Sensação térmica: ${clima.sensacaoTermica}°C</p>
            <p>Clima: ${clima.descricao}</p>
            <p>Umidade: ${clima.umidade}%</p>
        `;

        console.log(clima);

    } catch (erro) {
        tempo.innerHTML = `<p>Erro ao consultar a API de clima.</p>`;
        console.log(erro);
    }
}