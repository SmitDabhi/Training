create database Helperland
use Helperland
go

/* Customer Details Table */
create table customer_details(
	customer_id int not null primary key identity(1,1),
	first_name nvarchar(30) not null,
	last_name nvarchar(30) not null,
	email nvarchar(50) not null unique,
	phone_no nvarchar(10) not null check(phone_no not like '%[^0-9]%'),
	dob date not null,
	c_password nvarchar(20) not null,
	street_name nvarchar(80) not null,
	house_no int not null,
	city nvarchar(30) not null,
	postalcode nvarchar(6) not null check(postalcode not like '%[^0-9]%')
);

/* Get in Touch Details table */
create table get_in_touch(
	gitp_id int not null primary key identity(1,1),
	first_name nvarchar(30) not null,
	last_name nvarchar(30) not null,
	email nvarchar(50) not null unique,
	phone_no nvarchar(10) not null check(phone_no not like '%[^0-9]%'),
	gitp_subject nvarchar(20) not null,
	gitp_message nvarchar(200) not null
);

/* Serivce Provider Details Table */
create table service_provider_details(
	sp_id int not null primary key identity(1,1),
	first_name nvarchar(30) not null,
	last_name nvarchar(30) not null,
	email nvarchar(50) not null unique,
	phone_no nvarchar(10) not null check(phone_no not like '%[^0-9]%'),
	dob date not null,
	pro_password nvarchar(20) not null,
	nationality nvarchar(30) not null,
	gender nvarchar(10) not null,
	street_name nvarchar(80) not null,
	house_no int not null,
	city nvarchar(30) not null,
	postalcode nvarchar(6) not null check(postalcode not like '%[^0-9]%')
);

/* Admin Table */
create table admin_details(
	adm_id int not null primary key identity(1,1),
	first_name nvarchar(30) not null,
	last_name nvarchar(30) not null,
	email nvarchar(50) not null unique,
	adm_password nvarchar(20) not null
);

/* Customer_fav_SP table */
create table customer_fav_SP(
	cfsp_id int foreign key references customer_details(customer_id),
	fav_sp_id int not null
);

/* Customer's_blocked_SP */
create table customer_blocked_SP(
	cbsp_id  int foreign key references customer_details(customer_id),
	blocked_sp_id int not null
);

/* SP's_blocked_customer */
create table sp_blocked_customer(
	spbc_id  int foreign key references service_provider_details(sp_id),
	blocked_cs_id int not null
);

/* Service_Booking table */
create table service_booking_details(
	service_id int not null primary key identity(1,1),
	cust_id int foreign key references customer_details(customer_id),
	service_date date not null,
	service_time time not null,
	service_duration int not null,
	inside_cabinate bit,
	inside_firdge bit,
	inside_oven bit,
	laundry_wash bit,
	interior_window bit,
	comments nvarchar(100),
	pet bit not null,
	payment_amount bigint not null,
	service_active_status bit not null
);

/* Cancel_Booking table */
create table cancel_booking_details(
	service_id int foreign key references service_booking_details(service_id),
	reason nvarchar(80) not null
); 

/* CS_feedback */
create table CS_feedback(
	cust_id int foreign key references customer_details(customer_id),
	sp_id int foreign key references service_provider_details(sp_id),
	on_time_arrival int not null check(on_time_arrival between 1 and 5),
	friendly int not null check(friendly between 1 and 5),
	quality_of_service int not null check(quality_of_service between 1 and 5),
	feedback nvarchar(100)	
);

