export const environment = {
    production: false,
    firebaseConfig : {
        apiKey: "AIzaSyDZYzUu5oHdoHBBqpDJoJRphfJZr3qI4m0",
        authDomain: "recetario-f521a.firebaseapp.com",
        projectId: "recetario-f521a",
        storageBucket: "recetario-f521a.appspot.com",
        messagingSenderId: "1056492103842",
        appId: "1:1056492103842:web:660057320a005016734ffb",
        measurementId: "G-S6VCLVE1GZ"
      },
    api:{
        nationalities: 'https://www.themealdb.com/api/json/v1/1/list.php?a=list',
        categories: 'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
        listByNationality: 'https://www.themealdb.com/api/json/v1/1/filter.php?a=',
        listByCategory: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=',
        viewRecipe: 'https://www.themealdb.com/api/json/v1/1/lookup.php?i='
    }
};