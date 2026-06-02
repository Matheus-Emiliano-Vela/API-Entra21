export async function buscarClima(cidade) {
  const cidadeFormatada = encodeURIComponent(cidade)

  try {
    const resposta = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cidadeFormatada}&units=metric&lang=pt_br&appid=2840a64a04cf0b26316124aaeb221815`
    )

    if (!resposta.ok) {
      throw new Error(`Não foi possível buscar o clima de ${cidadeFormatada}.`)
    }

    const dados = await resposta.json()

    return {
      cidade: dados.name,
      temperatura: Math.round(dados.main.temp),
      sensacao: Math.round(dados.main.feels_like),
      descricao: dados.weather[0].description,
      umidade: dados.main.humidity,
      icone: dados.weather[0].icon,
    }
  } catch (erro) {
    throw new Error("Erro desconhecido. Tente novamente.")
  }
}

export function renderizarCardClima(clima) {
  const section = document.getElementById("weather-section")
  const card = document.getElementById("weather-card")

  const iconeUrl = `https://openweathermap.org/img/wn/${clima.icone}@2x.png`

  card.innerHTML = `
        <div class="weather-card">
          <img class="weather-icon" src="${iconeUrl}" alt="${clima.descricao}" />
          <div class="weather-info">
            <h3>${clima.cidade}</h3>
            <div class="weather-temp">${clima.temperatura}°C</div>
            <div class="weather-desc">${clima.descricao}</div>
            <div class="weather-extra">
              <span>Sensação ${clima.sensacao}°C</span>
              <span>Umidade ${clima.umidade}%</span>
            </div>
          </div>
        </div>
      `

  section.classList.remove("hidden")
}
