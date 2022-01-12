const name = [
    'Bria',
    'Marta',
    'Missouri',
    'Larue',
    'Noemy',
    'Josefa',
    'Rosa',
    'Samara',
    'Lysanne',
    'Pasquale',
    'Jeremy',
    'Lexus',
    'Freida',
    'Rafael',
    'Rubie',
    'Easton',
    'Dustin',
    'Alisa',
    'Clementina',
    'Orion',
    'Santina',
    'Dorcas',
    'Alvah',
    'Rahul',
    'Donato',
    'Barry',
    'Tito',
    'Wayne',
    'Logan',
    'Ocie',
    'Cordell',
    'Horace',
    'Joshua',
    'Francesco',
    'Leora',
    'Armand',
    'Delmer',
    'Gloria',
    'Marcella',
    'Ivory',
    'Dallas',
    'Glennie',
    'Noemie',
    'Shannon',
    'Aracely',
    'Tessie',
    'Herminio',
    'Briana',
    'Benedict',
    'Nathan',
    'Evans',
    'Camilla',
    'Hershel',
    'Titus',
    'Chauncey',
    'Katarina',
    'Sophia',
    'Griffin',
    'Immanuel',
    'Devante',
    'Elissa',
    'Chyna',
    'Danyka',
    'Eli',
    'Maurine',
    'Irving',
    'Kaycee',
    'Maryam',
    'Dayton',
    'Rosemarie',
    'Jewell',
    'Sabryna',
    'Hailie',
    'Luigi',
    'Demond',
    'Cyril',
    'Scotty',
    'Mafalda',
    'Lucienne',
    'Lonny',
    'Herta',
    'Jarred',
    'Johathan',
    'Hadley',
    'Claudine',
    'Toni',
    'Myah',
    'Drake',
    'Pink',
    'Eloise',
    'Krystina',
    'Selmer',
    'Libby',
    'Madisen',
    'Hilma',
    'Lane',
    'Barrett',
];
const surname = [
    'King',
    'Goyette',
    'Purdy',
    'Monahan',
    'Kling',
    'Kreiger',
    'Kuhlman',
    'Denesik',
    'Thiel',
    'Moore',
    'Fisher',
    'Abernathy',
    'Cruickshank',
    'Koch',
    'Gibson',
    'Grady',
    'Aufderhar',
    'Nitzsche',
    'Kiehn',
    'Hackett',
    'Schimmel',
    'Senger',
    'Cormier',
    'Fahey',
    'Fritsch',
    'Hilpert',
    'Sauer',
    'Bernier',
    'Nicolas',
    'Frami',
    'Blick',
    'Harris',
    'Wintheiser',
    'Gaylord',
    'Rau',
    'O\'Kon',
    'Rippin',
    'Conn',
    'Abshire',
    'Zemlak',
    'Maggio',
    'Schumm',
    'Thompson',
    'Wiegand',
    'Vandervort',
    'Douglas',
    'Stoltenberg',
    'O\'Connell',
    'Yost',
    'Turcotte',
    'Cassin',
    'Schroeder',
    'Adams',
    'Cronin',
    'Keeling',
    'Keebler',
    'Wunsch',
    'Koepp',
    'Howe',
    'Grant',
    'Simonis',
    'Conroy',
    'Murphy',
    'Mitchell',
    'Larkin',
    'Mueller',
    'Emmerich',
    'Stamm',
    'Wilkinson',
    'Lynch',
    'Greenholt',
    'Macejkovic',
    'Kuphal',
    'Schuppe',
    'Runolfsdottir',
    'Ratke',
    'Swift',
    'Spinka',
    'Bergnaum',
    'Ferry',
    'Schaefer',
    'O\'Hara',
    'Stiedemann',
    'Champlin',
    'Hand',
    'Orn',
    'Williamson',
    'Green',
];
const products = [
    'Oranges',
    'Apples',
    'Carrots',
    'Bananas',
    'Lemons',
    'Potatoes',
    'Corn',
    'Pea',
    'Tomato',
];

const randomNumber = (from, to) => Math.floor(Math.random() * (to - from + 1)) + from;

const randomDate = (start, end) => new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
);

const randomArray = (length, startNum, endNum) => [ ...new Array(length) ].map(() => randomNumber(startNum, endNum));

const faker = {
    fName:   () => name[ randomNumber(0, name.length - 1) ],
    lName:   () => surname[ randomNumber(0, surname.length - 1) ],
    product: () => products[ randomNumber(0, products.length - 1) ],
};

db.customers.drop();


db.customers.createIndex(
    { nickname: 1, email: 1 },
    {unique: true},
);

db.orders.drop();

const orders = [];
const users = [];

for (let i = 0; i < 10; i++) {
    const user = {
        name: {
            first: faker.fName(),
            last:  faker.lName(),
        },
        balance: randomNumber(10000, 20000),
        created: new Date(),
    };
    users.push(user);
}

const { insertedIds } = db.customers.insertMany(users);

db.customers.find().forEach((customerId, i) => {
    for (let j = 0; j < randomNumber(1, 20); j++) {
        const order = {
            customerId: customerId,
            count:      randomNumber(1, 5),
            price:      randomNumber(20, 100),
            discount:   randomNumber(5, 30),
            title:      `Title ${i} ${j}`,
            product:    faker.product(),
        };

        orders.push({
            insertOne: {
                document: order,
            },
        });
    }
});

const cursor = db.orders.bulkWrite(orders);

const customersCursor = db.customers.find();

while (customersCursor.hasNext()) {
    const { _id, name } = customersCursor.next();
    const orders = db.orders.aggregate([
        { $match: { customerId: _id } },
        { $group: { _id: '$product', total: { $sum: '$count' } } },
        { $sort: { total: 1 } },
    ]);

    const obj = {
        fName:  name.first,
        lName:  name.last,
        orders: orders.toArray(),
    };

    print(obj);
}
