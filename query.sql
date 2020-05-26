insert into  users(id,name,email,password,address,country_id,mobile_number,gender_id,status_id,currency_id,creation_date)
values(1002,'sammer','samersamirbadr@gmail.com','Intellisc123456','Mohandessen',2,01221168779,1,2,3,sysdate());


update users set name='hanie brahim' ,email='haniebrahim@hotmail.com' ,password='Intellisc123456', address='Rasheed',mobile_number='01111307222' where id=38; 
select * from country;
select * from currency;
select * from users; 
 update users set   admin=tue where id =104; 
insert into  users(id,name,email,password,address,country_id,mobile_number,gender_id,status_id,currency_id,creation_date)
values(1001,'ashraf.graphic','ashraf.graphic@gmail.com','Intellisc123456','Cairo',1,01065021628,1,2,1,sysdate());
select * from product;   

select *  from  products_sellers;
delete from products_sellers where id=82;
insert into products_sellers(product_id,user_id,creation_date,sale)value(1205,37,sysdate(),10);

update product set  name_ar='55 Kilo' ,name_en='Sheep Barki' , img_url='../../../assets/img/cheip55 3200 .jpg',price=3200,category='SHEEP' where id=1232;
update product set  name_ar='58 Kilo' where id=1202;

insert into product (name_ar,name_en,price,details,img_url,category)values('38 Kilo ','Goat Baldi',2300,'Available For Order From Fyoum','../../../assets/img/goat382300.jpg','SHEEP');
insert into products_sellers(product_id,user_id,creation_date,sale)value(1232,37,sysdate(),10);