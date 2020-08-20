const config = {
    defaults: {
        INFLATION_CONTROL: false,
        INFLATION_VALUE: 0,
        MORTGAGE_RATE: 8,
        MORTGAGE_PERIOD: 15,
        DEPOSIT_RATE: 4,
        ASSET_PRICE: 6000000,
        RENT_PRICE: 30000,
        RENT_COEF: 0.005, // not used by now
        INITIAL_PAYMENT: 1000000,
        ASSET_PRICE_INCREASE_COEF: 0,
    },
    labels: {
        INFLATION_CONTROL: 'Учитывать инфляцию',
        INFLATION_VALUE: 'Среднегодовая инфляция',
        MORTGAGE_RATE: 'Процентная ставка по ипотеке',
        INITIAL_PAYMENT: "Первоначальный взнос",
        MORTGAGE_PERIOD: 'Срок кредитования в годах',
        DEPOSIT_RATE: 'Процентная ставка по вкладу',
        ASSET_PRICE: 'Цена актива',
        RENT_PRICE: 'Месяц аренды',
        RENT_COEF: 'Коэффициент стоимости аренды', // not used by now
        WALL_SHARE: "Что выгоднее - ипотека или вклад? Вот что у меня получилось.",
        ASSET_PRICE_INCREASE_COEF: "Годовое удорожание актива",
    },
    interface: {
        INITIAL_PAYMENT_RATES: [0, 0.1, 0.15, 0.2, 0.3],
        ALLOW_ADVANCED_FIELDS: false,
    },
    limits: {
        MORTGAGE_RATE_MIN: 0,
        MORTGAGE_RATE_MAX: 50,
        MORTGAGE_PERIOD_MIN: 1,
        MORTGAGE_PERIOD_MAX: 99,
        DEPOSIT_RATE_MIN: 0,
        DEPOSIT_RATE_MAX: 50,
        ASSET_PRICE_MIN: 0,
        ASSET_PRICE_MAX: 1000000000,
        RENT_PRICE_MIN: 0,
        RENT_PRICE_MAX: 99000000,
        RENT_COEF: 0.005, // not used by now
        INITIAL_PAYMENT_MIN: 0,
        INITIAL_PAYMENT_MAX: 1000000000,
        ASSET_PRICE_INCREASE_COEF_MIN: 0,     
        ASSET_PRICE_INCREASE_COEF_MAX: 30,     
    },
    VK_APP_ID: "7558666",
    AUTHOR_LINK: "https://vk.com/delael",
};

export default config;