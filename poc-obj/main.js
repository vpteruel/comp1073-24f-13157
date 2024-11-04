const human = {
    name: "Vinicius",
    age: 37,
    gender: "Male",
    married: true,
    email: function() {
        return `${this.name}@gmail.com`;
    }
};

console.log(human);