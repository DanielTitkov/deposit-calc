const config = {
    defaults: {
        INFLATION_CONTROL: false,
        INFLATION_VALUE: 0,
        MORTGAGE_RATE: 8,
        MORTGAGE_PERIOD: 15,
        DEPOSIT_RATE: 4,
        ASSET_PRICE: 5000000,
        RENT_PRICE: 25000,
        RENT_COEF: 0.005, // not used by now
    },
    labels: {
        INFLATION_CONTROL: 'Учитывать инфляцию',
        INFLATION_VALUE: 'Среднегодовая инфляция',
        MORTGAGE_RATE: 'Процентная ставка по ипотеке',
        MORTGAGE_PERIOD: 'Срок кредитования (лет)',
        DEPOSIT_RATE: 'Процентная ставка по вкладу',
        ASSET_PRICE: 'Цена актива',
        RENT_PRICE: 'Месяц аренды',
        RENT_COEF: 'Коэффициент стоимости аренды', // not used by now
        WALL_SHARE: "Что выгоднее - ипотека или вклад? Вот что у меня получилось.",
    },
    VK_APP_ID: "7558666",
    AUTHOR_LINK: "https://vk.com/delael",
};

export default config;