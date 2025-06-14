document.addEventListener("DOMContentLoaded", function () {
   
    fetch("header.html")
        .then(response => response.text())
        .then(data => document.getElementById("header-container").innerHTML = data);

    fetch("footer.html")
        .then(response => response.text())
        .then(data => document.getElementById("footer-container").innerHTML = data);

    const competitors = [
        { name: "TechCorp", sector: "Технології", capital: "$1B", address: "Silicon Valley", financials: "Стабільний ріст", trends: "AI, Cloud", opportunities: "Розширення на Європу", employees: "5000", marketShare: "25%", founded: "2008", ceo: "John Smith", image: "images/graphic_up.jpg" },
        { name: "FinServe", sector: "Фінанси", capital: "$500M", address: "London, UK", financials: "Прибуток зростає", trends: "Fintech, Blockchain", opportunities: "Нові фінансові послуги", employees: "1200", marketShare: "15%", founded: "2015", ceo: "Emma Johnson", image: "images/graphic_down.jpg" },
        { name: "EnergyNet", sector: "Енергетика", capital: "$2B", address: "Berlin, Germany", financials: "Висока стабільність", trends: "Зелена енергетика", opportunities: "Інвестиції в нові технології", employees: "8000", marketShare: "30%", founded: "2000", ceo: "Michael Brown", image: "images/graphic_down.jpg" },
        { name: "AutoDrive", sector: "Автомобілі", capital: "$3B", address: "Detroit, USA", financials: "Постійне зростання", trends: "Електрокари, Автопілот", opportunities: "Розширення на азійський ринок", employees: "10000", marketShare: "20%", founded: "2012", ceo: "David White", image: "images/graphic_down.jpg" },
        { name: "FoodTech", sector: "Харчова промисловість", capital: "$700M", address: "Paris, France", financials: "Інноваційні продукти", trends: "Альтернативні білки", opportunities: "Глобальне розширення", employees: "3500", marketShare: "10%", founded: "2010", ceo: "Sophie Martin", image: "images/graphic_up.jpg" },
        { name: "EduTech", sector: "Освіта", capital: "$900M", address: "Toronto, Canada", financials: "Швидке зростання", trends: "Онлайн-навчання", opportunities: "Корпоративний сегмент", employees: "2500", marketShare: "12%", founded: "2017", ceo: "Robert King", image: "images/graphic_down.jpg" },
        { name: "HealthPlus", sector: "Медицина", capital: "$2.5B", address: "Zurich, Switzerland", financials: "Стабільний ріст", trends: "Дистанційна медицина", opportunities: "Інвестиції в AI", employees: "7500", marketShare: "28%", founded: "1995", ceo: "Laura Green", image: "images/graphic_up.jpg" },
        { name: "CloudSync", sector: "Хмарні технології", capital: "$1.2B", address: "Seattle, USA", financials: "Зростання клієнтів", trends: "Кібербезпека", opportunities: "Бізнес-рішення", employees: "6800", marketShare: "22%", founded: "2005", ceo: "Richard Adams", image: "images/graphic_up.jpg" }
    ];
    

    const competitorsList = document.getElementById("competitors-list");

    competitors.forEach((comp, index) => {
        const competitorCard = document.createElement("div");
        competitorCard.classList.add("competitor-card");

        competitorCard.innerHTML = `
            <img src="${comp.image}" alt="${comp.name}">
            <div class="competitor-info">
                <h3>${comp.name}</h3>
                <p><strong>Сфера:</strong> ${comp.sector}</p>
                <button class="learn-more-btn" data-index="${index}">→</button>
            </div>
        `;

        competitorsList.appendChild(competitorCard);
    });

    const modal = document.getElementById("competitor-modal");
    modal.style.display = "none";

    document.querySelectorAll(".learn-more-btn").forEach(button => {
        button.addEventListener("click", function () {
            const index = this.getAttribute("data-index");
            const competitor = competitors[index];

            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-btn">&times;</span>
                    <h2>Детальний аналіз:</h2>
                    <div class="modal-grid">
                        <div class="modal-left">
                            <p><strong>Назва:</strong> ${competitor.name}</p>
                            <p><strong>Сфера:</strong> ${competitor.sector}</p>
                            <p><strong>Капітал:</strong> ${competitor.capital}</p>
                            <p><strong>Адреса:</strong> ${competitor.address}</p>
                            <p><strong>Фінансові показники:</strong> ${competitor.financials}</p>
                            <p><strong>Засновано:</strong> ${competitor.founded}</p>
                            <p><strong>CEO:</strong> ${competitor.ceo}</p>
                            <p><strong>Кількість працівників:</strong> ${competitor.employees}</p>
                            <p><strong>Частка ринку:</strong> ${competitor.marketShare}</p>
                        </div>
                        <div class="modal-right">
                            <p><strong>Тренди:</strong> ${competitor.trends}</p>
                            <p><strong>Можливості для розвитку:</strong> ${competitor.opportunities}</p>
                        </div>
                    </div>
                </div>
            `;

            modal.style.display = "flex";

            document.querySelector(".close-btn").addEventListener("click", function () {
                modal.style.display = "none";
            });
        });
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
