-- schema.sql
-- Make sure we're using our boxboys database
\c MCC;

-- Box Boys Database Schema

CREATE TABLE IF NOT EXISTS tblSellerAccounts
(
	sellerId INT,
	creationDate DATE NOT NULL,
	businessType VARCHAR(12) NOT NULL,
	name VARCHAR(35) NOT NULL,
	ein INT NOT NULL,
	address VARCHAR(30) NOT NULL,
	city VARCHAR(20) NOT NULL,
	usstate VARCHAR(2) NOT NULL,
	zipCode INT NOT NULL,
	upc BOOLEAN NOT NULL,
	manufacturer BOOLEAN NOT NULL,
	trademark BOOLEAN NOT NULL,
	verficationDoc BYTEA NOT NULL,
	PRIMARY KEY (sellerId)
);

CREATE TABLE IF NOT EXISTS tblSellerContacts
(
	contactId INT,
	sellerId INT,
	creationDate DATE NOT NULL,
	firstname VARCHAR(15) NOT NULL,
	lastname VARCHAR(15),
	dob DATE NOT NULL,
	idType VARCHAR(15) NOT NULL,
	idFront BYTEA NOT NULL,
	idBack BYTEA NOT NULL,
	email VARCHAR(30) NOT NULL,
	phoneNumber VARCHAR(14) NOT NULL,
	owner BOOLEAN NOT NULL,
	PRIMARY KEY (contactId),
	FOREIGN KEY (sellerId) REFERENCES tblSellerAccounts(sellerId) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tblSellerPasswords
(
	pid INT,
	sellerId INT,
	password VARCHAR(20) NOT NULL,
	PRIMARY KEY (pid),
	FOREIGN KEY (sellerId) REFERENCES tblSellerAccounts(sellerId) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tblBankAccounts
(
	accountId INT,
	sellerId INT,
	institution VARCHAR(30) NOT NULL,
	country VARCHAR(20) NOT NULL,
	holderName VARCHAR(30) NOT NULL,
	routingNum BIGINT NOT NULL,
	accNum BIGINT NOT NULL,
	dateAdded DATE NOT NULL,
	PRIMARY KEY (accountId),
	FOREIGN KEY (sellerId) REFERENCES tblSellerAccounts(sellerId) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tblProducts
(
	productId BIGINT,
	sellerId INT,
	uploadDate DATE NOT NULL,
	category VARCHAR(15) NOT NULL,
	title VARCHAR(50) NOT NULL,
	brand VARCHAR(25) NOT NULL,
	manufacturer VARCHAR(25) NOT NULL,
	price MONEY NOT NULL,	
	size VARCHAR(20) NOT NULL,
	style VARCHAR(20) NOT NULL,
	address VARCHAR(30) NOT NULL,
	city VARCHAR(20) NOT NULL,
	state VARCHAR(2) NOT NULL,
	zipCode INT NOT NULL,
	quantity INT NOT NULL,
	unit VARCHAR(20) NOT NULL,
	condition VARCHAR(20) NOT NULL,
	fulfillment VARCHAR(20) NOT NULL,
	description VARCHAR(100),
	PRIMARY KEY (productId),
	FOREIGN KEY (sellerId) REFERENCES tblSellerAccounts(sellerId) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tblProductImages
(
	imageId BIGINT,
	productId BIGINT,
	displayOrder INT,
	image BYTEA NOT NULL,
	PRIMARY KEY (imageId),
	FOREIGN KEY (productId) REFERENCES tblProducts(productId) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tblProductKeywords
(
	keywordId BIGINT,
	productId BIGINT,
	displayOrder INT,
	word VARCHAR(15) NOT NULL,
	PRIMARY KEY (keywordId),
	FOREIGN KEY (productId) REFERENCES tblProducts(productId) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tblProductBulletpoints
(
	bulletId BIGINT,
	productId BIGINT,
	bullet VARCHAR(25) NOT NULL,
	PRIMARY KEY (bulletId),
	FOREIGN KEY (productId) REFERENCES tblProducts(productId) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS tblBuyerAccounts
(
	buyerId INT,
	creationDate DATE NOT NULL,	
	name VARCHAR(30) NOT NULL,
	phoneNumber VARCHAR(13),
	email VARCHAR(30) NOT NULL,
	PRIMARY KEY (buyerId)
);

CREATE TABLE IF NOT EXISTS tblBuyerPasswords
(
	pid INT,
	buyerId INT,
	password VARCHAR(20) NOT NULL,
	PRIMARY KEY (pid),
	FOREIGN KEY (buyerId) REFERENCES tblBuyerAccounts(buyerId) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tblTransactions
(
		transactionId BIGINT,
		sellerId INT,
		buyerId INT,
		productId INT,
		tDate DATE NOT NULL,
		saleAmount MONEY NOT NULL,
		buyerAddress VARCHAR(30),
		PRIMARY KEY (transactionId),
		FOREIGN KEY (sellerId) REFERENCES tblSellerAccounts(sellerId),
		FOREIGN KEY (buyerId) REFERENCES tblBuyerAccounts(buyerId),
		FOREIGN KEY (productId) REFERENCES tblProducts(productId)
);