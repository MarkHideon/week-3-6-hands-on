"use strict";
// function greet(name: string, age: number): string {
//     return `Hellp, my name is ${name}, I'm ${age} yo.`;
// }
// console.log(greet("Hieu", 21));
const user = {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
};
//user.id = 2; // Lỗi: Không thể gán giá trị cho 'id' ở ngoài object 'user' vì readonly.
console.log(user);
const updateUser = (data) => {
    console.log("Updated name:", data);
};
updateUser({ name: "Arisu" }); // Kết quả: Dữ liệu cập nhật: { name: 'Alice Updated' }
console.log(updateUser);
