// function greet(name: string, age: number): string {
//     return `Hellp, my name is ${name}, I'm ${age} yo.`;
// }
// console.log(greet("Hieu", 21));

//-----------------------------------

// function greet(name: string, age?: number): string {
//     if (age) {
//         return `Hello ${name}, I'm  ${age} yo.`;
//     }
//     return `Gud to see you ${name}.`;
// }
// console.log(greet("Hieu")); 
// console.log(greet("Hieu", 21)); 

//-----------------------------------

// interface Person {
//     name: string;
//     age: number;
//     isStudent?: boolean; // Thuộc tính tùy chọn
// }
// const person: Person = {
//     name: "Mark",
//     age: 21,
//     isStudent: true
// };

//----------------------------------

// type ID = number | string; // Kiểu Union
// type AddFunction = (a: number, b: number) => number; // Kiểu hàm

// const userID: ID = "12345"; 
// // const userID: ID = true; // error: 'true' không thuộc kiểu 'number | string'

// const add: AddFunction = (x, y) => x + y;
// console.log(add(10, 15)); // 25

//----------------------------------

//Hands on 1: Modified weather apps
// const apiKey: string = '572fa78e6d41f3d8a41cb215de027ff9';

// function getWeather(): void {
//     const city = (document.getElementById('city') as HTMLInputElement).value;

//     if (!city) {
//         alert('Please enter a city');
//         return;
//     }

//     const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
//     const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

//     fetch(currentWeatherUrl)
//         .then(response => response.json())
//         .then((data: WeatherData) => {
//             displayWeather(data);
//         })
//         .catch(error => {
//             console.error('Error fetching current weather data:', error);
//             alert('Error fetching current weather data. Please try again.');
//         });

//     fetch(forecastUrl)
//         .then(response => response.json())
//         .then((data: ForecastResponse) => {
//             displayHourlyForecast(data.list);
//         })
//         .catch(error => {
//             console.error('Error fetching hourly forecast data:', error);
//             alert('Error fetching hourly forecast data. Please try again.');
//         });
// }

// function displayWeather(data: WeatherData): void {
//     const tempDivInfo = document.getElementById('temp-div')!;
//     const weatherInfoDiv = document.getElementById('weather-info')!;
//     const weatherIcon = document.getElementById('weather-icon') as HTMLImageElement;
//     const hourlyForecastDiv = document.getElementById('hourly-forecast')!;

//     // Clear previous content
//     weatherInfoDiv.innerHTML = '';
//     hourlyForecastDiv.innerHTML = '';
//     tempDivInfo.innerHTML = '';

//     if (data.cod === '404') {
//         weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
//     } else {
//         const cityName = data.name;
//         const temperature = Math.round(data.main.temp - 273.15); // Convert to Celsius
//         const description = data.weather[0].description;
//         const iconCode = data.weather[0].icon;
//         const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

//         tempDivInfo.innerHTML = `<p>${temperature}°C</p>`;
//         weatherInfoDiv.innerHTML = `
//             <p>${cityName}</p>
//             <p>${description}</p>
//         `;
//         weatherIcon.src = iconUrl;
//         weatherIcon.alt = description;

//         showImage();
//     }
// }

// function displayHourlyForecast(hourlyData: HourlyData[]): void {
//     const hourlyForecastDiv = document.getElementById('hourly-forecast')!;

//     const next24Hours = hourlyData.slice(0, 8); // Display the next 24 hours (3-hour intervals)

//     next24Hours.forEach(item => {
//         const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
//         const hour = dateTime.getHours();
//         const temperature = Math.round(item.main.temp - 273.15); // Convert to Celsius
//         const iconCode = item.weather[0].icon;
//         const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

//         hourlyForecastDiv.innerHTML += `
//             <div class="hourly-item">
//                 <span>${hour}:00</span>
//                 <img src="${iconUrl}" alt="Hourly Weather Icon">
//                 <span>${temperature}°C</span>
//             </div>
//         `;
//     });
// }

// function showImage(): void {
//     const weatherIcon = document.getElementById('weather-icon') as HTMLImageElement;
//     weatherIcon.style.display = 'block'; // Make the image visible once it's loaded
// }

//-----------------------------------

class Book {
private id: number;
public title: string;
protected author: string;

constructor(id: number, title: string, author: string) {
    this.id = id;
    this.title = title;
    this.author = author;
}

public getId(): number {
    return this.id;
}

public getBookInfo(): string {
    return `ID: ${this.id} | Title: ${this.title} | Author: ${this.author}`;
}

public setTitle(newTitle: string): void {
    this.title = newTitle;
}

public setAuthor(newAuthor: string): void {
    this.author = newAuthor;
}
}

class Library {
private books: Book[] = [];

// Create: Add a new book
public addBook(book: Book): void {
    this.books.push(book);
    console.log(`Book "${book.title}" has been added.`);
}

// Read: List all books
public listBooks(): void {
    if (this.books.length === 0) {
    console.log("No books in the library.");
    } else {
    console.log("Library Books:");
    this.books.forEach((book) => {
        console.log(book.getBookInfo());
    });
    }
}

// Update: Update a book's title and/or author by ID
public updateBook(id: number, newTitle?: string, newAuthor?: string): void {
    const book = this.books.find((b) => b.getId() === id);
    if (book) {
    if (newTitle) {
        book.setTitle(newTitle);
    }
    if (newAuthor) {
        book.setAuthor(newAuthor);
    }
    console.log(`Book with ID ${id} has been updated.`);
    } else {
    console.log(`Book with ID ${id} not found.`);
    }
}

// Delete: Remove a book by ID
public deleteBook(id: number): void {
    const index = this.books.findIndex((b) => b.getId() === id);
    if (index !== -1) {
    const deletedBook = this.books.splice(index, 1)[0];
    console.log(`Book "${deletedBook.title}" has been removed.`);
    } else {
    console.log(`Book with ID ${id} not found.`);
    }
}
}

// Example usage
const myLibrary = new Library();

// Create
const book1 = new Book(1, "The Line", "Twenty one Pilot");
const book2 = new Book(2, "Heavy is the crown", "LKP");
const book3 = new Book(3, "Enemy", "Imagine Dragon");

myLibrary.addBook(book1);
myLibrary.addBook(book2);
myLibrary.addBook(book3);

// Read
myLibrary.listBooks();

// Update
myLibrary.updateBook(2, "Heavy is the crown - from the Arcane show", "LKP");

// Read after update
myLibrary.listBooks();

// Delete
myLibrary.deleteBook(3);

// Read after delete
myLibrary.listBooks();
  
  
  