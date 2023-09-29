1.
SELECT *
FROM people
db.people.find()
2.
SELECT id,
 user_id,
 status
FROM people
db.people.find(
    {}, { user_id: 1, status: 1}
)
3.
SELECT user_id, status
FROM people
db.people.find(
    {}, { user_id: 1, status: 1, _id:0}
)
4.
SELECT *
FROM people
WHERE status = "A"
db.people.find(
    { status:"A"}
)
5.
SELECT user_id, status
FROM people
WHERE status = "A"
db.people.find(
    { status:"A"},{user_id:1, status: 1, _id:0}
)
6.
SELECT *
FROM people
WHERE status != "A"
db.people.find(
    { status:{ $ne:"A"}}
)
//* $eq= , $ne!=, $gte>=, $lt<, $lte<=, $in:[], $nin:[], sutun:{$regex: 'abc'}==/abc/+i(caseins)+^/abc/$ (baslama -bitis), $not:{abc},$and,$or,$nor
)
7.
SELECT *
FROM people
WHERE status = "A"
AND age = 50
db.people.find(
    { status:"A",
    age:50
}
)
8.
SELECT *
FROM people
WHERE status = "A"
OR age = 50
db.people.find(
    { $or:[{status:"A"},{age:50}]
}
)
9.
SELECT *
FROM people
WHERE age > 25
db.people.find(
    {
    age:{$gt:25}
}
)
10.
SELECT *
FROM people
WHERE age < 25
db.people.find(
    {
    age:{$lt:25}
}
)
11.
SELECT *
FROM people
WHERE age > 25
AND age <= 50
db.people.find(
    {
    age:{$gt:25, $lte:50}
}
)
12.
SELECT *
FROM people
WHERE user_id like "%bc%"
db.people.find(
    {
    user_id:/bc/
}
)
db.people.find( { user_id: { $regex: 'bc' } } )
13.
SELECT *
FROM people
WHERE status = "A"
ORDER BY user_id ASC
db.people.find( { status:"A" }  ).sort({user_id:1})
14.
SELECT *
FROM people
WHERE status = "A"
ORDER BY user_id DESC
db.people.find( { status:"A" }  ).sort({user_id:-1})
15.
SELECT COUNT(*)
FROM people
db.people.find().count()
16.
SELECT COUNT(user_id)
FROM people
db.people.find().count({user_id})
db.people.count( { user_id: { $exists: true } } )  //*$exists operatörü, bir alanın var olup olmadığını kontrol etmek için kullanılır. İlgili alanın varlığını kontrol etmek için true değerini kullanırız.
17.
SELECT COUNT(*)
FROM people
WHERE age > 30
db.people.find({ age:{$gt:30} }).count()
db.people.countDocuments({ age:{$gt:30} })
db.people.count( { age: { $gt: 30 } } )
18.
SELECT DISTINCT(status)
FROM people
db.people.distinct('status')
19.
SELECT *
FROM people
LIMIT 1
db.people.findOne()
db.people.find().limit(1)
20.
SELECT *
FROM people
LIMIT 5
SKIP 10
db.people.find().skip(10).limit(5)
21.
CREATE TABLE people (
 id MEDIUMINT NOT NULL
 AUTO_INCREMENT,
 user_id Varchar(30),  //* 30 karakter metin
 age Number,
 status char(1),          //* 1 karakte metin
 PRIMARY KEY (id)         //* birncil id
)
//*id MEDIUMINT NOT NULL AUTO_INCREMENT: Bu satır, "id" adlı bir sütunun oluşturulduğunu belirtir. "id" sütunu "MEDIUMINT" türünde bir tam sayıdır ve "NOT NULL" özelliği, bu sütunun boş (NULL) değerlere izin vermediğini gösterir. "AUTO_INCREMENT" özelliği, her yeni kayıt eklendiğinde bu sütunun otomatik olarak bir birim artacağını belirtir. Bu genellikle benzersiz kimlik numaralarını temsil etmek için kullanılır.
db.people.insertOne( {         //* create = insertOne/Many
 user_id: "user1",
 age: 30,
 status: "M"
 } )
 22.
 ALTER TABLE people
 ADD join_date DATETIME
 //*"ALTER TABLE" ifadesi mevcut bir tabloya sütun eklemek veya var olan sütunların özelliklerini değiştirmek için kullanılır.
 //* ADD join_date DATETIME: Bu satır, "join_date" adlı yeni bir sütunun eklenmesini belirtir. Sütunun adı "join_date" olarak belirlenir ve veri türü (data type) olarak "DATETIME" seçilir. "DATETIME" türü, tarih ve saat bilgisini saklamak için kullanılır ve genellikle tarih-zaman kombinasyonlarını içerir.
 db.people.updateMany(
  { },
  { $set: { join_date: new Date() } })  //* kayit gunceller yoksa ekler.
db.people.updateMany({},{$set:{join_date:new Date()}})
23.
DROP TABLE people
db.people.drop()
24.
INSERT INTO people(user_id,age,status)
VALUES ("bcd001",45,"A")
db.people.insertOne(
    {user_id:"bcd001", age:45,status:"A" })
25.
UPDATE people
SET status = "C"
WHERE age > 25
db.people.updateMany({age:{$gt:25}},{$set:{status:"C"}})
26.
UPDATE people
SET age = age + 3
WHERE status = "A"
db.people.updateMany({status:"A"}, {$inc:{age:3}})
27.
DELETE FROM people
WHERE status = "D"
db.people.deleteMany({status:"D"})
28.
DELETE FROM people
db.people.deleteMany({})